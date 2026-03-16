import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Phone, MessageCircle, MapPin, Plus, Trash2, Lock } from 'lucide-react';

const BACKEND_URL = 'https://johnson-backend.onrender.com'; // ← CHANGE THIS
const CLOUD_NAME = 'ds05t0bd0';                 // ← from Cloudinary
const UPLOAD_PRESET = 'my-blog-upload';                   // ← from Cloudinary

const ADMIN_PASSWORD = 'kaloor123'; // Change this later – tell uncle
const UNCLE_PHONE = '+919XXXXXXXXX'; // ← real number

function PublicPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/properties`)
      .then(res => res.json())
      .then(data => {
        setProperties(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 to-green-900 text-white py-6 shadow-md">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-4xl">🏠</div>
            <div>
              <h1 className="text-3xl font-bold">Johnson Homes Kaloor</h1>
              <p className="text-sm opacity-90">Trusted Room Rentals • Kochi</p>
            </div>
          </div>
          <div className="flex gap-3">
            <a href={`tel:${UNCLE_PHONE}`} className="bg-white text-green-900 px-5 py-3 rounded-xl font-bold flex items-center gap-2 shadow hover:bg-gray-100">
              <Phone size={20} /> Call Johnson
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-center mb-8">Available Rooms – Kaloor & Nearby</h2>
        <p className="text-center text-gray-600 mb-10">Scan & browse photos. Contact Johnson for location, price & full details.</p>

        {loading ? (
          <p className="text-center py-10">Loading available rooms...</p>
        ) : properties.length === 0 ? (
          <p className="text-center py-10 text-gray-500">No rooms listed right now. Check back soon or call Johnson.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map(p => (
              <div key={p._id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <img 
                  src={p.img} 
                  alt={p.title} 
                  className="w-full h-64 object-cover" 
                />
                <div className="p-5">
                  <h3 className="font-bold text-xl mb-2">{p.title}</h3>
                  <p className="text-gray-700 mb-4">{p.description}</p>
                  
                  {p.furnished && (
                    <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mb-4">
                      Fully Furnished
                    </span>
                  )}

                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <a 
                      href={`tel:${UNCLE_PHONE}`} 
                      className="flex-1 bg-green-600 text-white py-4 rounded-xl font-medium text-center flex items-center justify-center gap-2 hover:bg-green-700"
                    >
                      <Phone size={20} /> Call for Details
                    </a>
                    <a 
                      href={`https://wa.me/${UNCLE_PHONE.replace('+91','')}?text=Hi%20Johnson,%20interested%20in%20${encodeURIComponent(p.title)}%20from%20your%20Kaloor%20QR%20board`}
                      target="_blank"
                      className="flex-1 bg-[#25D366] text-white py-4 rounded-xl font-medium text-center flex items-center justify-center gap-2 hover:bg-green-700"
                    >
                      <MessageCircle size={20} /> WhatsApp Johnson
                    </a>
                  </div>

                  <div className="mt-4 text-center text-sm text-gray-500 flex items-center justify-center gap-1">
                    <Lock size={14} /> Location & Price available on enquiry only
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <footer className="bg-gray-800 text-white py-6 mt-12 text-center">
        <p>Johnson Homes Kaloor • Genuine Rentals Only</p>
        <p className="mt-2">Contact: {UNCLE_PHONE}</p>
      </footer>
    </div>
  );
}

function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('jhAdmin') === 'yes');
  const [form, setForm] = useState({ title: '', description: '', location: '', price: '', furnished: false });
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [properties, setProperties] = useState([]);

  const handleLogin = e => {
    e.preventDefault();
    if (e.target.password.value === ADMIN_PASSWORD) {
      localStorage.setItem('jhAdmin', 'yes');
      setLoggedIn(true);
    } else {
      alert('Incorrect password');
    }
  };

  const uploadImage = async () => {
    if (!imageFile) return '';
    const data = new FormData();
    data.append('file', imageFile);
    data.append('upload_preset', UPLOAD_PRESET);
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: data
    });
    const json = await res.json();
    return json.secure_url || '';
  };

  const handleAdd = async e => {
    e.preventDefault();
    setUploading(true);
    const imgUrl = await uploadImage();

    await fetch(`${BACKEND_URL}/api/properties`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, img: imgUrl })
    });

    alert('Room added!');
    setForm({ title: '', description: '', location: '', price: '', furnished: false });
    setImageFile(null);
    setUploading(false);
    fetchProperties();
  };

  const fetchProperties = () => {
    fetch(`${BACKEND_URL}/api/properties`)
      .then(r => r.json())
      .then(setProperties); // full data for admin (including location/price)
  };

  useEffect(() => {
    if (loggedIn) fetchProperties();
  }, [loggedIn]);

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">Johnson Admin Login</h2>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            className="w-full p-4 border rounded-xl mb-4"
            required
          />
          <button type="submit" className="w-full bg-green-600 text-white py-4 rounded-xl font-bold">
            Login
          </button>
          <p className="text-center text-sm text-gray-500 mt-4">Ask Alfred for password</p>
        </form>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Add New Room (Admin)</h1>

      <form onSubmit={handleAdd} className="space-y-5 bg-white p-8 rounded-2xl shadow mb-12">
        <input required placeholder="Title e.g. 2BHK Near Stadium" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full p-4 border rounded-xl" />
        <textarea required placeholder="Description (public visible)" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full p-4 border rounded-xl h-28" />
        <input required placeholder="Location (hidden – only for you)" value={form.location} onChange={e => setForm({...form, location: e.target.value})} className="w-full p-4 border rounded-xl" />
        <input required placeholder="Price (hidden – only for you)" value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="w-full p-4 border rounded-xl" />
        <div className="flex items-center gap-3">
          <input type="checkbox" checked={form.furnished} onChange={e => setForm({...form, furnished: e.target.checked})} />
          <label>Fully Furnished</label>
        </div>
        <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} required className="w-full" />
        <button disabled={uploading} className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg">
          {uploading ? 'Uploading...' : 'Add Room'}
        </button>
      </form>

      <h2 className="text-2xl font-bold mb-6">Current Rooms</h2>
      {properties.map(p => (
        <div key={p._id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-5 rounded-xl mb-4 shadow">
          <div>
            <strong className="text-lg">{p.title}</strong>
            <p className="text-sm text-gray-600">{p.description}</p>
            <p className="text-sm mt-1"><strong>Location:</strong> {p.location}</p>
            <p className="text-sm"><strong>Price:</strong> {p.price}</p>
          </div>
          <button 
            onClick={() => {
              if (window.confirm('Delete this room?')) {
                fetch(`${BACKEND_URL}/api/properties/${p._id}`, { method: 'DELETE' })
                  .then(fetchProperties);
              }
            }}
            className="text-red-600 mt-3 sm:mt-0"
          >
            <Trash2 size={22} />
          </button>
        </div>
      ))}
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
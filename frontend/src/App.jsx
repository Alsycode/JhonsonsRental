// import { useState, useEffect } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import { Phone, MessageCircle, MapPin, Plus, Trash2, Lock } from 'lucide-react';

// const BACKEND_URL = 'http://localhost:5000';// ← CHANGE THIS
// const CLOUD_NAME = 'ds05t0bd0';                 // ← from Cloudinary
// const UPLOAD_PRESET = 'my-blog-upload';                   // ← from Cloudinary

// const ADMIN_PASSWORD = 'kaloor123'; // Change this later – tell uncle
// const UNCLE_PHONE = '+919XXXXXXXXX'; // ← real number

// function PublicPage() {
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch(`${BACKEND_URL}/api/properties`)
//       .then(res => res.json())
//       .then(data => {
//         setProperties(data);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-green-700 to-green-900 text-white py-6 shadow-md">
//         <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="text-4xl">🏠</div>
//             <div>
//               <h1 className="text-3xl font-bold">Johnson Homes Kaloor</h1>
//               <p className="text-sm opacity-90">Trusted Room Rentals • Kochi</p>
//             </div>
//           </div>
//           <div className="flex gap-3">
//             <a href={`tel:${UNCLE_PHONE}`} className="bg-white text-green-900 px-5 py-3 rounded-xl font-bold flex items-center gap-2 shadow hover:bg-gray-100">
//               <Phone size={20} /> Call Johnson
//             </a>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-6xl mx-auto p-6">
//         <h2 className="text-2xl font-bold text-center mb-8">Available Rooms – Kaloor & Nearby</h2>
//         <p className="text-center text-gray-600 mb-10">Scan & browse photos. Contact Johnson for location, price & full details.</p>

//         {loading ? (
//           <p className="text-center py-10">Loading available rooms...</p>
//         ) : properties.length === 0 ? (
//           <p className="text-center py-10 text-gray-500">No rooms listed right now. Check back soon or call Johnson.</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {properties.map(p => (
//               <div key={p._id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
//                 <img 
//                   src={p.img} 
//                   alt={p.title} 
//                   className="w-full h-64 object-cover" 
//                 />
//                 <div className="p-5">
//                   <h3 className="font-bold text-xl mb-2">{p.title}</h3>
//                   <p className="text-gray-700 mb-4">{p.description}</p>
                  
//                   {p.furnished && (
//                     <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mb-4">
//                       Fully Furnished
//                     </span>
//                   )}

//                   <div className="mt-6 flex flex-col sm:flex-row gap-3">
//                     <a 
//                       href={`tel:${UNCLE_PHONE}`} 
//                       className="flex-1 bg-green-600 text-white py-4 rounded-xl font-medium text-center flex items-center justify-center gap-2 hover:bg-green-700"
//                     >
//                       <Phone size={20} /> Call for Details
//                     </a>
//                     <a 
//                       href={`https://wa.me/${UNCLE_PHONE.replace('+91','')}?text=Hi%20Johnson,%20interested%20in%20${encodeURIComponent(p.title)}%20from%20your%20Kaloor%20QR%20board`}
//                       target="_blank"
//                       className="flex-1 bg-[#25D366] text-white py-4 rounded-xl font-medium text-center flex items-center justify-center gap-2 hover:bg-green-700"
//                     >
//                       <MessageCircle size={20} /> WhatsApp Johnson
//                     </a>
//                   </div>

//                   <div className="mt-4 text-center text-sm text-gray-500 flex items-center justify-center gap-1">
//                     <Lock size={14} /> Location & Price available on enquiry only
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       <footer className="bg-gray-800 text-white py-6 mt-12 text-center">
//         <p>Johnson Homes Kaloor • Genuine Rentals Only</p>
//         <p className="mt-2">Contact: {UNCLE_PHONE}</p>
//       </footer>
//     </div>
//   );
// }

// function AdminPage() {
//   const [loggedIn, setLoggedIn] = useState(localStorage.getItem('jhAdmin') === 'yes');
//   const [form, setForm] = useState({ title: '', description: '', location: '', price: '', furnished: false });
//   const [imageFile, setImageFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [properties, setProperties] = useState([]);

//   const handleLogin = e => {
//     e.preventDefault();
//     if (e.target.password.value === ADMIN_PASSWORD) {
//       localStorage.setItem('jhAdmin', 'yes');
//       setLoggedIn(true);
//     } else {
//       alert('Incorrect password');
//     }
//   };

//   const uploadImage = async () => {
//     if (!imageFile) return '';
//     const data = new FormData();
//     data.append('file', imageFile);
//     data.append('upload_preset', UPLOAD_PRESET);
//     const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
//       method: 'POST',
//       body: data
//     });
//     const json = await res.json();
//     return json.secure_url || '';
//   };

//   const handleAdd = async e => {
//     e.preventDefault();
//     setUploading(true);
//     const imgUrl = await uploadImage();

//     await fetch(`${BACKEND_URL}/api/properties`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ ...form, img: imgUrl })
//     });

//     alert('Room added!');
//     setForm({ title: '', description: '', location: '', price: '', furnished: false });
//     setImageFile(null);
//     setUploading(false);
//     fetchProperties();
//   };

//   const fetchProperties = () => {
//     fetch(`${BACKEND_URL}/api/properties`)
//       .then(r => r.json())
//       .then(setProperties); // full data for admin (including location/price)
//   };

//   useEffect(() => {
//     if (loggedIn) fetchProperties();
//   }, [loggedIn]);

//   if (!loggedIn) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100">
//         <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
//           <h2 className="text-2xl font-bold text-center mb-6">Johnson Admin Login</h2>
//           <input
//             type="password"
//             name="password"
//             placeholder="Enter password"
//             className="w-full p-4 border rounded-xl mb-4"
//             required
//           />
//           <button type="submit" className="w-full bg-green-600 text-white py-4 rounded-xl font-bold">
//             Login
//           </button>
//           <p className="text-center text-sm text-gray-500 mt-4">Ask Alfred for password</p>
//         </form>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 max-w-5xl mx-auto">
//       <h1 className="text-3xl font-bold mb-8">Add New Room (Admin)</h1>

//       <form onSubmit={handleAdd} className="space-y-5 bg-white p-8 rounded-2xl shadow mb-12">
//         <input required placeholder="Title e.g. 2BHK Near Stadium" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full p-4 border rounded-xl" />
//         <textarea required placeholder="Description (public visible)" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full p-4 border rounded-xl h-28" />
//         <input required placeholder="Location (hidden – only for you)" value={form.location} onChange={e => setForm({...form, location: e.target.value})} className="w-full p-4 border rounded-xl" />
//         <input required placeholder="Price (hidden – only for you)" value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="w-full p-4 border rounded-xl" />
//         <div className="flex items-center gap-3">
//           <input type="checkbox" checked={form.furnished} onChange={e => setForm({...form, furnished: e.target.checked})} />
//           <label>Fully Furnished</label>
//         </div>
//         <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} required className="w-full" />
//         <button disabled={uploading} className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg">
//           {uploading ? 'Uploading...' : 'Add Room'}
//         </button>
//       </form>

//       <h2 className="text-2xl font-bold mb-6">Current Rooms</h2>
//       {properties.map(p => (
//         <div key={p._id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-5 rounded-xl mb-4 shadow">
//           <div>
//             <strong className="text-lg">{p.title}</strong>
//             <p className="text-sm text-gray-600">{p.description}</p>
//             <p className="text-sm mt-1"><strong>Location:</strong> {p.location}</p>
//             <p className="text-sm"><strong>Price:</strong> {p.price}</p>
//           </div>
//           <button 
//             onClick={() => {
//               if (window.confirm('Delete this room?')) {
//                 fetch(`${BACKEND_URL}/api/properties/${p._id}`, { method: 'DELETE' })
//                   .then(fetchProperties);
//               }
//             }}
//             className="text-red-600 mt-3 sm:mt-0"
//           >
//             <Trash2 size={22} />
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<PublicPage />} />
//       <Route path="/admin" element={<AdminPage />} />
//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes>
//   );
// }

// export default App;
// import { useState, useEffect } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import { Phone, MessageCircle, Lock } from 'lucide-react';

// const BACKEND_URL = 'http://localhost:5000'; // keep for local, change for prod
// const CLOUD_NAME = 'ds05t0bd0';
// const UPLOAD_PRESET = 'my-blog-upload';

// const ADMIN_PASSWORD = 'kaloor123';
// const UNCLE_PHONE = '+919XXXXXXXXX';

// function PublicPage() {
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch(`${BACKEND_URL}/api/properties`)
//       .then(res => res.json())
//       .then(data => {
//         setProperties(data);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, []);

//   return (
//     <div className="min-h-screen bg-[#FAF9F6] font-sans antialiased">
//       {/* Elegant Header */}
//       <header className="bg-[#1F2525] text-[#F8F5F1] py-10 md:py-16">
//         <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
//           <div className="flex items-center gap-4">
//             <div className="text-5xl">🏛️</div>
//             <div>
//               <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">Johnson Homes</h1>
//               <p className="text-lg opacity-80 font-light mt-1">Kaloor, Kochi • Discerning Rentals</p>
//             </div>
//           </div>
//           <a
//             href={`tel:${UNCLE_PHONE}`}
//             className="inline-flex items-center gap-3 bg-[#065F46] text-white px-8 py-5 rounded-full font-medium text-lg shadow-lg hover:bg-[#054c38] transition-colors duration-300"
//           >
//             <Phone size={22} /> Speak with Johnson
//           </a>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
//         <div className="text-center mb-20">
//           <h2 className="text-4xl md:text-5xl font-serif font-semibold text-[#1F2525] mb-6">Curated Residences in Kaloor</h2>
//           <p className="text-xl text-[#4B5563] max-w-3xl mx-auto font-light leading-relaxed">
//             Discover thoughtfully selected homes. Location, exact terms, and availability revealed upon direct conversation.
//           </p>
//         </div>

//         {loading ? (
//           <div className="text-center py-32 text-[#6B7280] text-xl">Curating selection...</div>
//         ) : properties.length === 0 ? (
//           <div className="text-center py-32 text-[#6B7280] text-xl font-light">
//             Currently no curated listings. Please contact Johnson directly.
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
//             {properties.map((p) => (
//               <article
//                 key={p._id}
//                 className="group bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-[#E5E7EB]/50"
//               >
//                 <div className="relative aspect-[4/3] overflow-hidden">
//                   <img
//                     src={p.img}
//                     alt={p.title}
//                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//                   />
//                   {p.furnished && (
//                     <span className="absolute top-4 right-4 bg-[#065F46] text-white text-sm font-medium px-4 py-1.5 rounded-full shadow">
//                       Fully Furnished
//                     </span>
//                   )}
//                 </div>

//                 <div className="p-8 lg:p-10">
//                   <h3 className="text-2xl font-serif font-semibold text-[#1F2525] mb-4 group-hover:text-[#065F46] transition-colors">
//                     {p.title}
//                   </h3>
//                   <p className="text-[#4B5563] leading-relaxed mb-8 line-clamp-3">
//                     {p.description}
//                   </p>

//                   <div className="flex flex-col sm:flex-row gap-4">
//                     <a
//                       href={`tel:${UNCLE_PHONE}`}
//                       className="flex-1 bg-[#065F46] text-white py-5 rounded-xl font-medium text-center flex items-center justify-center gap-3 hover:bg-[#054c38] transition-colors shadow-md"
//                     >
//                       <Phone size={20} /> Inquire Now
//                     </a>
//                     <a
//                       href={`https://wa.me/${UNCLE_PHONE.replace('+91','')}?text=Hi%20Johnson,%20interested%20in%20${encodeURIComponent(p.title)}%20from%20your%20Kaloor%20QR%20board`}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="flex-1 border-2 border-[#065F46] text-[#065F46] py-5 rounded-xl font-medium text-center flex items-center justify-center gap-3 hover:bg-[#065F46]/5 transition-colors"
//                     >
//                       <MessageCircle size={20} /> WhatsApp Johnson
//                     </a>
//                   </div>

//                   <div className="mt-8 flex items-center justify-center gap-2 text-sm text-[#6B7280] font-light">
//                     <Lock size={16} /> Details shared personally
//                   </div>
//                 </div>
//               </article>
//             ))}
//           </div>
//         )}
//       </main>

//       <footer className="bg-[#1F2525] text-[#D1D5DB] py-16 text-center">
//         <div className="max-w-7xl mx-auto px-6 lg:px-8">
//           <p className="text-xl font-serif mb-4">Johnson Homes Kaloor</p>
//           <p className="text-lg opacity-80">Personalised • Discreet • Trusted</p>
//           <p className="mt-6 text-sm opacity-70">Contact: {UNCLE_PHONE}</p>
//         </div>
//       </footer>
//     </div>
//   );
// }

// // ──────────────────────────────────────────────────────────────
// // AdminPage – keep functional, but give it a premium admin feel too
// // ──────────────────────────────────────────────────────────────

// function AdminPage() {
//   const [loggedIn, setLoggedIn] = useState(localStorage.getItem('jhAdmin') === 'yes');
//   const [form, setForm] = useState({ title: '', description: '', location: '', price: '', furnished: false });
//   const [imageFile, setImageFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [properties, setProperties] = useState([]);

//   const handleLogin = e => {
//     e.preventDefault();
//     if (e.target.password.value === ADMIN_PASSWORD) {
//       localStorage.setItem('jhAdmin', 'yes');
//       setLoggedIn(true);
//     } else {
//       alert('Incorrect password');
//     }
//   };

//   const uploadImage = async () => {
//     if (!imageFile) return '';
//     const data = new FormData();
//     data.append('file', imageFile);
//     data.append('upload_preset', UPLOAD_PRESET);
//     const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
//       method: 'POST',
//       body: data
//     });
//     const json = await res.json();
//     return json.secure_url || '';
//   };

//   const handleAdd = async e => {
//     e.preventDefault();
//     setUploading(true);
//     const imgUrl = await uploadImage();

//     await fetch(`${BACKEND_URL}/api/properties`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ ...form, img: imgUrl })
//     });

//     alert('Room added');
//     setForm({ title: '', description: '', location: '', price: '', furnished: false });
//     setImageFile(null);
//     setUploading(false);
//     fetchProperties();
//   };

//   const fetchProperties = () => {
//     fetch(`${BACKEND_URL}/api/properties`)
//       .then(r => r.json())
//       .then(setProperties);
//   };

//   useEffect(() => {
//     if (loggedIn) fetchProperties();
//   }, [loggedIn]);

//   if (!loggedIn) {
//     return (
//       <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center p-6">
//         <form onSubmit={handleLogin} className="bg-white p-12 rounded-3xl shadow-2xl w-full max-w-lg border border-[#E5E7EB]/50">
//           <h2 className="text-3xl font-serif font-semibold text-center mb-10 text-[#1F2525]">Admin Access</h2>
//           <input
//             type="password"
//             name="password"
//             placeholder="Access code"
//             className="w-full p-5 border border-[#D1D5DB] rounded-xl mb-6 focus:outline-none focus:border-[#065F46] transition"
//             required
//           />
//           <button type="submit" className="w-full bg-[#065F46] text-white py-5 rounded-xl font-medium text-lg hover:bg-[#054c38] transition">
//             Enter
//           </button>
//           <p className="text-center text-sm text-[#6B7280] mt-6">Private access only</p>
//         </form>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#FAF9F6] p-6 lg:p-12">
//       <div className="max-w-5xl mx-auto">
//         <h1 className="text-4xl font-serif font-bold text-[#1F2525] mb-12">Manage Listings</h1>

//         <form onSubmit={handleAdd} className="bg-white p-10 lg:p-14 rounded-3xl shadow-xl mb-16 border border-[#E5E7EB]/50">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <input required placeholder="Title • e.g. Executive 2BHK" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="p-5 border border-[#D1D5DB] rounded-xl focus:outline-none focus:border-[#065F46]" />
//             <input required placeholder="Price (internal only)" value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="p-5 border border-[#D1D5DB] rounded-xl focus:outline-none focus:border-[#065F46]" />
//           </div>
//           <textarea required placeholder="Description shown publicly" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full p-5 border border-[#D1D5DB] rounded-xl mt-8 h-40 focus:outline-none focus:border-[#065F46]" />
//           <input required placeholder="Location (internal only)" value={form.location} onChange={e => setForm({...form, location: e.target.value})} className="w-full p-5 border border-[#D1D5DB] rounded-xl mt-8 focus:outline-none focus:border-[#065F46]" />
//           <div className="mt-8 flex items-center gap-4">
//             <input type="checkbox" checked={form.furnished} onChange={e => setForm({...form, furnished: e.target.checked})} className="w-5 h-5" />
//             <label className="text-lg">Fully Furnished</label>
//           </div>
//           <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} required className="w-full mt-8 p-4 border border-dashed border-[#065F46]/50 rounded-xl" />
//           <button disabled={uploading} className="w-full mt-10 bg-[#065F46] text-white py-6 rounded-xl font-medium text-xl hover:bg-[#054c38] transition disabled:opacity-50">
//             {uploading ? 'Processing...' : 'Add to Collection'}
//           </button>
//         </form>

//         <h2 className="text-3xl font-serif font-semibold text-[#1F2525] mb-10">Current Collection</h2>
//         <div className="space-y-6">
//           {properties.map(p => (
//             <div key={p._id} className="bg-white p-8 rounded-2xl shadow border border-[#E5E7EB]/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
//               <div>
//                 <h3 className="text-xl font-semibold">{p.title}</h3>
//                 <p className="text-[#4B5563] mt-2">{p.description.substring(0, 120)}...</p>
//                 <div className="mt-3 text-sm text-[#6B7280]">
//                   <strong>Location:</strong> {p.location} • <strong>Price:</strong> {p.price}
//                 </div>
//               </div>
//               <button
//                 onClick={() => {
//                   if (window.confirm('Remove this listing?')) {
//                     fetch(`${BACKEND_URL}/api/properties/${p._id}`, { method: 'DELETE' }).then(fetchProperties);
//                   }
//                 }}
//                 className="text-red-600 hover:text-red-800 transition"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<PublicPage />} />
//       <Route path="/admin" element={<AdminPage />} />
//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes>
//   );
// }

// export default App;
import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Phone, MessageCircle, Lock } from "lucide-react";
import PropertyDetail from "./PropertyDetail";

const BACKEND_URL = "http://localhost:5000";
const CLOUD_NAME = "ds05t0bd0";
const UPLOAD_PRESET = "my-blog-upload";

const ADMIN_PASSWORD = "kaloor123";
const UNCLE_PHONE = "+919XXXXXXXXX";

function PublicPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/properties`)
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF9F6] font-sans antialiased">

      {/* HEADER */}
      <header className="bg-[#1F2525] text-[#F8F5F1] py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="text-4xl">🏛️</div>
            <div>
              <h1 className="text-4xl font-serif font-bold">
                Johnson Homes
              </h1>
              <p className="text-sm opacity-80">
                Kaloor, Kochi • Curated Rentals
              </p>
            </div>
          </div>

          <a
            href={`tel:${UNCLE_PHONE}`}
            className="flex items-center gap-2 bg-[#065F46] text-white px-5 py-3 rounded-lg text-sm hover:bg-[#054c38] transition"
          >
            <Phone size={16} /> Call Johnson
          </a>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-6 py-16">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif mb-4 text-[#1F2525]">
            Curated Residences in Kaloor
          </h2>
          <p className="text-gray-600">
            Click any property to explore full images
          </p>
        </div>

        {loading ? (
          <div className="text-center py-32 text-gray-500">
            Loading properties...
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

            {properties.map((p) => (
              <article
                key={p._id}
                onClick={() => navigate(`/property/${p._id}`)}
                className="cursor-pointer group bg-white rounded-xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition"
              >

                {/* IMAGE */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={p.images?.[0] || p.img}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />

                  {p.furnished && (
                    <span className="absolute top-4 right-4 bg-white/80 backdrop-blur text-xs px-3 py-1 rounded-full">
                      Furnished
                    </span>
                  )}
                </div>

                {/* CONTENT */}
                <div className="p-6">

                  <h3 className="text-xl font-serif mb-3">
                    {p.title}
                  </h3>

                  <p className="text-gray-600 text-sm line-clamp-3 mb-6">
                    {p.description}
                  </p>

                  {/* SMALL BUTTONS */}
                  <div className="flex gap-3">

                    <a
                      href={`tel:${UNCLE_PHONE}`}
                      onClick={(e)=>e.stopPropagation()}
                      className="flex-1 bg-[#065F46] text-white text-sm py-2 rounded-lg flex items-center justify-center gap-1 hover:bg-[#054c38]"
                    >
                      <Phone size={14}/> Call
                    </a>

                    <a
                      href={`https://wa.me/${UNCLE_PHONE.replace("+91","")}`}
                      onClick={(e)=>e.stopPropagation()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 border border-[#065F46] text-[#065F46] text-sm py-2 rounded-lg flex items-center justify-center gap-1"
                    >
                      <MessageCircle size={14}/> WhatsApp
                    </a>

                  </div>

                  <div className="mt-5 flex items-center justify-center text-xs text-gray-500 gap-1">
                    <Lock size={12}/> Details shared privately
                  </div>

                </div>
              </article>
            ))}

          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-[#1F2525] text-gray-300 py-12 text-center">
        <p className="font-serif text-lg mb-2">
          Johnson Homes Kaloor
        </p>
        <p className="text-sm opacity-80">
          Personalised • Trusted
        </p>
      </footer>
    </div>
  );
}

/* ---------------- ADMIN PAGE ---------------- */

// function AdminPage() {
//   const [loggedIn, setLoggedIn] = useState(localStorage.getItem("jhAdmin") === "yes");
//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     location: "",
//     price: "",
//     furnished: false
//   });

//   const [imageFiles, setImageFiles] = useState([]);
//   const [properties, setProperties] = useState([]);

//   const handleLogin = (e) => {
//     e.preventDefault();
//     if (e.target.password.value === ADMIN_PASSWORD) {
//       localStorage.setItem("jhAdmin", "yes");
//       setLoggedIn(true);
//     } else {
//       alert("Wrong password");
//     }
//   };

//   const uploadImages = async () => {

//     const urls = [];

//     for (const file of imageFiles) {

//       const data = new FormData();
//       data.append("file", file);
//       data.append("upload_preset", UPLOAD_PRESET);

//       const res = await fetch(
//         `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
//         { method: "POST", body: data }
//       );

//       const json = await res.json();
//       urls.push(json.secure_url);
//     }

//     return urls;
//   };

//   const fetchProperties = () => {
//     fetch(`${BACKEND_URL}/api/properties`)
//       .then((r) => r.json())
//       .then(setProperties);
//   };

//   const handleAdd = async (e) => {
//     e.preventDefault();

//     const urls = await uploadImages();

//     await fetch(`${BACKEND_URL}/api/properties`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ ...form, images: urls })
//     });

//     alert("Property added");

//     setForm({
//       title:"",
//       description:"",
//       location:"",
//       price:"",
//       furnished:false
//     });

//     setImageFiles([]);

//     fetchProperties();
//   };

//   useEffect(()=>{
//     if(loggedIn) fetchProperties();
//   },[loggedIn]);

//   if(!loggedIn){
//     return(
//       <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6]">
//         <form onSubmit={handleLogin} className="bg-white p-10 rounded-xl shadow">
//           <input
//             type="password"
//             name="password"
//             placeholder="Admin password"
//             className="border p-3 rounded w-full mb-4"
//           />
//           <button className="bg-[#065F46] text-white px-6 py-2 rounded">
//             Login
//           </button>
//         </form>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-[#FAF9F6] p-10">

//       <h1 className="text-3xl font-serif mb-10">
//         Manage Properties
//       </h1>

//       <form onSubmit={handleAdd} className="bg-white p-8 rounded-xl shadow mb-12">

//         <input
//           placeholder="Title"
//           value={form.title}
//           onChange={e=>setForm({...form,title:e.target.value})}
//           className="border p-3 w-full mb-4 rounded"
//         />

//         <textarea
//           placeholder="Description"
//           value={form.description}
//           onChange={e=>setForm({...form,description:e.target.value})}
//           className="border p-3 w-full mb-4 rounded"
//         />

//         <input
//           placeholder="Location"
//           value={form.location}
//           onChange={e=>setForm({...form,location:e.target.value})}
//           className="border p-3 w-full mb-4 rounded"
//         />

//         <input
//           placeholder="Price"
//           value={form.price}
//           onChange={e=>setForm({...form,price:e.target.value})}
//           className="border p-3 w-full mb-4 rounded"
//         />

//         <input
//           type="file"
//           multiple
//           onChange={(e)=>setImageFiles([...e.target.files])}
//           className="mb-6"
//         />

//         <button className="bg-[#065F46] text-white px-6 py-2 rounded">
//           Add Property
//         </button>

//       </form>

//     </div>
//   );
// }
// function AdminPage() {
//   const [loggedIn, setLoggedIn] = useState(localStorage.getItem('jhAdmin') === 'yes');
//   const [form, setForm] = useState({ title: '', description: '', location: '', price: '', furnished: false });
//   const [imageFile, setImageFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [properties, setProperties] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [editForm, setEditForm] = useState({});

//   const CLOUD_NAME = 'ds05t0bd0';
//   const UPLOAD_PRESET = 'my-blog-upload';

//   const handleLogin = e => {
//     e.preventDefault();
//     if (e.target.password.value === ADMIN_PASSWORD) {
//       localStorage.setItem('jhAdmin', 'yes');
//       setLoggedIn(true);
//     } else {
//       alert('Incorrect password');
//     }
//   };

//   const uploadImage = async () => {
//     if (!imageFile) return '';
//     const data = new FormData();
//     data.append('file', imageFile);
//     data.append('upload_preset', UPLOAD_PRESET);
//     const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
//       method: 'POST',
//       body: data
//     });
//     const json = await res.json();
//     return json.secure_url || '';
//   };

//   const handleAdd = async e => {
//     e.preventDefault();
//     setUploading(true);
//     const imgUrl = await uploadImage();

//     await fetch(`${BACKEND_URL}/api/properties`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ ...form, img: imgUrl })
//     });

//     alert('Property added successfully');
//     setForm({ title: '', description: '', location: '', price: '', furnished: false });
//     setImageFile(null);
//     setUploading(false);
//     fetchProperties();
//   };

//   const handleEdit = (property) => {
//     setEditingId(property._id);
//     setEditForm(property);
//   };

//   const handleUpdate = async e => {
//     e.preventDefault();
//     setUploading(true);

//     await fetch(`${BACKEND_URL}/api/properties/${editingId}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(editForm)
//     });

//     alert('Property updated successfully');
//     setEditingId(null);
//     setEditForm({});
//     setUploading(false);
//     fetchProperties();
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Delete this property?')) {
//       await fetch(`${BACKEND_URL}/api/properties/${id}`, { method: 'DELETE' });
//       fetchProperties();
//     }
//   };

//   const fetchProperties = () => {
//     fetch(`${BACKEND_URL}/api/properties`)
//       .then(r => r.json())
//       .then(setProperties);
//   };

//   useEffect(() => {
//     if (loggedIn) fetchProperties();
//   }, [loggedIn]);

//   if (!loggedIn) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-[#FAF9F6] to-[#F0F4F1] flex items-center justify-center p-6">
//         <form onSubmit={handleLogin} className="bg-white/80 backdrop-blur-xl p-12 rounded-3xl shadow-2xl w-full max-w-lg border border-white/50">
//           <h2 className="text-4xl font-serif font-bold text-center mb-12 text-[#1F2525] bg-gradient-to-r from-[#1F2525] to-[#065F46] bg-clip-text text-transparent">
//             Admin Access
//           </h2>
//           <input
//             type="password"
//             name="password"
//             placeholder="Enter access code"
//             className="w-full p-6 border-2 border-[#E5E7EB]/50 rounded-2xl mb-8 focus:outline-none focus:border-[#065F46] focus:ring-4 focus:ring-[#065F46]/10 transition-all bg-white/50 backdrop-blur-sm"
//             required
//           />
//           <button type="submit" className="w-full bg-gradient-to-r from-[#065F46] to-[#047857] text-white py-6 rounded-2xl font-semibold text-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
//             Enter Dashboard
//           </button>
//         </form>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#FAF9F6] to-[#F0F4F1] p-6 lg:p-12 font-serif">
//       <div className="max-w-6xl mx-auto">
//         <div className="flex justify-between items-center mb-16 lg:mb-24">
//           <h1 className="text-5xl font-bold text-[#1F2525] bg-gradient-to-r from-[#1F2525] to-[#065F46] bg-clip-text text-transparent">
//             Property Dashboard
//           </h1>
//           <button
//             onClick={() => {setLoggedIn(false); localStorage.removeItem('jhAdmin');}}
//             className="text-[#6B7280] hover:text-red-500 font-semibold transition-colors"
//           >
//             Logout
//           </button>
//         </div>

//         {/* Add New Property Form */}
//         <div className="bg-white/80 backdrop-blur-xl p-10 lg:p-14 rounded-3xl shadow-2xl mb-16 lg:mb-24 border border-white/50">
//           <h2 className="text-3xl font-bold text-[#1F2525] mb-12">{editingId ? 'Edit Property' : 'Add New Property'}</h2>
          
//           <form onSubmit={editingId ? handleUpdate : handleAdd} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             <input 
//               required 
//               placeholder="Property Title" 
//               value={editingId ? editForm.title : form.title}
//               onChange={editingId ? (e) => setEditForm({...editForm, title: e.target.value}) : (e) => setForm({...form, title: e.target.value})}
//               className="p-6 border-2 border-[#E5E7EB]/50 rounded-2xl focus:outline-none focus:border-[#065F46] focus:ring-4 focus:ring-[#065F46]/10 transition-all bg-white/50"
//             />
//             <input 
//               required 
//               placeholder="Price (₹)" 
//               value={editingId ? editForm.price : form.price}
//               onChange={editingId ? (e) => setEditForm({...editForm, price: e.target.value}) : (e) => setForm({...form, price: e.target.value})}
//               className="p-6 border-2 border-[#E5E7EB]/50 rounded-2xl focus:outline-none focus:border-[#065F46] focus:ring-4 focus:ring-[#065F46]/10 transition-all bg-white/50"
//             />
//             <textarea 
//               required 
//               placeholder="Description (publicly visible)" 
//               value={editingId ? editForm.description : form.description}
//               onChange={editingId ? (e) => setEditForm({...editForm, description: e.target.value}) : (e) => setForm({...form, description: e.target.value})}
//               className="lg:col-span-2 p-6 border-2 border-[#E5E7EB]/50 rounded-2xl focus:outline-none focus:border-[#065F46] focus:ring-4 focus:ring-[#065F46]/10 transition-all h-32 resize-vertical bg-white/50"
//             />
//             <input 
//               required 
//               placeholder="Exact Location (private)" 
//               value={editingId ? editForm.location : form.location}
//               onChange={editingId ? (e) => setEditForm({...editForm, location: e.target.value}) : (e) => setForm({...form, location: e.target.value})}
//               className="p-6 border-2 border-[#E5E7EB]/50 rounded-2xl focus:outline-none focus:border-[#065F46] focus:ring-4 focus:ring-[#065F46]/10 transition-all bg-white/50"
//             />
//             <div className="lg:col-span-2 flex items-center gap-4 p-6 border-2 border-dashed border-[#065F46]/30 rounded-2xl bg-gradient-to-r from-[#065F46]/5 to-transparent">
//               <input 
//                 type="checkbox" 
//                 checked={editingId ? editForm.furnished : form.furnished}
//                 onChange={editingId ? (e) => setEditForm({...editForm, furnished: e.target.checked}) : (e) => setForm({...form, furnished: e.target.checked})}
//                 className="w-6 h-6 rounded-lg border-2 border-[#065F46]/50 focus:ring-[#065F46]"
//               />
//               <label className="text-xl font-semibold text-[#1F2525]">Fully Furnished</label>
//             </div>
//             {!editingId && (
//               <input 
//                 type="file" 
//                 accept="image/*" 
//                 onChange={e => setImageFile(e.target.files[0])}
//                 className="lg:col-span-2 p-6 border-2 border-dashed border-[#065F46]/30 rounded-2xl cursor-pointer hover:border-[#065F46]/50 transition-all bg-gradient-to-r from-[#065F46]/5 to-transparent file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-[#065F46] file:text-white hover:file:bg-[#054c38]"
//                 required
//               />
//             )}
//             <button 
//               disabled={uploading}
//               className="lg:col-span-2 bg-gradient-to-r from-[#065F46] to-[#047857] text-white py-8 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed lg:text-2xl"
//             >
//               {uploading ? 'Processing...' : editingId ? 'Update Property' : 'Add New Property'}
//             </button>
//           </form>
//         </div>

//         {/* Properties List */}
//         <div className="space-y-6">
//           <h2 className="text-4xl font-bold text-[#1F2525] mb-10 bg-gradient-to-r from-[#1F2525] to-[#065F46] bg-clip-text text-transparent">
//             Current Collection ({properties.length})
//           </h2>
//           <div className="grid gap-6">
//             {properties.map(p => (
//               <div key={p._id} className="bg-white/80 backdrop-blur-xl p-8 lg:p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50 group hover:-translate-y-2">
//                 <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
//                   <div className="flex-1">
//                     <h3 className="text-2xl font-bold text-[#1F2525] mb-3">{p.title}</h3>
//                     <p className="text-lg text-[#4B5563] mb-4 line-clamp-2">{p.description}</p>
//                     <div className="grid grid-cols-2 gap-4 text-sm text-[#6B7280]">
//                       <div><span className="font-semibold text-[#1F2525]">Location:</span> {p.location}</div>
//                       <div><span className="font-semibold text-[#1F2525]">Price:</span> {p.price}</div>
//                       <div className="col-span-2">
//                         <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                           p.furnished 
//                             ? 'bg-[#065F46]/20 text-[#065F46]' 
//                             : 'bg-gray-200/50 text-gray-700'
//                         }`}>
//                           {p.furnished ? 'Fully Furnished' : 'Not Furnished'}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="flex flex-col sm:flex-row gap-3 pt-2 lg:pt-0">
//                     <button
//                       onClick={() => handleEdit(p)}
//                       className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
//                       disabled={editingId === p._id}
//                     >
//                       {editingId === p._id ? 'Editing...' : 'Edit'}
//                     </button>
//                     <button
//                       onClick={() => handleDelete(p._id)}
//                       className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//           {properties.length === 0 && (
//             <div className="text-center py-24 text-[#6B7280] text-xl font-light bg-white/50 rounded-3xl p-12 backdrop-blur-sm">
//               No properties yet. Add your first listing above.
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
function AdminPage() {

  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("jhAdmin") === "yes");

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    furnished: false
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [properties, setProperties] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);

  const CLOUD_NAME = "ds05t0bd0";
  const UPLOAD_PRESET = "my-blog-upload";

  const handleLogin = (e) => {
    e.preventDefault();
    if (e.target.password.value === ADMIN_PASSWORD) {
      localStorage.setItem("jhAdmin", "yes");
      setLoggedIn(true);
    } else {
      alert("Wrong password");
    }
  };

  const uploadImages = async () => {

    const urls = [];

    for (const file of imageFiles) {

      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", UPLOAD_PRESET);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: data
        }
      );

      const json = await res.json();
      urls.push(json.secure_url);
    }

    return urls;
  };

  const fetchProperties = () => {
    fetch(`${BACKEND_URL}/api/properties`)
      .then(r => r.json())
      .then(setProperties);
  };

  const handleAdd = async (e) => {

    e.preventDefault();

    setUploading(true);

    const urls = await uploadImages();

    await fetch(`${BACKEND_URL}/api/properties`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        images: urls
      })
    });

    setForm({
      title: "",
      description: "",
      location: "",
      price: "",
      furnished: false
    });

    setImageFiles([]);

    setUploading(false);

    fetchProperties();
  };

  const handleEdit = (p) => {

    setEditingId(p._id);

    setForm({
      title: p.title,
      description: p.description,
      location: p.location,
      price: p.price,
      furnished: p.furnished
    });

  };

  const handleUpdate = async (e) => {

    e.preventDefault();

    setUploading(true);

    let urls = [];

    if (imageFiles.length > 0) {
      urls = await uploadImages();
    }

    await fetch(`${BACKEND_URL}/api/properties/${editingId}`, {

      method: "PUT",

      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({
        ...form,
        ...(urls.length > 0 && { images: urls })
      })

    });

    setEditingId(null);

    setImageFiles([]);

    setUploading(false);

    fetchProperties();
  };

  const handleDelete = async (id) => {

    if (!window.confirm("Delete property?")) return;

    await fetch(`${BACKEND_URL}/api/properties/${id}`, {
      method: "DELETE"
    });

    fetchProperties();
  };

  useEffect(() => {

    if (loggedIn) fetchProperties();

  }, [loggedIn]);

  if (!loggedIn) {

    return (
      <div className="min-h-screen flex items-center justify-center">

        <form onSubmit={handleLogin}>

          <input
            name="password"
            type="password"
            placeholder="Admin password"
            className="border p-3"
          />

          <button className="bg-green-600 text-white px-4 py-2">
            Login
          </button>

        </form>

      </div>
    );

  }

  return (

    <div className="p-10">

      <h1 className="text-3xl mb-10">Admin Dashboard</h1>

      <form onSubmit={editingId ? handleUpdate : handleAdd} className="mb-10">

        <input
          placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          className="border p-2 block mb-4"
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          className="border p-2 block mb-4"
        />

        <input
          placeholder="Location"
          value={form.location}
          onChange={e => setForm({ ...form, location: e.target.value })}
          className="border p-2 block mb-4"
        />

        <input
          placeholder="Price"
          value={form.price}
          onChange={e => setForm({ ...form, price: e.target.value })}
          className="border p-2 block mb-4"
        />

        <input
          type="file"
          multiple
          onChange={(e) => setImageFiles([...e.target.files])}
          className="mb-4"
        />

        <button className="bg-blue-600 text-white px-6 py-2">

          {uploading ? "Uploading..." : editingId ? "Update Property" : "Add Property"}

        </button>

      </form>

      {properties.map(p => (

        <div key={p._id} className="border p-4 mb-4">

          <h2>{p.title}</h2>

          <button
            onClick={() => handleEdit(p)}
            className="mr-4 text-blue-600"
          >
            Edit
          </button>

          <button
            onClick={() => handleDelete(p._id)}
            className="text-red-600"
          >
            Delete
          </button>

        </div>

      ))}

    </div>

  );

}
/* ---------------- ROUTES ---------------- */

function App(){
  return(
    <Routes>

      <Route path="/" element={<PublicPage/>} />

      <Route path="/property/:id" element={<PropertyDetail/>} />

      <Route path="/admin" element={<AdminPage/>} />

      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  )
}

export default App;
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Phone, MessageCircle, Lock, ArrowLeft, X, Maximize2 } from 'lucide-react';

const BACKEND_URL = "https://jhonsonsrental.onrender.com";
const UNCLE_PHONE = '+919XXXXXXXXX';

function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fullscreenImg, setFullscreenImg] = useState(null);

  // Use actual images from API response, fallback to sample images if empty
  const getPropertyImages = (property) => {
    // Prioritize API images, fallback to samples if empty
    if (property.images && property.images.length > 0) {
      return property.images;
    }
    
    // Fallback sample images
    return [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&h=800&fit=crop", 
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1558603835-6f3ff4a0c5d5?w=1200&h=800&fit=crop"
    ];
  };

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/properties`)
      .then(res => res.json())
      .then(data => {
        const found = data.find(p => p._id === id);
        if (found) {
          // Use actual images from API or fallback
          const images = getPropertyImages(found);
          setProperty({ ...found, images });
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        navigate('/');
      });
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FAF9F6] to-[#F5F5F2] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#065F46]/20 border-t-[#065F46] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-[#6B7280] font-light">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FAF9F6] to-[#F5F5F2] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-8">🏠</div>
          <h1 className="text-3xl font-serif font-semibold text-[#1F2525] mb-4">Property Not Found</h1>
          <p className="text-lg text-[#6B7280] mb-8">The property you're looking for is no longer available.</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-[#065F46] to-[#047857] text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            View All Properties
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF9F6] to-[#F0F4F1] font-serif antialiased">
      {/* Fullscreen Image Overlay */}
      {fullscreenImg && (
        <div 
          className="fixed inset-0 bg-black/98 z-50 flex items-center justify-center p-8 lg:p-12"
          onClick={() => setFullscreenImg(null)}
        >
          <button 
            className="absolute top-8 right-8 lg:top-12 lg:right-12 text-white hover:text-gray-200 text-3xl backdrop-blur-sm rounded-full p-3 hover:bg-white/20 transition-all duration-300"
            onClick={(e) => {
              e.stopPropagation();
              setFullscreenImg(null);
            }}
          >
            <X size={36} />
          </button>
          <div className="max-w-6xl max-h-[95vh] flex items-center justify-center">
            <img 
              src={fullscreenImg} 
              alt="Property fullscreen" 
              className="max-h-full max-w-full object-contain shadow-2xl rounded-3xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-24">
        {/* Back Navigation */}
        <button 
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-3 mb-16 lg:mb-24 text-[#065F46] hover:text-[#054c38] font-semibold text-lg group transition-all duration-300 hover:underline underline-offset-4"
        >
          <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
          All Properties
        </button>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Premium Image Gallery */}
          <div className="space-y-6 lg:sticky lg:top-24">
            {/* Main Featured Image */}
            <div 
              className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl group cursor-pointer bg-gradient-to-br from-gray-50/70 to-transparent hover:shadow-3xl transition-all duration-500 hover:-translate-y-2"
              onClick={() => setFullscreenImg(property.images[0])}
            >
              <img 
                src={property.images[0]} 
                alt={property.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-2xl">
                  <Maximize2 size={20} className="inline mr-2" />
                  <span className="font-semibold text-[#1F2525]">View Fullscreen ({property.images.length} photos)</span>
                </div>
              </div>
            </div>

            {/* Thumbnail Gallery - Show actual API images */}
            <div className="grid grid-cols-3 gap-4 pt-2">
              {property.images.slice(1, 7).map((img, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-2xl overflow-hidden shadow-lg group cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-400 bg-gray-50 hover:bg-white hover:ring-2 hover:ring-[#065F46]/30"
                  onClick={() => setFullscreenImg(img)}
                >
                  <img 
                    src={img} 
                    alt={`Photo ${i + 2}`} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                  />
                </div>
              ))}
              {/* Show placeholder if no more images */}
              {property.images.length <= 1 && (
                Array(6).fill(0).map((_, i) => (
                  <div key={`placeholder-${i}`} className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl animate-pulse shadow-lg" />
                ))
              )}
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-8 lg:pt-4">
            {/* Hero Title & Status */}
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-[#1F2525] leading-tight mb-6 bg-gradient-to-r from-[#1F2525] to-[#065F46] bg-clip-text text-transparent">
                {property.title}
              </h1>
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#065F46]/10 to-[#047857]/10 px-6 py-3 rounded-2xl backdrop-blur-sm border border-[#065F46]/30">
                <div className={`px-4 py-2 rounded-xl font-semibold text-sm ${
                  property.furnished 
                    ? 'bg-[#065F46]/20 text-[#065F46]' 
                    : 'bg-gray-200/50 text-gray-700'
                }`}>
                  {property.furnished ? 'Fully Furnished' : 'Semi-Furnished'}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-xl max-w-none">
              <p className="text-2xl text-[#1F2525] leading-relaxed font-light bg-white/60 backdrop-blur-sm p-8 lg:p-12 rounded-3xl shadow-xl border border-white/50">
                {property.description}
              </p>
            </div>

            {/* Premium CTA Section */}
            <div className="bg-gradient-to-br from-white/70 via-white to-white/30 backdrop-blur-xl p-10 lg:p-14 rounded-3xl shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-500 hover:-translate-y-1">
              <h3 className="text-2xl font-serif font-bold text-[#1F2525] mb-8 text-center">Ready to Move In?</h3>
              
              <div className="flex flex-col lg:flex-row gap-6 justify-center">
                <a
                  href={`tel:${UNCLE_PHONE}`}
                  className="group flex-1 bg-gradient-to-r from-[#065F46] to-[#047857] text-white py-5 px-10 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-400 flex items-center justify-center gap-3 max-w-md mx-auto lg:mx-0"
                >
                  <Phone size={24} className="group-hover:scale-110 transition-transform" />
                  Call Johnson Directly
                </a>
                
                <a
                  href={`https://wa.me/${UNCLE_PHONE.replace('+91','')}?text=Hi%20Johnson,%20I'm%20interested%20in%20${encodeURIComponent(property.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex-1 border-4 border-[#065F46] text-[#065F46] py-5 px-10 rounded-2xl font-semibold text-lg hover:bg-[#065F46] hover:text-white transition-all duration-400 flex items-center justify-center gap-3 max-w-md mx-auto lg:mx-0"
                >
                  <MessageCircle size={24} className="group-hover:rotate-12 transition-transform" />
                  WhatsApp Inquiry
                </a>
              </div>

              {/* Privacy Notice */}
              <div className="mt-12 pt-10 border-t-2 border-dashed border-[#065F46]/30 flex items-center justify-center gap-3 text-lg text-[#6B7280] font-light bg-gradient-to-r from-gray-50/50 to-transparent p-6 rounded-2xl">
                <Lock size={24} />
                <span>Exact location, pricing, and availability shared personally upon inquiry</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetail;

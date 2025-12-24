
import React, { useState } from 'react';
import { MOCK_MEDICINES } from '../constants';
import { ShoppingCart, Search, Plus, Minus, Tag, Truck } from 'lucide-react';

type Order = {
  id: string;
  items: { id: string; qty: number; price: number; name: string }[];
  total: number;
  deliveryFee: number;
  address?: string;
  coords?: { lat: number; lng: number };
  paymentMethod: string;
  createdAt: string;
};

const Pharmacy: React.FC = () => {
  const [cart, setCart] = useState<{id: string, qty: number}[]>([]);
  const [search, setSearch] = useState('');

  const addToCart = (id: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === id);
      if (existing) return prev.map(item => item.id === id ? {...item, qty: item.qty + 1} : item);
      return [...prev, { id, qty: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((acc, item) => {
    const med = MOCK_MEDICINES.find(m => m.id === item.id);
    return acc + (med?.price || 0) * item.qty;
  }, 0);

  // Checkout modal state
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'gpay'>('cash');
  const [address, setAddress] = useState('');
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [deliveryFee, setDeliveryFee] = useState(0);

  const STORE_COORDS = { lat: 28.6139, lng: 77.2090 }; // example store (New Delhi)

  const toRad = (v: number) => (v * Math.PI) / 180;
  const haversineKm = (a: { lat: number; lng: number }, b: { lat: number; lng: number }) => {
    const R = 6371; // km
    const dLat = toRad(b.lat - a.lat);
    const dLon = toRad(b.lng - a.lng);
    const lat1 = toRad(a.lat);
    const lat2 = toRad(b.lat);

    const x = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
    return R * c;
  };

  const computeDeliveryFee = (userCoords: { lat: number; lng: number } | null) => {
    if (!userCoords) return 0;
    const km = haversineKm(STORE_COORDS, userCoords);
    // free within 5 km, else Rs50 + Rs5 per extra km
    if (km <= 5) return 0;
    return Math.round(50 + (km - 5) * 5);
  };

  const useMyLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation not supported in this browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition((pos) => {
      const c = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      setCoords(c);
      setDeliveryFee(computeDeliveryFee(c));
    }, (err) => {
      console.error(err);
      alert('Unable to fetch location.');
    });
  };

  const confirmPurchase = () => {
    if (cart.length === 0) return;
    const order: Order = {
      id: Math.random().toString(36).slice(2, 9),
      items: cart.map(ci => {
        const m = MOCK_MEDICINES.find(mm => mm.id === ci.id)!;
        return { id: ci.id, qty: ci.qty, price: m.price, name: m.name };
      }),
      total: parseFloat((cartTotal).toFixed(2)),
      deliveryFee,
      address,
      coords: coords || undefined,
      paymentMethod,
      createdAt: new Date().toISOString()
    };

    const existing = JSON.parse(localStorage.getItem('med_orders') || '[]');
    existing.push(order);
    localStorage.setItem('med_orders', JSON.stringify(existing));

    setCart([]);
    setShowCheckout(false);
    setAddress('');
    setCoords(null);
    setDeliveryFee(0);
    alert('Order placed! Order ID: ' + order.id);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">MedStore Pharmacy</h1>
          <p className="text-slate-500">Genuine medicines delivered within 24 hours.</p>
        </div>
        <div className="relative w-full md:w-96">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
           <input 
             type="text" 
             placeholder="Search medicines, salts, wellness..."
             className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-600 shadow-sm"
             value={search}
             onChange={(e) => setSearch(e.target.value)}
           />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Products Grid */}
        <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_MEDICINES.map((med) => (
            <div key={med.id} className="bg-white rounded-[40px] p-6 border border-slate-100 hover:shadow-xl transition-all group overflow-hidden relative">
              <div className="aspect-square rounded-3xl bg-slate-50 mb-6 flex items-center justify-center overflow-hidden">
                <img src={med.imageURL} alt={med.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="absolute top-4 right-4">
                 <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">In Stock</span>
              </div>
              <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-1">{med.category}</p>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{med.name}</h3>
              <p className="text-slate-500 text-sm mb-6 line-clamp-2">{med.description}</p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                 <p className="text-2xl font-black text-slate-900">Rs{med.price.toFixed(2)}</p>
                 <button 
                  onClick={() => addToCart(med.id)}
                  className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100 active:scale-90"
                 >
                   <Plus size={24} />
                 </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Sidebar */}
        <div className="lg:w-96">
          <div className="bg-slate-900 text-white rounded-[40px] p-8 sticky top-24 shadow-2xl">
            <div className="flex items-center gap-3 mb-8">
               <ShoppingCart className="text-blue-400" />
               <h3 className="text-xl font-bold">Your Cart</h3>
               <span className="ml-auto bg-blue-600 px-2 py-0.5 rounded text-[10px] font-bold">{cart.length} ITEMS</span>
            </div>

            <div className="space-y-6 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {cart.length > 0 ? cart.map(item => {
                const med = MOCK_MEDICINES.find(m => m.id === item.id);
                return (
                  <div key={item.id} className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div className="flex-grow">
                      <p className="font-bold text-sm">{med?.name}</p>
                      <p className="text-xs text-slate-400">Qty: {item.qty} &times; ${med?.price.toFixed(2)}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-500 hover:text-red-400 text-xs font-bold"
                    >
                      Remove
                    </button>
                  </div>
                );
              }) : (
                <div className="text-center py-8">
                  <p className="text-slate-500 italic text-sm">Cart is empty</p>
                </div>
              )}
            </div>

            <div className="space-y-4 pt-6 border-t border-slate-800">
               <div className="flex justify-between text-sm text-slate-400">
                 <span>Subtotal</span>
                 <span>Rs{cartTotal.toFixed(2)}</span>
               </div>
               <div className="flex justify-between text-sm text-slate-400">
                 <span>Delivery Fee</span>
                 <span>Free</span>
               </div>
               <div className="flex justify-between text-xl font-bold pt-4">
                 <span>Total</span>
                 <span className="text-blue-400">Rs{cartTotal.toFixed(2)}</span>
               </div>
               <button onClick={() => setShowCheckout(true)} className="w-full bg-blue-600 py-4 rounded-2xl font-bold mt-4 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50" disabled={cart.length === 0}>
                 Checkout Now <Truck size={18} />
               </button>
            </div>
            {/* Checkout Modal */}
            {showCheckout && (
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="absolute inset-0 modal-backdrop" onClick={() => setShowCheckout(false)} />
                <div className="bg-white rounded-2xl p-6 w-full max-w-lg z-10 shadow-2xl var-text" style={{ color: 'var(--modal-text)' }}>
                  <h3 className="text-xl font-bold mb-4">Checkout</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold mb-2">Delivery Address</label>
                      <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Street, City, ZIP" className="w-full border rounded-lg p-3" />
                      <div className="flex gap-2 mt-2">
                        <button type="button" onClick={useMyLocation} className="px-3 py-2 bg-slate-100 rounded">Use my location</button>
                        <div className="text-sm text-slate-500 self-center">{coords ? `Lat:${coords.lat.toFixed(4)} Lng:${coords.lng.toFixed(4)}` : ''}</div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold mb-2">Payment Method</label>
                      <div className="flex gap-3">
                        <label className="flex items-center gap-2"><input type="radio" name="pm" checked={paymentMethod==='cash'} onChange={() => setPaymentMethod('cash')} /> Cash</label>
                        <label className="flex items-center gap-2"><input type="radio" name="pm" checked={paymentMethod==='card'} onChange={() => setPaymentMethod('card')} /> Card</label>
                        <label className="flex items-center gap-2"><input type="radio" name="pm" checked={paymentMethod==='gpay'} onChange={() => setPaymentMethod('gpay')} /> Google Pay</label>
                      </div>
                      {paymentMethod === 'card' && (
                        <div className="mt-2 grid grid-cols-1 gap-2">
                          <input placeholder="Card number" className="w-full border rounded-lg p-2" />
                          <div className="flex gap-2">
                            <input placeholder="MM/YY" className="w-1/2 border rounded-lg p-2" />
                            <input placeholder="CVC" className="w-1/2 border rounded-lg p-2" />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="pt-2 border-t">
                      <div className="flex justify-between text-sm text-slate-600"><span>Subtotal</span><span>Rs{cartTotal.toFixed(2)}</span></div>
                      <div className="flex justify-between text-sm text-slate-600"><span>Delivery Fee</span><span>Rs{deliveryFee.toFixed(2)}</span></div>
                      <div className="flex justify-between text-lg font-bold mt-3"><span>Total</span><span>Rs{(cartTotal + deliveryFee).toFixed(2)}</span></div>
                    </div>

                    <div className="flex gap-3 mt-4">
                      <button onClick={() => setShowCheckout(false)} className="flex-1 py-3 rounded-lg border">Cancel</button>
                      <button onClick={confirmPurchase} className="flex-1 py-3 rounded-lg bg-blue-600 text-white">Pay & Confirm</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="mt-8 flex items-center justify-center gap-2 text-[10px] text-slate-500 uppercase tracking-widest font-bold">
               <Tag size={12} className="text-blue-400" /> Use Code MEDPRO10 for 10% Off
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pharmacy;

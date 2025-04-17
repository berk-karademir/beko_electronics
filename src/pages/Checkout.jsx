import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../store/cartSlice';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import { ShoppingCart, LoaderCircle } from 'lucide-react';

const Checkout = () => {
  const cart = useSelector(state => state.cart.items);
  const user = useSelector(state => state.user.user);
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [processing, setProcessing] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    setProcessing(true);
    setTimeout(() => {
      dispatch(clearCart());
      setProcessing(false);
      showToast('Siparişiniz başarıyla oluşturuldu!', 'success');
      navigate('/');
    }, 1500);
  };

  if (cart.length === 0) {
    return (
      <main className="container mx-auto py-8 px-4">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><ShoppingCart size={24} /> Sepetiniz Boş</h2>
        <p className="text-gray-600">Sepetinizde ürün yok. Alışverişe devam etmek için ana sayfaya dönebilirsiniz.</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto py-8 px-4 max-w-lg">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><ShoppingCart size={24} /> Siparişi Tamamla</h2>
      {!isAuthenticated && (
        <div className="mb-4 text-red-600">Sipariş verebilmek için giriş yapmalısınız.</div>
      )}
      <div className="mb-6 bg-gray-50 rounded p-4 border">
        <h3 className="font-semibold mb-2">Sepet Özeti</h3>
        <ul className="mb-2 divide-y">
          {cart.map(item => (
            <li key={item.id} className="py-2 flex justify-between">
              <span>{item.title} x {item.quantity}</span>
              <span className="text-blue-700 font-bold">{(item.price * item.quantity).toFixed(2)} ₺</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between font-bold text-lg mt-2">
          <span>Toplam:</span>
          <span>{total.toFixed(2)} ₺</span>
        </div>
      </div>
      <button
        onClick={handleCheckout}
        disabled={!isAuthenticated || processing}
        className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800 transition w-full disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {processing ? (<><LoaderCircle className="animate-spin" size={18} /> Sipariş Oluşturuluyor...</>) : 'Siparişi Tamamla'}
      </button>
    </main>
  );
};

export default Checkout;

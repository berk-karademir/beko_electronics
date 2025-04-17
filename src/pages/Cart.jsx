import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, clearCart, decreaseQuantity, addToCart } from '../store/cartSlice';
import { useToast } from '../context/ToastContext';

const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector(state => state.cart.items);
  const { showToast } = useToast();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleClearCart = () => {
    dispatch(clearCart());
    showToast('Sepetiniz temizlendi!', 'success');
  };

  const handleRemoveFromCart = (id) => {
    if (items.length === 1) {
      dispatch(removeFromCart(id));
      showToast('Sepetiniz temizlendi!', 'success');
    } else {
      dispatch(removeFromCart(id));
    }
  };

  if (items.length === 0) {
    return (
      <main className="container mx-auto py-8 px-4">
        <h2 className="text-2xl font-bold mb-4">Sepetim</h2>
        <p>Sepetinizde ürün yok.</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-4">Sepetim</h2>
      <button onClick={handleClearCart} className="mb-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">Sepeti Temizle</button>
      <div className="flex flex-col gap-4">
        {items.map(item => (
          <div key={item.id} className="flex items-center gap-4 border-b pb-4">
            <img src={item.thumbnail} alt={item.title} className="w-20 h-20 object-cover rounded" />
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-gray-600">{item.brand}</p>
              <div className="flex items-center gap-2 mt-2">
                <button onClick={() => dispatch(decreaseQuantity(item.id))} className="px-2 py-1 bg-gray-200 rounded">-</button>
                <span>{item.quantity}</span>
                <button onClick={() => dispatch(addToCart(item))} className="px-2 py-1 bg-gray-200 rounded">+</button>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-blue-700">{item.price * item.quantity}</p>
              <button onClick={() => handleRemoveFromCart(item.id)} className="mt-2 text-red-600 hover:underline">Kaldır</button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-right">
        <span className="text-xl font-bold">Toplam: {total}</span>
      </div>
    </main>
  );
};

export default Cart;

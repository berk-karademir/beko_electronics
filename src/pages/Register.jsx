import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import useForm from '../hooks/useForm';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.user);
  const { showToast } = useToast();
  const [form, handleChange, resetForm] = useForm({ username: '', password: '', email: '' });

  const handleSubmit = async e => {
    e.preventDefault();
    const result = await dispatch(registerUser(form));
    if (registerUser.fulfilled.match(result)) {
      showToast('Kayıt başarılı! Giriş yapabilirsiniz.', 'success');
      navigate('/login');
      resetForm();
    } else {
      showToast(result.payload || 'Kayıt başarısız', 'error');
    }
  };

  return (
    <main className="container mx-auto py-8 px-4 max-w-md">
      <h2 className="text-2xl font-bold mb-4">Kayıt Ol</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input name="username" value={form.username} onChange={handleChange} required placeholder="Kullanıcı Adı" className="border px-3 py-2 rounded" />
        <input name="email" value={form.email} onChange={handleChange} required placeholder="E-posta" className="border px-3 py-2 rounded" />
        <input name="password" value={form.password} onChange={handleChange} type="password" required placeholder="Şifre" className="border px-3 py-2 rounded" />
        <button type="submit" disabled={loading} className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition">
          {loading ? 'Kayıt Olunuyor...' : 'Kayıt Ol'}
        </button>
        {error && <div className="text-red-600 text-sm">{error}</div>}
      </form>
    </main>
  );
};

export default Register;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import useForm from '../hooks/useForm';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(state => state.user);
  const { showToast } = useToast();
  const [form, handleChange, resetForm] = useForm({ username: '', password: '' });

  const handleSubmit = async e => {
    e.preventDefault();
    const result = await dispatch(loginUser(form));
    if (loginUser.fulfilled.match(result)) {
      showToast('Giriş başarılı!', 'success');
      navigate('/');
      resetForm();
    } else {
      showToast(result.payload || 'Giriş başarısız', 'error');
    }
  };

  return (
    <main className="container mx-auto py-8 px-4 max-w-md">
      <h2 className="text-2xl font-bold mb-4">Giriş Yap</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input name="username" value={form.username} onChange={handleChange} required placeholder="Kullanıcı Adı" className="border px-3 py-2 rounded" />
        <input name="password" value={form.password} onChange={handleChange} type="password" required placeholder="Şifre" className="border px-3 py-2 rounded" />
        <button type="submit" disabled={loading} className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition">
          {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
        </button>
        {error && <div className="text-red-600 text-sm">{error}</div>}
      </form>
    </main>
  );
};

export default Login;

import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await fetch('https://workintech-fe-ecommerce.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          password: data.password
        })
      });
      const result = await res.json();
      if (res.ok && result.token) {
        // Beni hatırla seçiliyse localStorage, değilse sessionStorage
        if (data.remember) {
          localStorage.setItem('token', result.token);
        } else {
          sessionStorage.setItem('token', result.token);
        }
        setTimeout(() => navigate('/'), 1500);
      } else {
      }
    } catch (err) {
    }
  };

  return (
    <main className="container mx-auto py-8 px-4 max-w-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input type="email" {...register('email', { required: 'Email is required.' })} placeholder="Email" className="border px-3 py-2 rounded" />
        {errors.email && <span className="text-red-600 text-sm">{errors.email.message}</span>}
        <input type="password" {...register('password', { required: 'Password is required.' })} placeholder="Password" className="border px-3 py-2 rounded" />
        {errors.password && <span className="text-red-600 text-sm">{errors.password.message}</span>}
        <label className="flex items-center gap-2">
          <input type="checkbox" {...register('remember')} />
          <span>Remember Me</span>
        </label>
        <button type="submit" disabled={isSubmitting} className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition">
          {isSubmitting ? 'Logging In...' : 'Login'}
        </button>
      </form>
    </main>
  );
};

export default Login;

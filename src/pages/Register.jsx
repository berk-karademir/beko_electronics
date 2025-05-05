import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    if (data.password !== data.password2) {
      return;
    }
    try {
      const res = await fetch('https://workintech-fe-ecommerce.onrender.com/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.fullname,
          email: data.email,
          password: data.password,
          role_id: 2
        })
      });
      const result = await res.json();
      if (res.ok && result.message) {
        setTimeout(() => navigate('/registration-successfull'), 2000);
      } else {
      }
    } catch (err) {
    }
  };

  return (
    <main className="container mx-auto py-8 px-4 max-w-md">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input {...register('fullname', { required: 'Full name is required.' })} placeholder="Full Name" className="border px-3 py-2 rounded" />
        {errors.fullname && <span className="text-red-600 text-sm">{errors.fullname.message}</span>}
        <input {...register('email', { required: 'Email is required.', pattern: { value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: 'Please enter a valid email.' } })} placeholder="Email" className="border px-3 py-2 rounded" />
        {errors.email && <span className="text-red-600 text-sm">{errors.email.message}</span>}
        <input type="password" {...register('password', { required: 'Password is required.', minLength: { value: 6, message: 'Password must be at least 6 characters.' } })} placeholder="Password" className="border px-3 py-2 rounded" />
        {errors.password && <span className="text-red-600 text-sm">{errors.password.message}</span>}
        <input type="password" {...register('password2', { required: 'Password confirmation is required.' })} placeholder="Confirm Password" className="border px-3 py-2 rounded" />
        {errors.password2 && <span className="text-red-600 text-sm">{errors.password2.message}</span>}
        <button type="submit" disabled={isSubmitting} className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition">
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>
      </form>
    </main>
  );
};

export default Register;
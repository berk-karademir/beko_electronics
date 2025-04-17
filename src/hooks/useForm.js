import { useState } from 'react';

export default function useForm(initialValues) {
  const [form, setForm] = useState(initialValues);
  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const resetForm = () => setForm(initialValues);
  return [form, handleChange, resetForm, setForm];
}

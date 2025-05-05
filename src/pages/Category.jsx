import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoryProductsThunk } from '../store/productSlice';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import ImageSlider from '../components/ImageSlider';

const Category = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchCategoryProductsThunk(slug));
  }, [dispatch, slug]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <main className="container mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-4">Category: {slug}</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map(product => (
          <Link key={product.id} to={`/product/${product.id}`} className="text-black">
            <div className="border border-gray-100 rounded-lg p-4 bg-gray-50 shadow hover:shadow-lg transition">
              <ImageSlider images={product.images} imgClassName="max-h-96 object-contain" />
              <h3 className="font-semibold text-lg mt-5">{product.title}</h3>
              <p className="text-gray-600 mb-2">{product.brand}</p>
              <p className="font-bold text-blue-700 mb-2">${product.price}</p>
              <p className="text-blue-600 hover:underline">Details</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default Category;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetailThunk } from '../store/productSlice';
import { addToCart } from '../store/cartSlice';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import ImageSlider from '../components/ImageSlider';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { productDetail: product, loading, error } = useSelector(state => state.products);
  const user = useSelector(state => state.user.user);
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const [reviews, setReviews] = useState([]);
  const [reviewInput, setReviewInput] = useState('');
  const [reviewRating, setReviewRating] = useState(5);

  useEffect(() => {
    dispatch(fetchProductDetailThunk(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (product && product.reviews) {
      setReviews(product.reviews);
    }
  }, [product]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewInput.trim()) return;
    const newReview = {
      reviewerName: user?.username || 'Anonim',
      comment: reviewInput,
      rating: reviewRating,
      date: new Date().toISOString(),
    };
    setReviews([newReview, ...reviews]);
    setReviewInput('');
    setReviewRating(5);
  };

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <main className="container mx-auto py-8 px-4">
      {product && (
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 flex flex-col items-center">
            <ImageSlider images={product.images} imgClassName="w-full h-full" />
            <h2 className="text-2xl font-bold mt-3">{product.title}</h2>
            <div className="text-blue-700 font-bold text-xl mb-2">${product.price}</div>
            <button
              className="bg-blue-700 text-white px-4 py-2 rounded mb-4 hover:bg-blue-800 transition"
              onClick={handleAddToCart}
            >
              Sepete Ekle
            </button>
            
            <div className="text-gray-700 mb-4">{product.description}</div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">Değerlendirmeler ({reviews.length}) ⭐ {product.rating} </h3>
            {reviews.length === 0 && <div className="text-gray-500 mb-4">Henüz yorum yok.</div>}
            <ul className="mb-6 space-y-4">
              {reviews.map((rev, i) => (
                <li key={i} className="border rounded p-3 bg-gray-100">
                  <div className="font-semibold text-sm mb-1">{rev.reviewerName} <span className="text-yellow-500">{'★'.repeat(rev.rating)}</span></div>
                  <div className="text-gray-700 text-sm mb-1">{rev.comment}</div>
                  <div className="text-xs text-gray-400">{new Date(rev.date).toLocaleString()}</div>
                </li>
              ))}
            </ul>
            {isAuthenticated && (
              <form onSubmit={handleReviewSubmit} className="mb-4">
                <label className="block mb-1 font-medium">Yorumunuz</label>
                <textarea
                  className="border rounded w-full p-2 mb-2"
                  value={reviewInput}
                  onChange={e => setReviewInput(e.target.value)}
                  rows={3}
                />
                <label className="block mb-1 font-medium">Puanınız</label>
                <select
                  className="border rounded w-full p-2 mb-2"
                  value={reviewRating}
                  onChange={e => setReviewRating(Number(e.target.value))}
                >
                  {[5,4,3,2,1].map(val => (
                    <option key={val} value={val}>{val}</option>
                  ))}
                </select>
                <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded">Yorumu Gönder</button>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default ProductDetail;

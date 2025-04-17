import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Star, MessageCircle } from 'lucide-react';
import { fetchAllElectronics } from '../store/productSlice';
import { ELECTRONICS_CATEGORIES } from '../constants/electronicsCategories';
import { SORT_OPTIONS } from '../constants/sortOptions';
import usePagination from '../hooks/usePagination';
import useSort from '../hooks/useSort';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import ImageSlider from '../components/ImageSlider';
import ProductCarousel from '../components/TopDiscountedProductsCarousel';
import TopDiscountedProductsCarousel from '../components/TopDiscountedProductsCarousel';
import TopRatedProductsCarousel from '../components/TopRatedProductsCarousel';

const PRODUCTS_PER_PAGE = 12;

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(state => state.products);
  const [sort, setSort] = React.useState('rating-desc');

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchAllElectronics(ELECTRONICS_CATEGORIES));
    }
  }, [dispatch, products.length]);

  // En yüksek indirimli 10 ürünü bul
  const topDiscounted = React.useMemo(() => {
    return [...products]
      .sort((a, b) => b.discountPercentage - a.discountPercentage)
      .slice(0, 10);
  }, [products]);

  // En yüksek ratingli 10 smartphones ve laptops ürününü bul
  const topRatedSmartLaptops = React.useMemo(() => {
    return [...products]
      .filter(p => p.category === 'smartphones' || p.category === 'laptops')
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 10);
  }, [products]);

  const sortedProducts = useSort(products, sort);
  const {
    paginated: paginatedProducts,
    currentPage,
    setCurrentPage,
    totalPages
  } = usePagination(sortedProducts, PRODUCTS_PER_PAGE);
  const currentHeading = SORT_OPTIONS.find(opt => opt.value === sort)?.heading || 'Ürünler';

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <main className="container mx-auto py-8 px-4">
      {/* Carousel alanı */}
      <div className="flex ">
        <TopDiscountedProductsCarousel products={topDiscounted} />
        <TopRatedProductsCarousel products={topRatedSmartLaptops} />
      </div>
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">{currentHeading}</h2>
          <div>
            <select
              value={sort}
              onChange={e => { setSort(e.target.value); setCurrentPage(1); }}
              className="border px-2 py-1 rounded text-sm focus:outline-none focus:ring"
            >
              {SORT_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {paginatedProducts.map(product => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="border rounded-lg p-4 hover:shadow-lg transition flex flex-col items-center"
            >
              <ImageSlider images={product.images} />
              <div className="font-semibold mb-1 text-center mt-5">{product.title}</div>
              <div className="text-blue-700 font-bold mb-1">${product.price}</div>
              <div className="text-sm text-gray-500 text-center line-clamp-2">{product.description}</div>
              <div className="flex gap-2 mt-2 text-xs text-gray-500 items-center">
                <span className="flex items-center gap-1"><Star size={14} className="text-yellow-500" /> {product.rating}</span>
                <span className="flex items-center gap-1"><MessageCircle size={14} /> {product.reviews?.length || 0} yorum</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex justify-center mt-8 gap-2">
          <button onClick={() => setCurrentPage(currentPage-1)} disabled={currentPage===1} className="px-3 py-1 rounded border bg-white disabled:opacity-50">&lt;</button>
          {[...Array(totalPages).keys()].map(n => (
            <button
              key={n+1}
              onClick={() => setCurrentPage(n+1)}
              className={`px-3 py-1 rounded border ${currentPage===n+1 ? 'bg-blue-700 text-white' : 'bg-white'}`}
            >
              {n+1}
            </button>
          ))}
          <button onClick={() => setCurrentPage(currentPage+1)} disabled={currentPage===totalPages} className="px-3 py-1 rounded border bg-white disabled:opacity-50">&gt;</button>
        </div>
      </section>
    </main>
  );
};

export default Home;

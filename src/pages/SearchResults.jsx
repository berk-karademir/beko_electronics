import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

// Sadece elektronik kategoriler
const ELECTRONICS_CATEGORIES = [
  'laptops',
  'smartphones',
  'tablets',
  'mens-watches',
  'womens-watches',
  'mobile-accessories',
];

// Gelişmiş arama fonksiyonu
function matchesSearch(product, searchTerm) {
  if (!searchTerm) return true;
  const q = searchTerm.toLowerCase();
  return [
    product.title,
    product.description,
    product.category,
    product.brand,
    Array.isArray(product.tags) ? product.tags.join(' ') : '',
  ]
    .filter(Boolean)
    .some(field => field.toLowerCase().includes(q));
}

const SearchResults = () => {
  const query = useQuery();
  const searchTerm = query.get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchTerm) return;
    setLoading(true);
    setError(null);
    axios.get(`https://dummyjson.com/products/search?q=${encodeURIComponent(searchTerm)}`)
      .then(res => {
        // Sadece elektronik kategorilerdeki ürünleri filtrele
        const filtered = (res.data.products || []).filter(product =>
          ELECTRONICS_CATEGORIES.includes(product.category)
        );
        // Kullanıcının aradığı kelime title, description, category, tags, brand'de geçiyorsa göster
        const advancedFiltered = filtered.filter(product => matchesSearch(product, searchTerm));
        setResults(advancedFiltered);
      })
      .catch(() => setError('Arama sırasında bir hata oluştu.'))
      .finally(() => setLoading(false));
  }, [searchTerm]);

  return (
    <main className="container mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-4">Arama Sonuçları: <span className="text-blue-700">{searchTerm}</span></h2>
      {loading && <p>Yükleniyor...</p>}
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {!loading && !error && results.length === 0 && (
        <div className="text-gray-600">Sonuç bulunamadı.</div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {results.map(product => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="border rounded-lg p-4 hover:shadow-lg transition flex flex-col items-center"
          >
            <img src={product.thumbnail} alt={product.title} className="w-32 h-32 object-contain mb-2" />
            <div className="font-semibold mb-1 text-center">{product.title}</div>
            <div className="text-blue-700 font-bold mb-1">{product.price} ₺</div>
            <div className="text-sm text-gray-500 text-center line-clamp-2">{product.description}</div>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default SearchResults;

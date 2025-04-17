import axios from "axios";

// Elektronik kategoriler için ürünleri toplayan fonksiyon
export const fetchAllElectronicsProducts = async (categories) => {
  try {
    const responses = await Promise.all(
      categories.map(cat => axios.get(`https://dummyjson.com/products/category/${cat.slug}`))
    );
    // Tüm ürünleri birleştir
    return responses.flatMap(res => res.data.products);
  } catch (err) {
    console.error('API HATASI:', err);
    throw err;
  }
};

// Tekil ürün detayı
export const fetchProductDetail = async (id) => {
  const res = await axios.get(`https://dummyjson.com/products/${id}`);
  return res.data;
};

// Kategoriye özel ürünler
export const fetchCategoryProducts = async (category) => {
  const res = await axios.get(`https://dummyjson.com/products/category/${category}`);
  return res.data.products;
};

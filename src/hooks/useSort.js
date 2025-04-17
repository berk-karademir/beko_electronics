export default function useSort(products, sort) {
  const arr = [...products];
  switch (sort) {
    case 'rating-desc':
      return arr.sort((a, b) => b.rating - a.rating);
    case 'rating-asc':
      return arr.sort((a, b) => a.rating - b.rating);
    case 'reviews-desc':
      return arr.sort((a, b) => (b.reviews?.length || 0) - (a.reviews?.length || 0));
    case 'reviews-asc':
      return arr.sort((a, b) => (a.reviews?.length || 0) - (b.reviews?.length || 0));
    case 'price-desc':
      return arr.sort((a, b) => b.price - a.price);
    case 'price-asc':
      return arr.sort((a, b) => a.price - b.price);
    default:
      return arr;
  }
}

import { useState } from 'react';

export default function usePagination(data, itemsPerPage) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginated = data.slice((currentPage-1)*itemsPerPage, currentPage*itemsPerPage);
  const gotoPage = (page) => {
    if(page >= 1 && page <= totalPages) setCurrentPage(page);
  };
  return { paginated, currentPage, setCurrentPage: gotoPage, totalPages };
}

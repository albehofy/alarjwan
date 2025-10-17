export default function Pagination({ currentPage, pagination, handlePageChange }) {
  if (!pagination) return null;
  const totalPages = Math.ceil(pagination.totalCount / pagination.pageSize);
  const maxVisiblePages = 3;

  let startPage = 1;
  let endPage = Math.min(totalPages, maxVisiblePages);

  if (currentPage > Math.floor(maxVisiblePages / 2)) {
    startPage = currentPage - Math.floor(maxVisiblePages / 2);
    endPage = Math.min(totalPages, currentPage + Math.floor(maxVisiblePages / 2));
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(
      <button
        key={i}
        className={`border-1 px-2 py-1 rounded ${currentPage === i ? 'bg-[#637359] text-white' : 'border-[#637359] text-[#637359]'}`}
        onClick={() => handlePageChange(i)}
      >
        {i}
      </button>
    );
  }

  return (
    <div className="flex space-x-2 mt-2 justify-center">
      <button
        className="border py-1 px-2 mx-2 rounded border-[#637359] text-[#637359]"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        السابق
      </button>
      {pages}
      <button
        className="border py-1 px-2 rounded border-[#637359] text-[#637359]"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        التالي
      </button>
    </div>
  );
}

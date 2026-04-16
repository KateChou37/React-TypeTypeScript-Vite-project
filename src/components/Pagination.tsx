interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    <nav className="pagination" aria-label="商品分頁">
      <button
        className={`pagination__button${currentPage === 1 ? ' pagination__button--disabled' : ''}`}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        type="button"
      >
        上一頁
      </button>

      <div className="pagination__list">
        {pages.map((page) => (
          <button
            aria-current={currentPage === page ? 'page' : undefined}
            className={`pagination__button${currentPage === page ? ' pagination__button--active' : ''}`}
            key={page}
            onClick={() => onPageChange(page)}
            type="button"
          >
            {page}
          </button>
        ))}
      </div>

      <button
        className={`pagination__button${currentPage === totalPages ? ' pagination__button--disabled' : ''}`}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        type="button"
      >
        下一頁
      </button>
    </nav>
  )
}

'use client'

import { useState } from 'react'

interface PaginationProps {
  total: number
  pageSize: number
  onPageChange?: (page: number) => void
}

export default function Pagination({ total, pageSize, onPageChange }: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(1) // Initialize currentPage to 1 instead of 0
  const totalPages = Math.ceil(total / pageSize)

  const goTo = (page: number) => {
    setCurrentPage(page)
    onPageChange?.(page)
  }

  return (
    <div className="pagination">
      <span>
        Showing {Math.min((currentPage - 1) * pageSize + 1, total)}–
        {Math.min(currentPage * pageSize, total)} of {total}
      </span>
      <div className="pagination-controls">
        <button
          className="page-btn"
          onClick={() => goTo(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          ← Prev
        </button>
        <span style={{ padding: '6px 10px', fontSize: '0.8125rem' }}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="page-btn"
          onClick={() => goTo(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          Next →
        </button>
      </div>
    </div>
  )
}
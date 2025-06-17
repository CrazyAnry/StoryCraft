'use client'

import { getAllStories, getStoriesByLimit } from "@/shared/api/stories/queries";
import { useCallback, useEffect, useState } from "react";
import s from './PaginationButton.module.scss'
import { useStories } from "@/shared/lib/hooks/useStories";
import { useSortedStoriesStore } from "@/shared/stores/sortedStories";


export default function Pagination() {
  const [totalPages, setTotalPages] = useState(0)
  const { fetchStoriesByLimit } = useStories()
  const { setSortedStories, setCurrentPage, limit, currentPage } = useSortedStoriesStore();
  const numbers = []

  const handlePageChange = useCallback(async (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;

    setCurrentPage(newPage);
    setSortedStories(await fetchStoriesByLimit(newPage, limit));
  }, [fetchStoriesByLimit, limit, totalPages]);

  useEffect(() => {
    const getStories = async () => {
      const res = await getAllStories()
      setTotalPages(Math.ceil(res.length / limit))
    }

    getStories()
  }, [])

  for (let i = 2; i <= totalPages; i++) {
    numbers.push(i)
  }

  return (
    <div className={s.paginationContainer}>
      <div
        className={`${s.pageItem} ${s.navButton} ${currentPage === 1 ? s.disabled : ''}`}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        {"<"}
      </div>

      <div
        className={currentPage === 1 ? s.activePageItem : s.pageItem}
        onClick={() => handlePageChange(1)}
      >
        {1}
      </div>

      {currentPage > 4 && totalPages > 7 && (
        <div className={`${s.pageItem} ${s.ellipsis}`}>...</div>
      )}

      {numbers.map(number => {
        if (
          number < totalPages &&
          number >= currentPage - 2 &&
          number <= currentPage + 3 &&
          totalPages > 7
        ) {
          return (
            <div
              className={currentPage === number ? s.activePageItem : s.pageItem}
              onClick={() => handlePageChange(number)}
              key={number}
            >
              {number}
            </div>
          );
        }
        if (
          number <= currentPage + 6 &&
          totalPages <= 7 &&
          number < totalPages
        ) {
          return (
            <div
              className={currentPage === number ? s.activePageItem : s.pageItem}
              onClick={() => handlePageChange(number)}
              key={number}
            >
              {number}
            </div>
          );
        }
      })}

      {currentPage < totalPages - 4 && totalPages > 7 && (
        <div className={`${s.pageItem} ${s.ellipsis}`}>...</div>
      )}

      {totalPages > 1 && (
        <div
          className={currentPage === totalPages ? s.activePageItem : s.pageItem}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </div>
      )}


      <div
        className={s.pageItem}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        {">"}
      </div>
    </div>
  );
}
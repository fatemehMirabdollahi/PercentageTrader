import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const maxVisiblePages = 3;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const half = Math.floor(maxVisiblePages / 2);

    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start < maxVisiblePages - 1) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    if (start > 1) pages.push(1);
    if (start > 2) pages.push("...");

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) pages.push("...");
    if (end < totalPages) pages.push(totalPages);

    return pages;
  };

  return (
    <div className="flex justify-center mt-4 space-x-2">
      <button
        className={`p-2 rounded disabled:opacity-50 ${
          currentPage !== 1 ? "cursor-pointer" : ""
        }`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronRightIcon className="size-6" />
      </button>

      {getPageNumbers().map((page, index) =>
        typeof page === "number" ? (
          <button
            key={index}
            className={`px-3 py-1 rounded ${
              currentPage === page
                ? "bg-primary text-on-primary"
                : "cursor-pointer"
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="px-2 py-1">
            {page}
          </span>
        )
      )}

      <button
        className={`p-2 rounded disabled:opacity-50 ${
          currentPage !== totalPages ? "cursor-pointer" : ""
        }`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronLeftIcon className="size-6" />
      </button>
    </div>
  );
};

export default PaginationControls;

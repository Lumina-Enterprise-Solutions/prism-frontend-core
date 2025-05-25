import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../ui/pagination';

interface CustomPaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange?: (page: number) => void;
}

export const CustomPagination: React.FC<CustomPaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const handleClick = (page: number) => {
    onPageChange?.(page);
  };

  const renderPageLinks = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              isActive={i === currentPage}
              onClick={(e) => {
                e.preventDefault();
                handleClick(i);
              }}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      } else if (
        (i === currentPage - 2 && currentPage > 3) ||
        (i === currentPage + 2 && currentPage < totalPages - 2)
      ) {
        pages.push(
          <PaginationItem key={`ellipsis-${i}`}>
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }

    return pages;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) handleClick(currentPage - 1);
            }}
          />
        </PaginationItem>
        {renderPageLinks()}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) handleClick(currentPage + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

import { useState } from 'react';

interface PaginationProps {
    totalRows: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalRows, itemsPerPage, currentPage, onPageChange }) => {
    const [page, setPage] = useState(currentPage);
    const totalPages = Math.ceil(totalRows / itemsPerPage);

    const handlePreviousPage = () => {
        if (page > 1) {
            onPageChange(page - 1);
            setPage(page - 1);
        }
    };

    const handleNextPage = () => {
        if (page < totalPages) {
            onPageChange(page + 1);
            setPage(page + 1);
        }
    };

    const handlePageClick = (pageNumber: number) => {
        onPageChange(pageNumber);
        setPage(pageNumber);
    };

    const generatePageNumbers = () => {
        const pageNumbers = [];
        const maxVisibleButtons = 5;

        if (totalPages <= maxVisibleButtons) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            const leftBoundary = Math.max(1, page - 2);
            const rightBoundary = Math.min(totalPages, page + 2);

            for (let i = leftBoundary; i <= rightBoundary; i++) {
                pageNumbers.push(i);
            }

            if (leftBoundary > 1) pageNumbers.unshift(1, '...');
            if (rightBoundary < totalPages) pageNumbers.push('...', totalPages);
        }
        return pageNumbers;
    };

    return (
        <div className="flex justify-end">
            <nav>
                <ul className="inline-flex -space-x-px text-sm">
                    <li>
                        <a
                            onClick={handlePreviousPage}
                            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-600 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 text-xs cursor-pointer"
                        >
                            Previous
                        </a>
                    </li>
                    {generatePageNumbers().map((pageNum, index) => (
                        <li key={index}>
                            <a
                                role="link"
                                onClick={() => typeof pageNum === 'number' && handlePageClick(pageNum)}
                                className={`flex items-center justify-center px-3 h-8 leading-tight ${pageNum === page ? 'bg-blue-500 text-white' : 'text-gray-600 bg-white'} border border-gray-300 hover:bg-gray-100 hover:text-gray-700 text-xs cursor-pointer`}
                            >
                                {pageNum}
                            </a>
                        </li>
                    ))}
                    <li>
                        <a
                            onClick={handleNextPage}
                            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-600 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 text-xs cursor-pointer"
                        >
                            Next
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}


export default Pagination;


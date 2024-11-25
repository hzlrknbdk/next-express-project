import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from '../../../../src/app/[locale]/components/common/Pagination';

describe("Pagination component", () => {
    const mockOnPageChange = jest.fn();

    const defaultProps = {
        totalRows: 100,
        itemsPerPage: 10,
        currentPage: 1,
        onPageChange: mockOnPageChange,
    };

    beforeEach(() => {
        mockOnPageChange.mockClear();
    });

    it("renders page numbers correctly", () => {
        render(<Pagination {...defaultProps} />);

        const pageNumbers = screen.getAllByRole("link");
        expect(pageNumbers.length).toBeGreaterThanOrEqual(4);
        expect(pageNumbers[0].textContent).toBe("1");
        expect(pageNumbers[pageNumbers.length - 1].textContent).toBe("10");
    });

    it("calls onPageChange when clicking a page number", () => {
        render(<Pagination {...defaultProps} />);

        const page3 = screen.getByText("3");
        fireEvent.click(page3);

        expect(mockOnPageChange).toHaveBeenCalledWith(3);
    });

    it("changes page when clicking previous button", () => {
        render(<Pagination {...defaultProps} currentPage={2} />);

        const previousButton = screen.getByText("Previous");
        fireEvent.click(previousButton);

        expect(mockOnPageChange).toHaveBeenCalledWith(1);
    });

    it("changes page when clicking next button", () => {
        render(<Pagination {...defaultProps} currentPage={1} />);

        const nextButton = screen.getByText("Next");
        fireEvent.click(nextButton);

        expect(mockOnPageChange).toHaveBeenCalledWith(2);
    });

    it("does not call onPageChange when clicking previous button on the first page", () => {
        render(<Pagination {...defaultProps} currentPage={1} />);

        const previousButton = screen.getByText("Previous");
        fireEvent.click(previousButton);

        expect(mockOnPageChange).not.toHaveBeenCalled();
    });

    it("does not call onPageChange when clicking next button on the last page", () => {
        render(<Pagination {...defaultProps} currentPage={10} />);

        const nextButton = screen.getByText("Next");
        fireEvent.click(nextButton);

        expect(mockOnPageChange).not.toHaveBeenCalled();
    });

    it("shows ellipsis when there are more than 5 pages", () => {
        render(<Pagination {...defaultProps} totalRows={100} itemsPerPage={10} currentPage={6} />);
        const ellipsis = screen.getAllByText("...");
        expect(ellipsis.length).toBeGreaterThan(0);
        const lastPage = screen.getByText("10");
        expect(lastPage).toBeInTheDocument();
    });
});

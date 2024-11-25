import { render, screen, fireEvent } from "@testing-library/react";
import ColumnFilter from '../../../../src/app/[locale]/components/common/ColumnFilter';

const mockOnFilterChange = jest.fn();

describe("ColumnFilter", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders a text filter input", () => {
        const columnDef = {
            header: "Name",
            filterType: "text",
            accessorKey: "name",
        };

        render(<ColumnFilter columnDef={columnDef} onFilterChange={mockOnFilterChange} />);

        const input = screen.getByPlaceholderText("Filter by Name");
        expect(input).toBeInTheDocument();

        fireEvent.change(input, { target: { value: "Hazal" } });

        expect(mockOnFilterChange).toHaveBeenCalledWith("name", "Hazal");
    });

    it("renders a number filter input", () => {
        const columnDef = {
            header: "Age",
            filterType: "number",
            accessorKey: "age",
        };

        render(<ColumnFilter columnDef={columnDef} onFilterChange={mockOnFilterChange} />);

        const input = screen.getByPlaceholderText("Filter by Age");
        expect(input).toBeInTheDocument();

        fireEvent.change(input, { target: { value: "30" } });

        expect(mockOnFilterChange).toHaveBeenCalledWith("age", "30");
    });

    it("renders a select filter with options", () => {
        const columnDef = {
            header: "Status",
            filterType: "select",
            accessorKey: "status",
            filterOptions: ["Active", "Inactive"],
        };

        render(<ColumnFilter columnDef={columnDef} onFilterChange={mockOnFilterChange} />);

        const select = screen.getByRole("combobox");
        expect(select).toBeInTheDocument();

        const options = screen.getAllByRole("option");
        expect(options).toHaveLength(3);
        expect(options[1].textContent).toBe("Active");
        expect(options[2].textContent).toBe("Inactive");

        fireEvent.change(select, { target: { value: "Active" } });

        expect(mockOnFilterChange).toHaveBeenCalledWith("status", "Active");
    });

    it("renders a date filter input", () => {
        const columnDef = {
            header: "Date",
            filterType: "date",
            accessorKey: "date",
        };

        render(<ColumnFilter columnDef={columnDef} onFilterChange={mockOnFilterChange} />);

        const input = screen.getByRole("textbox");
        expect(input).toBeInTheDocument();

        fireEvent.change(input, { target: { value: "2024-12-31" } });

        expect(mockOnFilterChange).toHaveBeenCalledWith("date", "2024-12-31");
    });

    it("calls onFilterChange with null when the input is cleared", () => {
        const columnDef = {
            header: "Name",
            filterType: "text",
            accessorKey: "name",
        };

        render(<ColumnFilter columnDef={columnDef} onFilterChange={mockOnFilterChange} />);

        const input = screen.getByPlaceholderText("Filter by Name");

        fireEvent.change(input, { target: { value: "Hazal" } });
        expect(mockOnFilterChange).toHaveBeenCalledWith("name", "Hazal");

        fireEvent.change(input, { target: { value: "" } });
        expect(mockOnFilterChange).toHaveBeenCalledWith("name", null);
    });
});

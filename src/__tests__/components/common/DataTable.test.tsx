import React from "react";
import { render, screen, fireEvent, within, waitFor } from "@testing-library/react";
import DataTable from "../../../../src/app/[locale]/components/common/DataTable";
import { ColumnProps } from "@/types/interfaces/dataTable";
import { formatDate } from "@/utils/formatDate";

describe("DataTable Component Tests", () => {
    const mockData = [
        { id: 1, name: "Hazal Budak", age: 25, city: "İstanbul" },
        { id: 2, name: "Hayal Test", age: 30, city: "Bursa" },
        { id: 3, name: "Ali Test", age: 22, city: "Ankara" },
        { id: 4, name: "Ayşe Test", age: 28, city: "İzmir" },
        { id: 5, name: "Can Test", age: 28, city: "İstanbul" },
        { id: 6, name: "Ahmet Test", age: 28, city: "İzmir" },
    ];

    const mockColumns: ColumnProps[] = [
        {
            header: "Name",
            accessorKey: "name",
            isVisible: true,
            filterType: "text",
        },
        {
            header: "Age",
            accessorKey: "age",
            isVisible: true,
            filterType: "number",
        },
        {
            header: "City",
            accessorKey: "city",
            isVisible: true,
            filterType: "text",
        },
    ];

    const mockRefresh = jest.fn();
    const mockEdit = jest.fn();
    const mockDelete = jest.fn();

    it("renders table correctly", () => {
        render(
            <DataTable
                data={mockData}
                columns={mockColumns}
                refreshData={mockRefresh}
                openEditModal={mockEdit}
                deleteSelectedRow={mockDelete}
            />
        );

        mockColumns.forEach((column) => {
            expect(screen.getByText(column.header)).toBeInTheDocument();
        });

        mockData.slice(0, 5).forEach((row) => {
            expect(screen.getByText(row.name)).toBeInTheDocument();
        });
    });
    it("filters and hides columns correctly", () => {
        render(
            <DataTable
                data={mockData}
                columns={mockColumns}
                refreshData={mockRefresh}
                openEditModal={mockEdit}
                deleteSelectedRow={mockDelete}
            />
        );

        const funnelIcon = screen.getByTestId("funnel-icon");
        fireEvent.click(funnelIcon);

        const nameCheckbox = screen.getByLabelText("Name");
        fireEvent.click(nameCheckbox);

        const tableHeaders = screen
            .getAllByRole("columnheader")
            .map((header) => header.textContent);

        expect(tableHeaders).not.toContain("Name");
        expect(tableHeaders).toContain("Age");
        expect(tableHeaders).toContain("City");
        expect(screen.queryByText("Hazal Budak")).not.toBeInTheDocument();
        expect(screen.queryByText("Hayal Test")).not.toBeInTheDocument();
    });

    it("applies column sorting correctly", () => {
        render(
            <DataTable
                data={mockData}
                columns={mockColumns}
                refreshData={mockRefresh}
                openEditModal={mockEdit}
                deleteSelectedRow={mockDelete}
            />
        );

        const ageHeader = screen.getByText("Age");
        fireEvent.click(ageHeader);

        const firstRow = screen.getAllByRole("row")[1];
        expect(within(firstRow).getByText("Hayal Test")).toBeInTheDocument();
    });

    it("handles pagination correctly", () => {
        render(
            <DataTable
                data={mockData}
                columns={mockColumns}
                refreshData={mockRefresh}
                openEditModal={mockEdit}
                deleteSelectedRow={mockDelete}
            />
        );

        expect(screen.getByText("Hazal Budak")).toBeInTheDocument();
        expect(screen.getByText("Hayal Test")).toBeInTheDocument();
        expect(screen.getByText("Ali Test")).toBeInTheDocument();
        expect(screen.getByText("Ayşe Test")).toBeInTheDocument();
        expect(screen.getByText("Can Test")).toBeInTheDocument();

        const nextPageButton = screen.getByText("2");
        fireEvent.click(nextPageButton);

        expect(screen.getByText("Ahmet Test")).toBeInTheDocument();
        expect(screen.queryByText("Hazal Budak")).not.toBeInTheDocument();
        expect(screen.queryByText("Hayal Test")).not.toBeInTheDocument();
        expect(screen.queryByText("Ali Test")).not.toBeInTheDocument();
        expect(screen.queryByText("Ayşe Test")).not.toBeInTheDocument();
        expect(screen.queryByText("Can Test")).not.toBeInTheDocument();
    });

    it("triggers edit and delete actions", () => {
        render(
            <DataTable
                data={mockData}
                columns={mockColumns}
                refreshData={mockRefresh}
                openEditModal={mockEdit}
                deleteSelectedRow={mockDelete}
            />
        );

        const editIcon = screen.getAllByTestId("pencil-square-icon")[0];
        fireEvent.click(editIcon);
        expect(mockEdit).toHaveBeenCalledWith(1);

        const deleteIcon = screen.getAllByTestId("trash-icon")[0];
        fireEvent.click(deleteIcon);
        expect(mockDelete).toHaveBeenCalledWith(1);
    });

    it("refreshes data correctly", () => {
        render(
            <DataTable
                data={mockData}
                columns={mockColumns}
                refreshData={mockRefresh}
                openEditModal={mockEdit}
                deleteSelectedRow={mockDelete}
            />
        );

        const refreshIcon = screen.getByTestId("arrow-path-icon");
        fireEvent.click(refreshIcon);
        expect(mockRefresh).toHaveBeenCalled();
    });

    it("applies column filters correctly", () => {
        render(
            <DataTable
                data={mockData}
                columns={mockColumns}
                refreshData={mockRefresh}
                openEditModal={mockEdit}
                deleteSelectedRow={mockDelete}
            />
        );

        const cityFilterInput = screen.getByPlaceholderText("Filter by City");
        fireEvent.change(cityFilterInput, { target: { value: "İstanbul" } });

        expect(screen.getByText("Hazal Budak")).toBeInTheDocument();
        expect(screen.getByText("Can Test")).toBeInTheDocument();
        expect(screen.queryByText("Ali Test")).not.toBeInTheDocument();
    });

    it("selects rows correctly", () => {
        render(
            <DataTable
                data={mockData}
                columns={mockColumns}
                refreshData={mockRefresh}
                openEditModal={mockEdit}
                deleteSelectedRow={mockDelete}
            />
        );

        const checkbox = screen.getAllByRole("checkbox")[1];
        fireEvent.click(checkbox);

        expect(checkbox).toBeChecked();
    });

    it("changes page size correctly", () => {
        render(
            <DataTable
                data={mockData}
                columns={mockColumns}
                refreshData={mockRefresh}
                openEditModal={mockEdit}
                deleteSelectedRow={mockDelete}
            />
        );

        const pageSizeSelect = screen.getByRole("combobox");
        fireEvent.change(pageSizeSelect, { target: { value: "10" } });

        const rows = screen.getAllByRole("row");
        expect(rows).toHaveLength(7);
    });

    it("renders empty state correctly when no data is passed", () => {
        const emptyData: any[] = [];
        render(
            <DataTable
                data={emptyData}
                columns={mockColumns}
                refreshData={mockRefresh}
                openEditModal={mockEdit}
                deleteSelectedRow={mockDelete}
            />
        );

        expect(screen.getByText("No data available")).toBeInTheDocument();
    });

    it("renders refresh button when hasRefresh is true", () => {
        render(
            <DataTable
                data={mockData}
                columns={mockColumns}
                hasRefresh={true}
                refreshData={mockRefresh}
                openEditModal={mockEdit}
                deleteSelectedRow={mockDelete}
            />
        );
        const refreshIcon = screen.getByTestId("arrow-path-icon");
        fireEvent.click(refreshIcon);
        expect(mockRefresh).toHaveBeenCalled();
    });

    it("does not render refresh button when hasRefresh is false", () => {
        render(
            <DataTable
                data={mockData}
                columns={mockColumns}
                hasRefresh={false}
                refreshData={mockRefresh}
                openEditModal={mockEdit}
                deleteSelectedRow={mockDelete}
            />
        );
        const refreshIcon = screen.queryByTestId("arrow-path-icon");
        expect(refreshIcon).not.toBeInTheDocument();
    });

    it("renders edit button when hasEditable is true", () => {
        render(
            <DataTable
                data={mockData}
                columns={mockColumns}
                hasEditable={true}
                refreshData={mockRefresh}
                openEditModal={mockEdit}
                deleteSelectedRow={mockDelete}
            />
        );
        const editIcon = screen.getAllByTestId("pencil-square-icon")[0];
        fireEvent.click(editIcon);
        expect(mockEdit).toHaveBeenCalledWith(1);
    });

    it("does not render edit button when hasEditable is false", () => {
        render(
            <DataTable
                data={mockData}
                columns={mockColumns}
                hasEditable={false}
                refreshData={mockRefresh}
                openEditModal={mockEdit}
                deleteSelectedRow={mockDelete}
            />
        );
        const editIcon = screen.queryAllByTestId("pencil-square-icon");
        expect(editIcon).toHaveLength(0);
    });

    it("renders delete button when hasRowDelete is true", () => {
        render(
            <DataTable
                data={mockData}
                columns={mockColumns}
                hasRowDelete={true}
                refreshData={mockRefresh}
                openEditModal={mockEdit}
                deleteSelectedRow={mockDelete}
            />
        );
        const deleteIcon = screen.getAllByTestId("trash-icon")[0];
        fireEvent.click(deleteIcon);
        expect(mockDelete).toHaveBeenCalledWith(1);
    });

    it("does not render delete button when hasRowDelete is false", () => {
        render(
            <DataTable
                data={mockData}
                columns={mockColumns}
                hasRowDelete={false}
                refreshData={mockRefresh}
                openEditModal={mockEdit}
                deleteSelectedRow={mockDelete}
            />
        );
        const deleteIcon = screen.queryAllByTestId("trash-icon");
        expect(deleteIcon).toHaveLength(0);
    });

    it("renders pagination when hasPagination is true", () => {
        render(
            <DataTable
                data={mockData}
                columns={mockColumns}
                hasPagination={true}
                refreshData={mockRefresh}
                openEditModal={mockEdit}
                deleteSelectedRow={mockDelete}
            />
        );
        const nextPageButton = screen.getByText("2");
        fireEvent.click(nextPageButton);
        expect(screen.getByText("Ahmet Test")).toBeInTheDocument();
    });

    it("does not render pagination when hasPagination is false", () => {
        render(
            <DataTable
                data={mockData}
                columns={mockColumns}
                hasPagination={false}
                refreshData={mockRefresh}
                openEditModal={mockEdit}
                deleteSelectedRow={mockDelete}
            />
        );
        const pagination = screen.queryByRole("navigation");
        expect(pagination).not.toBeInTheDocument();
    });

    it("renders selectable rows when hasSelectable is true", () => {
        render(
            <DataTable
                data={mockData}
                columns={mockColumns}
                hasSelectable={true}
                refreshData={mockRefresh}
                openEditModal={mockEdit}
                deleteSelectedRow={mockDelete}
            />
        );
        const checkbox = screen.getAllByRole("checkbox")[1];
        fireEvent.click(checkbox);
        expect(checkbox).toBeChecked();
    });

    it("does not render selectable rows when hasSelectable is false", () => {
        render(
            <DataTable
                data={mockData}
                columns={mockColumns}
                hasSelectable={false}
                refreshData={mockRefresh}
                openEditModal={mockEdit}
                deleteSelectedRow={mockDelete}
            />
        );
        const checkbox = screen.queryAllByRole("checkbox");
        expect(checkbox).toHaveLength(0);
    });

    it("renders column filters when hasColumnFilters is true", () => {
        render(
            <DataTable
                data={mockData}
                columns={mockColumns}
                hasColumnFilters={true}
                refreshData={mockRefresh}
                openEditModal={mockEdit}
                deleteSelectedRow={mockDelete}
            />
        );
        const filterInput = screen.getByPlaceholderText("Filter by City");
        fireEvent.change(filterInput, { target: { value: "İstanbul" } });
        expect(screen.getByText("Hazal Budak")).toBeInTheDocument();
        expect(screen.getByText("Can Test")).toBeInTheDocument();
    });

    it("does not render column filters when hasColumnFilters is false", () => {
        render(
            <DataTable
                data={mockData}
                columns={mockColumns}
                hasColumnFilters={false}
                refreshData={mockRefresh}
                openEditModal={mockEdit}
                deleteSelectedRow={mockDelete}
            />
        );
        const filterInput = screen.queryByPlaceholderText("Filter by City");
        expect(filterInput).not.toBeInTheDocument();
    });

    it("renders column visibility toggles when hasColumnVisibillity is true", () => {
        render(
            <DataTable
                data={mockData}
                columns={mockColumns}
                hasColumnVisibillity={true}
                refreshData={mockRefresh}
                openEditModal={mockEdit}
                deleteSelectedRow={mockDelete}
            />
        );
        const funnelIcon = screen.getByTestId("funnel-icon");
        fireEvent.click(funnelIcon);
        const nameCheckbox = screen.getByLabelText("Name");
        fireEvent.click(nameCheckbox);
        const tableHeaders = screen
            .getAllByRole("columnheader")
            .map((header) => header.textContent);
        expect(tableHeaders).not.toContain("Name");
    });

    it("does not render column visibility toggles when hasColumnVisibillity is false", () => {
        render(
            <DataTable
                data={mockData}
                columns={mockColumns}
                hasColumnVisibillity={false}
                refreshData={mockRefresh}
                openEditModal={mockEdit}
                deleteSelectedRow={mockDelete}
            />
        );
        const funnelIcon = screen.queryByTestId("funnel-icon");
        expect(funnelIcon).not.toBeInTheDocument();
    });

    it("sorts the rows when column header is clicked", async () => {
        render(
            <DataTable
                data={mockData}
                columns={mockColumns}
                refreshData={jest.fn()}
                openEditModal={jest.fn()}
                deleteSelectedRow={jest.fn()}
                hasRefresh={false}
            />
        );

        const initialRows = screen.getAllByRole("row").slice(1);
        const initialNames = initialRows.map(row =>
            within(row).getByText(/Test|Budak/).textContent
        );

        expect(initialNames).toEqual([
            "Hazal Budak",
            "Hayal Test",
            "Ali Test",
            "Ayşe Test",
            "Can Test",
        ]);


        const sortButton = screen.getByText("Name");
        fireEvent.click(sortButton);

        await waitFor(() => {
            const sortedRowsAsc = screen.getAllByRole("row").slice(1);
            const sortedNamesAsc = sortedRowsAsc.map(row =>
                within(row).getByText(/Test|Budak/).textContent
            );
            expect(sortedNamesAsc).toEqual([
                "Ahmet Test",
                "Ali Test",
                "Ayşe Test",
                "Can Test",
                "Hayal Test",
            ]);
        });

        fireEvent.click(sortButton);

        await waitFor(() => {
            const sortedRowsDesc = screen.getAllByRole("row").slice(1);
            const sortedNamesDesc = sortedRowsDesc.map(row =>
                within(row).getByText(/Test|Budak/).textContent
            );
            expect(sortedNamesDesc).toEqual([
                "Hazal Budak",
                "Hayal Test",
                "Can Test",
                "Ayşe Test",
                "Ali Test",
            ]);
        });
    });

    it("formats a date string correctly", () => {
        expect(formatDate("2024-11-19")).toBe("19.11.2024");
        expect(formatDate("1990-01-01")).toBe("01.01.1990");
        expect(formatDate("")).toBe("");
    });

});

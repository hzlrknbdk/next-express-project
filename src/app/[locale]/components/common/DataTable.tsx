import {
    flexRender,
    useReactTable,
    getCoreRowModel,
    PaginationState,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    ColumnFiltersState,
} from "@tanstack/react-table";
import {
    PencilSquareIcon,
    TrashIcon,
    ArrowPathIcon,
} from "@heroicons/react/24/outline";
import SelectBox from "./SelectBox";
import Pagination from "./Pagination";
import ColumnFilter from "./ColumnFilter";
import ToggleFilterList from "./ToggleFilterList";
import { useState, useEffect, useCallback } from "react";
import { ColumnProps, DataTableProps } from "@/types/interfaces/dataTable";
import { formatDate } from "@/utils/formatDate";

const DataTable: React.FC<DataTableProps> = ({
    data,
    columns,
    refreshData,
    openEditModal,
    deleteSelectedRow,
    hasRefresh = true,
    hasEditable = true,
    hasRowDelete = true,
    hasPagination = true,
    hasSelectable = true,
    hasColumnFilters = true,
    hasColumnVisibillity = true,
}) => {
    const totalTableRows = data.length;
    const [rowSelection, setRowSelection] = useState({});
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [visibleColumns, setVisibleColumns] = useState<ColumnProps[]>(columns);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 5,
    });

    const table = useReactTable({
        data,
        state: {
            columnFilters,
            rowSelection,
            pagination,
        },
        enableRowSelection: true,
        columns: visibleColumns.filter((col) => col.isVisible),
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    const handleVisibilityChange = useCallback(
        (header: string, isVisible: boolean) => {
            setVisibleColumns((prev) =>
                prev?.map((col) =>
                    col.header === header ? { ...col, isVisible } : col
                )
            );
        },
        []
    );

    const handleFilterChange = useCallback(
        (columnId: string, value: string | number | null) => {
            setColumnFilters((prevFilters) => {
                if (value === "" || value === null) {
                    return prevFilters.filter((filter) => filter.id !== columnId);
                }

                if (columnId.includes("date") || columnId.includes("Date")) {
                    const formattedDate = formatDate(value as string);
                    return [
                        ...prevFilters.filter((filter) => filter.id !== columnId),
                        { id: columnId, value: formattedDate },
                    ];
                }

                return [
                    ...prevFilters.filter((filter) => filter.id !== columnId),
                    { id: columnId, value },
                ];
            });
        },
        []
    );

    const handlePageChange = (page: number) => {
        setPagination((prev) => ({ ...prev, pageIndex: page - 1 }));
    };

    const onPageSizeChange = (e: unknown) => {
        setPagination((prev: any) => ({ ...prev, pageSize: e }));
    };

    const updatedColumns = () => {
        setVisibleColumns((prevColumns) =>
            prevColumns?.map((col) => ({
                ...col,
                filterOptions:
                    col.filterType === "select"
                        ? Array.from(
                            new Set(data.map((item) => item[col.accessorKey])).values()
                        )
                        : col.filterOptions,
            }))
        );
    };

    useEffect(() => {
        updatedColumns();
    }, [data]);

    if (!data.length) return <div className="text-center text-gray-600">No data available</div>;

    return (
        <div>
            <div className="flex flex-row mb-2">
                {hasColumnVisibillity && (
                    <ToggleFilterList
                        list={visibleColumns}
                        onVisibilityChange={handleVisibilityChange}
                    />
                )}
                {hasRefresh && (
                    <ArrowPathIcon
                        data-testid="arrow-path-icon"
                        onClick={() => refreshData()}
                        className="w-6 h-6 cursor-pointer border border-gray-400 rounded-md p-1 ml-2 text-gray-600 hover:bg-gray-100"
                    />
                )}
            </div>
            <div className="overflow-x-scroll">
                <table className="min-w-full border-collapse border border-gray-200">
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr
                                key={headerGroup.id}
                                role="row"
                                className="bg-gray-100 text-xs text-black"
                            >
                                {hasSelectable && (
                                    <th className="px-2 py-4 border-b border-r">
                                        <input
                                            type="checkbox"
                                            className="cursor-pointer"
                                            onChange={() => { }}
                                            disabled
                                        />
                                    </th>
                                )}
                                {hasEditable || hasRowDelete ? (
                                    <th className="px-2 py-4 border-b border-r font-normal">
                                        Edit/Delete
                                    </th>
                                ) : null}
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className="px-2 py-4 border-b border-r font-normal"
                                    >
                                        {header.isPlaceholder ? null : (
                                            <>
                                                <div
                                                    onClick={header.column.getToggleSortingHandler()}
                                                    className="cursor-pointer select-none my-1"
                                                >
                                                    {flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                                    {{
                                                        asc: " ↑↑",
                                                        desc: " ↓↓",
                                                    }[header.column.getIsSorted() as string] ?? null}
                                                </div>
                                                {hasColumnFilters && (
                                                    <ColumnFilter
                                                        columnDef={header.column.columnDef}
                                                        onFilterChange={handleFilterChange}
                                                    />
                                                )}
                                            </>
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr
                                key={row.id}
                                role="row"
                                className="text-xs text-gray-600 border-gray-300 font-medium"
                            >
                                {hasSelectable && (
                                    <td className="px-2 py-4 border-b border-r">
                                        <input
                                            type="checkbox"
                                            className="cursor-pointer"
                                            onChange={() => { }}
                                        />
                                    </td>
                                )}
                                {(hasEditable || hasRowDelete) && (
                                    <td className="px-1 border-b border-r">
                                        <div className="flex justify-center">
                                            {hasEditable && (
                                                <PencilSquareIcon
                                                    data-testid="pencil-square-icon"
                                                    onClick={() => openEditModal(row.original.id)}
                                                    className="w-6 h-6 p-1 text-gray-600 cursor-pointer"
                                                />
                                            )}
                                            {hasRowDelete && (
                                                <TrashIcon
                                                    data-testid="trash-icon"
                                                    onClick={() => deleteSelectedRow(row.original.id)}
                                                    className="w-6 h-6  p-1 text-gray-600 cursor-pointer"
                                                />
                                            )}
                                        </div>
                                    </td>
                                )}
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className="px-2 py-4 border-b border-r">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-start text-gray-600 text-xs mt-2">
                Showing {table.getRowModel().rows.length.toLocaleString()} of{" "}
                {table.getRowCount().toLocaleString()} Rows
            </div>

            {hasPagination && (
                <div className="flex flex-row justify-end">
                    <Pagination
                        totalRows={totalTableRows}
                        itemsPerPage={pagination.pageSize}
                        currentPage={pagination.pageIndex + 1}
                        onPageChange={handlePageChange}
                    />
                    <SelectBox
                        name="pageSize"
                        options={[
                            { value: 5, label: "Show 5" },
                            { value: 10, label: "Show 10" },
                            { value: 15, label: "Show 15" },
                            { value: 20, label: "Show 20" },
                        ]}
                        onChange={onPageSizeChange}
                        classNames="w-15 h-8 ml-3 p-1 border border-gray-300 rounded-lg text-xs cursor-pointer text-gray-600"
                    />
                </div>
            )}
        </div>
    );
};

export default DataTable;

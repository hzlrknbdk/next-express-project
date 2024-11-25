import React from "react";

interface ColumnProps {
    columnDef: any;
    onFilterChange: (columnId: string, value: string | number | null) => void;
}

const ColumnFilter: React.FC<ColumnProps> = ({
    columnDef,
    onFilterChange,
}) => {
    const handleFilterChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const value = e.target.value;
        onFilterChange(columnDef.accessorKey, value === "" ? null : value);
    };

    switch (columnDef.filterType) {
        case "text":
            return (
                <input
                    type="text"
                    placeholder={`Filter by ${columnDef.header}`}
                    onChange={handleFilterChange}
                    className="p-1 border rounded"
                />
            );
        case "number":
            return (
                <input
                    type="number"
                    placeholder={`Filter by ${columnDef.header}`}
                    onChange={handleFilterChange}
                    className="p-1 border rounded"
                />
            );
        case "select":
            return (
                <select onChange={handleFilterChange}>
                    <option value="">All</option>
                    {columnDef.filterOptions?.map((option: any) => (
                        <option role="option" key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            );
        case "date":
            return <input type="date" onChange={handleFilterChange} role="textbox" />;
        default:
            return null;
    }
};

export default ColumnFilter;

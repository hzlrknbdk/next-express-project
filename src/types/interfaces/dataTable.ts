export interface DataTableProps {
  data: any[];
  hasRefresh?: boolean;
  hasEditable?: boolean;
  columns: ColumnProps[];
  hasRowDelete?: boolean;
  refreshData: () => void;
  hasSelectable?: boolean;
  hasPagination?: boolean;
  hasColumnFilters?: boolean;
  hasColumnVisibillity?: boolean;
  openEditModal: (id: number) => void;
  deleteSelectedRow: (id: number) => void;
}

export interface ColumnProps extends Record<string, any> {
  header: string;
  isVisible: boolean;
  accessorKey: string;
  filterOptions?: string[];
  filterType?: "text" | "number" | "select" | "date" | "boolean";
}

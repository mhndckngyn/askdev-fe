// để static type hoạt động nhanh hơn trong những file có sử dụng Mantine DataTable, hãy bỏ comment những dòng dưới
// TS sẽ báo lỗi do không nhận ra một số thuộc tính. Khi cần validate, hãy comment lại 

// // https://github.com/icflorescu/mantine-datatable/issues/651
// declare module "mantine-datatable" {
//   // https://icflorescu.github.io/mantine-datatable/type-definitions/
//   export interface DataTableProps<T> {
//     columns?: { accessor: keyof T | string, title?: string, render?: (row: T) => JSX.Element }[]
//     records?: T[]

//     totalRecords?: number
//     page?: number
//     recordsPerPage?: number
//     onPageChange?: (page: number) => void

//     minHeight?: number
//     borderRadius?: "xs" | "sm" | "md" | "lg" | "xl"
//     withTableBorder?: boolean
//     highlightOnHover?: boolean
//   }

//   export function DataTable<T>(props: DataTableProps<T>): React.ReactNode;
// }

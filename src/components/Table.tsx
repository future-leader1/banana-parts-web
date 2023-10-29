import {
  FC,
  HTMLAttributes,
  TableHTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from 'react';

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {}

const Table: FC<TableProps> & {
  Head: FC<TableHeadProps>;
  Body: FC<TableBodyProps>;
  Row: FC<TableRowProps>;
  Th: FC<TableThProps>;
  Td: FC<TableTdProps>;
} = ({ children, className = '', ...props }) => {
  return (
    <div className="flex flex-col ">
      <table className={`table ${className}`} {...props}>
        {children}
      </table>
    </div>
  );
};

export interface TableHeadProps
  extends HTMLAttributes<HTMLTableSectionElement> {}

const TableHead: FC<TableHeadProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <thead className={`table-head ${className}`} {...props}>
      {children}
    </thead>
  );
};

export interface TableBodyProps
  extends HTMLAttributes<HTMLTableSectionElement> {}

const TableBody: FC<TableBodyProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <tbody className={`table-body ${className}`} {...props}>
      {children}
    </tbody>
  );
};

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {}

const TableRow: FC<TableRowProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <tr className={`${className}`} {...props}>
      {children}
    </tr>
  );
};

export interface TableThProps
  extends ThHTMLAttributes<HTMLTableHeaderCellElement> {}

const TableTh: FC<TableThProps> = ({ children, className = '', ...props }) => {
  return (
    <th className={`table-th whitespace-nowrap ${className}`} {...props}>
      {children}
    </th>
  );
};

export interface TableTdProps
  extends TdHTMLAttributes<HTMLTableDataCellElement> {}

const TableTd: FC<TableTdProps> = ({ children, className = '', ...props }) => {
  return (
    <th
      className={`table-td whitespace-normal break-all ${className}`}
      {...props}
    >
      {children}
    </th>
  );
};

Table.Head = TableHead;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Th = TableTh;
Table.Td = TableTd;

export { Table };

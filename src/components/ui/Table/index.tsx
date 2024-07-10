

import React, { ForwardRefExoticComponent, HTMLAttributes, RefAttributes } from 'react';
import { cn } from '../../../lib/util';

type TableComponent = ForwardRefExoticComponent<HTMLAttributes<HTMLTableElement> & RefAttributes<HTMLTableElement>> & {
	Header: ForwardRefExoticComponent<HTMLAttributes<HTMLTableSectionElement> & RefAttributes<HTMLTableSectionElement>>;
	Head: ForwardRefExoticComponent<HTMLAttributes<HTMLTableCellElement> & RefAttributes<HTMLTableCellElement>>;
	Body: ForwardRefExoticComponent<HTMLAttributes<HTMLTableSectionElement> & RefAttributes<HTMLTableSectionElement>>;
	Row: ForwardRefExoticComponent<HTMLAttributes<HTMLTableRowElement> & RefAttributes<HTMLTableRowElement>>;
	Cell: ForwardRefExoticComponent<HTMLAttributes<HTMLTableCellElement> & RefAttributes<HTMLTableCellElement>>;
	Footer: ForwardRefExoticComponent<HTMLAttributes<HTMLTableSectionElement> & RefAttributes<HTMLTableSectionElement>>;
	Caption: ForwardRefExoticComponent<HTMLAttributes<HTMLTableSectionElement> & RefAttributes<HTMLTableSectionElement>>;

  };

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
	({ className, ...props }, ref) => (
		<div className="w-full table-auto overflow-auto">
			<table ref={ref} className={cn('w-full caption-bottom text-sm text-primary bg-white', className)} {...props} />
		</div>
	)
) as TableComponent

Table.Header = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
	({ className, ...props }, ref) => <thead ref={ref} className={cn('[&_tr]:border-b', className)} {...props} />
);


Table.Head = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
	({ className, ...props }, ref) => (
		<th
			ref={ref}
			className={cn(
				'h-10 px-3 bg-primary_muted/10 sm:px-6 py-3 text-left align-middle text-xs sm:text-sm font-semibold uppercase tracking-wider [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
				className
			)}
			{...props}
		/>
	)
);

Table.Body = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
	({ className, ...props }, ref) => (
		<tbody ref={ref} className={cn('[&_tr:last-child]:border-0', className)} {...props} />
	)
);

Table.Footer = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
	({ className, ...props }, ref) => (
		<tfoot ref={ref} className={cn('bg-primary font-medium text-white', className)} {...props} />
	)
);

Table.Row = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
	({ className, ...props }, ref) => (
		<tr
			ref={ref}
			className={cn(
				'border-b transition-colors hover:bg-primary_muted/5 data-[state=selected]:bg-primary_muted',
				className
			)}
			{...props}
		/>
	)
);

Table.Cell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
	({ className, ...props }, ref) => (
		<td
			ref={ref}
			className={cn(
				'px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
				className
			)}
			{...props}
		/>
	)
)




export default Table;
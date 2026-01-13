import * as React from "react"
import { cn } from "@/lib/utils"

interface ListProps<T> extends React.HTMLAttributes<HTMLDivElement> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T, index: number) => string | number;
  emptyState?: React.ReactNode;
  loading?: boolean;
  loadingState?: React.ReactNode;
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
  };
}

function List<T>({
  items,
  renderItem,
  keyExtractor,
  emptyState,
  loading = false,
  loadingState,
  columns = { sm: 1, md: 2, lg: 3 },
  className,
  ...props
}: ListProps<T>) {
  if (loading && loadingState) {
    return <div>{loadingState}</div>;
  }

  if (!loading && items.length === 0 && emptyState) {
    return <div>{emptyState}</div>;
  }

  const gridCols = {
    sm: `grid-cols-${columns.sm || 1}`,
    md: `md:grid-cols-${columns.md || 2}`,
    lg: `lg:grid-cols-${columns.lg || 3}`,
  };

  return (
    <div
      data-slot="list"
      className={cn(
        "grid gap-6",
        gridCols.sm,
        gridCols.md,
        gridCols.lg,
        className
      )}
      {...props}
    >
      {items.map((item, index) => (
        <div key={keyExtractor(item, index)}>
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
}

export { List };
export type { ListProps };

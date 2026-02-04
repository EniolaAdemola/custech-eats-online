import { Badge } from '@/components/ui/badge';
import { OrderStatus } from '@/types/database';

interface OrderStatusBadgeProps {
  status: OrderStatus;
  size?: 'sm' | 'default' | 'lg';
}

const statusConfig: Record<OrderStatus, { label: string; className: string }> = {
  pending: {
    label: 'Pending',
    className: 'status-pending',
  },
  preparing: {
    label: 'Preparing',
    className: 'status-preparing',
  },
  ready: {
    label: 'Ready for Pickup',
    className: 'status-ready',
  },
  completed: {
    label: 'Completed',
    className: 'status-completed',
  },
  cancelled: {
    label: 'Cancelled',
    className: 'status-cancelled',
  },
};

export function OrderStatusBadge({ status, size = 'default' }: OrderStatusBadgeProps) {
  const config = statusConfig[status];
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    default: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5',
  };

  return (
    <Badge
      variant="outline"
      className={`${config.className} ${sizeClasses[size]} font-medium`}
    >
      {config.label}
    </Badge>
  );
}

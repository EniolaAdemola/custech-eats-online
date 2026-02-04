import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { OrderStatusBadge } from '@/components/order/OrderStatusBadge';
import { Order, OrderItem, OrderStatus } from '@/types/database';
import { format } from 'date-fns';
import { ArrowLeft, Clock, CheckCircle } from 'lucide-react';

const OrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchOrderDetails();

      // Subscribe to realtime updates
      const channel = supabase
        .channel(`order-${id}`)
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'orders',
            filter: `id=eq.${id}`,
          },
          (payload) => {
            setOrder(payload.new as Order);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [id]);

  const fetchOrderDetails = async () => {
    if (!id) return;

    const [orderResult, itemsResult] = await Promise.all([
      supabase
        .from('orders')
        .select('*')
        .eq('id', id)
        .single(),
      supabase
        .from('order_items')
        .select('*')
        .eq('order_id', id),
    ]);

    if (orderResult.data) {
      setOrder(orderResult.data as Order);
    }
    if (itemsResult.data) {
      setOrderItems(itemsResult.data as OrderItem[]);
    }
    setLoading(false);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getStatusStep = (status: OrderStatus) => {
    const steps = ['pending', 'preparing', 'ready', 'completed'];
    return steps.indexOf(status);
  };

  if (loading) {
    return (
      <Layout>
        <div className="container py-8 max-w-2xl">
          <Skeleton className="h-8 w-48 mb-8" />
          <Card>
            <CardContent className="p-8 space-y-6">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-32 w-full" />
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  if (!order) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Order not found</h1>
          <Button asChild>
            <Link to="/orders">Back to Orders</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const currentStep = getStatusStep(order.status as OrderStatus);
  const statusSteps = [
    { status: 'pending', label: 'Order Received' },
    { status: 'preparing', label: 'Preparing' },
    { status: 'ready', label: 'Ready for Pickup' },
  ];

  return (
    <Layout>
      <div className="container py-8 max-w-2xl">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/orders">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Orders
          </Link>
        </Button>

        {/* Order Number Card */}
        <Card className="mb-6 bg-primary text-primary-foreground">
          <CardContent className="p-8 text-center">
            <p className="text-sm opacity-80 mb-2">Your Order Number</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              #{order.order_number}
            </h1>
            <OrderStatusBadge status={order.status as OrderStatus} size="lg" />
          </CardContent>
        </Card>

        {/* Status Progress */}
        {order.status !== 'cancelled' && order.status !== 'completed' && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Order Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between">
                {statusSteps.map((step, index) => (
                  <div
                    key={step.status}
                    className={`flex flex-col items-center flex-1 ${
                      index <= currentStep ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                        index <= currentStep
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary'
                      }`}
                    >
                      {index < currentStep ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <span className="text-sm font-bold">{index + 1}</span>
                      )}
                    </div>
                    <span className="text-xs text-center font-medium">{step.label}</span>
                    {index < statusSteps.length - 1 && (
                      <div
                        className={`absolute h-0.5 w-full mt-5 -z-10 ${
                          index < currentStep ? 'bg-primary' : 'bg-secondary'
                        }`}
                        style={{ left: '50%' }}
                      />
                    )}
                  </div>
                ))}
              </div>
              {order.estimated_ready_time && order.status !== 'ready' && (
                <div className="mt-6 text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>
                    Estimated ready by{' '}
                    {format(new Date(order.estimated_ready_time), 'h:mm a')}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Order Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Order Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Items */}
              <div className="space-y-3">
                {orderItems.map(item => (
                  <div key={item.id} className="flex justify-between">
                    <div>
                      <span className="font-medium">{item.item_name}</span>
                      <span className="text-muted-foreground"> × {item.quantity}</span>
                      {item.notes && (
                        <p className="text-sm text-muted-foreground">{item.notes}</p>
                      )}
                    </div>
                    <span>{formatPrice(item.unit_price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Total */}
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">{formatPrice(order.total_amount)}</span>
              </div>

              {/* Special Requests */}
              {order.special_requests && (
                <>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      Special Requests
                    </p>
                    <p className="text-sm">{order.special_requests}</p>
                  </div>
                </>
              )}

              {/* Order Time */}
              <Separator />
              <div className="text-sm text-muted-foreground">
                <p>
                  Ordered on {format(new Date(order.created_at), 'MMMM d, yyyy \'at\' h:mm a')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default OrderDetail;

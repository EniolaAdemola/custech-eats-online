import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { OrderStatusBadge } from '@/components/order/OrderStatusBadge';
import { useAuth } from '@/contexts/AuthContext';
import { Order, OrderItem, OrderStatus } from '@/types/database';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { 
  ChefHat, 
  LayoutDashboard, 
  ClipboardList, 
  UtensilsCrossed, 
  BarChart3,
  Monitor,
  LogOut,
  RefreshCw,
  Clock
} from 'lucide-react';

const AdminDashboard = () => {
  const { user, profile, signOut, isStaffOrAdmin, loading: authLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderItems, setOrderItems] = useState<Record<string, OrderItem[]>>({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pending');

  useEffect(() => {
    if (!authLoading && (!user || !isStaffOrAdmin())) {
      navigate('/');
      toast.error('Access denied. Staff or admin privileges required.');
    }
  }, [user, authLoading, isStaffOrAdmin, navigate]);

  useEffect(() => {
    if (user && isStaffOrAdmin()) {
      fetchOrders();

      // Subscribe to realtime updates
      const channel = supabase
        .channel('admin-orders')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'orders',
          },
          () => {
            fetchOrders();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user]);

  const fetchOrders = async () => {
    setLoading(true);
    
    const { data: ordersData, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
    } else {
      setOrders((ordersData || []) as Order[]);
      
      // Fetch items for all orders
      if (ordersData && ordersData.length > 0) {
        const orderIds = ordersData.map(o => o.id);
        const { data: itemsData } = await supabase
          .from('order_items')
          .select('*')
          .in('order_id', orderIds);

        if (itemsData) {
          const itemsByOrder = (itemsData as OrderItem[]).reduce((acc, item) => {
            if (!acc[item.order_id]) acc[item.order_id] = [];
            acc[item.order_id].push(item);
            return acc;
          }, {} as Record<string, OrderItem[]>);
          setOrderItems(itemsByOrder);
        }
      }
    }
    setLoading(false);
  };

  const updateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId);

    if (error) {
      toast.error('Failed to update order status');
    } else {
      toast.success(`Order marked as ${newStatus}`);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'all') return true;
    return order.status === activeTab;
  });

  const orderCounts = {
    pending: orders.filter(o => o.status === 'pending').length,
    preparing: orders.filter(o => o.status === 'preparing').length,
    ready: orders.filter(o => o.status === 'ready').length,
  };

  if (authLoading || (!user || !isStaffOrAdmin())) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r hidden md:block">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <ChefHat className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-foreground">CUSTECH Eats</h1>
              <p className="text-xs text-muted-foreground">Staff Dashboard</p>
            </div>
          </Link>
        </div>
        <nav className="px-4 space-y-1">
          <Link
            to="/admin"
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground"
          >
            <LayoutDashboard className="h-5 w-5" />
            <span>Orders</span>
          </Link>
          <Link
            to="/admin/menu"
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <UtensilsCrossed className="h-5 w-5" />
            <span>Menu Management</span>
          </Link>
          <Link
            to="/admin/display"
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <Monitor className="h-5 w-5" />
            <span>Order Display</span>
          </Link>
          <Link
            to="/admin/reports"
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <BarChart3 className="h-5 w-5" />
            <span>Reports</span>
          </Link>
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 w-64">
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-secondary">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{profile?.full_name}</p>
              <p className="text-xs text-muted-foreground">Staff</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                signOut();
                navigate('/');
              }}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">Order Management</h1>
              <p className="text-muted-foreground">Manage incoming orders in real-time</p>
            </div>
            <Button variant="outline" onClick={fetchOrders}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <Card className="border-l-4 border-l-yellow-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pending</p>
                    <p className="text-2xl font-bold">{orderCounts.pending}</p>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Preparing</p>
                    <p className="text-2xl font-bold">{orderCounts.preparing}</p>
                  </div>
                  <ChefHat className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Ready</p>
                    <p className="text-2xl font-bold">{orderCounts.ready}</p>
                  </div>
                  <ClipboardList className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Orders */}
          <Card>
            <CardHeader className="pb-3">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="pending">
                    Pending
                    {orderCounts.pending > 0 && (
                      <Badge className="ml-2" variant="secondary">
                        {orderCounts.pending}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="preparing">
                    Preparing
                    {orderCounts.preparing > 0 && (
                      <Badge className="ml-2" variant="secondary">
                        {orderCounts.preparing}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="ready">
                    Ready
                    {orderCounts.ready > 0 && (
                      <Badge className="ml-2" variant="secondary">
                        {orderCounts.ready}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="all">All Orders</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8 text-muted-foreground">
                  Loading orders...
                </div>
              ) : filteredOrders.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No orders found
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredOrders.map(order => (
                    <Card key={order.id} className="overflow-hidden">
                      <div className="p-4 bg-secondary/50 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <h3 className="text-lg font-bold">#{order.order_number}</h3>
                          <OrderStatusBadge status={order.status as OrderStatus} />
                        </div>
                        <div className="flex items-center gap-2">
                          {order.status === 'pending' && (
                            <Button
                              size="sm"
                              onClick={() => updateOrderStatus(order.id, 'preparing')}
                            >
                              Start Preparing
                            </Button>
                          )}
                          {order.status === 'preparing' && (
                            <Button
                              size="sm"
                              onClick={() => updateOrderStatus(order.id, 'ready')}
                            >
                              Mark Ready
                            </Button>
                          )}
                          {order.status === 'ready' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateOrderStatus(order.id, 'completed')}
                            >
                              Complete
                            </Button>
                          )}
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground mb-2">
                              Items
                            </h4>
                            <ul className="space-y-1">
                              {orderItems[order.id]?.map(item => (
                                <li key={item.id} className="text-sm">
                                  <span className="font-medium">{item.quantity}×</span>{' '}
                                  {item.item_name}
                                  {item.notes && (
                                    <span className="text-muted-foreground"> - {item.notes}</span>
                                  )}
                                </li>
                              ))}
                            </ul>
                            {order.special_requests && (
                              <div className="mt-2 p-2 bg-yellow-50 rounded text-sm text-yellow-800">
                                <strong>Note:</strong> {order.special_requests}
                              </div>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">
                              {format(new Date(order.created_at), 'h:mm a')}
                            </p>
                            <p className="text-lg font-bold text-primary">
                              {formatPrice(order.total_amount)}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

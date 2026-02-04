import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Order, OrderStatus } from '@/types/database';
import { ChefHat, Volume2 } from 'lucide-react';
import { format } from 'date-fns';

const OrderDisplay = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    fetchOrders();

    // Update time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Subscribe to realtime updates
    const channel = supabase
      .channel('display-orders')
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

    // Refresh every 30 seconds as backup
    const refreshInterval = setInterval(fetchOrders, 30000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(refreshInterval);
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchOrders = async () => {
    const { data } = await supabase
      .from('orders')
      .select('*')
      .in('status', ['preparing', 'ready'])
      .order('updated_at', { ascending: false });

    if (data) {
      setOrders(data as Order[]);
    }
  };

  const preparingOrders = orders.filter(o => o.status === 'preparing');
  const readyOrders = orders.filter(o => o.status === 'ready');

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-4 px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ChefHat className="h-10 w-10" />
            <div>
              <h1 className="text-2xl font-bold">CUSTECH Eats</h1>
              <p className="text-sm opacity-80">Order Status Display</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold font-mono">
              {format(currentTime, 'HH:mm:ss')}
            </p>
            <p className="text-sm opacity-80">
              {format(currentTime, 'EEEE, MMMM d, yyyy')}
            </p>
          </div>
        </div>
      </header>

      <main className="p-8">
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Now Preparing */}
          <div className="bg-card rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-blue-500 text-white py-4 px-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <ChefHat className="h-7 w-7" />
                Now Preparing
              </h2>
            </div>
            <div className="p-6">
              {preparingOrders.length === 0 ? (
                <p className="text-center text-muted-foreground py-8 text-lg">
                  No orders being prepared
                </p>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {preparingOrders.map(order => (
                    <div
                      key={order.id}
                      className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 text-center"
                    >
                      <p className="text-3xl font-bold text-blue-600">
                        #{order.order_number.split('-')[1]}
                      </p>
                      <p className="text-sm text-blue-500 mt-1">
                        {format(new Date(order.created_at), 'h:mm a')}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Ready for Pickup */}
          <div className="bg-card rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-green-500 text-white py-4 px-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Volume2 className="h-7 w-7" />
                Ready for Pickup
              </h2>
              {readyOrders.length > 0 && (
                <span className="bg-white text-green-500 px-3 py-1 rounded-full text-sm font-bold">
                  {readyOrders.length} orders
                </span>
              )}
            </div>
            <div className="p-6">
              {readyOrders.length === 0 ? (
                <p className="text-center text-muted-foreground py-8 text-lg">
                  No orders ready for pickup
                </p>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {readyOrders.map(order => (
                    <div
                      key={order.id}
                      className="bg-green-50 border-2 border-green-200 rounded-xl p-4 text-center animate-pulse"
                    >
                      <p className="text-4xl font-bold text-green-600">
                        #{order.order_number.split('-')[1]}
                      </p>
                      <p className="text-sm text-green-500 mt-1 font-medium">
                        READY!
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-card border-t py-4 px-8 text-center">
        <p className="text-muted-foreground">
          Please wait for your order number to appear in the <strong className="text-green-500">green section</strong> before picking up
        </p>
      </footer>
    </div>
  );
};

export default OrderDisplay;

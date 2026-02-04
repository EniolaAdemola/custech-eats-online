import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Order } from '@/types/database';
import { format, startOfDay, endOfDay, subDays } from 'date-fns';
import { toast } from 'sonner';
import { 
  ChefHat, 
  LayoutDashboard, 
  UtensilsCrossed, 
  BarChart3,
  Monitor,
  LogOut,
  TrendingUp,
  ShoppingBag,
  DollarSign,
  Users
} from 'lucide-react';

const AdminReports = () => {
  const { user, profile, signOut, isStaffOrAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [todayOrders, setTodayOrders] = useState<Order[]>([]);
  const [weekOrders, setWeekOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && (!user || !isStaffOrAdmin())) {
      navigate('/');
      toast.error('Access denied');
    }
  }, [user, authLoading, isStaffOrAdmin, navigate]);

  useEffect(() => {
    if (user && isStaffOrAdmin()) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    setLoading(true);
    
    const today = new Date();
    const weekAgo = subDays(today, 7);

    const [todayResult, weekResult] = await Promise.all([
      supabase
        .from('orders')
        .select('*')
        .gte('created_at', startOfDay(today).toISOString())
        .lte('created_at', endOfDay(today).toISOString()),
      supabase
        .from('orders')
        .select('*')
        .gte('created_at', startOfDay(weekAgo).toISOString())
        .lte('created_at', endOfDay(today).toISOString()),
    ]);

    if (todayResult.data) setTodayOrders(todayResult.data as Order[]);
    if (weekResult.data) setWeekOrders(weekResult.data as Order[]);
    
    setLoading(false);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const todayStats = {
    totalOrders: todayOrders.length,
    completedOrders: todayOrders.filter(o => o.status === 'completed').length,
    totalRevenue: todayOrders
      .filter(o => o.status !== 'cancelled')
      .reduce((sum, o) => sum + o.total_amount, 0),
    averageOrderValue: todayOrders.length > 0
      ? todayOrders.reduce((sum, o) => sum + o.total_amount, 0) / todayOrders.length
      : 0,
  };

  const weekStats = {
    totalOrders: weekOrders.length,
    completedOrders: weekOrders.filter(o => o.status === 'completed').length,
    totalRevenue: weekOrders
      .filter(o => o.status !== 'cancelled')
      .reduce((sum, o) => sum + o.total_amount, 0),
    averageOrderValue: weekOrders.length > 0
      ? weekOrders.reduce((sum, o) => sum + o.total_amount, 0) / weekOrders.length
      : 0,
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
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
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
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground"
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
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Sales Reports</h1>
            <p className="text-muted-foreground">View sales and order statistics</p>
          </div>

          {loading ? (
            <div className="text-center py-8 text-muted-foreground">
              Loading reports...
            </div>
          ) : (
            <>
              {/* Today's Stats */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4">Today's Summary</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-full bg-blue-100">
                          <ShoppingBag className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Total Orders</p>
                          <p className="text-2xl font-bold">{todayStats.totalOrders}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-full bg-green-100">
                          <TrendingUp className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Completed</p>
                          <p className="text-2xl font-bold">{todayStats.completedOrders}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-full bg-purple-100">
                          <DollarSign className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Revenue</p>
                          <p className="text-2xl font-bold">{formatPrice(todayStats.totalRevenue)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-full bg-orange-100">
                          <Users className="h-6 w-6 text-orange-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Avg Order</p>
                          <p className="text-2xl font-bold">{formatPrice(todayStats.averageOrderValue)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Weekly Stats */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Last 7 Days</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-full bg-blue-100">
                          <ShoppingBag className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Total Orders</p>
                          <p className="text-2xl font-bold">{weekStats.totalOrders}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-full bg-green-100">
                          <TrendingUp className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Completed</p>
                          <p className="text-2xl font-bold">{weekStats.completedOrders}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-full bg-purple-100">
                          <DollarSign className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Revenue</p>
                          <p className="text-2xl font-bold">{formatPrice(weekStats.totalRevenue)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-full bg-orange-100">
                          <Users className="h-6 w-6 text-orange-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Avg Order</p>
                          <p className="text-2xl font-bold">{formatPrice(weekStats.averageOrderValue)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminReports;

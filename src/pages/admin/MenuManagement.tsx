import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAuth } from '@/contexts/AuthContext';
import { MenuCategory, MenuItem } from '@/types/database';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { 
  ChefHat, 
  LayoutDashboard, 
  UtensilsCrossed, 
  BarChart3,
  Monitor,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  Loader2
} from 'lucide-react';

const menuItemSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().optional(),
  price: z.number().min(0, 'Price must be positive'),
  category_id: z.string().optional(),
  preparation_time: z.number().min(1).default(15),
  is_available: z.boolean().default(true),
  image_url: z.string().nullable().optional(),
});

type MenuItemFormData = z.infer<typeof menuItemSchema>;

const AdminMenu = () => {
  const { user, profile, signOut, isStaffOrAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);

  const form = useForm<MenuItemFormData>({
    resolver: zodResolver(menuItemSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      category_id: '',
      preparation_time: 15,
      is_available: true,
      image_url: null,
    },
  });

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
    
    const [categoriesResult, itemsResult] = await Promise.all([
      supabase.from('menu_categories').select('*').order('display_order'),
      supabase.from('menu_items').select('*').order('name'),
    ]);

    if (categoriesResult.data) setCategories(categoriesResult.data as MenuCategory[]);
    if (itemsResult.data) setMenuItems(itemsResult.data as MenuItem[]);
    
    setLoading(false);
  };

  const handleAddItem = () => {
    setEditingItem(null);
    setCurrentImageUrl(null);
    form.reset({
      name: '',
      description: '',
      price: 0,
      category_id: '',
      preparation_time: 15,
      is_available: true,
      image_url: null,
    });
    setDialogOpen(true);
  };

  const handleEditItem = (item: MenuItem) => {
    setEditingItem(item);
    setCurrentImageUrl(item.image_url);
    form.reset({
      name: item.name,
      description: item.description || '',
      price: item.price,
      category_id: item.category_id || '',
      preparation_time: item.preparation_time || 15,
      is_available: item.is_available,
      image_url: item.image_url,
    });
    setDialogOpen(true);
  };

  const handleSubmit = async (data: MenuItemFormData) => {
    setIsSubmitting(true);

    try {
      if (editingItem) {
        const { error } = await supabase
          .from('menu_items')
          .update({
            name: data.name,
            description: data.description || null,
            price: data.price,
            category_id: data.category_id || null,
            preparation_time: data.preparation_time,
            is_available: data.is_available,
            image_url: currentImageUrl,
          })
          .eq('id', editingItem.id);

        if (error) throw error;
        toast.success('Menu item updated');
      } else {
        const { error } = await supabase
          .from('menu_items')
          .insert({
            name: data.name,
            description: data.description || null,
            price: data.price,
            category_id: data.category_id || null,
            preparation_time: data.preparation_time,
            is_available: data.is_available,
            image_url: currentImageUrl,
          });

        if (error) throw error;
        toast.success('Menu item added');
      }

      setDialogOpen(false);
      setCurrentImageUrl(null);
      fetchData();
    } catch (error) {
      console.error('Error saving menu item:', error);
      toast.error('Failed to save menu item');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    const { error } = await supabase
      .from('menu_items')
      .delete()
      .eq('id', itemId);

    if (error) {
      toast.error('Failed to delete item');
    } else {
      toast.success('Item deleted');
      fetchData();
    }
  };

  const toggleAvailability = async (item: MenuItem) => {
    const { error } = await supabase
      .from('menu_items')
      .update({ is_available: !item.is_available })
      .eq('id', item.id);

    if (error) {
      toast.error('Failed to update availability');
    } else {
      fetchData();
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getCategoryName = (categoryId: string | null) => {
    if (!categoryId) return 'Uncategorized';
    return categories.find(c => c.id === categoryId)?.name || 'Unknown';
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
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground"
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
              <h1 className="text-2xl font-bold">Menu Management</h1>
              <p className="text-muted-foreground">Add, edit, and manage menu items</p>
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={handleAddItem}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingItem ? 'Edit Menu Item' : 'Add Menu Item'}
                  </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                    {/* Image Upload */}
                    <FormItem>
                      <FormLabel>Image</FormLabel>
                      <ImageUpload
                        currentImageUrl={currentImageUrl}
                        onImageChange={setCurrentImageUrl}
                        disabled={isSubmitting}
                      />
                    </FormItem>

                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Jollof Rice" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Delicious Nigerian dish..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price (₦)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="0"
                                {...field}
                                onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="preparation_time"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Prep Time (min)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="1"
                                {...field}
                                onChange={e => field.onChange(parseInt(e.target.value) || 15)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="category_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories.map(category => (
                                <SelectItem key={category.id} value={category.id}>
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="is_available"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between">
                          <FormLabel>Available</FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <DialogFooter>
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {editingItem ? 'Update' : 'Add'} Item
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Menu Items by Category */}
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">
              Loading menu items...
            </div>
          ) : (
            <div className="space-y-8">
              {categories.map(category => {
                const items = menuItems.filter(item => item.category_id === category.id);
                if (items.length === 0) return null;
                
                return (
                  <div key={category.id}>
                    <h2 className="text-xl font-semibold mb-4">{category.name}</h2>
                    <div className="grid gap-4">
                      {items.map(item => (
                        <Card key={item.id} className={!item.is_available ? 'opacity-60' : ''}>
                          <CardContent className="p-4">
                            <div className="flex items-center gap-4">
                              {/* Thumbnail */}
                              <div className="w-16 h-16 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 overflow-hidden">
                                {item.image_url ? (
                                  <img
                                    src={item.image_url}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <UtensilsCrossed className="h-6 w-6 text-muted-foreground" />
                                )}
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3">
                                  <h3 className="font-medium truncate">{item.name}</h3>
                                  {!item.is_available && (
                                    <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded">
                                      Out of stock
                                    </span>
                                  )}
                                </div>
                                {item.description && (
                                  <p className="text-sm text-muted-foreground truncate">{item.description}</p>
                                )}
                              </div>
                              <div className="flex items-center gap-4">
                                <span className="font-bold">{formatPrice(item.price)}</span>
                                <Switch
                                  checked={item.is_available}
                                  onCheckedChange={() => toggleAvailability(item)}
                                />
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleEditItem(item)}
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-destructive"
                                  onClick={() => handleDeleteItem(item.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminMenu;

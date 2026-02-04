import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Layout } from '@/components/layout/Layout';
import { MenuItemCard } from '@/components/menu/MenuItemCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { MenuCategory, MenuItem } from '@/types/database';
import { Search, X } from 'lucide-react';

const Menu = () => {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    
    const [categoriesResult, itemsResult] = await Promise.all([
      supabase
        .from('menu_categories')
        .select('*')
        .order('display_order'),
      supabase
        .from('menu_items')
        .select('*')
        .order('name'),
    ]);

    if (categoriesResult.data) {
      setCategories(categoriesResult.data as MenuCategory[]);
    }
    if (itemsResult.data) {
      setMenuItems(itemsResult.data as MenuItem[]);
    }
    
    setLoading(false);
  };

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || item.category_id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const groupedItems = categories.reduce((acc, category) => {
    const items = filteredItems.filter(item => item.category_id === category.id);
    if (items.length > 0) {
      acc[category.id] = { category, items };
    }
    return acc;
  }, {} as Record<string, { category: MenuCategory; items: MenuItem[] }>);

  // Items without a category
  const uncategorizedItems = filteredItems.filter(item => !item.category_id);

  return (
    <Layout>
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Our Menu</h1>
          <p className="text-muted-foreground">
            Browse our selection of delicious meals, snacks, and beverages.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
              </button>
            )}
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={!selectedCategory ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              All
            </Button>
            {categories.map(category => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-video w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        )}

        {/* Menu Items */}
        {!loading && (
          <>
            {Object.values(groupedItems).length === 0 && uncategorizedItems.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  No items found matching your search.
                </p>
                <Button
                  variant="link"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory(null);
                  }}
                >
                  Clear filters
                </Button>
              </div>
            ) : (
              <div className="space-y-12">
                {Object.values(groupedItems).map(({ category, items }) => (
                  <section key={category.id}>
                    <div className="mb-6">
                      <h2 className="text-2xl font-semibold">{category.name}</h2>
                      {category.description && (
                        <p className="text-muted-foreground">{category.description}</p>
                      )}
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {items.map(item => (
                        <MenuItemCard key={item.id} item={item} />
                      ))}
                    </div>
                  </section>
                ))}
                
                {uncategorizedItems.length > 0 && (
                  <section>
                    <h2 className="text-2xl font-semibold mb-6">Other Items</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {uncategorizedItems.map(item => (
                        <MenuItemCard key={item.id} item={item} />
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default Menu;

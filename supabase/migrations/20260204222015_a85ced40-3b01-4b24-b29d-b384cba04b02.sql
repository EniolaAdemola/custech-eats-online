-- Create app_role enum for user roles
CREATE TYPE public.app_role AS ENUM ('customer', 'staff', 'admin');

-- Create order_status enum
CREATE TYPE public.order_status AS ENUM ('pending', 'preparing', 'ready', 'completed', 'cancelled');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  phone TEXT,
  student_staff_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'customer',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Create menu_categories table
CREATE TABLE public.menu_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create menu_items table
CREATE TABLE public.menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES public.menu_categories(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  image_url TEXT,
  is_available BOOLEAN NOT NULL DEFAULT true,
  preparation_time INTEGER DEFAULT 15,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  order_number TEXT NOT NULL UNIQUE,
  status order_status NOT NULL DEFAULT 'pending',
  special_requests TEXT,
  total_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  estimated_ready_time TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create order_items table
CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  menu_item_id UUID REFERENCES public.menu_items(id) ON DELETE SET NULL,
  item_name TEXT NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price DECIMAL(10,2) NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Security definer function to check user roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Function to get current user's profile
CREATE OR REPLACE FUNCTION public.get_current_user_id()
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT auth.uid()
$$;

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_menu_items_updated_at
  BEFORE UPDATE ON public.menu_items
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Staff can view all profiles"
  ON public.profiles FOR SELECT
  USING (public.has_role(auth.uid(), 'staff') OR public.has_role(auth.uid(), 'admin'));

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
  ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for menu_categories (public read, staff/admin write)
CREATE POLICY "Anyone can view categories"
  ON public.menu_categories FOR SELECT
  USING (true);

CREATE POLICY "Staff can manage categories"
  ON public.menu_categories FOR ALL
  USING (public.has_role(auth.uid(), 'staff') OR public.has_role(auth.uid(), 'admin'));

-- RLS Policies for menu_items (public read, staff/admin write)
CREATE POLICY "Anyone can view menu items"
  ON public.menu_items FOR SELECT
  USING (true);

CREATE POLICY "Staff can manage menu items"
  ON public.menu_items FOR ALL
  USING (public.has_role(auth.uid(), 'staff') OR public.has_role(auth.uid(), 'admin'));

-- RLS Policies for orders
CREATE POLICY "Users can view their own orders"
  ON public.orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders"
  ON public.orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Staff can view all orders"
  ON public.orders FOR SELECT
  USING (public.has_role(auth.uid(), 'staff') OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Staff can update orders"
  ON public.orders FOR UPDATE
  USING (public.has_role(auth.uid(), 'staff') OR public.has_role(auth.uid(), 'admin'));

-- RLS Policies for order_items
CREATE POLICY "Users can view their own order items"
  ON public.order_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create order items for their orders"
  ON public.order_items FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Staff can view all order items"
  ON public.order_items FOR SELECT
  USING (public.has_role(auth.uid(), 'staff') OR public.has_role(auth.uid(), 'admin'));

-- Function to generate unique order number
CREATE OR REPLACE FUNCTION public.generate_order_number()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_number TEXT;
  today_prefix TEXT;
BEGIN
  today_prefix := to_char(CURRENT_DATE, 'YYMMDD');
  SELECT today_prefix || '-' || LPAD((COALESCE(MAX(
    NULLIF(SPLIT_PART(order_number, '-', 2), '')::INTEGER
  ), 0) + 1)::TEXT, 4, '0')
  INTO new_number
  FROM public.orders
  WHERE order_number LIKE today_prefix || '-%';
  
  IF new_number IS NULL THEN
    new_number := today_prefix || '-0001';
  END IF;
  
  RETURN new_number;
END;
$$;

-- Enable realtime for orders table
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;

-- Insert default categories
INSERT INTO public.menu_categories (name, description, display_order) VALUES
  ('Main Dishes', 'Hearty main course meals', 1),
  ('Snacks', 'Light bites and quick snacks', 2),
  ('Beverages', 'Drinks and refreshments', 3),
  ('Desserts', 'Sweet treats and desserts', 4);

-- Insert sample menu items
INSERT INTO public.menu_items (category_id, name, description, price, is_available, preparation_time) VALUES
  ((SELECT id FROM public.menu_categories WHERE name = 'Main Dishes'), 'Jollof Rice with Chicken', 'Flavorful Nigerian jollof rice served with grilled chicken', 1500.00, true, 20),
  ((SELECT id FROM public.menu_categories WHERE name = 'Main Dishes'), 'Fried Rice with Beef', 'Chinese-style fried rice with tender beef strips', 1400.00, true, 18),
  ((SELECT id FROM public.menu_categories WHERE name = 'Main Dishes'), 'Spaghetti Bolognese', 'Classic Italian pasta with meat sauce', 1200.00, true, 15),
  ((SELECT id FROM public.menu_categories WHERE name = 'Main Dishes'), 'Beans and Plantain', 'Traditional beans served with fried plantain', 800.00, true, 12),
  ((SELECT id FROM public.menu_categories WHERE name = 'Snacks'), 'Meat Pie', 'Flaky pastry filled with seasoned minced meat', 350.00, true, 5),
  ((SELECT id FROM public.menu_categories WHERE name = 'Snacks'), 'Chicken Pie', 'Golden pastry with chicken filling', 400.00, true, 5),
  ((SELECT id FROM public.menu_categories WHERE name = 'Snacks'), 'Spring Rolls', 'Crispy vegetable spring rolls (3 pieces)', 500.00, true, 8),
  ((SELECT id FROM public.menu_categories WHERE name = 'Snacks'), 'Puff Puff', 'Sweet fried dough balls (6 pieces)', 300.00, true, 5),
  ((SELECT id FROM public.menu_categories WHERE name = 'Beverages'), 'Zobo Drink', 'Refreshing hibiscus drink', 200.00, true, 2),
  ((SELECT id FROM public.menu_categories WHERE name = 'Beverages'), 'Chapman', 'Nigerian cocktail mocktail', 500.00, true, 5),
  ((SELECT id FROM public.menu_categories WHERE name = 'Beverages'), 'Fresh Orange Juice', 'Freshly squeezed orange juice', 400.00, true, 5),
  ((SELECT id FROM public.menu_categories WHERE name = 'Beverages'), 'Bottled Water', 'Chilled purified water', 100.00, true, 1),
  ((SELECT id FROM public.menu_categories WHERE name = 'Desserts'), 'Chin Chin', 'Crunchy fried snack', 250.00, true, 3),
  ((SELECT id FROM public.menu_categories WHERE name = 'Desserts'), 'Ice Cream', 'Vanilla ice cream cup', 350.00, true, 2),
  ((SELECT id FROM public.menu_categories WHERE name = 'Desserts'), 'Fruit Salad', 'Fresh seasonal fruits', 450.00, true, 5);
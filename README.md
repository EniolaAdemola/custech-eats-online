# CUSTECH Eats — University Restaurant Online Ordering System

A full-featured web application that enables CUSTECH University students and staff to browse menus, place food orders online, and track their order status in real-time. Restaurant staff and administrators can manage menus, process orders, and generate reports through a dedicated dashboard.

## Features

### Customer Features
- **Menu Browsing** — View categorized meals with images, descriptions, prices, and availability
- **Shopping Cart** — Add items, adjust quantities, and add special request notes
- **Order Placement** — Simple checkout flow with generated order numbers
- **Order Tracking** — Live status updates (Pending → Preparing → Ready → Completed)
- **Order History** — View past orders with timestamps and details

### Staff & Admin Features
- **Order Management Dashboard** — View and process incoming orders in real-time
- **Order Display Screen** — Kitchen-facing display for active orders
- **Menu Management** — Add, edit, and remove menu items with image uploads
- **Category Management** — Organize menu items into categories
- **Reports** — View order statistics and sales data

### Authentication & Security
- Email-based registration and login
- Role-based access control (Customer, Staff, Admin)
- Row-Level Security (RLS) on all database tables
- Protected routes for staff and admin areas

## Tech Stack

| Layer       | Technology                          |
|-------------|-------------------------------------|
| Frontend    | React 18, TypeScript, Vite          |
| Styling     | Tailwind CSS, shadcn/ui             |
| Routing     | React Router v6                     |
| State       | React Query, React Context          |
| Backend     | Supabase (PostgreSQL + Auth)        |
| Database    | PostgreSQL with RLS policies        |
| Storage     | Supabase Storage for menu images    |
| Auth        | Email/password with role management |

## Project Structure

```
src/
├── components/
│   ├── admin/        # Admin-specific components (ImageUpload, etc.)
│   ├── auth/         # Authentication components (PasswordInput)
│   ├── layout/       # Header, Footer, Layout wrapper
│   ├── menu/         # Menu item cards
│   ├── order/        # Order status badges
│   └── ui/           # Reusable UI components (shadcn/ui)
├── contexts/
│   ├── AuthContext    # Authentication state & role management
│   └── CartContext    # Shopping cart state
├── pages/
│   ├── admin/        # Dashboard, MenuManagement, OrderDisplay, Reports
│   ├── Auth          # Sign in / Sign up
│   ├── Cart          # Shopping cart & checkout
│   ├── Index         # Landing page
│   ├── Menu          # Menu browsing
│   ├── Orders        # Order history
│   └── OrderDetail   # Individual order tracking
├── types/            # TypeScript type definitions
└── integrations/     # Backend client configuration
```

## Database Schema

| Table             | Description                                      |
|-------------------|--------------------------------------------------|
| `profiles`        | User profile information                         |
| `user_roles`      | Role assignments (customer, staff, admin)         |
| `menu_categories` | Food categories (Main Dishes, Snacks, etc.)       |
| `menu_items`      | Individual food items with pricing and images     |
| `orders`          | Customer orders with status tracking              |
| `order_items`     | Line items within each order                      |

## Getting Started

1. Visit the app at [custecheats.lovable.app](https://custecheats.lovable.app)
2. Create an account with your email
3. Browse the menu and place your first order
4. Track your order status until it's ready for pickup

### Local Development

```sh
git clone <YOUR_GIT_URL>
cd custech-eats
npm install
npm run dev
```

## User Roles

| Role     | Access                                           |
|----------|--------------------------------------------------|
| Customer | Browse menu, place orders, track order status     |
| Staff    | All customer features + manage orders and menu    |
| Admin    | All staff features + manage user roles & reports  |

## Documentation

Detailed project documentation is available in the `docs/` folder:

- **[DOCUMENTATION.md](docs/DOCUMENTATION.md)** — System design, architecture, database design, and system modelling
- **[VISUAL_DOCUMENTATION.md](docs/VISUAL_DOCUMENTATION.md)** — Visual documentation with screenshots and data flow diagrams

## License

This project was built as an academic project for CUSTECH University.

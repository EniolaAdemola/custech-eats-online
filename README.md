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

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

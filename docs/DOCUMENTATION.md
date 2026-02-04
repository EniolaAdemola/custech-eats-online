# CUSTECH University Food Delivery System
## Technical Documentation

**Project Title:** CUSTECH Eats - University Food Ordering Platform  
**Version:** 1.0  
**Date:** February 2026  
**Author:** [Your Name]

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [System Design](#2-system-design)
3. [Interface Design](#3-interface-design)
4. [Architecture Design](#4-architecture-design)
5. [System Modelling](#5-system-modelling)
6. [Database Design](#6-database-design)
7. [Security Considerations](#7-security-considerations)
8. [Testing Strategy](#8-testing-strategy)
9. [Deployment](#9-deployment)
10. [Future Enhancements](#10-future-enhancements)

---

## 1. Executive Summary

### 1.1 Project Overview

CUSTECH Eats is a full-featured web application designed to enable CUSTECH university students and staff to order food online from the campus cafeteria. The system provides restaurant staff with comprehensive order management tools, real-time order tracking, and menu management capabilities.

### 1.2 Problem Statement

Traditional campus food ordering involves:
- Long queues during peak hours
- Inefficient order processing
- No visibility into order status
- Manual order tracking prone to errors
- Limited menu visibility for customers

### 1.3 Solution

A digital food ordering platform that:
- Enables online menu browsing and ordering
- Provides real-time order status updates
- Streamlines kitchen order management
- Reduces wait times and improves customer experience
- Offers comprehensive reporting for management

### 1.4 Key Features

| Feature | Description |
|---------|-------------|
| User Authentication | Secure login/signup with email verification |
| Menu Browsing | Categorized menu with search and filter |
| Shopping Cart | Add items, customize orders, manage quantities |
| Order Placement | Streamlined checkout with order confirmation |
| Order Tracking | Real-time status updates (Pending → Preparing → Ready) |
| Admin Dashboard | Order management, menu editing, sales reports |
| Order Display Board | Kitchen display for order queue management |

---

## 2. System Design

### 2.1 System Overview

The CUSTECH Eats system follows a client-server architecture with a React-based frontend and a Backend-as-a-Service (BaaS) powered by Supabase for data persistence, authentication, and real-time capabilities.

### 2.2 System Context Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        CUSTECH Eats System                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐    │
│  │   Customer   │     │    Staff     │     │    Admin     │    │
│  │    Portal    │     │   Dashboard  │     │   Console    │    │
│  └──────┬───────┘     └──────┬───────┘     └──────┬───────┘    │
│         │                    │                    │             │
│         └────────────────────┼────────────────────┘             │
│                              │                                   │
│                    ┌─────────▼─────────┐                        │
│                    │   React Frontend  │                        │
│                    │   (SPA with Vite) │                        │
│                    └─────────┬─────────┘                        │
│                              │                                   │
│                    ┌─────────▼─────────┐                        │
│                    │  Supabase Backend │                        │
│                    │  - PostgreSQL DB  │                        │
│                    │  - Auth Service   │                        │
│                    │  - Storage        │                        │
│                    │  - Realtime       │                        │
│                    └───────────────────┘                        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 2.3 User Roles

| Role | Description | Permissions |
|------|-------------|-------------|
| **Customer** | Students and staff ordering food | Browse menu, place orders, view own order history |
| **Staff** | Kitchen and counter personnel | Manage orders, update order status, manage menu |
| **Admin** | System administrators | All staff permissions + user management, reports |

### 2.4 Functional Requirements

#### Customer Requirements
- FR-C01: Users shall be able to register with email and password
- FR-C02: Users shall be able to browse the menu by category
- FR-C03: Users shall be able to search for menu items
- FR-C04: Users shall be able to add items to cart with quantity
- FR-C05: Users shall be able to add special requests to orders
- FR-C06: Users shall be able to view their order history
- FR-C07: Users shall be able to track current order status

#### Staff Requirements
- FR-S01: Staff shall be able to view all incoming orders
- FR-S02: Staff shall be able to update order status
- FR-S03: Staff shall be able to add/edit/delete menu items
- FR-S04: Staff shall be able to manage menu categories
- FR-S05: Staff shall be able to toggle item availability

#### Admin Requirements
- FR-A01: Admins shall be able to view sales reports
- FR-A02: Admins shall be able to manage user roles
- FR-A03: Admins shall be able to access order display board

### 2.5 Non-Functional Requirements

| Requirement | Specification |
|-------------|---------------|
| **Performance** | Page load time < 3 seconds |
| **Availability** | 99% uptime during operating hours |
| **Scalability** | Support 100+ concurrent users |
| **Security** | Encrypted data transmission (HTTPS) |
| **Usability** | Mobile-responsive design |
| **Accessibility** | WCAG 2.1 Level AA compliance |

---

## 3. Interface Design

### 3.1 Design Principles

- **Simplicity**: Clean, uncluttered interfaces
- **Consistency**: Uniform design patterns across all pages
- **Accessibility**: High contrast, readable fonts, touch-friendly
- **Responsiveness**: Mobile-first design approach

### 3.2 Color Palette

| Color | HSL Value | Usage |
|-------|-----------|-------|
| Primary Blue | `221.2 83.2% 53.3%` | Primary buttons, links, headers |
| Secondary | `210 40% 96.1%` | Secondary backgrounds |
| Accent | `210 40% 96.1%` | Highlights, hover states |
| Background | `0 0% 100%` | Page backgrounds |
| Foreground | `222.2 84% 4.9%` | Text content |
| Muted | `210 40% 96.1%` | Subtle backgrounds |
| Destructive | `0 84.2% 60.2%` | Error states, delete actions |

### 3.3 Order Status Color Coding

| Status | Color | Visual Indicator |
|--------|-------|------------------|
| Pending | Yellow/Amber | Order received, awaiting preparation |
| Preparing | Blue | Kitchen is working on order |
| Ready | Green | Order ready for pickup |
| Completed | Gray | Order picked up |
| Cancelled | Red | Order cancelled |

### 3.4 Page Layouts

#### 3.4.1 Landing Page (`/`)
```
┌────────────────────────────────────────┐
│              HEADER/NAV                │
├────────────────────────────────────────┤
│                                        │
│            HERO SECTION                │
│     "Order Your Favorite Meals"        │
│      [Browse Menu] [My Orders]         │
│                                        │
├────────────────────────────────────────┤
│          FEATURES SECTION              │
│  ┌──────┐  ┌──────┐  ┌──────┐         │
│  │ Fast │  │Fresh │  │Track │         │
│  │Orders│  │ Food │  │Order │         │
│  └──────┘  └──────┘  └──────┘         │
├────────────────────────────────────────┤
│              FOOTER                    │
└────────────────────────────────────────┘
```

#### 3.4.2 Menu Page (`/menu`)
```
┌────────────────────────────────────────┐
│              HEADER/NAV                │
├────────────────────────────────────────┤
│  [Search Bar]           [Cart Icon]    │
├────────────────────────────────────────┤
│  CATEGORIES: [All] [Main] [Snacks]...  │
├────────────────────────────────────────┤
│  ┌─────────┐  ┌─────────┐  ┌─────────┐│
│  │  Item   │  │  Item   │  │  Item   ││
│  │ [Image] │  │ [Image] │  │ [Image] ││
│  │  Name   │  │  Name   │  │  Name   ││
│  │  Price  │  │  Price  │  │  Price  ││
│  │ [Add]   │  │ [Add]   │  │ [Add]   ││
│  └─────────┘  └─────────┘  └─────────┘│
├────────────────────────────────────────┤
│              FOOTER                    │
└────────────────────────────────────────┘
```

#### 3.4.3 Admin Dashboard (`/admin`)
```
┌────────────────────────────────────────┐
│              HEADER/NAV                │
├──────────┬─────────────────────────────┤
│          │     DASHBOARD STATS         │
│  SIDEBAR │  ┌─────┐ ┌─────┐ ┌─────┐   │
│          │  │Total│ │Pend │ │Ready│   │
│ Dashboard│  │Order│ │ ing │ │     │   │
│ Menu     │  └─────┘ └─────┘ └─────┘   │
│ Reports  ├─────────────────────────────┤
│ Display  │     ORDER LIST/TABLE        │
│          │  ┌─────────────────────┐    │
│          │  │ Order # | Status    │    │
│          │  │ #001    | Pending   │    │
│          │  │ #002    | Preparing │    │
│          │  └─────────────────────┘    │
└──────────┴─────────────────────────────┘
```

### 3.5 Component Library

The application uses **shadcn/ui** component library built on **Radix UI** primitives:

| Component | Usage |
|-----------|-------|
| Button | Primary actions, navigation |
| Card | Menu items, order cards |
| Dialog | Add/edit forms, confirmations |
| Table | Order lists, reports |
| Badge | Status indicators |
| Input | Form fields |
| Select | Category selection, filters |
| Tabs | Content organization |
| Toast | Notifications, alerts |

---

## 4. Architecture Design

### 4.1 Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | React 18 | UI library |
| | TypeScript | Type safety |
| | Vite | Build tool |
| | Tailwind CSS | Styling |
| | React Router | Navigation |
| | TanStack Query | Server state management |
| **Backend** | Supabase | Backend-as-a-Service |
| | PostgreSQL | Database |
| | Row Level Security | Data protection |
| **Infrastructure** | Lovable Cloud | Hosting & deployment |

### 4.2 Application Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                        │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐        │
│  │  Pages  │  │Components│  │  Hooks  │  │Contexts │        │
│  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘        │
│       └────────────┴────────────┴────────────┘              │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│                     SERVICE LAYER                            │
│  ┌──────────────────┐  ┌──────────────────┐                 │
│  │  Supabase Client │  │  TanStack Query  │                 │
│  │  (API Calls)     │  │  (Caching)       │                 │
│  └────────┬─────────┘  └────────┬─────────┘                 │
│           └─────────────────────┘                           │
└─────────────────────────┬───────────────────────────────────┘
                          │ HTTPS
┌─────────────────────────▼───────────────────────────────────┐
│                    SUPABASE BACKEND                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │   Auth   │  │ Database │  │ Storage  │  │ Realtime │    │
│  │ Service  │  │(Postgres)│  │ (Files)  │  │(WebSocket│    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### 4.3 Folder Structure

```
src/
├── components/
│   ├── admin/           # Admin-specific components
│   │   └── ImageUpload.tsx
│   ├── layout/          # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Layout.tsx
│   ├── menu/            # Menu components
│   │   └── MenuItemCard.tsx
│   ├── order/           # Order components
│   │   └── OrderStatusBadge.tsx
│   └── ui/              # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       └── ...
├── contexts/
│   ├── AuthContext.tsx  # Authentication state
│   └── CartContext.tsx  # Shopping cart state
├── hooks/
│   ├── use-mobile.tsx   # Mobile detection
│   └── use-toast.ts     # Toast notifications
├── integrations/
│   └── supabase/
│       ├── client.ts    # Supabase client
│       └── types.ts     # Generated types
├── lib/
│   └── utils.ts         # Utility functions
├── pages/
│   ├── admin/           # Admin pages
│   │   ├── Dashboard.tsx
│   │   ├── MenuManagement.tsx
│   │   ├── OrderDisplay.tsx
│   │   └── Reports.tsx
│   ├── Auth.tsx         # Login/Register
│   ├── Cart.tsx         # Shopping cart
│   ├── Index.tsx        # Landing page
│   ├── Menu.tsx         # Menu browsing
│   ├── Orders.tsx       # Order history
│   └── OrderDetail.tsx  # Single order view
├── types/
│   └── database.ts      # TypeScript types
├── App.tsx              # Root component
├── main.tsx             # Entry point
└── index.css            # Global styles
```

### 4.4 State Management

| State Type | Solution | Usage |
|------------|----------|-------|
| Server State | TanStack Query | API data caching, sync |
| Auth State | React Context | User session |
| Cart State | React Context | Shopping cart items |
| UI State | React useState | Component-level state |

### 4.5 API Communication

All API calls use the Supabase JavaScript client:

```typescript
// Example: Fetching menu items
const { data, error } = await supabase
  .from('menu_items')
  .select('*, menu_categories(name)')
  .eq('is_available', true)
  .order('name');
```

---

## 5. System Modelling

### 5.1 Use Case Diagram

```
                    CUSTECH Eats System
    ┌──────────────────────────────────────────────┐
    │                                              │
    │    ┌────────────────────────────────┐       │
    │    │       Browse Menu              │       │
    │    └────────────────────────────────┘       │
    │              ▲                              │
    │              │                              │
┌───────┐    ┌─────┴─────┐                       │
│       │    │           │    ┌────────────────┐ │
│Customer├────┤ Add to   ├────┤ Place Order    │ │
│       │    │  Cart     │    └───────┬────────┘ │
└───────┘    └───────────┘            │          │
    │              │           ┌──────▼────────┐ │
    │              │           │ Track Order   │ │
    │              │           └───────────────┘ │
    │    ┌─────────▼──────────────────────┐     │
    │    │        View Order History       │     │
    │    └─────────────────────────────────┘     │
    │                                             │
    │    ┌────────────────────────────────┐      │
    │    │      Manage Orders             │      │
    │    └────────────────────────────────┘      │
    │              ▲                              │
    │              │                              │
┌───────┐    ┌─────┴─────┐                       │
│       │    │ Update    │    ┌────────────────┐ │
│ Staff ├────┤ Order     ├────┤ Manage Menu    │ │
│       │    │ Status    │    └────────────────┘ │
└───────┘    └───────────┘                       │
    │                                             │
    │    ┌────────────────────────────────┐      │
    │    │      View Reports              │      │
    │    └────────────────────────────────┘      │
    │              ▲                              │
┌───────┐         │                              │
│       │─────────┘                              │
│ Admin │                                        │
│       │    ┌────────────────────────────┐     │
└───────┘    │      Manage Users          │     │
             └────────────────────────────┘     │
    │                                             │
    └─────────────────────────────────────────────┘
```

### 5.2 Sequence Diagrams

#### 5.2.1 Order Placement Flow

```
Customer          Frontend           Supabase           Database
    │                 │                  │                  │
    │  Browse Menu    │                  │                  │
    │────────────────>│                  │                  │
    │                 │  GET menu_items  │                  │
    │                 │─────────────────>│                  │
    │                 │                  │  SELECT query    │
    │                 │                  │─────────────────>│
    │                 │                  │<─────────────────│
    │                 │<─────────────────│                  │
    │  Display Menu   │                  │                  │
    │<────────────────│                  │                  │
    │                 │                  │                  │
    │  Add to Cart    │                  │                  │
    │────────────────>│                  │                  │
    │  Cart Updated   │  (Local State)   │                  │
    │<────────────────│                  │                  │
    │                 │                  │                  │
    │  Place Order    │                  │                  │
    │────────────────>│                  │                  │
    │                 │  INSERT order    │                  │
    │                 │─────────────────>│                  │
    │                 │                  │  INSERT query    │
    │                 │                  │─────────────────>│
    │                 │                  │<─────────────────│
    │                 │  INSERT items    │                  │
    │                 │─────────────────>│                  │
    │                 │                  │  INSERT query    │
    │                 │                  │─────────────────>│
    │                 │                  │<─────────────────│
    │                 │<─────────────────│                  │
    │  Order Confirm  │                  │                  │
    │<────────────────│                  │                  │
    │                 │                  │                  │
```

#### 5.2.2 Order Status Update Flow

```
Staff             Frontend           Supabase           Database
    │                 │                  │                  │
    │  View Orders    │                  │                  │
    │────────────────>│                  │                  │
    │                 │  GET orders      │                  │
    │                 │─────────────────>│                  │
    │                 │                  │  SELECT query    │
    │                 │                  │─────────────────>│
    │                 │                  │<─────────────────│
    │                 │<─────────────────│                  │
    │  Order List     │                  │                  │
    │<────────────────│                  │                  │
    │                 │                  │                  │
    │  Update Status  │                  │                  │
    │────────────────>│                  │                  │
    │                 │  UPDATE order    │                  │
    │                 │─────────────────>│                  │
    │                 │                  │  UPDATE query    │
    │                 │                  │─────────────────>│
    │                 │                  │<─────────────────│
    │                 │<─────────────────│                  │
    │  Status Updated │                  │                  │
    │<────────────────│                  │                  │
    │                 │                  │                  │
```

### 5.3 Activity Diagram - Order Process

```
┌─────────────────────────────────────────────────────────────┐
│                     ORDER PROCESS FLOW                       │
└─────────────────────────────────────────────────────────────┘
                            │
                    ┌───────▼───────┐
                    │     Start     │
                    └───────┬───────┘
                            │
                    ┌───────▼───────┐
                    │  Browse Menu  │
                    └───────┬───────┘
                            │
                    ┌───────▼───────┐
                    │ Select Items  │
                    └───────┬───────┘
                            │
                    ┌───────▼───────┐
                    │  Add to Cart  │
                    └───────┬───────┘
                            │
               ┌────────────┴────────────┐
               ▼                         ▼
        ┌─────────────┐           ┌─────────────┐
        │ Continue    │           │  Checkout   │
        │ Shopping    │           │             │
        └──────┬──────┘           └──────┬──────┘
               │                         │
               └────────────┬────────────┘
                            │
                    ┌───────▼───────┐
                    │ User Logged   │──No──┐
                    │     In?       │      │
                    └───────┬───────┘      │
                         Yes│              │
                            │      ┌───────▼───────┐
                            │      │    Login /    │
                            │      │   Register    │
                            │      └───────┬───────┘
                            │              │
                    ┌───────▼──────────────┘
                    │
                    ▼
            ┌───────────────┐
            │ Review Cart   │
            └───────┬───────┘
                    │
            ┌───────▼───────┐
            │ Place Order   │
            └───────┬───────┘
                    │
            ┌───────▼───────┐
            │Order Created  │
            │Status: PENDING│
            └───────┬───────┘
                    │
            ┌───────▼───────┐
            │ Staff Reviews │
            └───────┬───────┘
                    │
            ┌───────▼───────┐
            │Status: PREPAR-│
            │     ING       │
            └───────┬───────┘
                    │
            ┌───────▼───────┐
            │ Food Ready    │
            └───────┬───────┘
                    │
            ┌───────▼───────┐
            │ Status: READY │
            └───────┬───────┘
                    │
            ┌───────▼───────┐
            │Customer Pickup│
            └───────┬───────┘
                    │
            ┌───────▼───────┐
            │Status: COMPLE-│
            │     TED       │
            └───────┬───────┘
                    │
            ┌───────▼───────┐
            │      End      │
            └───────────────┘
```

### 5.4 State Diagram - Order Status

```
                    ┌─────────────────────────────────────┐
                    │          ORDER STATES               │
                    └─────────────────────────────────────┘

                              ┌─────────┐
                              │ PENDING │
                              └────┬────┘
                                   │
                    ┌──────────────┼──────────────┐
                    │              │              │
                    ▼              ▼              │
             ┌───────────┐  ┌───────────┐        │
             │ CANCELLED │  │ PREPARING │        │
             └───────────┘  └─────┬─────┘        │
                                  │              │
                                  ▼              │
                            ┌───────────┐        │
                            │   READY   │◄───────┘
                            └─────┬─────┘   (can skip preparing)
                                  │
                                  ▼
                            ┌───────────┐
                            │ COMPLETED │
                            └───────────┘
```

---

## 6. Database Design

### 6.1 Entity-Relationship Diagram (ERD)

```
┌─────────────────────────────────────────────────────────────────────┐
│                    DATABASE SCHEMA                                   │
└─────────────────────────────────────────────────────────────────────┘

┌──────────────────┐         ┌──────────────────┐
│   auth.users     │         │     profiles     │
├──────────────────┤         ├──────────────────┤
│ id (PK, UUID)    │◄───────┤ user_id (FK)     │
│ email            │    1:1  │ id (PK, UUID)    │
│ created_at       │         │ full_name        │
│ ...              │         │ phone            │
└──────────────────┘         │ student_staff_id │
         │                   │ created_at       │
         │                   │ updated_at       │
         │                   └──────────────────┘
         │
         │ 1:N    ┌──────────────────┐
         └───────►│    user_roles    │
                  ├──────────────────┤
                  │ id (PK, UUID)    │
                  │ user_id (FK)     │
                  │ role (ENUM)      │
                  │ created_at       │
                  └──────────────────┘

┌──────────────────┐         ┌──────────────────┐
│ menu_categories  │         │    menu_items    │
├──────────────────┤         ├──────────────────┤
│ id (PK, UUID)    │◄───────┤ category_id (FK) │
│ name             │    1:N  │ id (PK, UUID)    │
│ description      │         │ name             │
│ display_order    │         │ description      │
│ created_at       │         │ price            │
└──────────────────┘         │ image_url        │
                             │ is_available     │
                             │ preparation_time │
                             │ created_at       │
                             │ updated_at       │
                             └────────┬─────────┘
                                      │
         ┌────────────────────────────┘
         │ 1:N
         ▼
┌──────────────────┐         ┌──────────────────┐
│     orders       │         │   order_items    │
├──────────────────┤         ├──────────────────┤
│ id (PK, UUID)    │◄───────┤ order_id (FK)    │
│ user_id (FK)     │    1:N  │ id (PK, UUID)    │
│ order_number     │         │ menu_item_id(FK) │
│ status (ENUM)    │         │ item_name        │
│ special_requests │         │ quantity         │
│ total_amount     │         │ unit_price       │
│ estimated_ready  │         │ notes            │
│ created_at       │         │ created_at       │
│ updated_at       │         └──────────────────┘
└──────────────────┘
```

### 6.2 Table Definitions

#### 6.2.1 profiles
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, DEFAULT gen_random_uuid() | Unique identifier |
| user_id | UUID | FK → auth.users, NOT NULL, UNIQUE | Reference to auth user |
| full_name | TEXT | NOT NULL | User's display name |
| phone | TEXT | NULL | Contact number |
| student_staff_id | TEXT | NULL | University ID |
| created_at | TIMESTAMPTZ | DEFAULT now() | Creation timestamp |
| updated_at | TIMESTAMPTZ | DEFAULT now() | Last update timestamp |

#### 6.2.2 user_roles
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, DEFAULT gen_random_uuid() | Unique identifier |
| user_id | UUID | FK → auth.users, NOT NULL | Reference to auth user |
| role | app_role | DEFAULT 'customer' | User role (enum) |
| created_at | TIMESTAMPTZ | DEFAULT now() | Creation timestamp |

**Enum: app_role**
- `customer` - Regular users who place orders
- `staff` - Kitchen/counter staff who manage orders
- `admin` - System administrators

#### 6.2.3 menu_categories
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, DEFAULT gen_random_uuid() | Unique identifier |
| name | TEXT | NOT NULL | Category name |
| description | TEXT | NULL | Category description |
| display_order | INTEGER | DEFAULT 0 | Sort order |
| created_at | TIMESTAMPTZ | DEFAULT now() | Creation timestamp |

#### 6.2.4 menu_items
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, DEFAULT gen_random_uuid() | Unique identifier |
| category_id | UUID | FK → menu_categories, NULL | Category reference |
| name | TEXT | NOT NULL | Item name |
| description | TEXT | NULL | Item description |
| price | NUMERIC | NOT NULL | Item price |
| image_url | TEXT | NULL | Image storage URL |
| is_available | BOOLEAN | DEFAULT true | Availability status |
| preparation_time | INTEGER | DEFAULT 15 | Prep time in minutes |
| created_at | TIMESTAMPTZ | DEFAULT now() | Creation timestamp |
| updated_at | TIMESTAMPTZ | DEFAULT now() | Last update timestamp |

#### 6.2.5 orders
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, DEFAULT gen_random_uuid() | Unique identifier |
| user_id | UUID | FK → auth.users, NULL | Customer reference |
| order_number | TEXT | NOT NULL | Display order number |
| status | order_status | DEFAULT 'pending' | Order status (enum) |
| special_requests | TEXT | NULL | Special instructions |
| total_amount | NUMERIC | DEFAULT 0 | Order total |
| estimated_ready_time | TIMESTAMPTZ | NULL | Expected completion |
| created_at | TIMESTAMPTZ | DEFAULT now() | Order placement time |
| updated_at | TIMESTAMPTZ | DEFAULT now() | Last update timestamp |

**Enum: order_status**
- `pending` - Order placed, awaiting confirmation
- `preparing` - Kitchen is preparing order
- `ready` - Order ready for pickup
- `completed` - Order picked up by customer
- `cancelled` - Order cancelled

#### 6.2.6 order_items
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, DEFAULT gen_random_uuid() | Unique identifier |
| order_id | UUID | FK → orders, NOT NULL | Order reference |
| menu_item_id | UUID | FK → menu_items, NULL | Menu item reference |
| item_name | TEXT | NOT NULL | Item name snapshot |
| quantity | INTEGER | NOT NULL | Number of items |
| unit_price | NUMERIC | NOT NULL | Price snapshot |
| notes | TEXT | NULL | Item-specific notes |
| created_at | TIMESTAMPTZ | DEFAULT now() | Creation timestamp |

### 6.3 Database Functions

#### 6.3.1 generate_order_number()
Generates unique order numbers in format `YYMMDD-0001`:
```sql
CREATE OR REPLACE FUNCTION public.generate_order_number()
RETURNS text AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

#### 6.3.2 has_role()
Checks if user has a specific role:
```sql
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$ LANGUAGE sql STABLE SECURITY DEFINER;
```

### 6.4 Row Level Security (RLS) Policies

#### 6.4.1 profiles
| Policy | Command | Expression |
|--------|---------|------------|
| Users can view own profile | SELECT | `auth.uid() = user_id` |
| Users can create own profile | INSERT | `auth.uid() = user_id` |
| Users can update own profile | UPDATE | `auth.uid() = user_id` |
| Staff can view all profiles | SELECT | `has_role(auth.uid(), 'staff') OR has_role(auth.uid(), 'admin')` |

#### 6.4.2 orders
| Policy | Command | Expression |
|--------|---------|------------|
| Users can view own orders | SELECT | `auth.uid() = user_id` |
| Users can create own orders | INSERT | `auth.uid() = user_id` |
| Staff can view all orders | SELECT | `has_role(auth.uid(), 'staff') OR has_role(auth.uid(), 'admin')` |
| Staff can update orders | UPDATE | `has_role(auth.uid(), 'staff') OR has_role(auth.uid(), 'admin')` |

#### 6.4.3 menu_items
| Policy | Command | Expression |
|--------|---------|------------|
| Anyone can view menu items | SELECT | `true` |
| Staff can manage menu items | ALL | `has_role(auth.uid(), 'staff') OR has_role(auth.uid(), 'admin')` |

### 6.5 Storage Buckets

| Bucket | Public | Purpose |
|--------|--------|---------|
| menu-images | Yes | Menu item photos |

**Storage Policies:**
- SELECT: Public access for all images
- INSERT/UPDATE/DELETE: Staff and admin only

---

## 7. Security Considerations

### 7.1 Authentication

- Email/password authentication via Supabase Auth
- Email verification required before login
- Secure password storage (bcrypt hashing)
- JWT tokens for session management

### 7.2 Authorization

- Role-based access control (RBAC)
- Three roles: customer, staff, admin
- Row Level Security (RLS) on all tables
- Server-side role verification

### 7.3 Data Protection

| Measure | Implementation |
|---------|----------------|
| Encryption in Transit | HTTPS/TLS for all communications |
| Encryption at Rest | Supabase managed encryption |
| SQL Injection | Parameterized queries via Supabase SDK |
| XSS Prevention | React's built-in escaping |
| CSRF Protection | Supabase token-based auth |

### 7.4 Security Best Practices

1. **Principle of Least Privilege**: Users only access what they need
2. **Input Validation**: All user inputs validated client and server-side
3. **Secure Defaults**: RLS enabled on all tables by default
4. **Audit Trail**: Timestamps on all records for tracking

---

## 8. Testing Strategy

### 8.1 Testing Levels

| Level | Scope | Tools |
|-------|-------|-------|
| Unit Testing | Individual functions | Vitest |
| Component Testing | React components | Vitest + Testing Library |
| Integration Testing | API calls, auth flows | Vitest |
| E2E Testing | Full user flows | Manual / Browser automation |

### 8.2 Test Coverage Areas

- User registration and login
- Menu browsing and filtering
- Cart operations (add, remove, update)
- Order placement and confirmation
- Order status updates
- Admin operations

### 8.3 Test Cases (Sample)

| ID | Test Case | Expected Result |
|----|-----------|-----------------|
| TC-001 | User can register with valid email | Account created, verification email sent |
| TC-002 | User can browse menu without login | Menu items displayed |
| TC-003 | User can add item to cart | Item appears in cart with quantity |
| TC-004 | Logged-in user can place order | Order created with order number |
| TC-005 | Staff can update order status | Status changes, customer sees update |

---

## 9. Deployment

### 9.1 Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    PRODUCTION ENVIRONMENT                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   ┌─────────────┐          ┌─────────────────────────┐     │
│   │   Lovable   │          │      Supabase Cloud     │     │
│   │   Hosting   │◄────────►│  ┌─────────────────┐   │     │
│   │             │   HTTPS  │  │    PostgreSQL   │   │     │
│   │  React SPA  │          │  └─────────────────┘   │     │
│   │             │          │  ┌─────────────────┐   │     │
│   └─────────────┘          │  │   Auth Service  │   │     │
│                            │  └─────────────────┘   │     │
│                            │  ┌─────────────────┐   │     │
│                            │  │     Storage     │   │     │
│                            │  └─────────────────┘   │     │
│                            └─────────────────────────┘     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 9.2 Deployment Process

1. **Development**: Code changes in Lovable editor
2. **Preview**: Automatic preview deployment for testing
3. **Production**: Click "Publish" to deploy to production

### 9.3 Environment Configuration

| Variable | Purpose |
|----------|---------|
| VITE_SUPABASE_URL | Supabase project URL |
| VITE_SUPABASE_PUBLISHABLE_KEY | Public API key |

---

## 10. Future Enhancements

### 10.1 Phase 2 Features

- [ ] Push notifications for order status
- [ ] Payment integration (card, mobile money)
- [ ] Meal scheduling (pre-orders)
- [ ] Loyalty points program
- [ ] Dietary preferences filtering

### 10.2 Phase 3 Features

- [ ] Multi-language support
- [ ] Native mobile applications (iOS/Android)
- [ ] Integration with university systems
- [ ] Advanced analytics dashboard
- [ ] Inventory management

### 10.3 Technical Improvements

- [ ] Implement real-time updates with WebSockets
- [ ] Add comprehensive error tracking
- [ ] Performance optimization (code splitting)
- [ ] Progressive Web App (PWA) support
- [ ] Automated testing pipeline

---

## Appendix

### A. Glossary

| Term | Definition |
|------|------------|
| RLS | Row Level Security - database-level access control |
| SPA | Single Page Application |
| JWT | JSON Web Token - authentication token format |
| BaaS | Backend as a Service |
| UUID | Universally Unique Identifier |

### B. References

- React Documentation: https://react.dev
- Supabase Documentation: https://supabase.com/docs
- Tailwind CSS: https://tailwindcss.com
- shadcn/ui: https://ui.shadcn.com

---

**Document Version History**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | February 2026 | [Your Name] | Initial documentation |

---

*This document is part of the CUSTECH Eats project submission for [Course Name/Code].*

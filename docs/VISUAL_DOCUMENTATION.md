# CUSTECH Eats - Visual Documentation
## Website Flow & Design Guide

**Project:** CUSTECH University Food Delivery System  
**Version:** 1.0  
**Date:** February 2026

---

## Table of Contents

1. [Application Screens Overview](#1-application-screens-overview)
2. [User Interface Flows](#2-user-interface-flows)
3. [Screen Wireframes](#3-screen-wireframes)
4. [Navigation Structure](#4-navigation-structure)
5. [Component Design](#5-component-design)
6. [Responsive Design](#6-responsive-design)

---

## 1. Application Screens Overview

### 1.1 Public Pages (No Login Required)

| Screen | Route | Purpose |
|--------|-------|---------|
| Landing Page | `/` | Welcome page with call-to-action |
| Menu | `/menu` | Browse food items and add to cart |
| Authentication | `/auth` | Login and registration |

### 1.2 Customer Pages (Login Required)

| Screen | Route | Purpose |
|--------|-------|---------|
| Shopping Cart | `/cart` | Review and place order |
| My Orders | `/orders` | View order history |
| Order Detail | `/orders/:id` | Track specific order |

### 1.3 Admin/Staff Pages (Staff Role Required)

| Screen | Route | Purpose |
|--------|-------|---------|
| Dashboard | `/admin` | Order management hub |
| Menu Management | `/admin/menu` | Add/edit/delete menu items |
| Reports | `/admin/reports` | Sales and analytics |
| Order Display | `/admin/display` | Kitchen display board |

---

## 2. User Interface Flows

### 2.1 Customer Order Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        CUSTOMER ORDER FLOW                               │
└─────────────────────────────────────────────────────────────────────────┘

    ┌───────────┐
    │   START   │
    └─────┬─────┘
          │
          ▼
    ┌───────────────────┐
    │   Landing Page    │
    │        (/)        │
    │                   │
    │  ┌─────────────┐  │
    │  │ Browse Menu │  │
    │  │   Button    │  │
    │  └──────┬──────┘  │
    └─────────┼─────────┘
              │
              ▼
    ┌───────────────────┐
    │    Menu Page      │
    │     (/menu)       │
    │                   │
    │  • View categories│
    │  • Search items   │
    │  • Filter options │
    │  • Add to cart    │
    │                   │
    │  ┌─────────────┐  │
    │  │  Add Item   │  │
    │  │  to Cart    │  │
    │  └──────┬──────┘  │
    └─────────┼─────────┘
              │
              ▼
    ┌───────────────────┐
    │   Cart Badge      │
    │   Updates         │
    │                   │
    │  ┌─────────────┐  │
    │  │ View Cart   │  │
    │  │   Button    │  │
    │  └──────┬──────┘  │
    └─────────┼─────────┘
              │
              ▼
    ┌───────────────────┐         ┌───────────────────┐
    │    Cart Page      │         │   Auth Page       │
    │     (/cart)       │         │    (/auth)        │
    │                   │         │                   │
    │  • Item list      │         │  • Login form     │
    │  • Quantities     │  ─────► │  • Register form  │
    │  • Total price    │  (if    │  • Password reset │
    │  • Special notes  │  not    │                   │
    │                   │  logged │                   │
    │  ┌─────────────┐  │  in)    └─────────┬─────────┘
    │  │ Place Order │  │                   │
    │  │   Button    │  │◄──────────────────┘
    │  └──────┬──────┘  │      (after login)
    └─────────┼─────────┘
              │
              ▼
    ┌───────────────────┐
    │  Order Confirmed  │
    │                   │
    │  • Order number   │
    │  • Order summary  │
    │  • Status: Pending│
    │                   │
    │  ┌─────────────┐  │
    │  │ Track Order │  │
    │  └──────┬──────┘  │
    └─────────┼─────────┘
              │
              ▼
    ┌───────────────────┐
    │  Order Detail     │
    │  (/orders/:id)    │
    │                   │
    │  • Live status    │
    │  • Order items    │
    │  • Pickup info    │
    │                   │
    │  Status Updates:  │
    │  ┌─────────────┐  │
    │  │  PENDING    │  │
    │  │     ↓       │  │
    │  │  PREPARING  │  │
    │  │     ↓       │  │
    │  │   READY     │  │
    │  │     ↓       │  │
    │  │  COMPLETED  │  │
    │  └─────────────┘  │
    └───────────────────┘
              │
              ▼
    ┌───────────┐
    │    END    │
    └───────────┘
```

### 2.2 Staff Order Management Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     STAFF ORDER MANAGEMENT FLOW                          │
└─────────────────────────────────────────────────────────────────────────┘

    ┌───────────┐
    │   START   │
    │ (Staff    │
    │  Login)   │
    └─────┬─────┘
          │
          ▼
    ┌───────────────────┐
    │  Admin Dashboard  │
    │     (/admin)      │
    │                   │
    │  ┌─────────────┐  │
    │  │   Stats     │  │
    │  │ • Total     │  │
    │  │ • Pending   │  │
    │  │ • Ready     │  │
    │  └─────────────┘  │
    │                   │
    │  ┌─────────────┐  │
    │  │ Order Queue │  │
    │  └──────┬──────┘  │
    └─────────┼─────────┘
              │
              ▼
    ┌───────────────────┐
    │  Incoming Order   │
    │  Status: PENDING  │
    │                   │
    │  ┌─────────────┐  │
    │  │   Accept    │  │
    │  │   Order     │  │
    │  └──────┬──────┘  │
    └─────────┼─────────┘
              │
              ▼
    ┌───────────────────┐
    │  Kitchen Prep     │
    │  Status: PREPARING│
    │                   │
    │  • View items     │
    │  • Special notes  │
    │  • Prep time      │
    │                   │
    │  ┌─────────────┐  │
    │  │ Mark Ready  │  │
    │  └──────┬──────┘  │
    └─────────┼─────────┘
              │
              ▼
    ┌───────────────────┐
    │  Ready for Pickup │
    │  Status: READY    │
    │                   │
    │  • Shows on       │
    │    display board  │
    │  • Customer       │
    │    notified       │
    │                   │
    │  ┌─────────────┐  │
    │  │  Complete   │  │
    │  │   Order     │  │
    │  └──────┬──────┘  │
    └─────────┼─────────┘
              │
              ▼
    ┌───────────────────┐
    │  Order Completed  │
    │  Status: COMPLETED│
    │                   │
    │  • Archived       │
    │  • In reports     │
    └───────────────────┘
```

### 2.3 Menu Management Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                       MENU MANAGEMENT FLOW                               │
└─────────────────────────────────────────────────────────────────────────┘

    ┌───────────────────┐
    │  Menu Management  │
    │   (/admin/menu)   │
    └─────────┬─────────┘
              │
    ┌─────────┴─────────┐
    │                   │
    ▼                   ▼
┌─────────────┐   ┌─────────────┐
│ Categories  │   │ Menu Items  │
│ Management  │   │ Management  │
└──────┬──────┘   └──────┬──────┘
       │                 │
       ▼                 ▼
┌─────────────┐   ┌─────────────────────────────────┐
│ • Add new   │   │ • Add new item                  │
│ • Edit name │   │ • Upload image                  │
│ • Delete    │   │ • Set price                     │
│ • Reorder   │   │ • Add description               │
└─────────────┘   │ • Assign category               │
                  │ • Set preparation time          │
                  │ • Toggle availability           │
                  │ • Edit existing                 │
                  │ • Delete item                   │
                  └─────────────────────────────────┘
```

---

## 3. Screen Wireframes

### 3.1 Landing Page (/)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  ┌──────┐                                    [Login] [Register]         │
│  │ LOGO │   CUSTECH Eats                                                │
│  └──────┘                                                               │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│                                                                         │
│                    ╔═══════════════════════════════╗                    │
│                    ║                               ║                    │
│                    ║   🍽️  CUSTECH Eats            ║                    │
│                    ║                               ║                    │
│                    ║   Order Your Favorite         ║                    │
│                    ║   Campus Meals Online         ║                    │
│                    ║                               ║                    │
│                    ║   Fresh food, quick pickup,   ║                    │
│                    ║   no more waiting in line!    ║                    │
│                    ║                               ║                    │
│                    ║   ┌──────────────────────┐    ║                    │
│                    ║   │    Browse Menu       │    ║                    │
│                    ║   └──────────────────────┘    ║                    │
│                    ║                               ║                    │
│                    ║   ┌──────────────────────┐    ║                    │
│                    ║   │    My Orders         │    ║                    │
│                    ║   └──────────────────────┘    ║                    │
│                    ║                               ║                    │
│                    ╚═══════════════════════════════╝                    │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐            │
│    │     ⚡       │    │     🍳       │    │     📱       │            │
│    │              │    │              │    │              │            │
│    │ Quick Order  │    │ Fresh Food   │    │ Track Order  │            │
│    │              │    │              │    │              │            │
│    │ Place orders │    │ Made fresh   │    │ Real-time    │            │
│    │ in minutes   │    │ just for you │    │ status       │            │
│    └──────────────┘    └──────────────┘    └──────────────┘            │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                         © 2026 CUSTECH Eats                             │
└─────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Menu Page (/menu)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  ┌──────┐   [Home] [Menu] [Orders]              [Cart 🛒 3]  [Account]  │
│  │ LOGO │                                                               │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  🔍  Search menu items...                                        │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  CATEGORIES:                                                            │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐     │
│  │   All    │ │  Main    │ │  Snacks  │ │ Beverages│ │ Desserts │     │
│  │  Items   │ │  Dishes  │ │          │ │          │ │          │     │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘     │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐         │
│  │    ┌───────┐    │  │    ┌───────┐    │  │    ┌───────┐    │         │
│  │    │ IMAGE │    │  │    │ IMAGE │    │  │    │ IMAGE │    │         │
│  │    │       │    │  │    │       │    │  │    │       │    │         │
│  │    └───────┘    │  │    └───────┘    │  │    └───────┘    │         │
│  │                 │  │                 │  │                 │         │
│  │  Jollof Rice    │  │  Fried Rice     │  │  Egusi Soup     │         │
│  │                 │  │                 │  │  with Pounded   │         │
│  │  Delicious      │  │  With chicken   │  │  Yam            │         │
│  │  Nigerian       │  │  and vegetables │  │                 │         │
│  │  classic        │  │                 │  │  Traditional    │         │
│  │                 │  │                 │  │  Nigerian       │         │
│  │  ₦1,500         │  │  ₦1,800         │  │  ₦2,200         │         │
│  │                 │  │                 │  │                 │         │
│  │  [  Add to Cart ]  │  [  Add to Cart ]  │  [  Add to Cart ]         │
│  │                 │  │                 │  │                 │         │
│  │  ⏱️ 15 min      │  │  ⏱️ 20 min      │  │  ⏱️ 25 min      │         │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘         │
│                                                                         │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐         │
│  │    ┌───────┐    │  │    ┌───────┐    │  │    ┌───────┐    │         │
│  │    │ IMAGE │    │  │    │ IMAGE │    │  │    │ IMAGE │    │         │
│  │    └───────┘    │  │    └───────┘    │  │    └───────┘    │         │
│  │  Meat Pie       │  │  Coca-Cola      │  │  Chin Chin      │         │
│  │  ₦500           │  │  ₦300           │  │  ₦400           │         │
│  │  [Add to Cart]  │  │  [Add to Cart]  │  │  [Add to Cart]  │         │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘         │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                         © 2026 CUSTECH Eats                             │
└─────────────────────────────────────────────────────────────────────────┘
```

### 3.3 Cart Page (/cart)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  ┌──────┐   [Home] [Menu] [Orders]                          [Account]   │
│  │ LOGO │                                                               │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   🛒 Your Cart                                                          │
│                                                                         │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │                                                                   │ │
│  │  ┌───────┐  Jollof Rice                    ₦1,500                │ │
│  │  │ IMAGE │  Delicious Nigerian classic                           │ │
│  │  └───────┘                                                        │ │
│  │             Quantity: [ - ]  2  [ + ]        ₦3,000              │ │
│  │                                                      [🗑️ Remove] │ │
│  │  ─────────────────────────────────────────────────────────────── │ │
│  │                                                                   │ │
│  │  ┌───────┐  Coca-Cola                       ₦300                 │ │
│  │  │ IMAGE │  Cold refreshing drink                                │ │
│  │  └───────┘                                                        │ │
│  │             Quantity: [ - ]  1  [ + ]         ₦300               │ │
│  │                                                      [🗑️ Remove] │ │
│  │                                                                   │ │
│  └───────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │  Special Requests / Notes                                         │ │
│  │  ┌─────────────────────────────────────────────────────────────┐ │ │
│  │  │  Extra spicy please, no onions                              │ │ │
│  │  │                                                              │ │ │
│  │  └─────────────────────────────────────────────────────────────┘ │ │
│  └───────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │                                                                   │ │
│  │    Subtotal:                                          ₦3,300     │ │
│  │    Service Fee:                                          ₦0      │ │
│  │    ─────────────────────────────────────────────────────────     │ │
│  │    Total:                                             ₦3,300     │ │
│  │                                                                   │ │
│  │                    ┌─────────────────────────┐                   │ │
│  │                    │      Place Order        │                   │ │
│  │                    └─────────────────────────┘                   │ │
│  │                                                                   │ │
│  └───────────────────────────────────────────────────────────────────┘ │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                         © 2026 CUSTECH Eats                             │
└─────────────────────────────────────────────────────────────────────────┘
```

### 3.4 Order Confirmation

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│                           ✅ Order Placed!                              │
│                                                                         │
│                    ╔═══════════════════════════════╗                    │
│                    ║                               ║                    │
│                    ║      Your Order Number        ║                    │
│                    ║                               ║                    │
│                    ║    ┌─────────────────────┐    ║                    │
│                    ║    │                     │    ║                    │
│                    ║    │     260204-0001     │    ║                    │
│                    ║    │                     │    ║                    │
│                    ║    └─────────────────────┘    ║                    │
│                    ║                               ║                    │
│                    ║   Please save this number     ║                    │
│                    ║   for pickup                  ║                    │
│                    ║                               ║                    │
│                    ║   Status: 🟡 PENDING          ║                    │
│                    ║                               ║                    │
│                    ║   Estimated Time: 15-20 min   ║                    │
│                    ║                               ║                    │
│                    ║   ┌───────────────────────┐   ║                    │
│                    ║   │    Track My Order     │   ║                    │
│                    ║   └───────────────────────┘   ║                    │
│                    ║                               ║                    │
│                    ║   ┌───────────────────────┐   ║                    │
│                    ║   │    Back to Menu       │   ║                    │
│                    ║   └───────────────────────┘   ║                    │
│                    ║                               ║                    │
│                    ╚═══════════════════════════════╝                    │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 3.5 Admin Dashboard (/admin)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  ┌──────┐   CUSTECH Eats Admin                         [Staff Name ▼]  │
│  │ LOGO │                                                               │
├─────────┬───────────────────────────────────────────────────────────────┤
│         │                                                               │
│  MENU   │   Dashboard Overview                                          │
│         │                                                               │
│ ┌─────┐ │   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│ │ 📊  │ │   │   TODAY     │  │   PENDING   │  │    READY    │         │
│ │Dash │ │   │             │  │             │  │             │         │
│ │board│ │   │     24      │  │      5      │  │      3      │         │
│ └─────┘ │   │   Orders    │  │   Orders    │  │   Orders    │         │
│         │   └─────────────┘  └─────────────┘  └─────────────┘         │
│ ┌─────┐ │                                                               │
│ │ 🍔  │ │   ─────────────────────────────────────────────────────────   │
│ │Menu │ │                                                               │
│ │Mgmt │ │   Recent Orders                                               │
│ └─────┘ │                                                               │
│         │   ┌────────────────────────────────────────────────────────┐ │
│ ┌─────┐ │   │ Order #     │ Customer    │ Items │ Total  │ Status   │ │
│ │ 📈  │ │   ├────────────────────────────────────────────────────────┤ │
│ │Rep- │ │   │ 260204-0005 │ John Doe    │   3   │ ₦3,300 │ 🟡 Pend  │ │
│ │orts │ │   │             │             │       │        │ [Accept] │ │
│ └─────┘ │   ├────────────────────────────────────────────────────────┤ │
│         │   │ 260204-0004 │ Jane Smith  │   2   │ ₦2,100 │ 🔵 Prep  │ │
│ ┌─────┐ │   │             │             │       │        │ [Ready]  │ │
│ │ 📺  │ │   ├────────────────────────────────────────────────────────┤ │
│ │Disp-│ │   │ 260204-0003 │ Mike Brown  │   1   │ ₦1,500 │ 🟢 Ready │ │
│ │lay  │ │   │             │             │       │        │[Complete]│ │
│ └─────┘ │   ├────────────────────────────────────────────────────────┤ │
│         │   │ 260204-0002 │ Sarah Lee   │   4   │ ₦4,800 │ ✓ Done   │ │
│         │   └────────────────────────────────────────────────────────┘ │
│         │                                                               │
└─────────┴───────────────────────────────────────────────────────────────┘
```

### 3.6 Menu Management (/admin/menu)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  ┌──────┐   CUSTECH Eats Admin                         [Staff Name ▼]  │
│  │ LOGO │                                                               │
├─────────┬───────────────────────────────────────────────────────────────┤
│         │                                                               │
│  MENU   │   Menu Management                     [ + Add Category ]     │
│         │                                       [ + Add Menu Item ]     │
│ ┌─────┐ │                                                               │
│ │ 📊  │ │   ─────────────────────────────────────────────────────────   │
│ │Dash │ │                                                               │
│ └─────┘ │   Categories                                                  │
│         │   ┌───────────────────────────────────────────────────────┐  │
│ ┌─────┐ │   │ Main Dishes  │  Snacks  │  Beverages  │  Desserts    │  │
│ │ 🍔  │ │   └───────────────────────────────────────────────────────┘  │
│ │Menu │ │                                                               │
│ │Mgmt │ │   Menu Items (Main Dishes)                                    │
│ └─────┘ │                                                               │
│         │   ┌─────────────────────────────────────────────────────────┐│
│ ┌─────┐ │   │ ┌───────┐                                               ││
│ │ 📈  │ │   │ │ IMAGE │  Jollof Rice              ₦1,500              ││
│ │Rep- │ │   │ │       │  Delicious Nigerian classic                   ││
│ │orts │ │   │ └───────┘                                               ││
│ └─────┘ │   │            ⏱️ 15 min    🟢 Available                    ││
│         │   │                                                          ││
│ ┌─────┐ │   │            [ Edit ]  [ Toggle ]  [ Delete ]             ││
│ │ 📺  │ │   │─────────────────────────────────────────────────────────││
│ │Disp-│ │   │ ┌───────┐                                               ││
│ │lay  │ │   │ │ IMAGE │  Fried Rice               ₦1,800              ││
│ └─────┘ │   │ │       │  With chicken and vegetables                  ││
│         │   │ └───────┘                                               ││
│         │   │            ⏱️ 20 min    🟢 Available                    ││
│         │   │                                                          ││
│         │   │            [ Edit ]  [ Toggle ]  [ Delete ]             ││
│         │   └─────────────────────────────────────────────────────────┘│
│         │                                                               │
└─────────┴───────────────────────────────────────────────────────────────┘
```

### 3.7 Add/Edit Menu Item Dialog

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│   ╔═══════════════════════════════════════════════════════════════════╗ │
│   ║                        Add Menu Item                              ║ │
│   ╠═══════════════════════════════════════════════════════════════════╣ │
│   ║                                                                   ║ │
│   ║   Item Name *                                                     ║ │
│   ║   ┌─────────────────────────────────────────────────────────────┐ ║ │
│   ║   │  Jollof Rice                                                │ ║ │
│   ║   └─────────────────────────────────────────────────────────────┘ ║ │
│   ║                                                                   ║ │
│   ║   Description                                                     ║ │
│   ║   ┌─────────────────────────────────────────────────────────────┐ ║ │
│   ║   │  Delicious Nigerian classic made with tomatoes and spices  │ ║ │
│   ║   │                                                             │ ║ │
│   ║   └─────────────────────────────────────────────────────────────┘ ║ │
│   ║                                                                   ║ │
│   ║   Category                      Price (₦) *                       ║ │
│   ║   ┌──────────────────────┐     ┌──────────────────────┐          ║ │
│   ║   │  Main Dishes      ▼ │     │  1500                 │          ║ │
│   ║   └──────────────────────┘     └──────────────────────┘          ║ │
│   ║                                                                   ║ │
│   ║   Preparation Time (minutes)                                      ║ │
│   ║   ┌──────────────────────┐                                       ║ │
│   ║   │  15                  │                                       ║ │
│   ║   └──────────────────────┘                                       ║ │
│   ║                                                                   ║ │
│   ║   Item Image                                                      ║ │
│   ║   ┌─────────────────────────────────────────────────────────────┐ ║ │
│   ║   │                                                             │ ║ │
│   ║   │     📷 Click to upload or drag and drop                    │ ║ │
│   ║   │        PNG, JPG up to 5MB                                   │ ║ │
│   ║   │                                                             │ ║ │
│   ║   └─────────────────────────────────────────────────────────────┘ ║ │
│   ║                                                                   ║ │
│   ║   ┌─────────────────────┐   ┌─────────────────────┐              ║ │
│   ║   │       Cancel        │   │     Save Item       │              ║ │
│   ║   └─────────────────────┘   └─────────────────────┘              ║ │
│   ║                                                                   ║ │
│   ╚═══════════════════════════════════════════════════════════════════╝ │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 3.8 Order Display Board (/admin/display)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│                         CUSTECH Eats - Order Board                      │
│                                                                         │
├─────────────────────────────────┬───────────────────────────────────────┤
│                                 │                                       │
│       🔵 NOW PREPARING          │        🟢 READY FOR PICKUP            │
│                                 │                                       │
│   ┌───────────────────────┐    │    ┌───────────────────────┐          │
│   │                       │    │    │                       │          │
│   │     260204-0005       │    │    │     260204-0003       │          │
│   │                       │    │    │                       │          │
│   └───────────────────────┘    │    └───────────────────────┘          │
│                                 │                                       │
│   ┌───────────────────────┐    │    ┌───────────────────────┐          │
│   │                       │    │    │                       │          │
│   │     260204-0004       │    │    │     260204-0002       │          │
│   │                       │    │    │                       │          │
│   └───────────────────────┘    │    └───────────────────────┘          │
│                                 │                                       │
│   ┌───────────────────────┐    │    ┌───────────────────────┐          │
│   │                       │    │    │                       │          │
│   │     260204-0001       │    │    │     260204-0001       │          │
│   │                       │    │    │                       │          │
│   └───────────────────────┘    │    └───────────────────────┘          │
│                                 │                                       │
│                                 │                                       │
│                                 │                                       │
│                                 │                                       │
│                                 │                                       │
├─────────────────────────────────┴───────────────────────────────────────┤
│                  Last Updated: 12:45:30 PM                              │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Navigation Structure

### 4.1 Site Map

```
                              ┌─────────────┐
                              │   Home (/)  │
                              └──────┬──────┘
                                     │
         ┌───────────────────────────┼───────────────────────────┐
         │                           │                           │
         ▼                           ▼                           ▼
   ┌───────────┐              ┌───────────┐              ┌───────────┐
   │   Menu    │              │   Auth    │              │  Orders   │
   │  (/menu)  │              │  (/auth)  │              │ (/orders) │
   └─────┬─────┘              └───────────┘              └─────┬─────┘
         │                                                     │
         │                                                     ▼
         │                                               ┌───────────┐
         │                                               │  Order    │
         │                                               │  Detail   │
         │                                               │(/orders/id│
         │                                               └───────────┘
         │
         ▼
   ┌───────────┐
   │   Cart    │
   │  (/cart)  │
   └───────────┘


                           ADMIN SECTION
                              
                              ┌─────────────┐
                              │Admin (/admin│
                              └──────┬──────┘
                                     │
         ┌───────────────────────────┼───────────────────────────┐
         │                           │                           │
         ▼                           ▼                           ▼
   ┌───────────┐              ┌───────────┐              ┌───────────┐
   │   Menu    │              │  Reports  │              │  Display  │
   │Management │              │           │              │   Board   │
   │(/admin/   │              │(/admin/   │              │(/admin/   │
   │  menu)    │              │ reports)  │              │ display)  │
   └───────────┘              └───────────┘              └───────────┘
```

### 4.2 Header Navigation

**Public Header (Not Logged In):**
```
┌─────────────────────────────────────────────────────────────────────────┐
│  [LOGO]   [Home]   [Menu]                              [Login] [Sign Up]│
└─────────────────────────────────────────────────────────────────────────┘
```

**Customer Header (Logged In):**
```
┌─────────────────────────────────────────────────────────────────────────┐
│  [LOGO]   [Home]   [Menu]   [My Orders]          [Cart 🛒 3]  [Account▼]│
└─────────────────────────────────────────────────────────────────────────┘
```

**Staff/Admin Header:**
```
┌─────────────────────────────────────────────────────────────────────────┐
│  [LOGO]   [Dashboard]   [Menu Mgmt]   [Reports]   [Display]   [Staff ▼]│
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Component Design

### 5.1 Button Variants

```
PRIMARY BUTTON (Main Actions)
┌─────────────────────────────────┐
│       Add to Cart               │  Background: Primary Blue
└─────────────────────────────────┘  Text: White

SECONDARY BUTTON (Secondary Actions)  
┌─────────────────────────────────┐
│       View Details              │  Background: Light Gray
└─────────────────────────────────┘  Text: Dark Gray

DESTRUCTIVE BUTTON (Delete/Cancel)
┌─────────────────────────────────┐
│       Delete Item               │  Background: Red
└─────────────────────────────────┘  Text: White

OUTLINE BUTTON (Tertiary Actions)
┌─────────────────────────────────┐
│       Cancel                    │  Background: Transparent
└─────────────────────────────────┘  Border: Gray, Text: Gray
```

### 5.2 Order Status Badges

```
PENDING     ┌──────────────────┐
            │ 🟡  Pending      │  Yellow background
            └──────────────────┘

PREPARING   ┌──────────────────┐
            │ 🔵  Preparing    │  Blue background
            └──────────────────┘

READY       ┌──────────────────┐
            │ 🟢  Ready        │  Green background
            └──────────────────┘

COMPLETED   ┌──────────────────┐
            │ ✓   Completed    │  Gray background
            └──────────────────┘

CANCELLED   ┌──────────────────┐
            │ ✗   Cancelled    │  Red background
            └──────────────────┘
```

### 5.3 Menu Item Card

```
┌─────────────────────────┐
│    ┌─────────────────┐  │
│    │                 │  │
│    │     IMAGE       │  │  200x150px
│    │                 │  │
│    └─────────────────┘  │
│                         │
│    Item Name            │  Font: Bold, 16px
│                         │
│    Short description    │  Font: Regular, 14px
│    of the food item     │  Color: Muted
│                         │
│    ₦1,500              │  Font: Bold, 18px
│                         │  Color: Primary
│    ⏱️ 15 min            │  Prep time indicator
│                         │
│    ┌─────────────────┐  │
│    │   Add to Cart   │  │  Full width button
│    └─────────────────┘  │
│                         │
└─────────────────────────┘
```

### 5.4 Form Input Fields

```
LABEL
┌─────────────────────────────────────────┐
│  Placeholder text...                    │
└─────────────────────────────────────────┘

LABEL (with error)
┌─────────────────────────────────────────┐
│  Invalid input                          │  Border: Red
└─────────────────────────────────────────┘
  ⚠️ Error message in red

LABEL (focused)
┌─────────────────────────────────────────┐
│  User input here                        │  Border: Primary Blue
└─────────────────────────────────────────┘
```

---

## 6. Responsive Design

### 6.1 Breakpoints

| Breakpoint | Width | Device Type |
|------------|-------|-------------|
| Mobile | < 640px | Smartphones |
| Tablet | 640px - 1024px | Tablets, Small laptops |
| Desktop | > 1024px | Laptops, Desktops |

### 6.2 Mobile Layout Adaptations

**Menu Page - Mobile:**
```
┌────────────────────────┐
│  [≡]  LOGO    [🛒 3]  │
├────────────────────────┤
│ ┌────────────────────┐ │
│ │ 🔍 Search...       │ │
│ └────────────────────┘ │
│                        │
│ ◄ All │ Main │ Snacks ►│
│                        │
│ ┌────────────────────┐ │
│ │     ┌────────┐     │ │
│ │     │ IMAGE  │     │ │
│ │     └────────┘     │ │
│ │   Jollof Rice      │ │
│ │   ₦1,500           │ │
│ │   [Add to Cart]    │ │
│ └────────────────────┘ │
│                        │
│ ┌────────────────────┐ │
│ │     ┌────────┐     │ │
│ │     │ IMAGE  │     │ │
│ │     └────────┘     │ │
│ │   Fried Rice       │ │
│ │   ₦1,800           │ │
│ │   [Add to Cart]    │ │
│ └────────────────────┘ │
│                        │
└────────────────────────┘
```

**Admin Dashboard - Mobile:**
```
┌────────────────────────┐
│  [≡]  Admin    [👤]   │
├────────────────────────┤
│                        │
│  ┌──────┐ ┌──────┐    │
│  │  24  │ │   5  │    │
│  │Orders│ │Pending│   │
│  └──────┘ └──────┘    │
│                        │
│  Recent Orders         │
│                        │
│  ┌────────────────────┐│
│  │ #260204-0005       ││
│  │ John Doe  │ ₦3,300 ││
│  │ 🟡 Pending         ││
│  │ [Accept]           ││
│  └────────────────────┘│
│                        │
│  ┌────────────────────┐│
│  │ #260204-0004       ││
│  │ Jane Smith│ ₦2,100 ││
│  │ 🔵 Preparing       ││
│  │ [Mark Ready]       ││
│  └────────────────────┘│
│                        │
└────────────────────────┘
```

### 6.3 Touch-Friendly Design

- Minimum button size: 44x44 pixels
- Adequate spacing between interactive elements
- Swipe gestures for category navigation
- Pull-to-refresh for order lists
- Bottom navigation on mobile for key actions

---

## Appendix: Screenshots Reference

To add actual screenshots to this documentation:

1. **Desktop Screenshots (1280x720)**
   - Landing Page
   - Menu Page with items
   - Cart with items
   - Order confirmation
   - Admin Dashboard
   - Menu Management

2. **Mobile Screenshots (390x844)**
   - Same pages in mobile view
   - Mobile navigation menu

3. **Interaction Screenshots**
   - Add to cart animation
   - Order status change
   - Image upload in admin

**To capture:**
Navigate to each page in the preview and use browser screenshot tools or the Lovable preview's device mode selector.

---

*This visual documentation is part of the CUSTECH Eats project for [Course Name/Code].*

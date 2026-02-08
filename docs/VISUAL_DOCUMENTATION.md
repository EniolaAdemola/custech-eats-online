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

---

## 7. Data Flow Diagrams (DFD)

### 7.1 Context Diagram (Level 0 DFD)

```
                          ┌─────────────────────────┐
                          │                         │
    ┌──────────┐          │                         │          ┌──────────┐
    │          │ ─────────│►  Order Request         │          │          │
    │          │  Menu    │                         │  Order   │          │
    │ Customer │  Browse  │     CUSTECH Eats        │  Status  │  Staff/  │
    │          │ ◄────────│   Food Ordering         │  Updates │  Admin   │
    │          │  Menu    │      System             │ ────────►│          │
    │          │  Data    │                         │          │          │
    │          │          │                         │ Menu     │          │
    │          │ Order    │                         │ Updates  │          │
    │          │ Status   │                         │ ◄────────│          │
    │          │ ◄────────│                         │          │          │
    └──────────┘          │                         │          └──────────┘
                          │                         │
                          └─────────────────────────┘
```

**Description:**
- **Customer** browses the menu, places orders, and receives real-time order status updates.
- **Staff/Admin** manages the menu (add/edit/delete items), processes incoming orders, and updates order statuses.

---

### 7.2 Level 1 DFD — Main Processes

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                            LEVEL 1 DATA FLOW DIAGRAM                            │
└─────────────────────────────────────────────────────────────────────────────────┘

                                                        ┌─────────────────┐
    ┌──────────┐                                        │   D1: Menu      │
    │          │── Login/Register ──►┌──────────────┐   │   Categories    │
    │          │                     │              │   │   & Items       │
    │          │◄─ Auth Token ──────│  1.0 User    │   └────────┬────────┘
    │          │                     │ Authentication│            │
    │          │                     │              │            │
    │ Customer │                     └──────────────┘            │
    │          │                                                 │
    │          │── Menu Request ────►┌──────────────┐            │
    │          │                     │              │◄───────────┘
    │          │◄─ Menu Data ───────│  2.0 Menu    │   (Read menu data)
    │          │                     │  Browsing    │
    │          │                     │              │
    │          │                     └──────────────┘
    │          │
    │          │── Cart Items ──────►┌──────────────┐   ┌─────────────────┐
    │          │   & Special Notes   │              │──►│   D2: Orders    │
    │          │                     │  3.0 Order   │   │   Database      │
    │          │◄─ Order Number ────│  Placement   │   │                 │
    │          │   & Confirmation    │              │   └────────┬────────┘
    │          │                     └──────────────┘            │
    │          │                                                 │
    │          │── Order ID ────────►┌──────────────┐            │
    │          │                     │              │◄───────────┘
    │          │◄─ Live Status ─────│  4.0 Order   │   (Read order data)
    │          │   Updates           │  Tracking    │
    │          │                     │  (Realtime)  │
    └──────────┘                     └──────────────┘

                                            ▲
                                            │
                                     Status Updates
                                            │

    ┌──────────┐                     ┌──────────────┐   ┌─────────────────┐
    │          │── Update Status ───►│              │──►│   D2: Orders    │
    │  Staff/  │                     │  5.0 Order   │   │   Database      │
    │  Admin   │◄─ Order Queue ─────│  Management  │◄──│   (Update)      │
    │          │                     │              │   └─────────────────┘
    │          │                     └──────────────┘
    │          │
    │          │── Menu Changes ────►┌──────────────┐   ┌─────────────────┐
    │          │   (Add/Edit/Delete) │              │──►│   D1: Menu      │
    │          │                     │  6.0 Menu    │   │   Categories    │
    │          │◄─ Confirmation ────│  Management  │   │   & Items       │
    │          │                     │              │   │   (Update)      │
    │          │                     └──────────────┘   └─────────────────┘
    │          │
    │          │── Report Request ──►┌──────────────┐   ┌─────────────────┐
    │          │                     │              │◄──│   D2: Orders    │
    │          │◄─ Sales Reports ───│  7.0 Reports │   │   Database      │
    │          │   & Analytics       │  Generation  │   │   (Read)        │
    │          │                     │              │   └─────────────────┘
    └──────────┘                     └──────────────┘
```

**Process Descriptions:**

| Process | Name | Description |
|---------|------|-------------|
| 1.0 | User Authentication | Handles login, registration, and role-based access control |
| 2.0 | Menu Browsing | Retrieves menu categories and items for display |
| 3.0 | Order Placement | Creates new orders with items, calculates totals, generates order numbers |
| 4.0 | Order Tracking | Provides real-time order status updates via WebSocket subscriptions |
| 5.0 | Order Management | Staff updates order statuses (pending → preparing → ready → completed) |
| 6.0 | Menu Management | Staff/Admin CRUD operations on menu categories and items |
| 7.0 | Reports Generation | Aggregates order data for sales analytics and reporting |

**Data Stores:**

| Store | Name | Contents |
|-------|------|----------|
| D1 | Menu Database | `menu_categories` and `menu_items` tables |
| D2 | Orders Database | `orders` and `order_items` tables |
| D3 | Users Database | `profiles` and `user_roles` tables (via auth system) |

---

### 7.3 Level 2 DFD — Order Placement (Process 3.0 Decomposed)

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                    LEVEL 2 DFD — ORDER PLACEMENT (Process 3.0)                  │
└─────────────────────────────────────────────────────────────────────────────────┘

    ┌──────────┐
    │          │
    │ Customer │
    │          │
    └────┬─────┘
         │
         │  Selected Items
         │  + Quantities
         │  + Notes
         ▼
    ┌──────────────┐
    │              │
    │  3.1 Add     │       ┌──────────────────┐
    │  Items to    │──────►│  D4: Cart        │
    │  Cart        │       │  (Browser State) │
    │              │       │                  │
    └──────────────┘       │  • MenuItem ID   │
                           │  • Quantity      │
                           │  • Unit Price    │
                           │  • Notes         │
                           └────────┬─────────┘
                                    │
                                    │  Cart Contents
                                    ▼
                           ┌──────────────┐
                           │              │
                           │  3.2 Validate│       ┌──────────────────┐
                           │  Cart &      │◄─────│  D3: Users       │
                           │  Check Auth  │       │  (Auth Session)  │
                           │              │       └──────────────────┘
                           └───────┬──────┘
                                   │
                                   │  Validated Cart + User ID
                                   ▼
                           ┌──────────────┐
                           │              │
                           │  3.3 Generate│       ┌──────────────────┐
                           │  Order       │◄─────│  DB Function:    │
                           │  Number      │       │  generate_order  │
                           │              │       │  _number()       │
                           └───────┬──────┘       └──────────────────┘
                                   │
                                   │  Order Number (YYMMDD-XXXX)
                                   ▼
                           ┌──────────────┐
                           │              │       ┌──────────────────┐
                           │  3.4 Create  │──────►│  D2: Orders      │
                           │  Order &     │       │  Database        │
                           │  Order Items │       │                  │
                           │              │──────►│  orders table    │
                           └───────┬──────┘       │  order_items     │
                                   │              │  table           │
                                   │              └──────────────────┘
                                   │
                                   │  Order Confirmation
                                   ▼
                           ┌──────────────┐
                           │              │
                           │  3.5 Clear   │       ┌──────────────────┐
                           │  Cart &      │──────►│  D4: Cart        │
                           │  Redirect    │       │  (Clear State)   │
                           │              │       └──────────────────┘
                           └──────────────┘
```

---

### 7.4 Level 2 DFD — Order Management (Process 5.0 Decomposed)

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                   LEVEL 2 DFD — ORDER MANAGEMENT (Process 5.0)                  │
└─────────────────────────────────────────────────────────────────────────────────┘

    ┌──────────┐
    │  Staff/  │
    │  Admin   │
    └────┬─────┘
         │
         │  View Orders Request
         ▼
    ┌──────────────┐       ┌──────────────────┐
    │              │◄─────│  D2: Orders      │
    │  5.1 Fetch   │       │  Database        │
    │  Active      │       │  (All orders     │
    │  Orders      │       │   with items)    │
    │              │       └──────────────────┘
    └───────┬──────┘
            │
            │  Order List (with customer info)
            ▼
    ┌──────────────┐
    │              │
    │  5.2 Display │       ┌──────────────────┐
    │  Orders by   │◄─────│  D5: Realtime    │
    │  Status Tab  │       │  Subscription    │
    │              │       │  (Live Updates)  │
    │  • Pending   │       └──────────────────┘
    │  • Preparing │
    │  • Ready     │
    │  • Completed │
    └───────┬──────┘
            │
            │  Status Change Action
            ▼
    ┌──────────────┐       ┌──────────────────┐
    │              │──────►│  D2: Orders      │
    │  5.3 Update  │       │  Database        │
    │  Order       │       │  (Update status) │
    │  Status      │       └──────────────────┘
    │              │
    │  pending ──► preparing ──► ready ──► completed
    │              │
    └───────┬──────┘
            │
            │  Status Change Event
            ▼
    ┌──────────────┐       ┌──────────────────┐
    │              │──────►│  D5: Realtime    │
    │  5.4 Notify  │       │  Channel         │
    │  Customer    │       │  (Broadcast to   │
    │  (Realtime)  │       │   customer)      │
    │              │       └──────────────────┘
    └──────────────┘
```

---

### 7.5 Data Dictionary

| Data Element | Type | Description | Source/Destination |
|-------------|------|-------------|-------------------|
| `user_id` | UUID | Unique identifier for authenticated user | Auth System |
| `full_name` | Text | User's display name | Registration Form |
| `email` | Text | User's email address | Registration Form |
| `role` | Enum | User permission level (customer/staff/admin) | `user_roles` table |
| `menu_item` | Object | Food item with name, price, description, image | `menu_items` table |
| `category` | Object | Menu category grouping | `menu_categories` table |
| `cart_item` | Object | Menu item + quantity + notes | Browser State (Context) |
| `order` | Object | Complete order with items and total | `orders` table |
| `order_item` | Object | Individual line item in an order | `order_items` table |
| `order_number` | Text | Human-readable order ID (YYMMDD-XXXX format) | DB Function |
| `order_status` | Enum | Current state of order | `orders.status` column |
| `total_amount` | Numeric | Calculated sum of all order items | Computed on placement |
| `special_requests` | Text | Customer's additional instructions | Cart Page form |
| `estimated_ready_time` | Timestamp | When order should be ready | Set by staff |

---

### 7.6 Entity Relationship Diagram (ERD)

```
┌─────────────────────┐         ┌─────────────────────┐
│    auth.users        │         │     profiles         │
├─────────────────────┤         ├─────────────────────┤
│ PK  id         UUID │◄────────│ FK  user_id     UUID │
│     email      TEXT │         │ PK  id          UUID │
│     password   HASH │         │     full_name   TEXT │
│     created_at  TS  │         │     phone       TEXT │
└─────────┬───────────┘         │     student_    TEXT │
          │                     │       staff_id       │
          │                     │     created_at   TS  │
          │ 1                   │     updated_at   TS  │
          │                     └─────────────────────┘
          │
          │              ┌─────────────────────┐
          │              │     user_roles       │
          │              ├─────────────────────┤
          └──────────────│ FK  user_id     UUID │
                    1:N  │ PK  id          UUID │
                         │     role   app_role  │
                         │     created_at   TS  │
                         └─────────────────────┘

┌─────────────────────┐         ┌─────────────────────┐
│  menu_categories     │         │     menu_items       │
├─────────────────────┤         ├─────────────────────┤
│ PK  id         UUID │◄────────│ FK  category_id UUID │
│     name       TEXT │    1:N  │ PK  id          UUID │
│     description TEXT │         │     name        TEXT │
│     display_   INT  │         │     description TEXT │
│       order         │         │     price    NUMERIC │
│     created_at  TS  │         │     image_url   TEXT │
└─────────────────────┘         │     is_available BOOL│
                                │     preparation INT  │
                                │       _time          │
                                │     created_at   TS  │
                                │     updated_at   TS  │
                                └──────────┬──────────┘
                                           │
                                           │ 1
                                           │
┌─────────────────────┐         ┌──────────┴──────────┐
│      orders          │         │    order_items       │
├─────────────────────┤         ├─────────────────────┤
│ PK  id         UUID │◄────────│ FK  order_id    UUID │
│ FK  user_id    UUID │    1:N  │ FK  menu_item_  UUID │
│     order_     TEXT │         │       id             │
│       number        │         │ PK  id          UUID │
│     status  ENUM    │         │     item_name   TEXT │
│     special_   TEXT │         │     quantity    INT  │
│       requests      │         │     unit_price  NUM │
│     total_   NUMERIC│         │     notes       TEXT │
│       amount        │         │     created_at   TS │
│     estimated_ TS   │         └─────────────────────┘
│       ready_time    │
│     created_at  TS  │
│     updated_at  TS  │
└─────────────────────┘

RELATIONSHIPS:
═══════════════
auth.users    1 ──── N  profiles       (one user has one profile)
auth.users    1 ──── N  user_roles     (one user can have multiple roles)
auth.users    1 ──── N  orders         (one user can place many orders)
menu_categories 1 ── N  menu_items     (one category has many items)
orders        1 ──── N  order_items    (one order has many line items)
menu_items    1 ──── N  order_items    (one menu item can appear in many orders)
```

---

*This visual documentation is part of the CUSTECH Eats project for [Course Name/Code].*

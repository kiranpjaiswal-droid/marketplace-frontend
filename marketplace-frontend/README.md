# Marketplace — Frontend

React client for the [Marketplace API](https://github.com/kiranpjaiswal-droid/marketplace-backend) — a multi-vendor e-commerce platform. Customers browse and buy products, sellers manage their own listings, admins moderate the catalog and monitor sales.

## Features

- **Authentication** — register/login (customer or seller), JWT persisted across page refresh
- **Product browsing** — public catalog with product detail pages
- **Cart** — add/remove items, adjust quantity, persisted in `localStorage` across refresh
- **Checkout** — real Stripe Checkout integration; cart converts to a backend order, redirects to Stripe, webhook confirms payment
- **Seller dashboard** — add products, view own listings and their approval status
- **Admin dashboard** — approve pending products, view revenue/order analytics and top-selling products
- **Role-aware UI** — navigation and available actions adapt to Customer / Seller / Admin

## Tech stack

| Layer | Technology |
|---|---|
| Framework | React (Vite) |
| Styling | Tailwind CSS v4 |
| State management | Redux Toolkit (`authSlice`, `cartSlice`) |
| Routing | React Router |
| HTTP client | Axios |

## Architecture

```
src/
├── api/                    # axios instance (planned)
├── app/
│   └── store.js            # Redux store setup
├── features/
│   ├── auth/
│   │   └── authSlice.js    # login/logout state, persisted to localStorage
│   └── cart/
│       └── cartSlice.js    # cart items, quantity logic, persisted to localStorage
├── components/
│   └── Navbar.jsx          # role-aware nav (Login/Register vs Cart/Logout)
├── pages/
│   ├── Home.jsx             # product catalog
│   ├── ProductDetail.jsx    # single product + add to cart
│   ├── Cart.jsx              # cart, checkout (Stripe)
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── SellerDashboard.jsx   # add product, view own listings
│   └── AdminDashboard.jsx    # approvals, analytics
├── App.jsx                   # routes
└── main.jsx                  # entry point, Redux <Provider>
```

## State persistence

Both `auth` and `cart` slices read their `initialState` from `localStorage` and write back to it on every change, so login and cart contents survive a page refresh — Redux state alone only lives in memory and resets on reload.

## Checkout flow

1. Cart items are converted to `{ productId, quantity }` and sent to `POST /api/orders`, creating a `PENDING` order (backend validates stock and deducts it atomically)
2. The returned order id is sent to `POST /api/payments/checkout-session`, which returns a Stripe-hosted checkout URL
3. The browser is redirected to Stripe (`window.location.href`)
4. On successful payment, Stripe's webhook (handled by the backend) marks the order `PAID`

## Getting started

### 1. Prerequisites
- Node.js 18+
- The [backend](https://github.com/kiranpjaiswal-droid/marketplace-backend) running locally (or deployed) — this app expects it at the URL configured in each page's `API_URL` constant

### 2. Install
```bash
git clone <this-repo-url>
cd marketplace-frontend
npm install
```

### 3. Configure the backend URL
Each page currently defines its own `API_URL` constant near the top of the file (e.g. `http://localhost:5002`). Update these to match your backend's address if it differs.

### 4. Run
```bash
npm run dev
```
Opens on `http://localhost:5173` by default.

## Roadmap
- [ ] Centralize `API_URL` into a single `src/api/axios.js` instance
- [ ] Deploy (Vercel)
- [ ] Product search/filter on the catalog page
- [ ] Order history page for customers
- [ ] Product image upload

## Related
- Backend & API docs: [marketplace-backend](https://github.com/kiranpjaiswal-droid/marketplace-backend)

## License
MIT
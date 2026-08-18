# INVINTELL — Inventory & Warehouse Intelligence Platform

[![Build Status](https://img.shields.io/badge/Build-PASSING-success)](https://github.com/)
[![License](https://img.shields.io/badge/License-MIT-blue)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/Version-3.0.0--Enterprise-indigo)](https://github.com/)

**INVINTELL** is a full-stack, enterprise-grade **Inventory & Warehouse Intelligence Platform** designed to manage multi-warehouse inventory workflows, enforce strict order lifecycle state transitions, perform deterministic statistical demand forecasting, and provide transparent 0–100 risk scoring with explainable business directives.

---

## Key Capabilities & Highlights

- **Strict Order Lifecycle Machine**: Enforces valid state transitions (`CREATED → ALLOCATED → PICKING → PICKED → PACKING → PACKED → DISPATCHED → COMPLETED`). Out-of-sequence transitions (e.g. `CREATED → PACKED`) are locked and rejected with HTTP 400 validation errors.
- **Stock Integrity & Boundary Guards**: Prevents negative stock adjustments, tracks immutable stock movements, and handles inventory shortages during allocation and inter-warehouse transfers.
- **Deterministic Intelligence Engine**: Computes daily/weekly/monthly moving average demand, acceleration trends (`INCREASING`, `STABLE`, `DECREASING`, `VOLATILE`, `INSUFFICIENT_DATA`), and 7-day, 30-day, and 90-day forecasts.
- **Transparent 0–100 Risk Engine**: Evaluates Stockout, Overstock, Dead Stock, Expiry, and Demand Spike risks with explicit **WHAT / WHY / IMPACT / ACTION** cards.
- **Pharmacy FEFO (First Expire, First Out)**: Prioritizes batches by earliest valid expiry date (`getPrioritizedBatches`) and excludes expired inventory from sellable stock.
- **Financial Valuation & Profitability**: Computes real Revenue, COGS, Gross Profit Margin %, Inventory Valuation, and Tied-Up Capital in Dead Stock.

---

## Architecture & Technology Stack

```text
       ┌─────────────────────────────────────────────────────────┐
       │     React + Vite + Tailwind/Vanilla CSS Frontend        │
       │     (Interactive Dashboards, Kanban, Command Views)      │
       └────────────────────────────┬────────────────────────────┘
                                    │ HTTP / REST APIs
                                    ▼
       ┌─────────────────────────────────────────────────────────┐
       │              Node.js + Express API Backend              │
       │       (State Machine, Fulfillment, Risk, Intelligence)   │
       └────────────────────────────┬────────────────────────────┘
                                    │ Prisma ORM / CSV Engine
                                    ▼
       ┌─────────────────────────────────────────────────────────┐
       │     PostgreSQL Relational DB / Memory Fallback Store    │
       │     (Stores, Products, Inventory, Orders, Batches)      │
       └─────────────────────────────────────────────────────────┘
```

- **Frontend**: React 18, Vite, Framer Motion, Recharts, Lucide Icons.
- **Backend**: Node.js, Express, Prisma ORM, CSV Data Engine.
- **Database**: PostgreSQL (Production) with resilient in-memory fallback engine for local offline execution.

---

## Project Structure

```text
inv/
├── backend/
│   ├── archive (3)/               # Real retail store inventory CSV dataset
│   ├── prisma/                    # Prisma database schema & migrations
│   ├── scripts/
│   │   ├── phase1.test.js         # Core Engine & Fulfillment Test Suite
│   │   ├── phase2.test.js         # Intelligence & FEFO Test Suite
│   │   └── phase3.test.js         # Master E2E Integration Test Suite
│   ├── src/
│   │   ├── controllers/           # Order, Inventory, Operations, Finance, Risk controllers
│   │   ├── routes/                # REST API route handlers
│   │   ├── services/              # intelligenceEngine.js, auditService.js, riskService.js
│   │   └── server.js              # Express app entry point
│   └── .env.example               # Backend environment placeholders
├── frontend/
│   ├── src/
│   │   ├── components/            # Sidebar, Navbar, ProtectedRoute, ErrorBoundary
│   │   ├── context/               # StoreContext.jsx (Backend-first state)
│   │   ├── pages/                 # Overview, Today, Future, Risks, Orders, Allocation, etc.
│   │   └── services/              # api.js & ordersApi.js REST client
│   ├── package.json
│   └── vite.config.js
└── README.md                      # Project Master Documentation
```

---

## Quick Start & Installation

### 1. Prerequisites
- Node.js `v18+` or `v20+`
- npm `v9+`

### 2. Backend Setup
```bash
cd backend
npm install
npm run dev
```
*Backend starts on `http://localhost:5000` with universal CORS support.*

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
*Frontend starts on `http://localhost:5173`.*

---

## Environment Configuration

Backend configuration file (`backend/.env.example`):
```env
PORT=5000
DATABASE_URL="postgresql://user:password@localhost:5432/invintell_db?schema=public"

# Firebase Admin SDK Credentials (Optional)
FIREBASE_PROJECT_ID="invintell-dd772"
FIREBASE_CLIENT_EMAIL="firebase-adminsdk-xxxxx@invintell-dd772.iam.gserviceaccount.com"
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----"
```

---

## Running Automated Test Suites

INVINTELL includes automated integration test suites for Phase 1, Phase 2, and Phase 3:

```bash
# Run Phase 1 Core Engine & Fulfillment Suite
node backend/scripts/phase1.test.js

# Run Phase 2 Intelligence, Forecasting & FEFO Suite
node backend/scripts/phase2.test.js

# Run Master Phase 3 End-to-End Integration Suite
node backend/scripts/phase3.test.js
```

---

## Route Sitemap

| Route | Component | Description |
| :--- | :--- | :--- |
| `/` | `LandingPage.jsx` | Enterprise landing page showcase |
| `/dashboard` | `Overview.jsx` | Command center & real-time inventory KPIs |
| `/today` | `Today.jsx` | Immediate operational alerts & slow-moving ledger |
| `/future` | `Future.jsx` | 7/30/90-day demand forecasting & trend analysis |
| `/risks` | `Risks.jsx` | Action center with transparent 0–100 risk scores |
| `/orders` | `Orders.jsx` | Order creation and state machine management |
| `/allocation` | `Allocation.jsx` | Stock reservation & shortage error handling |
| `/picking` | `Picking.jsx` | Picking tasks & bin location tracking |
| `/packing` | `Packing.jsx` | Package assembly & status verification |
| `/dispatch` | `Dispatch.jsx` | Carrier assignment & shipment confirmation |
| `/exceptions` | `Exceptions.jsx` | Operational exception logging & resolution |
| `/finance` | `Finance.jsx` | Financial metrics, COGS, and profitability |
| `/warehouses` | `Warehouses.jsx` | Multi-warehouse performance overview |
| `/transfers` | `Transfers.jsx` | Inter-warehouse inventory transfers |

---

## License

Distributed under the MIT License. See `LICENSE` for details.

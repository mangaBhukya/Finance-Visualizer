# Personal Finance Visualizer

A modern, responsive web application to track and visualize your personal finances. This app allows users to manage transactions, categorize expenses, set budgets, and gain financial insights — all with a clean, intuitive UI inspired by real-world finance dashboards.

---

## Features

### Stage 1: Basic Transaction Tracking
- Add, delete transactions (amount, date, description)
- View transactions in a list
- Form validation (amount, date, description)
- Responsive design with error states

### Stage 2: Categories & Dashboard
- Predefined transaction categories
- Category-wise pie chart
- Dashboard with:
  - Total spent summary
  - Number of categories used
  - Recent transactions
  - Monthly expense bar chart using Recharts
- Category-based transaction chips with colors/icons

### Stage 3: Budgeting & Insights
- Budget vs actual comparison chart


---

## Tech Stack

| Layer     | Technology                |
|-----------|---------------------------|
| Frontend  | Next.js, React, TypeScript |
| UI        | Tailwind CSS, ShadCN UI, Recharts |
| Backend   | Node.js, Express.js (separate repo) |
| Database  | MongoDB                   |

---



---

## Installation
### 1. Clone the repo
git clone 

cd finance-visualizer
### 2. Install dependencies
npm install
### 3. Run locally
npm run dev

# API Endpoints (Frontend uses these)
- GET    /api/transactions
- POST   /api/transactions
- PUT    /api/transactions/:id
- DELETE /api/transactions/:id

# Eslint error Fixed



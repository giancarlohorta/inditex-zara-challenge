# 📱 Mobile Store App (Technical Challenge)

This web application was developed as part of a technical challenge for Inditex. It allows users to search for products, view product details, choose color and storage options, and add items to the shopping cart.

---

## 🚀 Node Version

- **Node 18**

## 🚀 Tech Stack

- **React 19**
- **TypeScript**
- **Vite**
- **React Router DOM v6.23** (node 18)
- **Axios**
- **React Query (TanStack Query)**
- **Vitest + Testing Library + Axios Mock Adapter** (unit testing)
- **ESLint + Prettier**
- **CSS Modules + CSS Variables**

---

## 🧱 Project Structure

Atomic Design was chosen for this project to promote reusability, avoid duplication of logic, and provide a clear structure based on component complexity. This methodology supports a scalable architecture, making the UI system easier to maintain and extend over time.

Follows Atomic Design:

- **atoms → molecules → organisms → pages**

- **React Query handles remote data fetching**

- **Context API + LocalStorage is used to manage and persist the shopping cart**

- **Fully responsive and accessible following modern web standards**

```bash
src/
├── components/
│ ├── atoms/
│ │ ├── Button/
│ │ ├── Input/
│ │ └── Typography/
│ ├── molecules/
│ │ ├── Header/
│ │ └── Item/
│ ├── organisms/
│ │ ├── ListItem/
│ │ ├── ScrollSimilarProducts/
│ │ ├── SearchArea/
│ │ └── SpecsList/
│ └── pages/
│ | ├── Cart/
│ | ├── DefaultLayout/
│ | ├── ProductDetails/
│ └ └── Products/
├── context/
├── hook/
├── mocks/
├── services/
├── styles/
├── types/
└── utils/
```

## ⚙️ Available Scripts

```bash
npm install           # Install all dependencies
npm run dev           # Run in development mode with HMR
npm run build         # Generate optimized production build
npm run preview       # Preview the production build
npm run lint          # Run ESLint
npm run test          # Run unit tests in watch mode
npm run test:coverage # Generate coverage report
```

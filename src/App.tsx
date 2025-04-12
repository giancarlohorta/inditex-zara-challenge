import { Route, Routes } from "react-router-dom";
import Products from "./components/pages/Products";
import ProductDetails from "./components/pages/ProductDetails";
import Cart from "./components/pages/Cart";
import CartProvider from "./context/CartProvider";

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </CartProvider>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";
import Products from "./components/pages/Products";
import ProductDetails from "./components/pages/ProductDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/Product/:id" element={<ProductDetails />} />
    </Routes>
  );
}

export default App;

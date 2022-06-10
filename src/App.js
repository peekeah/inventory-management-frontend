import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./components/Sidebar";
import { Dashboard } from "./components/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ListProducts } from "./components/ListProducts";
import { AddProduct } from "./components/AddProduct";

function App() {
  return (
    <>
      <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/list-products" element={<ListProducts />} />
          <Route path="/add-product" element={<AddProduct />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

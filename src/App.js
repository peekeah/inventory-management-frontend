import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./components/Sidebar";
import { Dashboard } from "./components/Dashboard";
import { DrawerSelectList } from "./components/DrawerSelectList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ListProducts } from "./components/ListProducts";
import { AddProduct } from "./components/AddProduct";
import { UpdateProduct } from "./components/UpdateProduct";

function App() {
  return (
    <>
      <BrowserRouter>
      {/* #FIXME: Add Sidebar  */}
      {/* <Sidebar /> */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/list-products" element={<ListProducts />} />
          <Route path="/add-product" element={<AddProduct/>} />
          <Route path="/update" element={<UpdateProduct />} />
        </Routes>
      </BrowserRouter>
      <div className="d-flex">
        {/* </div> */}
        <div style={{ width: "100%" }}></div>
      </div>
    </>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export const ListProducts = () => {
  let URL = "https://inventory-management-tool-01.herokuapp.com";
  const [products, setProducts] = useState([]);
  const [category, setCategories] = useState([]);

  useEffect(() => {
    let getData = async () => {
      const res = await axios.get(`${URL}/get-items`);
      setProducts(res.data);
      let listData = res.data.map((s) => s.category);
      setCategories([...new Set(listData)]);
    };
    getData();
  }, []);

  return (
    <>
      {products ? (
        <>
          <div className="container my-3">
            <table className="table table-info">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item, id) => (
                  <tr key={id}>
                    <th>{id + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.quantity}</td>
                    <td>
                      <button type='button'>Edit</button> &nbsp;
                      <button type='button'>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            // open={open}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </>
      )}
    </>
  );
};

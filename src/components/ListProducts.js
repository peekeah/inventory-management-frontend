import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { UpdateProduct } from "./UpdateProduct";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const ListProducts = () => {
  let URL = "https://inventory-management-tool-01.herokuapp.com";
  const [products, setProducts] = useState("");
  const [counter, setCounter] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setCounter(counter + 1);
  }, []);

  //Fetching Data
  useEffect(() => {
    let getData = async () => {
      const res = await axios.get(`${URL}/get-items`);
      setProducts(res.data);
    };
    getData();
  }, [counter]);

  //Delete Api Call
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${URL}/delete-item/${id}`);
      alert("successfully deleted");
      setCounter(counter + 1);
    } catch (err) {
      console.log(err);
      alert("err", err);
    }
  };

  const handleEdit = async (item) => {
    setSelectedItem(item);
    handleOpen();
    console.log(item);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{
          disableTransition: {
            transition: "none",
          },
        }}
      >
        <Box sx={style}>
          <UpdateProduct
            data={selectedItem}
            counter={counter}
            setCounter={setCounter}
            handleClose={handleClose}
          />
        </Box>
      </Modal>

      <h1 className="text-center my-5 mx-0">Products</h1>
      {products ? (
        <>
          <div className="container">
            <div className="d-flex row mx-0 justify-content-center">
              {products.map((item, id) => (
                <div className="wrapper col-10 col-sm-6 col-lg-4 my-3 mx-0">
                  <div className="card bg-light">
                    <div className="card-body text-center">
                      <h2>{item.name}</h2>
                      <h5>{item.category}</h5>
                      <h2>{item.quantity}</h2>
                      <div className="d-flex gap-3 justify-content-center">
                        <button
                          className="btn btn-outline-dark"
                          onClick={() => handleEdit(item)}
                        >
                          <EditIcon />
                        </button>
                        <button
                          className="btn btn-outline-dark"
                          onClick={() => handleDelete(item._id)}
                        >
                          <DeleteIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </>
  );
};

import React, { useState } from "react";
import { Drawer } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListIcon from "@mui/icons-material/List";
import AddBoxIcon from "@mui/icons-material/AddBox";

const drawerWidth = 240;

//CSS for Components
const useStyles = makeStyles({
  drawerPaper: {
    width: drawerWidth,
  },
  list: {
    listStyleType: "none",
  },
});

const Sidebar = () => {
  const classes = useStyles();
  let navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <div className="position-absolute" style={{ top: 12, left: 15 }}>
        <MenuIcon fontSize="large" onClick={() => setIsDrawerOpen(true)} />
      </div>
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        classes={{ paper: classes.drawerPaper }}
      >
        <div>
          <div className="list-group" onClick={() => setIsDrawerOpen(false)}>
            <div className="my-3 mx-3 align-self-end">
              <CloseIcon
                fontSize="large"
                onClick={() => setIsDrawerOpen(false)}
              />
            </div>

            <button
              type="button"
              className="list-group-item list-group-item-action"
              onClick={() => navigate("/")}
            >
              <div className="d-flex gap-2 align-items-center">
                <HomeIcon fontSize="large" />
                <div style={{ fontSize: "1.5rem" }}>Home</div>
              </div>
            </button>

            <button
              type="button"
              className="list-group-item list-group-item-action"
              onClick={() => navigate("/dashboard")}
            >
              <div className="d-flex gap-2 align-items-center">
                <DashboardIcon fontSize="large" />
                <div style={{ fontSize: "1.5rem" }}>Dashboard</div>
              </div>
            </button>
            <button
              type="button"
              className="list-group-item list-group-item-action"
              onClick={() => navigate("/add-product")}
            >
              <div className="d-flex gap-2 align-items-center">
                <AddBoxIcon fontSize="large" />
                <div style={{ fontSize: "1.5rem" }}>Add Product</div>
              </div>
            </button>
            <button
              type="button"
              className="list-group-item list-group-item-action"
              onClick={() => navigate("/list-products")}
            >
              <div className="d-flex gap-2 align-items-center">
                <ListIcon fontSize="large" />
                <div style={{ fontSize: "1.5rem" }}>List Product</div>
              </div>
            </button>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Sidebar;

import React, { useState } from "react";
import { Drawer } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

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
        <div className="">
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
              Dashboard
            </button>
            <button
              type="button"
              className="list-group-item list-group-item-action"
              onClick={() => navigate("/add-product")}
            >
              Add Product
            </button>
            <button
              type="button"
              className="list-group-item list-group-item-action"
              onClick={() => navigate("/list-products")}
            >
              List Product
            </button>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Sidebar;

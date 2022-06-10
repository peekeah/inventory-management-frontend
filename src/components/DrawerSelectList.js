import React from "react";
import { useNavigate } from "react-router-dom";

export const DrawerSelectList = () => {
    let navigate = useNavigate();

  return (
    <div className="mt-5">
      <div className="list-group">
        {/* <button
          type="button"
          className="list-group-item list-group-item-action active"
          aria-current="true"
        >
          The current button
        </button> */}
        <button type="button" className="list-group-item list-group-item-action" onClick={() => navigate('/')}>
          Dashboard
        </button>
        <button type="button" className="list-group-item list-group-item-action" onClick={() => navigate('/list-products')}>
          List Product
        </button>
        <button type="button" className="list-group-item list-group-item-action" onClick={() => navigate('/add-products')}>
          Add Product
        </button>
        <button type="button" className="list-group-item list-group-item-action" onClick={() => navigate('/update')}>
          Update Quantity
        </button>
      </div>
    </div>
  );
};

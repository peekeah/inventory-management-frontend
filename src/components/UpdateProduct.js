import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";

//Validation Schema
const AddProductSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Minimum 3 Charcters Required")
    .max(15, "Max 15 Charcters Allowed")
    .required("Name is Required"),
  category: Yup.string()
    .min(3, "Minimum 3 Charcters Required")
    .max(15, "Max 15 Charcters Allowed")
    .required("Category is Required"),
  quantity: Yup.number()
    .typeError("You must specify a number")
    .min(0, "Negative Values not allowed")
    .max(10000, "Inventory limit exceeded")
    .required("Quantity is Required"),
});

export const UpdateProduct = ({ data, counter, setCounter, handleClose }) => {
  let URL = "https://inventory-management-tool-01.herokuapp.com";

  //CSS for Error Messages
  const validationError = {
    color: "Red",
    position: "absolute",
  };

  const initialValues = data;

  //Edit Product 'PATCH' API Call
  const handleSubmit = async (values) => {
    const { _id, ...item } = values;
    try {
      axios.patch(`${URL}/edit-item/${_id}`, item);
      setCounter(counter + 1);
      handleClose();
      alert("Succefully Updated!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={AddProductSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            isValid,
          }) => (
            <Form onSubmit={handleSubmit}>
              <div className="mb-3 pb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className={`form-control ${
                    touched.name && errors.name && "is-invalid"
                  }`}
                  value={values.name}
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div
                  className="form-text validationError"
                  style={validationError}
                >
                  {touched.name && errors.name}
                </div>
              </div>
              <div className="my-3 pb-3">
                <label className="form-label">Category</label>
                <input
                  type="text"
                  className={`form-control ${
                    touched.category && errors.category && "is-invalid"
                  }`}
                  value={values.category}
                  name="category"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="form-text" style={validationError}>
                  {touched.category && errors.category}
                </div>
              </div>
              <div className="my-3">
                <label className="form-label">Quantity</label>
                <input
                  type="text"
                  className={`form-control ${
                    touched.quantity && errors.quantity && "is-invalid"
                  }`}
                  value={values.quantity}
                  name="quantity"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="form-text" style={validationError}>
                  {touched.quantity && errors.quantity}
                </div>
              </div>

              <div
                className="mx-auto d-flex gap-3 justify-content-center"
                style={{ width: "100%" }}
              >
                <button
                  type="submit"
                  className="btn btn-success my-3 btn-md"
                  style={{ width: "10rem" }}
                  disabled={!isValid || isSubmitting}
                >
                  Submit
                </button>

                <button
                  type="reset"
                  className="btn btn-primary my-3 btn-md"
                  style={{ width: "10rem" }}
                >
                  Reset
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

import React from "react";

export const CategorySelect = ({
  category,
  selectedCategory,
  setSelectedCategory,
}) => {
  const handleChange = (e) => {
    setSelectedCategory(e.target.value);
    console.log(e.target.value);
  };

  return (
    <>
      <div className="d-flex gap-3 justify-content-center m-2">
        <label className=" d-flex align-items-center">
          <span>Category</span>
        </label>
        <div>
          <select
            className="form-select form-select-lg"
            aria-label=".form-select-lg example"
            value={selectedCategory}
            onChange={handleChange}
          >
            {category.map((item, id) => (
              <option key={id}>{item}</option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

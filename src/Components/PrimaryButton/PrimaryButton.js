import React from "react";

const PrimaryButton = ({ children }) => {
  return (
    <button className="btn bg-gradient-to-r from-primary to-secondary text-white border-none">
      {children}
    </button>
  );
};

export default PrimaryButton;

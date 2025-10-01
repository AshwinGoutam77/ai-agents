import React from "react";

// ✅ Define the props type
type PrimaryBtnProps = {
  btnText: string;
  onClick?: () => void; // Optional onClick handler
};

// ✅ Functional component using props
const PrimaryBtn: React.FC<PrimaryBtnProps> = ({ btnText, onClick }) => {
  return (
    <button
      onClick={onClick} 
      className="bg-gradient-to-r from-blue-600 to-purple-600 w-fit text-white px-4 py-2 rounded  hover:to-blue-600 hover:from-purple-600"
    >
      {btnText}
    </button>
  );
};

export default PrimaryBtn;

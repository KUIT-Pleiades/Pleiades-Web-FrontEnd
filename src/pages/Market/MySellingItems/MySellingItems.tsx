import React from "react";
import { useNavigate } from "react-router-dom";

const MySellingItems: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className=""></div>
      <button onClick={() => navigate(-1)}>뒤로가기</button>
    </div>
  );
};

export default MySellingItems;

import React from "react";

const ImageContainer = ({ imageUrl }) => {
  return (
    <div className="mt2">
      <img src={imageUrl} alt="" width="500px" height="auto" />
    </div>
  );
};

export default ImageContainer;

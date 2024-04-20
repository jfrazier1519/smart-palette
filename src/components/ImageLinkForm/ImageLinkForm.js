import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <p className="f3">
        {"This Smart Palette will detect the color palette in your pictures."}
      </p>
      <p className="f4">
        {"Try adding a keyword to get palette suggestions!!!"}
      </p>
      <div className="center">
        <div className="form center pa4 br3 shadow-5">
          <input
            className="f4 pa2 w-70 center"
            placeholder="image url..."
            type="text"
            onChange={onInputChange}
          />
          <input
            className="f4 pa2 mh3 w-30"
            placeholder="keyword..."
            type="text"
            onChange={onInputChange}
          />
          <button
            className="w-30 grow f4 link ph3 pv2 dib white bg-blue"
            onClick={onButtonSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;

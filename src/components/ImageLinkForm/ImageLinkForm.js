import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({
  onInputUrlChange,
  onInputKeywordChange,
  onDetectSubmit,
  onResetSubmit,
  imageUrl,
  keyword,
}) => {
  return (
    <div>
      <p className="f3 white">
        {"This Smart Palette will detect the color palette in your pictures."}
      </p>
      {/* <p className="f4 white">
        {"Try adding a keyword to get palette suggestions!!!"}
      </p> */}
      <div className="center">
        <div className="form center pa4 br3 shadow-5">
          <input
            className="f5 pa2 w-70 center"
            placeholder="image url..."
            type="text"
            value={imageUrl}
            onChange={onInputUrlChange}
          />
          {/* <input
            className="f5 pa2 mh3 w-30"
            placeholder="keyword..."
            type="text"
            value={keyword}
            onChange={onInputKeywordChange}
          /> */}
          <button
            className="w-20 grow f4 link ph3 pv2 dib mh3"
            onClick={onDetectSubmit}
          >
            Detect
          </button>
          <button
            className="w-20 grow f4 link ph3 pv2 dib"
            onClick={onResetSubmit}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;

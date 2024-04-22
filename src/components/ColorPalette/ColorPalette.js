import React, { useState, useEffect } from "react";
import "./ColorPalette.css"; // Ensure you have a CSS file to style the palette as needed.

const ColorPalette = ({ colors, handleCopyColor, handleCopyEntirePalette }) => {
  const sortedColors = colors.sort((a, b) => b.probability - a.probability);

  return (
    <div className="color-palette mt2 shadow-5">
      {sortedColors.map((color, index) => (
        <div
          key={index}
          className="color-item"
          style={{ display: "flex", alignItems: "center" }}
        >
          <div
            className="grow color-square pointer"
            style={{
              backgroundColor: color.hex,
              width: "40px",
              height: "40px",
              border: "1px solid #000",
            }}
            onClick={() => handleCopyColor(color.hex)}
          ></div>
          <div className="color-name" style={{ marginLeft: "10px" }}>
            {color.name}
          </div>
        </div>
      ))}
      <button className="grow f4 ph3 pv2 dib" onClick={handleCopyEntirePalette}>
        Copy Entire Palette
      </button>
    </div>
  );
};

export default ColorPalette;

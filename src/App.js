import React, { useState, useEffect } from "react";
import "./App.css";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Logo from "./components/Logo/Logo";
import ParticlesBg from "particles-bg";
import ColorPalette from "./components/ColorPalette/ColorPalette";
import ImageContainer from "./components/ImageContainer/ImageContainer";
import CalculateGradient from "./components/CalculateGradient/CalculateGradient";

function App() {
  const [keyword, setKeyword] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [palette, setPalette] = useState([]);
  const [copyMessage, setCopyMessage] = useState(null);
  const gradient = CalculateGradient({ palette });

  useEffect(() => {
    document.body.style.background = gradient;
  }, [gradient]); // Update when the gradient changes

  const onInputKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  const onInputUrlChange = (event) => {
    setImageUrl(event.target.value);
  };

  const handleCopyColor = (hex) => {
    navigator.clipboard
      .writeText(hex)
      .then(() => {
        setCopyMessage(`Copied ${hex} to clipboard`);
      })
      .catch((err) => {
        console.error("Failed to copy to clipboard:", err);
      });
  };

  const handleCopyEntirePalette = () => {
    const paletteHex = palette.map((color) => color.hex).join(", ");
    navigator.clipboard
      .writeText(paletteHex)
      .then(() => {
        setCopyMessage("Copied the entire palette to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy to clipboard:", err);
      });
  };

  useEffect(() => {
    let timer;
    if (copyMessage) {
      timer = setTimeout(() => {
        setCopyMessage(null);
      }, 3000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [copyMessage]);

  const onResetSubmit = () => {
    setKeyword("");
    setImageUrl("");
    setPalette([]);
    setCopyMessage("Cleared all settings");
  };

  const onDetectSubmit = () => {
    const fetchColorPalette = async () => {
      const response = await fetch(`http://localhost:3001/palette`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageUrl,
          keyword,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setPalette(data);
      }
    };

    fetchColorPalette();
  };

  return (
    <div className="App">
      <ParticlesBg type="cobweb" bg={true} />

      <div className="pt4">
        <Logo gradient={gradient} />
        <ImageLinkForm
          onInputUrlChange={onInputUrlChange}
          onInputKeywordChange={onInputKeywordChange}
          onDetectSubmit={onDetectSubmit}
          onResetSubmit={onResetSubmit}
          imageUrl={imageUrl}
          keyword={keyword}
        />
        <div className="flex items-center justify-center pv4">
          <ImageContainer imageUrl={imageUrl} />
          {palette && palette.length > 0 ? (
            <div className="w-20">
              {" "}
              <ColorPalette
                colors={palette}
                handleCopyColor={handleCopyColor}
                handleCopyEntirePalette={handleCopyEntirePalette}
              />
            </div>
          ) : null}
        </div>
      </div>
      <div>
        {copyMessage && (
          <div className="copy-message" style={{ marginTop: "10px" }}>
            {copyMessage}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

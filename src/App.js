import "./App.css";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Logo from "./components/Logo/Logo";
import ParticlesBg from "particles-bg";
import { useEffect, useState } from "react";
import ColorRecognition from "./components/ColorRecognition/FaceRecognition";

function App() {
  const [keyword, setKeyword] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setSignedIn] = useState(false);
  const [palette, setPalette] = useState({});

  const onInputKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  const onInputUrlChange = (event) => {
    setImageUrl(event.target.value);
  };

  const onSubmit = () => {
    console.log("imageUrl:", imageUrl);
    console.log("keyword:", keyword);

    const fetchColorPalette = async () => {
      const response = await fetch(
        `http://localhost:3001/palette/${imageUrl}/${keyword}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        //likely going to need to parse data for info
        setPalette(data);
      }
    };

    fetchColorPalette();
  };

  const onRouteChange = (route) => {
    if (route === "signout") {
      setSignedIn(false);
    } else if (route === "home") {
      setSignedIn(true);
    }
    setRoute(route);
  };

  return (
    <div className="App">
      <ParticlesBg type="cobweb" bg={true} />

      <div className="pt4">
        <Logo />
        <ImageLinkForm
          onInputUrlChange={onInputUrlChange}
          onInputKeywordChange={onInputKeywordChange}
          onButtonSubmit={onSubmit}
        />
        <ColorRecognition imageUrl={imageUrl} />
      </div>
    </div>
  );
}

export default App;

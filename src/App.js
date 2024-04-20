import "./App.css";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Logo from "./components/Logo/Logo";
import Navigation from "./components/Navigation/Navigation";
import ParticlesBg from "particles-bg";
import { useState } from "react";
import Clarifai from "clarifai";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import ColorRecognition from "./components/ColorRecognition/FaceRecognition";

const app = new Clarifai.App({
  apiKey: "8e8b948d4d9342989e4c43b40340473d",
});

function App() {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setSignedIn] = useState(false);

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const returnClarifaiRequestOptions = (imageUrl) => {
    // Your PAT (Personal Access Token) can be found in the Account's Security section
    const PAT = "d6442ba0c7004a788636ae140350c242";
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = "rhysand1519";
    const APP_ID = "smart-palette";
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = "color-recognition";
    const IMAGE_URL = imageUrl;

    const raw = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              url: IMAGE_URL,
            },
          },
        },
      ],
    });

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key " + PAT,
      },
      body: raw,
    };

    return requestOptions;
  };

  const onSubmit = () => {
    setImageUrl(input);

    app.models.predict("color-recognition", input);
    fetch(
      "https://api.clarifai.com/v2/models/color-recognition/outputs",
      returnClarifaiRequestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
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
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
      {route === "home" ? (
        <div>
          <Logo />
          <ImageLinkForm
            onInputChange={onInputChange}
            onButtonSubmit={onSubmit}
          />
          <ColorRecognition imageUrl={imageUrl} />
        </div>
      ) : route === "signin" ? (
        <SignIn onRouteChange={onRouteChange} />
      ) : (
        <Register onRouteChange={onRouteChange} />
      )}
    </div>
  );
}

export default App;

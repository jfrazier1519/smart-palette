import React, { useEffect } from "react";
import Tilt from "react-parallax-tilt";
import "./Logo.css";
import logo from "./art.png";

const Logo = ({ gradient }) => {
  useEffect(() => {
    document.body.style.background = gradient;
  }, [gradient]); // Update when the gradient changes

  return (
    <div className="ma4 mt0">
      <Tilt
        className="Tilt br4 shadow-2"
        options={{ max: 55 }}
        style={{ width: "150px", background: gradient }}
      >
        <div className="Tilt-inner pa3">
          <img style={{ paddingTop: "5px" }} alt="logo" src={logo} />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;

import React from "react";
import "./footer.scss";

const year = new Date().getFullYear();

const Footer = () => {
  return (
    <footer>
      <div className="footerContainer">
        <span>ExpTrack | {year}</span>
      </div>
    </footer>
  );
};

export default Footer;

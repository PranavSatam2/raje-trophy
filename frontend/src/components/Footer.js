import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="bg-dark text-light text-center">
      <p>&copy; {new Date().getFullYear()} TrophyZone. All Rights Reserved.</p>
    </footer>
  );
}

export default Footer;

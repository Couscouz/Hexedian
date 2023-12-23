import React from "react";

const Logo = () => {
  return (
    <div className="logo">
      {/* Les images importées depuis la balise IMG sont accessibles dans "public" */}
      <img src="./wot_logo.png" alt="logo wot" />
      <h3>HEXEDIAN</h3>
    </div>
  );
};

export default Logo;

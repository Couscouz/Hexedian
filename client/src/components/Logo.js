import React from "react";

const Logo = () => {
  return (
    <div className="logo">
      {/* Les images importées depuis la balise IMG sont accessibles dans "public" */}
      <img src="./wot_logo.png" alt="logo wot" />
      <h3>H</h3>
    </div>
  );
};

export default Logo;

import React from "react";

const Logo = () => {
  return (
    <div className="logo">
      {/* Les images importées depuis la balise IMG sont accessibles dans "public" */}
      <img src="./hex.png" alt="logo hex" />
    </div>
  );
};

export default Logo;

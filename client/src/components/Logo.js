import React from "react";

const Logo = () => {
  return (
    <div className="logo">
      {/* Les images importées depuis la balise IMG sont accessibles dans "public" */}
      <a href="/"><img src="./hex.png" alt="logo hex" /></a>
    </div>
  );
};

export default Logo;

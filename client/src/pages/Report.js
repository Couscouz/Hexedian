import React from "react";
import WarningBar from "../components/WarningBar";

const Report = () => {
  return (
    <div className="report">
      <WarningBar />
      <form>
        <input type="text" required></input>
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
};

export default Report;
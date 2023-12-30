import React, { useEffect, useState } from "react";
import axios from "axios";
import Logo from "../components/Logo";
import WarningBar from "../components/WarningBar";

const Report = () => {
    const [formData, setFormData] = useState({ message: ''});
    const [status, setStatus] = useState("");

    const handleChange = (e) => {
        setFormData({ message: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.message.length < 2) return;
            setStatus("Report envoyé avec succès, merci !");
            await axios.post(process.env.REACT_APP_API_URL+'/report/new', formData);
        } catch (error) {
            setStatus("Problème avec l'envoi du report");
            console.error(error);
        }
    };

  return (
    <div className="report">
      <WarningBar />
      <Logo />
      <form onSubmit={handleSubmit}>
            <textarea
                type="text"
                rows={10}
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
            />
            <button type="submit">Envoyer</button>
        </form>
        {status && 
          <div className="resultMessage">
            <h1>{status}</h1>
          </div>
          }
    </div>
  );
};

export default Report;
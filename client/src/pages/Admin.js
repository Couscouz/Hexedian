import React, { useEffect, useState } from "react";
import axios from "axios";
import Logo from "../components/Logo";

const API_URL = "https://backend.hexedian.fr";

const Admin = () => {
    const [apiMessage, setMessage] = useState("notConnected");
    const [playerNumber, setPlayerNumber] = useState(null);
    const [clanNumber, setClanNumber] = useState(null);

    useEffect(async () => {
        await axios.get(API_URL+"/test").then(res => {
            const message = res.data.message;
            setMessage(message); 
        }).catch(err => setMessage(err));
        await axios.get(API_URL+"/players/number").then(res => {
            setPlayerNumber(res.data)
        }).catch(err => setPlayerNumber(err));
        await axios.get(API_URL+"/clans/number").then(res => {
            setClanNumber(res.data)
        }).catch(err => setClanNumber(err));
    }, []);

    return (
        <div className="admin">
            <Logo />
            <h1>Admin Page</h1>
            <h1>API Status : {apiMessage}</h1>
            <h1>Player number : {playerNumber}</h1>
            <h1>Clan number : {clanNumber}</h1>
        </div>
    );
};

export default Admin;

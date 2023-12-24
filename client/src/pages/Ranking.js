import React from "react";
import Logo from "../components/Logo";
import WarningBar from "../components/WarningBar";
import Players from "../components/ranking/Players";
import Menu from "../components/Menu";

const Ranking = () => {
    return (
        <div className='ranking'>
            {/* <Menu /> */}
            <div className='ranking-content'>
                <WarningBar />
                <Logo />
                <Players />
            </div>
        </div>
    );
};

export default Ranking;

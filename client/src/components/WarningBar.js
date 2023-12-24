import React, { useState} from "react";

const WarningBar = () => {

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div className={`warningBar ${isHovered ? "paused" : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
            <div className="warningBar-text">
                <h1>/!\ Site en cours de développement /!\</h1>
                <h2>Merci de signaler les absences ou les erreurs de joueurs</h2>
                <h2>ici</h2>
            </div>
        </div>
    );
};

export default WarningBar;

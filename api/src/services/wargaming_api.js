const request = require('request');

const APPLICATION_ID = '104dcbb058cfe503c47eb27800beb0ec';

module.exports.getPlayerName_ByID = async (id) => {
    let name = null;
    const res = await fetch(`https://api.worldoftanks.eu/wot/account/info/?application_id=${APPLICATION_ID}&account_id=${id}`)
        .then(response => response.json()
        .then(content => { if (content.data[id] != null) name = content.data[id].nickname })
        .catch(err => console.log(err))
    );
    return name;
}


//---------CLANS-SECTION--------------------

module.exports.getClanName_ByID = async (id) => {
    let tag = "";
    const res = await fetch(`https://api.worldoftanks.eu/wot/clans/info/?application_id=${APPLICATION_ID}&clan_id=${id}`)
        .then(response => response.json()
        .then(content => { tag = content.data[id].tag })
        .catch(err => console.log(err))
    );
    return tag;
}

module.exports.getClanSize_ByID = async (id) => {
    try {
        let size = null;
        const _temp = await fetch(`https://api.worldoftanks.eu/wot/clans/info/?application_id=${APPLICATION_ID}&clan_id=${id}`)
            .then(response => response.json()
            .then(content => { size = content.data[id].members_count })
            .catch(err => console.log(err)));
        return size
    } catch {
        return null;
    }
}

module.exports.getClanID_ByPlayerID = async (id) => {
    let clanID = null;
    const res = await fetch(`https://api.worldoftanks.eu/wot/account/info/?application_id=${APPLICATION_ID}&account_id=${id}`)
        .then(response => response.json()
        .then(content => { clanID = content.data[id].clan_id })
        .catch(err => console.log(err))
    );
    return clanID;
}

module.exports.getClanLogo_ByID = async (id) => {
    const options = {
        url: `https://eu.wargaming.net/clans/media/clans/emblems/cl_${String(id).slice(6,9)}/${id}/emblem_195x195.png`,
        method: "get",
        encoding: null
    }
    try {
        request(options, function(error, response, body) {
            if (error) console.log("error: "+error);
            else {
                console.log("here with "+id);
                console.log(typeof(body));
            }
        })
    } catch {
        return null;
    }
}

module.exports.getNumberOf3moe_ByID = async (id) => {
    const url = `https://api.worldoftanks.eu/wot/tanks/achievements/?application_id=${APPLICATION_ID}&account_id=${id}`;
    try {
        const response = await fetch(url, { method: 'GET' });
        const content = await response.json();
        const all_tanks = content.data[id];
        let count_3moe = 0;
        for (tank of all_tanks)
            if (tank.achievements.marksOnGun === 3) 
                count_3moe++;
        return count_3moe;
    } catch {
        return null;
    }
}

module.exports.getDateOfLastBattle_ByID = async (id) => {
    const url = `https://api.worldoftanks.eu/wot/account/info/?application_id=${APPLICATION_ID}&account_id=${id}`;
    try {
        const response = await fetch(url, { method: 'GET' });
        const content = await response.json();
        return content.data[id].last_battle_time;
    } catch {
        return null;
    }
}

module.exports.getTierOfVehicule_ByID = async (id) => {
    const url = `https://api.worldoftanks.eu/wot/encyclopedia/vehicles/?application_id=${APPLICATION_ID}&tank_id=${id}`;
    try {
        const response = await fetch(url, { method: 'GET' });
        const content = await response.json();
        return content.data[id].tier;
    } catch {
        return null;
    }
}

module.exports.getNationOfVehicule_ByID = async (id) => {
    const url = `https://api.worldoftanks.eu/wot/encyclopedia/vehicles/?application_id=${APPLICATION_ID}&tank_id=${id}`;
    try {
        const response = await fetch(url, { method: 'GET' });
        const content = await response.json();
        return content.data[id].nation;
    } catch {
        return null;
    }
}
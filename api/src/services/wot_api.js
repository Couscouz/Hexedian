const APPLICATION_ID = '104dcbb058cfe503c47eb27800beb0ec'



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
    let size = "";
    const res = await fetch(`https://api.worldoftanks.eu/wot/clans/info/?application_id=${APPLICATION_ID}&clan_id=${id}`)
        .then(response => response.json()
        .then(content => { size = content.data[id].members_count })
        .catch(err => console.log(err))
    );
    return size;
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
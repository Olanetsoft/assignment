const fs = require('fs');

/* util functions implementation */
// save data into the json file
const saveData = (data) => {
    const stringifySaveData = JSON.stringify(data);
    fs.writeFileSync('./data/data.json', stringifySaveData);
}

//get the user data from json file
const getUserData = () => {
    const jsonData = fs.readFileSync('./data/data.json')
    return JSON.parse(jsonData)
}
/* util functions implementation ends */


exports.getBalance = (req, res) => {
    const { account_id } = req.query;

    // get the existing user data
    const existUsers = getUserData();

    // check if the username exist or not       
    const findExist = existUsers[account_id];

    // check if it exist
    if (!findExist) {
        const empty = "0";
        return res.status(404).send(empty)
    };

    const balance = findExist.amount.toString()
    // send response
    res.status(200).send(balance);
};

exports.reset = (req, res) => {

    // get the existing user data
    const existUsers = getUserData();
    const destination = "300";
    const amount = 0;

    // check if the username exist or not       
    const findExist = existUsers[destination];
    if (findExist) {
        data = {
            destination,
            amount
        }
        // reset the account data
        existUsers[destination] = data;

        // save the new account data
        saveData(existUsers);
    };

    // send response
    res.status(200).send("OK");
};
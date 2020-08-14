const fs = require('fs');

/* util functions implementation */

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
    // send response
    res.status(200).send("OK");
}
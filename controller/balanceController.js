// Require the data model
const getUserModelModel = require('../model/data');

exports.getBalance = (req, res) => {
    const { account_id } = req.query;

    // get the existing user data
    const existUsers = getUserModelModel;

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
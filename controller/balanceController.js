const fs = require('fs');


/* util functions implementation */

//get the user data from json file
const getUserData = () => {
    const jsonData = fs.readFileSync('./data/data.json')
    return JSON.parse(jsonData)
}
/* util functions implementation ends */



exports.getBalance = (req, res, next) => {
    const { account_id } = req.query;

    //get the existing user data
    const existUsers = getUserData();

    console.log(existUsers)
    //check if the username exist or not       
    const findExist = existUsers[account_id];

    if (!findExist) {
        return res.status(404).send({
            balance: 0
        })
    };

    res.status(200).send({
        balance: findExist.amount
    });
}
const fs = require('fs');


/* util functions implementation */
//read the user data from json file
exports.saveData = (data) => {
    const stringifySaveData = JSON.stringify(data)
    fs.writeFileSync('./data/data.json', stringifySaveData)
}


//get the user data from json file
exports.getUserData = () => {
    const jsonData = fs.readFileSync('./data/data.json')
    return JSON.parse(jsonData)
}
/* util functions implementation ends */


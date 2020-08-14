const fs = require('fs');


/* util functions implementation */
//read the user data from json file
const saveData = (data) => {
    const stringifySaveData = JSON.stringify(data)
    fs.writeFileSync('./data/data.json', stringifySaveData)
}


//get the user data from json file
const getUserData = () => {
    const jsonData = fs.readFileSync('./data/data.json')
    return JSON.parse(jsonData)
}
/* util functions implementation ends */




exports.eventActivities = (req, res, next) => {
    //get the new data from post request
    const { type, destination, amount, origin } = req.body;

    //get the existing user data
    const existUsers = getUserData()

    //check if there is existing account
    if (existUsers) {
        const findExist = existUsers[destination];

        //check if the account exist already
        if (!findExist && type === "deposit") {
            data = {
                destination,
                amount
            }

            //append the account data
            existUsers[destination] = data

            //save the new account data
            saveData(existUsers);

            return res.status(201).send({
                destination: {
                    id: destination,
                    balance: amount
                }
            })

        }

        if (type === "deposit") {

            findExist.amount += parseFloat(amount);

            //append the account data
            existUsers[destination] = findExist

            //save the new account data
            saveData(existUsers);

            return res.status(201).send({
                destination: {
                    id: findExist.destination,
                    balance: findExist.amount
                }
            })
        }

        //withdraw
        if (type === "withdraw") {
            const findExist = existUsers[origin];
            if (!findExist) {
                const empty = "0";
                return res.status(404).send(empty)
            };

            findExist.amount -= parseFloat(amount);
            //append the account data
            existUsers[origin] = findExist

            //save the new account data
            saveData(existUsers);

            return res.status(201).send({
                origin: {
                    id: findExist.destination,
                    balance: findExist.amount
                }
            })
        }

        if (type === "transfer") {
            const findExistOrigin = existUsers[origin];
            const findExistDestination = existUsers[destination];

            if (!findExistOrigin) {
                const empty = "0";
                return res.status(404).send(empty)
            };

            
            findExistOrigin.amount -= parseFloat(amount);

            //append the account data
            existUsers[origin] = findExistOrigin

            // //save the new account data for origin
            // saveData(existUsers);

            findExistDestination.amount += parseFloat(amount);

            //append the account data
            existUsers[destination] = findExistDestination

            //save the new account data for destination
            saveData(existUsers);


            return res.status(201).send({
                destination: {
                    id: findExistDestination.destination,
                    balance: findExistDestination.amount
                },
                origin: {
                    id: findExistOrigin.destination,
                    balance: findExistOrigin.amount
                }
            })
        }

    } else {
        // existUsers = {}

        data = {
            destination,
            amount
        }

        //append the account data
        existUsers[destination] = data

        //save the new account data
        saveData(existUsers);

        return res.status(201).send({
            destination: {
                id: destination,
                balance: amount
            }
        })
    }

}
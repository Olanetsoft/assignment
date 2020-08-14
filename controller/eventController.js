// Require the data model
const { saveModel, getUserModelModel } = require('../model/data');


exports.allTransactionActivities = (req, res) => {
    //get the new data from post request
    const { type, destination, amount, origin } = req.body;

    // get the existing user data
    const existUsers = getUserModelModel;

    // check if there is existing account
    if (existUsers) {
        const findExist = existUsers[destination];

        // check if the account exist already
        if (!findExist && type === "deposit") {
            data = {
                destination,
                amount
            }
            // append the account data
            existUsers[destination] = data

            // save the new account data
            saveModel(existUsers);

            // send response
            return res.status(201).send({
                destination: {
                    id: destination,
                    balance: amount
                }
            })
        }

        // deposit
        if (type === "deposit") {
            findExist.amount += parseFloat(amount);

            //append the account data
            existUsers[destination] = findExist

            //save the new account data
            saveModel(existUsers);

            return res.status(201).send({
                destination: {
                    id: findExist.destination,
                    balance: findExist.amount
                }
            })
        }

        // withdraw
        if (type === "withdraw") {
            const findExist = existUsers[origin];

            // check if it exist
            if (!findExist) {
                const empty = "0";
                return res.status(404).send(empty)
            };

            findExist.amount -= parseFloat(amount);

            // append the account data
            existUsers[origin] = findExist

            // save the new account data
            saveModel(existUsers);

            // send response
            return res.status(201).send({
                origin: {
                    id: findExist.destination,
                    balance: findExist.amount
                }
            })
        }

        // transfer
        if (type === "transfer") {
            const findExistOrigin = existUsers[origin];
            const findExistDestination = existUsers[destination];

            // check if it exist
            if (!findExistOrigin) {
                const empty = "0";
                return res.status(404).send(empty)
            };


            findExistOrigin.amount -= parseFloat(amount);

            // append the account data
            existUsers[origin] = findExistOrigin;

            findExistDestination.amount += parseFloat(amount);

            //append the account data
            existUsers[destination] = findExistDestination;

            //save the new account data for destination and origin
            saveModel(existUsers);

            //send response 
            return res.status(201).send({
                origin: {
                    id: findExistOrigin.destination,
                    balance: findExistOrigin.amount
                },
                destination: {
                    id: findExistDestination.destination,
                    balance: findExistDestination.amount
                }
            })
        };

    } else {
        data = {
            destination,
            amount
        }
        // append the account data
        existUsers[destination] = data

        //save the new account data
        saveModel(existUsers);

        //send response
        return res.status(201).send({
            destination: {
                id: destination,
                balance: amount
            }
        });
    };
};
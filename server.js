const dotenv = require('dotenv');

//using the dotenv variable
dotenv.config({ path: './config.env' });


const app = require('./app');



//Port config
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});
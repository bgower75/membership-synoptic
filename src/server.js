require('dotenv').config({silent: true}); //this allows the app to continue running if it can't find the env file;
const mongoose = require('mongoose');
const server = require('./api');

mongoose.connect(`mongodb://localhost:27019/memberships`, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('connected to database');
        server.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.error(`the error is ...${error}`);
});

require('dotenv').config({silent: true}); //this allows the app to continue running if it can't find the env file;
const mongoose = require('mongoose');
const server = require('./api');
const logger = require('./utilities/logger');

mongoose.connect(process.env.DATABASE, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        logger.info('connected to database');
        server.listen(process.env.PORT, () => {
            logger.info(`Server is running on port ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        logger.error(`the error is ...${error}`);
});

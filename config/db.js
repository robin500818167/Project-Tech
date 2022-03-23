const mongoose = require('mongoose');
const  connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_PASS, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('DB - connect')
    } catch (err) {
        console.log('error occurred while trying to connect to db:', err);
        throw err;
    }
};

module.exports = connectDB;
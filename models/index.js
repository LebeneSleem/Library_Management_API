const { sequelize } = require('../config/db');
const Book = require('./book');

const syncDB = async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log('Database synchronized.');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
};

module.exports = { Book, syncDB };

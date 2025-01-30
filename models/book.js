const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Book = sequelize.define('Book', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    author: { type: DataTypes.STRING, allowNull: false },
    genre: { type: DataTypes.STRING, allowNull: false },
    publication_date: { type: DataTypes.DATE, allowNull: false },
    availability: { type: DataTypes.ENUM('available', 'checked out'), defaultValue: 'available' },
    edition: { type: DataTypes.STRING },
    summary: { type: DataTypes.TEXT },
}, {
    timestamps: true,
});

module.exports = Book;

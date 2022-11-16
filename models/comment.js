const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection')//require connection file

class Comment extends Model { }

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true

        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        }

    },
    {
        sequelize,
        //timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'Comment'
    }

);
module.exports = Comment;
import { Sequelize } from "sequelize";
import db from "../config/Database.js";
 
const { DataTypes } = Sequelize;
 
const Users = db.define('userprofile',{
    user_name:{
        type: DataTypes.STRING
    },
    password_:{
        type: DataTypes.STRING
    },
    name:{
        type: DataTypes.STRING
    },
    last_name:{
        type: DataTypes.STRING
    },
    position:{
        type: DataTypes.STRING
    },
    refresh_token:{
        type: DataTypes.TEXT
    }
},{
    freezeTableName:true
});
 
(async () => {
    await db.sync();
})();
 
export default Users;
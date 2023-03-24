import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
 
export const getUsers = async(req, res) => {
    try {
        const users = await Users.findAll({
            attributes:['id','user_name','name','last_name','position']
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}
 
export const Register = async(req, res) => {
    const { user_name, password_, confPassword ,name,last_name,position} = req.body;
    if(password_ !== confPassword) return res.status(400).json({msg: "Password and Confirm Password do not match"});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password_, salt);
    try {
        await Users.create({
            user_name: user_name,
            password_: hashPassword,
            name : name,
            last_name : last_name,
            position : position
        });
        res.json({msg: "Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}
 
export const Login = async(req, res) => {
    try {
        const user = await Users.findAll({
            where:{
                user_name: req.body.user_name
            }
        });
        const match = await bcrypt.compare(req.body.password_, user[0].password_);
        if(!match) return res.status(400).json({msg: "Wrong Password"});
        const userId = user[0].id;
        const user_name = user[0].user_name;
        const accessToken = jwt.sign({userId, user_name}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '15s'
        });
        const refreshToken = jwt.sign({userId, user_name}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });
        await Users.update({refresh_token: refreshToken},{
            where:{
                id: userId
            }
        });
        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ accessToken });
    } catch (error) {
        res.status(404).json({msg:"Username and Password not found"});
    }
}
 
export const Logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await Users.findAll({
        where:{
            refresh_token: refreshToken
        }
    });
    if(!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await Users.update({refresh_token: null},{
        where:{
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}
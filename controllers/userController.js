import HttpError from "http-errors";
import userModel from '../models/usersModel.js'
import bcrypt from 'bcrypt';
import messageapp from '../data/messages.js';

const register = (req, res, next) => {
    console.log(`---> userController::register`);

    try {
        const body = req.body;
        let result;

        if (!body.username || !body.password) {
            next(HttpError(400, { message: messageapp.parameter_not_especified }))
        } else {


            console.log(`---> userController::register ${body.password}`);
            const user = { username: body.username, password: body.password, timestamp: (body.timestamp || 0), active: body.active };

            result = userModel.loginUser(user);
            if (result != undefined) {
                next(HttpError(400, { message: messageapp.user_error_login }));

            } else {

                result = userModel.createUser(user);

                if (result < 0)
                    next(HttpError(400, { message: messageapp.user_error_register }))

                res.status(201).json(result);

            }

        }

    } catch (error) {
        next(error);
    }

};

const login = (req, res, next) => {
    console.log(`---> userController::login`);

    try {
        const body = req.body;

        if (!body.username || !body.password) {
            next(HttpError(400, { message: messageapp.parameter_not_especified }))
        } else {

            const user = { username: body.username, password: body.password, timestamp: (body.timestamp || 0) };
            const result = userModel.loginUser(user);

            if (result === undefined) {
                next(HttpError(400, { message: messageapp.user_error_login }));
            } else {
                console.log(`---> userController::login ${result.password}`);
                console.log(`---> userController::login ${body.password}`);

                if (!bcrypt.compareSync(body.password, result.password))
                    next(HttpError(400, { message: messageapp.user_error_login }));
                else
                    res.status(200).json(result);
            }
        }

    } catch (error) {
        next(error);
    }
};



const getUser = (req, res, next) => {
    console.log(`---> userController::getUser`);

    try {
        const body = req.params.username;
        const user = { username: body };
        const result = userModel.getUsers(user);
        console.log (user);
        if (result === undefined) {
            next(HttpError(400, { message: messageapp.user_error_login }));
        } else {
            res.status(200).json(result);
        }

    } catch (error) {
        next(error);
    }
};


const grantsUser = (req, res, next) => {
    console.log(`---> userController::grantsUser`);
    //const body = req.body;
    if(!req.body.grants){
        next();
    }else{
    try {
        const body = req.body;
        console.log(`---> userController::Entro en Grants`);
        const user = {username: body.username, grants: body.grants};
        const result = userModel.addGrantsUser(user);
        //console.log (user);
        if (result === undefined) {
            next(HttpError(400, { message: messageapp.user_error_login }));
        } else {
            res.status(200).json(result);
        }

    } catch (error) {
        next(error);
    }
    }
};

const grantsUserDelete = (req, res, next) => {
    console.log(`---> userController::grantsUserDelete`);
    //const body = req.body;
    if(!req.body.grants){
        next();
    }else{
    try {
        const body = req.body;
        console.log(`---> userController::Entro en Grants`);
        const user = {username: body.username, grants: body.grants};
        const result = userModel.deleteGrantsUser(user);
        //console.log (user);
        if (result === undefined) {
            next(HttpError(400, { message: messageapp.user_error_login }));
        } else {
            res.status(200).json(result);
        }

    } catch (error) {
        next(error);
    }
    }
};

const grantsUserUpdate = (req, res, next) => {
    console.log(`---> userController::grantsUserDelete`);
    //const body = req.body;
    if(!req.body.grants){
        next();
    }else{
    try {
        const body = req.body;
        console.log(`---> userController::Entro en Grants`);
        const user = {username: body.username, grants: body.grants};
        const result = userModel.updateGrantsUser(user);
        //console.log (user);
        if (result === undefined) {
            next(HttpError(400, { message: messageapp.user_error_login }));
        } else {
            res.status(200).json(result);
        }

    } catch (error) {
        next(error);
    }
    }
};


const deleteUser = (req, res, next) => {
    console.log(`---> userController::getUser`);

    try {
        const body = req.body;
        const user = { username: body.username, active: (body.active || 0) };
        console.log (user);

        const result = userModel.deleteUsers(user);
        
        if (result === undefined) {
            next(HttpError(400, { message: messageapp.user_error_login }));
        } else {
            res.status(200).json(result);
        }

    } catch (error) {
        next(error);
    }
};


const updateUser = (req, res, next) => {
    console.log(`---> userController::getUser`);

    try {
        const body = req.body;
        const user = { username: body.username, active: (body.active || 1) };
        console.log (user);

        const result = userModel.updateUsers(user);
        
        if (result === undefined) {
            next(HttpError(400, { message: messageapp.user_error_login }));
        } else {
            res.status(200).json(result);
        }

    } catch (error) {
        next(error);
    }
};


export default {
    register,
    login,
    getUser,
    grantsUser,
    grantsUserDelete,
    grantsUserUpdate,
    deleteUser,
    updateUser
}
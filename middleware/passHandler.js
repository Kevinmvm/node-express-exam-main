import HttpError from "http-errors";
import messageapp from '../data/messages.js'

// regular expressions: https://regex101.com/
const validatePassword = (req, res, next) => {
    const body = req.body;
    if (body.password) {
        if (/^(?=.{10,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/.test(body.password)) {
            next();
        } else {
            /*res.status(400).json({message:  "Error reglas para elpassword"});
            next();*/
            next(HttpError(400, { message: messageapp.user_invalid_format }))
        }
    }
}

export default {
    validatePassword
};
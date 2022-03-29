import Router from 'express';
import userController from '../controllers/userController.js';
import authHandler from '../middleware/authHandler.js'
import userHandler from '../middleware/userHandler.js';
import passHandler from '../middleware/passHandler.js';
//import req from 'express/lib/request';

const router = Router();

router.use((req, res, next) => {
    console.log('---> userRouter.js');
    next();
});

router.route('/user')
    .delete(userController.deleteUser)
    .put(userController.updateUser)

//router.use(userHandler.validateUserEmail);
router.use(passHandler.validatePassword);

const addTimestamp = (req, res, next) => {
    console.log('---> userRouter:addTimestamp');
    req.body.timestamp = new Date();
    next();
}

const addActivator = (req, res, next) => {
    console.log('---> userRouter:addTimestamp');
    req.body.active = 1;
    next();
}

router.route('/grants')
    .post(userController.grantsUser)
    .delete(userController.grantsUserDelete)
    .put(userController.grantsUserUpdate)

router.route('/register')
    .post(authHandler.encryptPassword)
    .post(addTimestamp)
    .post(addActivator)
    .post(userController.register);

router.route('/:username')
    .get(userController.getUser);


router.route('/login')
    .post(userController.login);






export default router;
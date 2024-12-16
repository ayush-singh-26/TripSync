import { Router} from 'express';
import {loginUser,
    logoutUser,
    changeCurrentPassword, 
    getCurrentUser, 
    refreshAccessToken, 
    registerUser, 
    updateAccountDetails, 
    deleteUser, 
    google,
} from "../controllers/user.controllers.js"
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = new Router();

router.route('/register').post(registerUser)

router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyJWT,logoutUser);
router.route("/refresh-token").post(refreshAccessToken);

router.route("/change-password").post(verifyJWT,changeCurrentPassword)
router.route("/current-user").get(verifyJWT,getCurrentUser)
router.route('/deleteAccount').delete(verifyJWT,deleteUser)
router.route("/update-account").patch(verifyJWT,updateAccountDetails)
router.route("/google").post(google)


export default  router;



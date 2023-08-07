import express from 'express';
import {registerController, loginController, testController, forgotPasswordController} from '../controllers/authController.js'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';

// route object
const router = express.Router();

// routing
// REGISTER || METHOD POST

router.post('/register', registerController);

// Login || POST
router.post('/login', loginController);

router.post('/forgot-password', forgotPasswordController);


router.get('/test', requireSignIn, isAdmin, testController);
// router.get('/test', requireSignIn, isAdmin, testController);

// protected route auth
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({
        ok: true
    })
})


export default router;
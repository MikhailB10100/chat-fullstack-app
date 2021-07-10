const Router = require('express').Router
const userController = require('../controllers/user-controller')
const router = new Router()
const {body} = require('express-validator')
const authMiddleware = require('../middlewares/auth-middleware')

router.post('/registration',
  body('username').isLength({min: 5, max: 20}).not().isNumeric({no_symbols: true}),
  body('password').isLength({min: 3, max: 32}),
  userController.registration
)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.post('/sendmessage', userController.sendMessage)
router.get('/messages', userController.getMessages)
router.get('/refresh', userController.refresh)
router.get('/users', authMiddleware, userController.getUsers)

module.exports = router
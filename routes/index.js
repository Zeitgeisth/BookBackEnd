const express = require('express');
const connectDb = require('../middlewares/db');
const register = require('../controller/register');
const login = require('../controller/login');
const homePage = require('../controller/homepage');
const add = require('../controller/add');
const users = require('../controller/users');
const books = require('../controller/books');



const router = express.Router();
router.use(connectDb);

router.use('/Register', register);
router.use('/Login',login);
router.use('/HomePage',homePage);
router.use('/Add',add);
router.use('/Users',users);
router.use('/Books',books);

module.exports = router;




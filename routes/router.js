const express = require('express')
const userController = require('../controller/userController');
const projectController = require('../controller/projectController')

const router = new express.Router()
const jwtMiddleware = require('../midileWares/jwtMiddleware');
// const multer = require('multer');
const multerMiddleware = require('../midileWares/multerMiddleware');




// --------users-------------

// create route for register user

router.post('/register', userController.userRegister)

// crete route for user login

router.post('/login', userController.userLogin)





// --------projects----------

// route for add project 

router.post('/add-project', jwtMiddleware, multerMiddleware.single('prjctImg'), projectController.addProject)

// get 3 project

router.get('/home-project',projectController.getHomeProjectController)

// get all projects

router.get('/get-all-project',jwtMiddleware,projectController.allProjectController)

// get specific users project
router.get('/get-user-project',jwtMiddleware,projectController.getUserProjectController)


// route for edit project
router.put('/edit-project/:pid',jwtMiddleware,multerMiddleware.single('prjctImg'), projectController.updateProjectController)

// 677188e7e2e741c48945ccd0

// route for delete project
router.delete('/delete-project/:pid',jwtMiddleware,projectController.deleteProjectController)


// for profile updation
router.put('/edit-profile',jwtMiddleware,multerMiddleware.single('profile'),userController.updateUserProfile)

module.exports = router //only export one 



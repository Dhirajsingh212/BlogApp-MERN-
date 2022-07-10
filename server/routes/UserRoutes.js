const express = require('express');
const controllers = require('../controllers/controllers');
const usercontrollers = require('../controllers/usercontrollers');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/images');
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split('/')[1];
    cb(null, `${Date.now()}-${file.filename}.${ext}`);
  },
});

const upload = multer({ storage: storage });

const storage_profile = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/profilephoto');
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split('/')[1];
    cb(null, `${Date.now()}-${file.filename}.${ext}`);
  },
});

const upload_profile = multer({ storage: storage_profile });

//AUTHENTICATION AND AUTHORIZATION
router.route('/signup').post(controllers.signup);
router.route('/login').post(controllers.login);

//CREATE ,EDIT AND DELETE BLOGS
router.route('/newBlogs').post(upload.single('image'), controllers.createBlog);
router.route('/getBlogs').get(controllers.getuserblog);
router.route('/getallblogs').get(controllers.getallblogs);
router.route('/editblogs').get(controllers.editblogs);
router
  .route('/updateblogs')
  .patch(upload.single('image'), controllers.updateblogs);
router.route('/deleteblogs').delete(controllers.deleteblog);
router.route('/:id').get(controllers.getoneblog);

//CREATE EDIT AND DELETE USER
router.route('/user/getdata').get(usercontrollers.getuserdata);
router
  .route('/user/update')
  .patch(upload_profile.single('profilephoto'), usercontrollers.updateuserdata);
router.route('/user/delete').delete(usercontrollers.deleteuser);

module.exports = router;

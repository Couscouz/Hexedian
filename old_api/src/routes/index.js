const express = require('express');

const router = express.Router();

const authentication = require('@app/middlewares/authenticate')

const {
  projectMiddleware
} = require('@app/controllers/project.controller')

const auth = require('./includes/auth');
const user = require('./includes/user');
const nst = require('./includes/nst');
const sov = require('./includes/sov');
const tov = require('./includes/tov');
const fov = require('./includes/fov');
const tree = require('./includes/tree');
const project = require('./includes/project');
const objectDefinition = require('./includes/objectDefinition');
const controlQuery = require('./includes/controlQuery')
const dashboard = require('./includes/dashboard')

const asset = require('./includes/asset');

router.get('/', (req, res) => {
  res.json({
    message: `CHEKIS API`
  });
});

router.use('/auth', auth);
router.use('/', asset);
router.use('/', authentication, user);
router.use('/', authentication, project);

router.use('/projects/:projectid/data/nst/', authentication, projectMiddleware, nst);
router.use('/projects/:projectid/data/sov/', authentication, projectMiddleware, sov);
router.use('/projects/:projectid/data/tov/', authentication, projectMiddleware, tov);
router.use('/projects/:projectid/data/fov/', authentication, projectMiddleware, fov);
router.use('/projects/:projectid/data/dashboard/', authentication, projectMiddleware, dashboard);
router.use('/projects/:projectid/tree', authentication, projectMiddleware, tree);
router.use('/projects/:projectid/objectdefinitions/', authentication, projectMiddleware, objectDefinition);
router.use('/projects/:projectid/controlqueries/', authentication, projectMiddleware, controlQuery);

module.exports = router;

//-----------------------------------


// const express = require('express');
// const router = express.Router();

// /**
//  * Middlewares
//  *************/

// const upload = require('@middlewares/upload')

// const {
//     userMiddleware
// } = require('@app/controllers/user.controller')

// const {
//     projectMiddleware
// } = require('@app/controllers/project.controller')

// /**
//  * Controllers
//  *************/
// const projectController = require('@app/controllers/project.controller')

// const FileSystem = require('@app/services/fileManager.service')

// /**
//  * Routes
//  ********/
// // router.get('/projects/', projectController.projectsGet);
// router.get('/projects/', projectController.projectsGetAll);

// router.get('/projects/name/:projectid', projectMiddleware, projectController.projectGetName);

// router.get('/projects/:projectid', projectMiddleware, projectController.projectGet);

// router.post('/projects/', upload.fields([{name: 'image'}, {name: 'bgimg'}]), projectController.projectCreate);

// router.put('/projects/:projectid', upload.fields([{name: 'image'}, {name: 'bgimg'}]), projectMiddleware, projectController.projectUpdate);

// router.delete('/projects/:projectid', projectMiddleware, projectController.projectDelete);

// router.get('/projects/:projectid/users', projectMiddleware, projectController.projectGetUsers);
// //Add user to the project
// router.post('/projects/:projectid/users/:userid', projectMiddleware, userMiddleware, projectController.projectAddUser);
// //Remove user from the project
// router.delete('/projects/:projectid/users/:userid', projectMiddleware, userMiddleware, projectController.projectDeleteUser);

// router.post('/projects/:projectid/folders', projectMiddleware, async (req, res, next) => {
//     FileSystem.setProjectFolderTree(req.project)
//     res.status(200).send()
// });

// module.exports = router;

// //-----------------------
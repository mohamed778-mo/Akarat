const express = require('express');
const router = express.Router();
const websiteControllers = require('../controllers/websiteControllers');
const Iupload = require('../middleware/multer');



router.post('/filter_departments', websiteControllers.filterDepartments);
// router.get('/get_all_departments_in_neighborhood/:neighborhood_id', websiteControllers.getAllDepartmentsInNeighborhood);
router.get('/get_department/:department_id', websiteControllers.getDepartmentById);

// router.get('/get_all_neighborhoods', websiteControllers.getAllNeighborhoods);


router.post('/create_booking/:department_id', websiteControllers.createBooking);

router.post('/create_request', websiteControllers.createRequest);


router.get('/get_all_partners', websiteControllers.getAllPartners);


router.get('/get_all_finishes', websiteControllers.getAllFinishes);

router.post('/create_finish_form', websiteControllers.createFinishForm);

router.get('/get_all_contacts', websiteControllers.getAllContacts);

router.post('/create_realestate_form', Iupload.any(), websiteControllers.createFormRealestate);

router.get('/get_all_decorations', websiteControllers.getAllDecorations);

router.post('/create_decoration_form/:decoration_id', Iupload.any(), websiteControllers.createFormDecoration);

module.exports = router;

const express = require('express');
const router = express.Router();
const dashboardControllers = require('../controllers/dashboardControllers');

const {adminAuth} = require('../middleware/auth');
const Iupload = require('../middleware/multer');

router.post('/register', dashboardControllers.register_admin);
router.post('/login', dashboardControllers.login_admin);


// router.post('/create_neighborhood',adminAuth,Iupload.any(), dashboardControllers.createNeighborhood);
// router.get('/get_all_neighborhoods',adminAuth, dashboardControllers.getAllNeighborhoods);
// router.get('/get_neighborhood/:neighborhood_id',adminAuth, dashboardControllers.getNeighborhoodById);
// router.patch('/edit_neighborhood/:neighborhood_id',adminAuth,Iupload.any(), dashboardControllers.editNeighborhood);
// router.delete('/delete_neighborhood/:neighborhood_id',adminAuth, dashboardControllers.deleteNeighborhood);


router.post('/create_department',adminAuth,Iupload.any(), dashboardControllers.createDepartment);
router.get('/get_all_departments',adminAuth, dashboardControllers.getAllDepartments);
router.get('/get_department/:department_id',adminAuth, dashboardControllers.getDepartmentById);
router.patch('/edit_department/:department_id',adminAuth,Iupload.any(), dashboardControllers.editDepartment);
router.delete('/delete_department/:department_id',adminAuth, dashboardControllers.deleteDepartment);



// router.get('/get_all_departments_in_neighborhood/:neighborhood_id',adminAuth, dashboardControllers.getAllDepartmentsInNeighborhood);


router.get('/get_all_bookings',adminAuth, dashboardControllers.getAllBookings);
router.patch('/edit_booking/:id',adminAuth, dashboardControllers.editBooking);
router.delete('/delete_booking/:id',adminAuth, dashboardControllers.deleteBooking);


router.get('/get_all_requests',adminAuth, dashboardControllers.getAllRequests);
router.get('/get_request/:request_id',adminAuth, dashboardControllers.getRequestById);

router.patch('/edit_request/:id',adminAuth, dashboardControllers.editRequest);
router.delete('/delete_request/:id',adminAuth, dashboardControllers.deleteRequest);


router.post('/create_partner', adminAuth, Iupload.any(), dashboardControllers.createPartner);
router.get('/get_all_partners', adminAuth, dashboardControllers.getAllPartners);

router.get('/get_partner/:partner_id', adminAuth, dashboardControllers.getPartnersById);

router.patch('/edit_partner/:partner_id', adminAuth, Iupload.any(), dashboardControllers.editPartner);
router.delete('/delete_partner/:partner_id', adminAuth, dashboardControllers.deletePartner);

router.post('/create_finish', adminAuth, Iupload.any(), dashboardControllers.createFinish);
router.get('/get_all_finishes', adminAuth, dashboardControllers.getAllFinishes);

router.get('/get_finish/:finish_id', adminAuth, dashboardControllers.getFinishById);

router.patch('/edit_finish/:finish_id', adminAuth, Iupload.any(), dashboardControllers.updateFinish);

router.get('/get_all_finish_forms', adminAuth, dashboardControllers.getAllFinishForms);
router.delete('/delete_finish_form/:id', adminAuth, dashboardControllers.deleteFinishForm);


router.post('/create_contact', adminAuth, dashboardControllers.createContact);
router.get('/get_all_contacts', adminAuth, dashboardControllers.getAllContacts);

router.patch('/get_contact/:contact_id', adminAuth, dashboardControllers.getContactbyid);

router.patch('/edit_contact/:contact_id', adminAuth, dashboardControllers.updateContact);
router.delete('/delete_contact/:contact_id', adminAuth, dashboardControllers.deleteContact);


router.get('/get_all_realestate_forms', adminAuth, dashboardControllers.getAllRealestateForms);
router.delete('/delete_realestate_form/:id', adminAuth, dashboardControllers.deleteRealestateForm    );


router.post('/create_decoration', adminAuth, Iupload.any(), dashboardControllers.createDecoration);
router.get('/get_all_decorations', adminAuth, dashboardControllers.getAllDecorations);

router.get('/get_decoration/:decoration_id', adminAuth, dashboardControllers.getDecorationById);

router.patch('/edit_decoration/:decoration_id', adminAuth, Iupload.any(), dashboardControllers.updateDecoration);
router.delete('/delete_decoration/:decoration_id', adminAuth, dashboardControllers.deleteDecoration);



router.get('/get_all_form_decorations', adminAuth, dashboardControllers.get_all_form_decorations);
router.delete('/delete_form_decoration/:form_decoration_id', adminAuth, dashboardControllers.deleteFormDecoration);


router.get('/get_all_number_of_services', adminAuth, dashboardControllers.get_all_number_of_stats);

module.exports = router;




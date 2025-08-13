// const Neighborhood = require('../models/Neighborhood');
const Department = require('../models/Department');
const Booking = require('../models/Booking');
const Request = require('../models/Requests');
const Partner = require('../models/Partners');
const Finish = require('../models/Finishes');
const FinishForm = require('../models/Finish_Form');
const Contact = require('../models/Contact');
const FormRealestate = require('../models/Form_create_realestate');
const Decoration = require('../models/Decoration');
const FormDecoration = require('../models/Form_decoration');

require('dotenv').config()

const URL = 'https://api.barakaconsult.com'

exports.createFinishForm = async (req, res) => {
  try {
    const finishForm = new FinishForm(req.body);
    await finishForm.save();
    res.status(201).json(finishForm);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.filterDepartments = async (req, res) => {
  try {
    const { type, status_of_sale, location, installment, price } = req.body;

   
    const filter = {};

    if (type) filter.type = type;
    if (status_of_sale) filter.status_of_sale = status_of_sale;
    if (location) filter.location = location;
    if (installment) filter.installment = installment;
    if (price) filter.price = { $lte: price }; 

    const departments = await Department.find(filter).sort({ createdAt: -1 });
    res.status(200).json(departments);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// exports.getAllNeighborhoods = async (req, res) => {
//   try {
//     const neighborhoods = await Neighborhood.find();
//     res.status(200).json(neighborhoods);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

// exports.getAllDepartmentsInNeighborhood = async (req, res) => {
//   try {
//     const neighborhood = await Neighborhood.findById(req.params.neighborhood_id);
//     if (!neighborhood)
//       return res.status(404).json({ message: 'Neighborhood not found' });

//     const departments = await Department
//       .find({ neighborhood_id: neighborhood._id })
//       .select('-description  -image_2 -image_3 -image_4 -features -designer -note -location -installment -neighborhood_id ');

//     res.status(200).json(departments);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };




exports.getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.department_id);
    if (!department) return res.status(404).json({ message: 'Department not found' });
    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


exports.createBooking = async (req, res) => {
  try {
    const { first_name, last_name, email, phone, date, note } = req.body;
    const department_id =req.params.department_id
    const department = await Department.findById(department_id);
    if (!department) return res.status(404).json({ message: 'Department not found' });

    const booking = new Booking({ first_name, last_name, email, phone, date, note, department_id , department_name: department.title });
    await booking.save();
    res.status(201).json({ message: 'Booking created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




exports.createRequest = async (req, res) => {
  try {
    const { first_name, last_name, email, phone, message } = req.body;
    const request = new Request({ first_name, last_name, email, phone, message });
    await request.save();
    res.status(201).json({ message: 'Request created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getAllPartners = async (req, res) => {
  try {
    const partners = await Partner.find();
    res.status(200).json(partners);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


exports.getAllFinishes = async (req, res) => {
  try {
    const finish = await Finish.find();
    const finishesData = finish.map(f => ({

      finishies: f.finishies,
      main_image: f.main_image,
      main_image_2: f.main_image_2,
      main_image_3: f.main_image_3,
      main_image_4: f.main_image_4,
      process: f.process
    }));
  

    res.status(200).json( finishesData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getAllContacts = async (req, res) => {
  try {
    const contact = await Contact.find();
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


exports.createFormRealestate = async (req, res) => {
  try {
    const image = req.files?.find(f => f.fieldname === 'image');
    let imageLink = image ? `${URL}/uploads/${image.filename}` : null;
    const {
      name,
      description,
      space,
      location,
      client_name,
      client_phone,
      client_gmail
    } = req.body;

    const newForm = new FormRealestate({
      name,
      image: imageLink,
      description,
      space,
      location,
      client_name,
      client_phone,
      client_gmail
    });

    await newForm.save();
    res.status(201).json({ message: "FormRealestate created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllDecorations = async (req, res) => {
  try {
    const decorations = await Decoration.find();
    res.status(200).json(decorations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.createFormDecoration = async (req, res) => {
  try {
    const place_image_1 = req.files?.find(f => f.fieldname === 'image_1');
    const place_image_2 = req.files?.find(f => f.fieldname === 'image_2');
    const place_image_3 = req.files?.find(f => f.fieldname === 'image_3');

    let placeImage1Link = place_image_1 ? `${URL}/uploads/${place_image_1.filename}` : null;
    let placeImage2Link = place_image_2 ? `${URL}/uploads/${place_image_2.filename}` : null;
    let placeImage3Link = place_image_3 ? `${URL}/uploads/${place_image_3.filename}` : null;

    const decoration_id = req.params.decoration_id;
    const decoration = await Decoration.findById(decoration_id);
    if (!decoration) return res.status(404).json({ message: 'Decoration not found' });

    const {
      name,
      phone,
      address,
      place_space,
      note
      
    } = req.body;

   
    const formDecoration = new FormDecoration({
      decoration_id: decoration._id,
      decoration_name: decoration.name,
      decoration_category: decoration.category,

      name,
      phone,
      address,
      place_space,
      place_image_1: placeImage1Link,
      place_image_2: placeImage2Link,
      place_image_3: placeImage3Link,
      note
    });

    await formDecoration.save();
    res.status(201).json({ message: "FormDecoration created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
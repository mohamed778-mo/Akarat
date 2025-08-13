const Admin = require('../models/Admin');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const Neighborhood = require('../models/Neighborhood');
const Department = require('../models/Department');
const Booking = require('../models/Booking');
const Request = require('../models/Requests');
const Partner = require('../models/Partners');
const Finish = require('../models/Finishes');
const FinishForm = require('../models/Finish_Form');
const Contact = require('../models/Contact');
const Decoration = require('../models/Decoration');

const FormDecoration = require('../models/Form_decoration');


const FormRealestate = require('../models/Form_create_realestate');



require('dotenv').config()

const URL = 'https://api.barakaconsult.com'

exports.register_admin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) return res.status(400).json({ message: 'Email already exists' });
    const admin = new Admin({ name, email, password });
    await admin.save();
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.login_admin = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await Admin.findOne({ email });
    if (!user) {
      const message = 'Invalid email or password';
      return res.status(404).send({ message });
    }
    if (!user.isAdmin) {
      const message = 'Please verify your email first';
      return res.status(403).send({ message });
    }
    const isPassword = await bcryptjs.compare(password, user.password);
    if (!isPassword) {
      const message = 'Invalid email or password';
      return res.status(404).send({ message });
    }
    const SECRETKEY ="rdtcyiu8oktvdsj7euw22111gagdhrfhjfajyil82u55hghasdf"
    const token = jwt.sign({ id: user._id, type: user.role }, SECRETKEY,{ expiresIn: '7d' });
    res.cookie("access_token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, 
      secure: true, 
      httpOnly: true,
    });
    user.tokens.push(token);
    await user.save();
    const message = 'Login successful!';
    res.status(200).send({ success: message });
  } catch (error) {
    res.status(500).send(error.message);
  }
};


// exports.createNeighborhood = async (req, res) => {
//   try {
//     const image_1 = req.files?.find(f => f.fieldname === 'image_1');
//     let imageLink_1 = image_1 ? `${URL}/uploads/${image_1.filename}` : null;

//     const image_2 = req.files?.find(f => f.fieldname === 'image_2');
//     let imageLink_2 = image_2 ? `${URL}/uploads/${image_2.filename}` : null;

//     const {
//       title,
//       description,
//       type,
//       status,
//       features,

//     } = req.body;

//     const parsedfeatures = typeof features === 'string' ? JSON.parse(features) : features;

//     const neighborhood = new Neighborhood({
//       title,
//       description,
//       type,
//       status,
//       features: Array.isArray(parsedfeatures) ? parsedfeatures : [parsedfeatures],
//       image_1: imageLink_1,
//       image_2: imageLink_2,
//     });
//     await neighborhood.save();

//     res.status(201).json({ message: 'Neighborhood created successfully' });

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.getAllNeighborhoods = async (req, res) => {
//   try {
//     const neighborhoods = await Neighborhood.find();
//     res.status(200).json(neighborhoods);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

// exports.getNeighborhoodById = async (req, res) => {
//   try {
//     const neighborhood = await Neighborhood.findById(req.params.neighborhood_id);
//     if (!neighborhood) return res.status(404).json({ message: 'Neighborhood not found' });
//     res.status(200).json(neighborhood);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

// exports.editNeighborhood = async (req, res) => {
//   try {
//     const image_1 = req.files?.find(f => f.fieldname === 'image_1');
//     let imageLink_1 = image_1 ? `${URL}/uploads/${image_1.filename}` : null;

//     const image_2 = req.files?.find(f => f.fieldname === 'image_2');
//     let imageLink_2 = image_2 ? `${URL}/uploads/${image_2.filename}` : null;

//     const updateData = { ...req.body };
//     if (updateData.features && !Array.isArray(updateData.features)) updateData.features = [updateData.features];

//     if (imageLink_1) updateData.image_1 = imageLink_1;
//     if (imageLink_2) updateData.image_2 = imageLink_2;

//     const neighborhood = await Neighborhood.findByIdAndUpdate(req.params.neighborhood_id, updateData, { new: true });
//     if (!neighborhood) return res.status(404).json({ message: 'Neighborhood not found' });

//     res.status(200).json({ message: 'Neighborhood updated successfully' });
  
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.deleteNeighborhood = async (req, res) => {
//   try {
//     const neighborhood = await Neighborhood.findByIdAndDelete(req.params.neighborhood_id);
//     if (!neighborhood) return res.status(404).json({ message: 'Neighborhood not found' });
//     res.status(200).json({ message: 'Neighborhood deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };




exports.createDepartment = async (req, res) => {
try{

  const image_1 = req.files?.find(f => f.fieldname === 'image_1');
  const image_2 = req.files?.find(f => f.fieldname === 'image_2');
  const image_3 = req.files?.find(f => f.fieldname === 'image_3');
  const image_4 = req.files?.find(f => f.fieldname === 'image_4');
  
    const imageLink_1 = image_1 ? image_1.path : null;
    const imageLink_2 = image_2 ? image_2.path : null;
    const imageLink_3 = image_3 ? image_3.path : null;
    const imageLink_4 = image_4 ? image_4.path : null;

  // const neighborhood = await Neighborhood.findById(req.params.neighborhood_id);
  // if (!neighborhood) return res.status(404).json({ message: 'Neighborhood not found' });



  const {
    title,
    description,
    status_of_sale,
    price,
    number_of_bathrooms,
    number_of_bedrooms,
    space,
    type,
    features,
    designer,
    note,
    location,
    installment,
    available_dates
  } = req.body;

    const parsedfeatures = typeof features === 'string' ? JSON.parse(features) : features;

    const parsedAvailableDates = Array.isArray(available_dates) ? available_dates : [available_dates];



  const department = new Department({
    title,
    description,
    status_of_sale,
    price,
    number_of_bathrooms,
    number_of_bedrooms,
    space,
    type,

    location,
    image_1: imageLink_1,
    image_2: imageLink_2,
    image_3: imageLink_3,
    image_4: imageLink_4,

    // neighborhood_id: neighborhood._id,
    // neighborhood_name: neighborhood.title,

    designer,
    installment,
    note,
    features: Array.isArray(parsedfeatures) ? parsedfeatures : [parsedfeatures],
    
    available_dates: Array.isArray(parsedAvailableDates) ? parsedAvailableDates : [parsedAvailableDates],
  });

  await department.save();
  res.status(201).json({ message: 'Department created successfully' });

}catch(error){
  res.status(500).json({ error: error.message });
}
}


exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.department_id);
    if (!department) return res.status(404).json({ message: 'Department not found' });
    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.editDepartment = async (req, res) => {
  try {
  
    const image_1 = req.files?.find(f => f.fieldname === 'image_1');
    const image_2 = req.files?.find(f => f.fieldname === 'image_2');
    const image_3 = req.files?.find(f => f.fieldname === 'image_3');
    const image_4 = req.files?.find(f => f.fieldname === 'image_4');

    const imageLink_1 = image_1 ? image_1.path : null;
    const imageLink_2 = image_2 ? image_2.path : null;
    const imageLink_3 = image_3 ? image_3.path : null;
    const imageLink_4 = image_4 ? image_4.path : null;



    const updateData = { ...req.body };
    if (imageLink_1) updateData.image_1 = imageLink_1;
    if (imageLink_2) updateData.image_2 = imageLink_2;
    if (imageLink_3) updateData.image_3 = imageLink_3;
    if (imageLink_4) updateData.image_4 = imageLink_4;

    // const neighborhood = await Neighborhood.findById(updateData.neighborhood_id);
    // if (!neighborhood) return res.status(404).json({ message: 'Neighborhood not found' });
    // updateData.neighborhood_id = neighborhood._id;
    // updateData.neighborhood_name = neighborhood.title


    const department = await Department.findByIdAndUpdate(req.params.department_id, updateData, { new: true });
    if (!department) return res.status(404).json({ message: 'Department not found' });
    res.status(200).json({ message: 'Department updated successfully' });
  
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndDelete(req.params.department_id);
    if (!department) return res.status(404).json({ message: 'Department not found' });
    res.status(200).json({ message: 'Department deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// exports.getAllDepartmentsInNeighborhood = async (req, res) => {
//   try {
//     const neighborhood = await Neighborhood.findById(req.params.neighborhood_id);
//     if (!neighborhood)
//       return res.status(404).json({ message: 'Neighborhood not found' });

//     const departments = await Department
//       .find({ neighborhood_id: neighborhood._id })
//       .select('-description -image_1 -image_2 -image_3 -image_4 -features -designer -note -location -installment -neighborhood_id ');

//     res.status(200).json(departments);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };



exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.editBooking = async (req, res) => {
  try {
    const updateData = { ...req.body };
    const booking = await Booking.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.status(200).json({ message: 'Booking updated successfully', booking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




exports.getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find();
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.editRequest = async (req, res) => {
  try {
    const updateData = { ...req.body };
    const request = await Request.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!request) return res.status(404).json({ message: 'Request not found' });
    res.status(200).json({ message: 'Request updated successfully', request });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
exports.deleteRequest = async (req, res) => {
  try {
    const request = await Request.findByIdAndDelete(req.params.id);
    if (!request) return res.status(404).json({ message: 'Request not found' });
    res.status(200).json({ message: 'Request deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.createPartner = async (req, res) => {
  try {
    const image = req.files?.find(f => f.fieldname === 'image');
    const imageLink = image ? image.path : null;

    const { name, description } = req.body;

    const partner = new Partner({
      image: imageLink,
      name,
      description
    });

    await partner.save();
    res.status(201).json({ message: 'Partner created successfully' });
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

exports.editPartner = async (req, res) => {
  try {
    const image = req.files?.find(f => f.fieldname === 'image');
    const imageLink = image ? image.path : null;

    const updateData = { ...req.body };
    if (imageLink) updateData.image = imageLink;

    const partner = await Partner.findByIdAndUpdate(req.params.partner_id, updateData, { new: true });
    if (!partner) return res.status(404).json({ message: 'Partner not found' });

    res.status(200).json({ message: 'Partner updated successfully', partner });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePartner = async (req, res) => {
  try {
    const partner = await Partner.findByIdAndDelete(req.params.partner_id);
    if (!partner) return res.status(404).json({ message: 'Partner not found' });
    res.status(200).json({ message: 'Partner deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};





exports.createFinish = async (req, res) => {
  try {
    let finishies = [];
    let processArr = [];

    // معالجة finishies
    if (req.body.finishies) {
      const finishiesData = Array.isArray(req.body.finishies)
        ? req.body.finishies
        : Object.values(req.body.finishies);

      finishiesData.forEach((finish, idx) => {
        let props = finish.properties;
        if (typeof props === 'string') {
          try {
            props = JSON.parse(props);
          } catch {
            props = props;
          }
        }

        const imageFile = req.files?.find(f => f.fieldname === `finishies[${idx}][image]`);
        finishies.push({
          name: finish.name,
          image: imageFile ? imageFile.path : '',
          properties: props
        });
      });
    }

    // معالجة process
    if (req.body.process) {
      const processData = Array.isArray(req.body.process)
        ? req.body.process
        : Object.values(req.body.process);

      processData.forEach((proc, idx) => {
        const iconFile = req.files?.find(f => f.fieldname === `process[${idx}][icon_image]`);
        processArr.push({
          name: proc.name,
          icon_image: iconFile ? iconFile.path : '',
          description: proc.description
        });
      });
    }

    // إنشاء Finish جديد
    const newFinish = await Finish.create({
      finishies,
      process: processArr,
      main_image: req.files?.find(f => f.fieldname === 'main_image')?.path || '',
      main_image_2: req.files?.find(f => f.fieldname === 'main_image_2')?.path || '',
      main_image_3: req.files?.find(f => f.fieldname === 'main_image_3')?.path || '',
      main_image_4: req.files?.find(f => f.fieldname === 'main_image_4')?.path || '',
    });

    res.status(201).json(newFinish);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

  
    const newFinish = await Finish.create({
      finishies,
      process: processArr,
      main_image: req.files?.find(f => f.fieldname === 'main_image')?.path || '',
      main_image_2: req.files?.find(f => f.fieldname === 'main_image_2')?.path || '',
      main_image_3: req.files?.find(f => f.fieldname === 'main_image_3')?.path || '',
      main_image_4: req.files?.find(f => f.fieldname === 'main_image_4')?.path || '',
    });

    res.status(201).json(newFinish);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



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


exports.updateFinish = async (req, res) => {
  try {
    let updateData = {};

    // تحديث الصور الرئيسية
    ['main_image', 'main_image_2', 'main_image_3', 'main_image_4'].forEach(field => {
      const file = req.files?.find(f => f.fieldname === field);
      if (file) {
        updateData[field] = file.path;
      } else if (req.body[field]) {
        updateData[field] = req.body[field];
      }
    });

    // تحديث finishies
    if (req.body.finishies) {
      const finishiesData = Array.isArray(req.body.finishies)
        ? req.body.finishies
        : Object.values(req.body.finishies);

      updateData.finishies = finishiesData.map((finish, idx) => {
        const imageFile = req.files?.find(f => f.fieldname === `finishies[${idx}][image]`);
        let props = finish.properties;
        if (typeof props === 'string') {
          try {
            props = JSON.parse(props);
          } catch {
            props = props;
          }
        }
        return {
          name: finish.name,
          image: imageFile ? imageFile.path : finish.image || '',
          properties: props
        };
      });
    }

    // تحديث process
    if (req.body.process) {
      const processData = Array.isArray(req.body.process)
        ? req.body.process
        : Object.values(req.body.process);

      updateData.process = processData.map((proc, idx) => {
        const iconFile = req.files?.find(f => f.fieldname === `process[${idx}][icon_image]`);
        return {
          name: proc.name,
          icon_image: iconFile ? iconFile.path : proc.icon_image || '',
          description: proc.description
        };
      });
    }

    // تنفيذ التحديث
    const updatedFinish = await Finish.findByIdAndUpdate(
      req.params.finish_id,
      updateData,
      { new: true }
    );

    if (!updatedFinish) {
      return res.status(404).json({ error: 'Finish not found' });
    }

    res.status(200).json(updatedFinish);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};






exports.getAllFinishForms = async (req, res) => {
  try {
    const finishForms = await FinishForm.find();
    res.status(200).json(finishForms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.deleteFinishForm = async (req, res) => {
  try {
    const finishForm = await FinishForm.findByIdAndDelete(req.params.id);
    if (!finishForm) return res.status(404).json({ message: 'Finish Form not found' });
    res.status(200).json({ message: 'Finish Form deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.createContact  = async (req, res) => {
  try {
    const { gmail, phone, location, facebook_link, instagram_link, twitter_link, linkedin_link } = req.body;

    const contact = new Contact({
      gmail,
      phone,
      location,
      facebook_link,
      instagram_link,
      twitter_link,
      linkedin_link
    });

    await contact.save();
    res.status(201).json({ message: 'Contact created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.getAllContacts = async (req, res) => {
  try {
    const contact = await Contact.find();
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.updateContact = async (req, res) => {
  try {
    const { gmail, phone, location, facebook_link, instagram_link, twitter_link, linkedin_link } = req.body;

    const contact = await Contact.findOneAndUpdate(
      {},
      { gmail, phone, location, facebook_link, instagram_link, twitter_link, linkedin_link },
      { new: true }
    );

    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.status(200).json({ message: 'Contact updated successfully', contact });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




exports.createFormRealestate = async (req, res) => {
  try {
    const image = req.files?.find(f => f.fieldname === 'image');
    let imageLink = image ? image.path : null;
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

exports.getAllRealestateForms = async (req, res) => {
  try {
    const forms = await FormRealestate.find();
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




exports.deleteRealestateForm = async (req, res) => {
  try {
    const form = await FormRealestate.findByIdAndDelete(req.params.id);
    if (!form) return res.status(404).json({ message: 'Form not found' });
    res.status(200).json({ message: 'Form deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.createDecoration = async (req, res) => {
  try {
    const image_1 = req.files?.find(f => f.fieldname === 'image_1');
    const image_2 = req.files?.find(f => f.fieldname === 'image_2');
    const image_3 = req.files?.find(f => f.fieldname === 'image_3');

    const imageLink_1 = image_1 ? image_1.path : null;
    const imageLink_2 = image_2 ? image_2.path : null;
    const imageLink_3 = image_3 ? image_3.path : null;

    const { name, description, category } = req.body;

    const decoration = new Decoration({
      name,
      description,
      category,
      image_1: imageLink_1,
      image_2: imageLink_2,
      image_3: imageLink_3
    });

    await decoration.save();
    res.status(201).json({ message: 'Decoration created successfully' });
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



exports.deleteDecoration = async (req, res) => {
  try {
    const decoration = await Decoration.findByIdAndDelete(req.params.decoration_id);
    if (!decoration) return res.status(404).json({ message: 'Decoration not found' });
    res.status(200).json({ message: 'Decoration deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDecoration = async (req, res) => {
  try {
    const image_1 = req.files?.find(f => f.fieldname === 'image_1');
    const image_2 = req.files?.find(f => f.fieldname === 'image_2');
    const image_3 = req.files?.find(f => f.fieldname === 'image_3');

    const updateData = { ...req.body };
    if (image_1) updateData.image_1 = image_1.path;
    if (image_2) updateData.image_2 = image_2.path;
    if (image_3) updateData.image_3 = image_3.path;

    const decoration = await Decoration.findByIdAndUpdate(req.params.decoration_id, updateData, { new: true });
    if (!decoration) return res.status(404).json({ message: 'Decoration not found' });

    res.status(200).json({ message: 'Decoration updated successfully', decoration });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.get_all_form_decorations = async (req, res) => {
  try {
    const decorations = await FormDecoration.find();
    res.status(200).json(decorations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteFormDecoration = async (req, res) => {
  try {
    const decoration = await FormDecoration.findByIdAndDelete(req.params.form_decoration_id);
    if (!decoration) return res.status(404).json({ message: 'Decoration form not found' });
    res.status(200).json({ message: 'Decoration form deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};

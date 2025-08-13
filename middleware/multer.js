const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

 cloudinary.config({ 
        cloud_name: 'drie0h3iv', 
        api_key: '987485225419974', 
        api_secret: '<your_api_secret>' // Click 'View API Keys' above to copy your API secret
    });

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // اسم الفولدر في Cloudinary
    resource_type: 'auto' // يسمح برفع الصور والفيديوهات والـ pdf
  }
});

const upload = multer({ storage: storage });

module.exports = upload;

const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

 cloudinary.config({ 
        cloud_name: 'dwg0hr34g', 
        api_key: '532568532962456', 
        api_secret: 'TG_wSAPS32Qv1gB2M19qmda9uII' // Click 'View API Keys' above to copy your API secret
    });

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // اسم الفولدر في Cloudinary
    resource_type: 'auto' // يسمح برفع الصور والفيديوهات والـ pdf
  }
});

const Iupload  = multer({ storage: storage });

module.exports = Iupload;

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });


const uploadImagesMiddleware = (req, res, next) => {
    upload.array('images', 10)(req, res, (err) => {
        if (err) return next(err);
        console.log('Files:', req.files); 
        next();
    });
};

module.exports = uploadImagesMiddleware;

const multer = require('multer');
// 

// storage space for user files
const storage = multer.diskStorage({
    // where to store which part , it have 3 arguments
    destination: (req, file, callback) => {
        // callback used to specify path
        // to crate a delay - callback 
        callback(null, './uploads')


    },
    // filename
    filename: (req, file, callback) => {
        callback(null, `image-${Date.now()}-${file.originalname}`)
    }
})

const multerMiddleware = multer({ storage })

module.exports = multerMiddleware
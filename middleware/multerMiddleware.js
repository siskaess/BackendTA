const multer = require("multer");
const path = require("path");

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // __dirname works directly in CommonJS
    const uploadPath = path.join(__dirname, "../uploads");
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Generate a unique filename to avoid overwrites
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + extension);
  },
});

// Filter files to accept only images (Optional but recommended)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true); // Accept image files
  } else {
    cb(new Error("Only image files are allowed!"), false); // Reject other files
  }
};

const upload = multer({
  storage: storage, // Use the configured storage
  fileFilter: fileFilter, // Apply the file filter
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB size limit
  },
});

module.exports = upload; // Export using module.exports

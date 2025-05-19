const express = require("express");
const {
  getProfile,
  editProfile,
  getUserByRole,
  getFieldWorkers,
  createUser,
  giveRating,
  getAllComments,
  getDetailRating,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/multerMiddleware"); 

const router = express.Router();

router.get("/profile", protect, getProfile);
// Apply multer middleware for single image upload with field name 'profileImage'
router.put("/profile", protect, upload.single("profileImage"), editProfile);
router.get("/fieldworkers", getFieldWorkers);
router.get("/comments", getAllComments);
router.get("/:role", getUserByRole); // Keep this after specific routes like /profile, /fieldworkers etc.
router.post("/", createUser);
router.put("/:worker_id/rating", giveRating);
router.get("/rating/:transaction_id/:worker_id", getDetailRating);

module.exports = router;

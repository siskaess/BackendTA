const express = require('express');

const {
    getSchedules,
    getScheduleByStatus,
    getScheduleByWorker,
    getScheduleByTransaction,
    getScheduleById,
    confirmSchedule,
    createSchedule,
    updateSchedule,
    createReport
    } = require('../controllers/scheduleController');

const upload = require("../middleware/multerMiddleware");
const router = express.Router();

router.get('/', getSchedules);
router.get('/status/:status', getScheduleByStatus);
router.get('/id/:id', getScheduleById)
router.get('/worker/:email', getScheduleByWorker);
router.get('/transaction/:transactionId', getScheduleByTransaction);
router.put('/:id/confirm', confirmSchedule);
router.post('/', createSchedule);
router.put('/:id', updateSchedule);
router.post('/report', upload.single('image'), createReport);


module.exports = router;
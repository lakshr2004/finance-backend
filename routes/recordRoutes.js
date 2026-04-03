const express = require("express");
const router = express.Router();

const {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord,
  getDashboard,
} = require("../controllers/recordController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.use(protect);

router.route("/")
  .post(createRecord)
  .get(getRecords);

router.get("/summary", getDashboard);

router.route("/:id")
  .put(authorizeRoles("admin"), updateRecord)
  .delete(authorizeRoles("admin"), deleteRecord);

module.exports = router;
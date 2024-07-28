const express = require("express");
const {
  getAll,
  addJop,
  getJop,
  editJop,
  deleteJop,
} = require("../controllers/jobs");
const router = express.Router();

router.route("/").get(getAll).post(addJop);

router.route("/:id").get(getJop).patch(editJop).delete(deleteJop);

module.exports = router;

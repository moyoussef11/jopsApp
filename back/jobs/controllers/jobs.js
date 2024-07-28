const asyncWrapper = require("../middlewares/asyncWrapper");
const Jop = require("../models/Jop");
const appError = require("../utils/appError");
const statusText = require("../utils/statusText");

const getAll = asyncWrapper(async (req, res, next) => {
  const jops = await Jop.find({}, { __v: false }).sort("createdAt");
  if (jops.length == 0) {
    res.status(200).json({ status: statusText.Success, jops: "Empty jops" });
  }
  res.status(200).json({ status: statusText.Success, jops });
});

const addJop = asyncWrapper(async (req, res, next) => {
  if (!req.user._id) {
    const error = appError.createError("unauthorized", 401, statusText.Error);
    next(error);
  }
  req.body.createdBy = req.user._id;
  const jop = await Jop.create(req.body);
  res.status(200).json({ status: statusText.Success, jop });
});

const getJop = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    const jop = await Jop.findById(id, { __v: false });
    res.status(200).json({ status: statusText.Success, jop });
  } else {
    const error = appError.createError(
      "This jop not found",
      404,
      statusText.Error
    );
    next(error);
  }
});

const editJop = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    await Jop.findByIdAndUpdate(id, req.body);
    res
      .status(200)
      .json({ status: statusText.Success, msg: "updated successfully" });
  } else {
    const error = appError.createError(
      "This jop not found",
      404,
      statusText.Error
    );
    next(error);
  }
});

const deleteJop = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    await Jop.findByIdAndDelete(id);
    res
      .status(200)
      .json({ status: statusText.Success, msg: "deleted successfully" });
  } else {
    const error = appError.createError(
      "This jop not found",
      404,
      statusText.Error
    );
    next(error);
  }
});

module.exports = { getAll, addJop, getJop, editJop, deleteJop };

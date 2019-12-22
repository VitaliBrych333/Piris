const express = require('express');
const recordsModel = require('../models/records-model');
const asyncHandler = require('../utils');

const router = new express.Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const items = await recordsModel.find({}).exec();
    res.json(items);
    res.end();
  }),
);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const items = await recordsModel.findById(id).exec();
    res.json(items);
    res.end();
  }),
);

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const content = req.body;
    await recordsModel.create(content, (err) => {
      if (err) return console.log(err);
      res.end();
    });
  }),
);

router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    await recordsModel.findByIdAndDelete(id, (err, field) => {
      if (err) return console.log(err);
      res.send(field);
    });
  })
)

router.put(
  '/:id/update',
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    await recordsModel.findByIdAndUpdate(id, {$set: req.body}, (err) => {
      if (err) return console.log(err);
      res.end();
    });
  })
)

module.exports = router;

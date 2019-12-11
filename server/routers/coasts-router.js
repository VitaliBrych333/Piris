const express = require('express');
const coastsModel = require('../models/coasts-model');
const asyncHandler = require('../utils');

const router = new express.Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const items = await coastsModel.find({}).exec();
    res.json(items);
    res.end();
  }),
);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = req.params.id;

    const items = await coastsModel.findById(id).exec();
    res.json(items);
    res.end();
  }),
);

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const content = req.body;

    await coastsModel.create(content, (err) => {
      if (err) return console.log(err);
      res.end();
    });
  }),
);

router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = req.params.id;

    await coastsModel.findByIdAndDelete(id, (err, field) => {
      if (err) return console.log(err);
      res.send(field);
    });
  })
)

router.put(
  '/:id/update',
  asyncHandler(async (req, res) => {
    const id = req.params.id;

    await coastsModel.findByIdAndUpdate(id, {$set: req.body}, (err) => {
      if (err) return console.log(err);
      res.end();
    });
  })
)

module.exports = router;

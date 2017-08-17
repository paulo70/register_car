'use strict';

var express = require('express');
var router = express.Router();
var data = [];

router.get('/', function(req, res) {
  res.json(data);
});

router.get('/:brandname', function(req, res) {
  var brandname = req.params.brandname;
  var hasCar = data.some(function(car) {
    return car.brandname === brandname;
  });

  if (hasCar) {
    return res.json(data.filter(function(car) {
      return car.brandname === brandname;
    }));
  }
});

router.post('/', function(req, res) {
  data.push({
  	brandname: req.body.brandname,
    image: req.body.image,
    brand: req.body.brand,
    year:  req.body.year,
    plate: req.body.plate,
    color: req.body.color
  });
  res.json({ message: 'success' });
});

router.delete('/', function(req, res) {
  data = data.filter(function(car) {
    return car.plate !== req.body.plate;
  });
  res.json({ message: 'success' });
});

module.exports = router;
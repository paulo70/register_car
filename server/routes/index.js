'use strict';

var express = require('express');
var router = express.Router();
var data = [{
	  brandname:'BMW-2-series',
	  brand: 'BMW-2-series',
    image: 'http://blog.caranddriver.com/wp-content/uploads/2015/11/BMW-2-series.jpg',
    year: '2015',
    plate: 'bmw-4625',
    color: 'Red'
  },
  {
  	brandname:'Ferrari-Testarossa',
  	brand: 'Ferrari-Testarossa',
    image: 'https://pictures.topspeed.com/IMG/crop/201511/1984-ferrari-testarossa-44_600x0w.jpg',
    year: '1993',
    plate: 'kvs-4822',
    color: 'Red'
  }
];

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

module.exports = router;
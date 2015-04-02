var express = require('express');
var app = express();
var ip = require('ip');
var fmt = require('util').format;
var _ = require('underscore');

var port = process.env.PORT || 8080;

var router = express.Router();

var CAR_MAKES_AND_MODELS = {
  amc: {
    name: 'AMC',
    models: ['AMX', 'Concord', 'Eagle', 'Gremlin', 'Matador', 'Pacer'],
  },
  alfa: {
    name: 'Alfa-Romeo',
    models: ['159', '4C', 'Alfasud', 'Brera', 'GTV6', 'Giulia', 'MiTo', 'Spider'],
  },
  aston: {
    name: 'Aston Martin',
    models: ['DB5', 'DB9', 'DBS', 'Rapide', 'Vanquish', 'Vantage'],
  },
  audi: {
    name: 'Audi',
    models: ['90', '4000', '5000', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'Q5', 'Q7'],
  },
  austin: {
    name: 'Austin',
    models: ['America', 'Maestro', 'Maxi', 'Mini', 'Montego', 'Princess'],
  },
  borgward: {
    name: 'Borgward',
    models: ['Hansa', 'Isabella', 'P100'],
  },
  buick: {
    name: 'Buick',
    models: ['Electra', 'LaCrosse', 'LeSabre', 'Park Avenue', 'Regal',
      'Roadmaster', 'Skylark'
    ],
  },
  cadillac: {
    name: 'Cadillac',
    models: ['Catera', 'Cimarron', 'Eldorado', 'Fleetwood', 'Sedan de Ville'],
  },
  chevrolet: {
    name: 'Chevrolet',
    models: ['Astro', 'Aveo', 'Bel Air', 'Captiva', 'Cavalier', 'Chevelle',
      'Corvair', 'Corvette', 'Cruze', 'Nova', 'SS', 'Vega', 'Volt'
    ],
  },
};

router.get('/makes', function(req, res) {
  res.json(_.map(CAR_MAKES_AND_MODELS, function(value, key) {
    return {
      key: key,
      value: value.name
    };
  }));
});

router.get('/:make_id/models', function(req, res) {
  res.json(CAR_MAKES_AND_MODELS[req.params.make_id].models);
});


app.use('/car', router);
app.listen(port);

console.log(fmt('start server on %s:%s', ip.address(), port));

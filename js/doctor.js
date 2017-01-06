var apiKey = require('./../.env').apiKey;

function Doctor() {}

Doctor.prototype.findDoctors = function(ailment) {
  console.log(ailment);
};


exports.doctorModule = Doctor;

var apiKey = require('./../.env').apiKey;

function Doctor() {}

Doctor.prototype.findDoctors = function(ailment) {
  $.get("https://api.betterdoctor.com/2016-03-01/doctors?query=" + ailment + "&location=45.5231%2C-122.6765%2C100&user_location=37.773%2C-122.413&skip=0&limit=10&user_key=" + apiKey)
  .then(function(result) {
    result.data.forEach(function(doctor) {
      console.log(doctor.profile.first_name + " " + doctor.profile.last_name + " " + doctor.profile.title);
    });
  })
  .fail(function(error){
    console.log("fail");
  });
};


exports.doctorModule = Doctor;


// result.data.profile.first_name
// last_name
// title

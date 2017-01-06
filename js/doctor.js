var apiKey = require('./../.env').apiKey;

function Doctor() {}

Doctor.prototype.findDoctors = function(ailment, displayDoctors) {
  $.get("https://api.betterdoctor.com/2016-03-01/doctors?query=" + ailment + "&location=45.5231%2C-122.6765%2C100&user_location=37.773%2C-122.413&skip=0&limit=20&user_key=" + apiKey)
  .then(function(result) {
    result.data.forEach(function(doctor) {
      var firstName = doctor.profile.first_name;
      var lastName = doctor.profile.last_name;
      var title = doctor.profile.title;
      displayDoctors(firstName, lastName, title);
    });
  })
  .fail(function(error){
    console.log("fail");
    // fix this
  });
};


exports.doctorModule = Doctor;

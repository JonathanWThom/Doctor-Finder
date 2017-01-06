var apiKey = require('./../.env').apiKey;

function Doctor() {}

Doctor.prototype.findDoctors = function(ailment, name, displayDoctors) {
  if (ailment && !name) {
    console.log("ailment present");
    $.get("https://api.betterdoctor.com/2016-03-01/doctors?query=" + ailment + "&location=45.5231%2C-122.6765%2C100&user_location=37.773%2C-122.413&skip=0&limit=20&user_key=" + apiKey)
    .then(function(result) {
      if (result.data.length === 0) {
        console.log('zero');
      } else {
        result.data.forEach(function(doctor) {
          var firstName = doctor.profile.first_name;
          var lastName = doctor.profile.last_name;
          var title = doctor.profile.title;
          displayDoctors(firstName, lastName, title);
        });
      }
    })
    .fail(function(error){
      console.log("fail");
      // fix this
    });
  } else if (name && !ailment) {
    console.log("name present");
    $.get("https://api.betterdoctor.com/2016-03-01/doctors?name=" + name + "&location=45.5231%2C-122.6765%2C100&user_location=37.773%2C-122.413&skip=0&limit=20&user_key=" + apiKey)
    .then(function(result) {
      if (result.data.length === 0) {
        console.log('zero');
      } else {
        result.data.forEach(function(doctor) {
          var firstName = doctor.profile.first_name;
          var lastName = doctor.profile.last_name;
          var title = doctor.profile.title;
          displayDoctors(firstName, lastName, title);
        });
      }
    })
    .fail(function(error){
      console.log("fail");
      // fix this
    });
  } else {
    console.log("both");
    $.get("https://api.betterdoctor.com/2016-03-01/doctors?name=" + name + "&query=" + ailment + "&location=45.5231%2C-122.6765%2C100&user_location=37.773%2C-122.413&skip=0&limit=20&user_key=" + apiKey)
    .then(function(result) {
      if (result.data.length === 0) {
        console.log('zero');
      } else {
        result.data.forEach(function(doctor) {
          var firstName = doctor.profile.first_name;
          var lastName = doctor.profile.last_name;
          var title = doctor.profile.title;
          displayDoctors(firstName, lastName, title);
        });
      }
    })
    .fail(function(error){
      console.log("fail");
      // fix this
    });
  }
};


exports.doctorModule = Doctor;

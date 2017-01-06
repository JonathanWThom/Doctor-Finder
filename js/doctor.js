var apiKey = require('./../.env').apiKey;

function Doctor() {}

Doctor.allSpecialities = function(displaySpecialities) {
  $.get("https://api.betterdoctor.com/2016-03-01/specialties?user_key=" + apiKey)
  .then(function(result) {
    result.data.forEach(function(speciality) {
      var specialityName = speciality.name;
      displaySpecialities(specialityName);
    });
  })
  .fail(function(error){
    //bad things happen
  });
};

Doctor.prototype.findDoctors = function(ailment, name, displayDoctors, displayError) {
  if (ailment && !name) {
    console.log("ailment present");
    $.get("https://api.betterdoctor.com/2016-03-01/doctors?query=" + ailment + "&location=45.5231%2C-122.6765%2C100&user_location=37.773%2C-122.413&skip=0&limit=20&user_key=" + apiKey)
    .then(function(result) {
      if (result.data.length === 0) {
        displayError("Sorry, there are no doctors in this area that treat that condition.");
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
      displayError(error.responseJSON.message);
    });
  } else if (name && !ailment) {
    console.log("name present");
    $.get("https://api.betterdoctor.com/2016-03-01/doctors?name=" + name + "&location=45.5231%2C-122.6765%2C100&user_location=37.773%2C-122.413&skip=0&limit=20&user_key=" + apiKey)
    .then(function(result) {
      if (result.data.length === 0) {
        displayError("Sorry, there are no doctors in this area with that name.");
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
      displayError(error.responseJSON.message);
    });
  } else {
    console.log("both");
    $.get("https://api.betterdoctor.com/2016-03-01/doctors?name=" + name + "&query=" + ailment + "&location=45.5231%2C-122.6765%2C100&user_location=37.773%2C-122.413&skip=0&limit=20&user_key=" + apiKey)
    .then(function(result) {
      if (result.data.length === 0) {
        displayError("Sorry, there are no doctors in this area that meet those parameters.");
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
      displayError(error.responseJSON.message);
    });
  }
};

exports.doctorModule = Doctor;

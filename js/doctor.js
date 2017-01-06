var apiKey = require('./../.env').apiKey;

function Doctor() {}

Doctor.allSpecialities = function(displaySpecialities) {
  $.get("https://api.betterdoctor.com/2016-03-01/specialties?user_key=" + apiKey)
  .then(function(result) {
    result.data.forEach(function(speciality) {
      var specialityName = speciality.name;
      var specialityUid = speciality.uid;
      displaySpecialities(specialityName, specialityUid);
    });
  })
  .fail(function(error){
    //bad things happen
  });
};

Doctor.prototype.findDoctors = function(ailment, name, specialityUid, displayDoctors, displayError) {
  var call;
  if (ailment && name && !specialityUid) {
    call = "https://api.betterdoctor.com/2016-03-01/doctors?name=" + name + "&query=" + ailment + "&location=45.5231%2C-122.6765%2C100&user_location=45.5231%2C-122.6765&skip=0&limit=20&user_key=" + apiKey;
  } else if (ailment && !name && !specialityUid) {
    call = "https://api.betterdoctor.com/2016-03-01/doctors?query=" + ailment + "&location=45.5231%2C-122.6765%2C100&user_location=45.5231%2C-122.6765&skip=0&limit=20&user_key=" + apiKey;
  } else if (name && specialityUid && !ailment) {
    call = "https://api.betterdoctor.com/2016-03-01/doctors?name=" + name + "&speciality_uid=" + specialityUid + "&location=45.5231%2C-122.6765%2C100&user_location=45.5231%2C-122.6765&skip=0&limit=20&user_key=" + apiKey;
  } else if (specialityUid && ailment && !name) {
    call = "https://api.betterdoctor.com/2016-03-01/doctors?query=" + ailment + "&speciality_uid=" + specialityUid + "&location=45.5231%2C-122.6765%2C100&user_location=45.5231%2C-122.6765&skip=0&limit=20&user_key=" + apiKey;
  } else if (specialityUid && !ailment && !name) {
    call = "https://api.betterdoctor.com/2016-03-01/doctors?speciality_uid=" + specialityUid + "&location=45.5231%2C-122.6765%2C100&user_location=45.5231%2C-122.6765&skip=0&limit=20&user_key=" + apiKey;
  } else {
    call = "https://api.betterdoctor.com/2016-03-01/doctors?name=" + name + "&query=" + ailment + "&speciality_uid=" + specialityUid + "&location=45.5231%2C-122.6765%2C100&user_location=45.5231%2C-122.6765&skip=0&limit=20&user_key=" + apiKey;
  }
  console.log(call);
  $.get(call)
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
};

exports.doctorModule = Doctor;

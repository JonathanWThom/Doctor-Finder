var apiKey = require('./../.env').apiKey;

function Doctor() {}

Doctor.allSpecialties = function(displaySpecialties) {
  $.get("https://api.betterdoctor.com/2016-03-01/specialties?user_key=" + apiKey)
  .then(function(result) {
    result.data.forEach(function(specialty) {
      var specialtyName = specialty.name;
      var specialtyUid = specialty.uid;
      displaySpecialties(specialtyName, specialtyUid);
    });
  })
  .fail(function(error){
    $('#specialties').append("<option value=''>Unable to display specialties</option>");
  });
};

Doctor.prototype.findDoctors = function(ailment, name, specialtyUid, displayDoctors, displayError) {
  var call;
  console.log(specialtyUid);
  if (ailment && name && !specialtyUid) {
    call = "https://api.betterdoctor.com/2016-03-01/doctors?name=" + name + "&query=" + ailment + "&location=45.5231%2C-122.6765%2C100&user_location=45.5231%2C-122.6765&skip=0&limit=20&user_key=" + apiKey;
  } else if (ailment && !name && !specialtyUid) {
    call = "https://api.betterdoctor.com/2016-03-01/doctors?query=" + ailment + "&location=45.5231%2C-122.6765%2C100&user_location=45.5231%2C-122.6765&skip=0&limit=20&user_key=" + apiKey;
  } else if (name && specialtyUid && !ailment) {
    call = "https://api.betterdoctor.com/2016-03-01/doctors?name=" + name + "&specialty_uid=" + specialtyUid + "&location=45.5231%2C-122.6765%2C100&user_location=45.5231%2C-122.6765&skip=0&limit=20&user_key=" + apiKey;
  } else if (specialtyUid && ailment && !name) {
    call = "https://api.betterdoctor.com/2016-03-01/doctors?query=" + ailment + "&specialty_uid=" + specialtyUid + "&location=45.5231%2C-122.6765%2C100&user_location=45.5231%2C-122.6765&skip=0&limit=20&user_key=" + apiKey;
  } else if (specialtyUid && !ailment && !name) {
    call = "https://api.betterdoctor.com/2016-03-01/doctors?specialty_uid=" + specialtyUid + "&location=45.5231%2C-122.6765%2C100&user_location=45.5231%2C-122.6765&skip=0&limit=20&user_key=" + apiKey;
  } else if (name && !specialtyUid && !ailment) {
    call = "https://api.betterdoctor.com/2016-03-01/doctors?name=" + name + "&location=45.5231%2C-122.6765%2C100&user_location=45.5231%2C-122.6765&skip=0&limit=20&user_key=" + apiKey;
  } else {
    call = "https://api.betterdoctor.com/2016-03-01/doctors?name=" + name + "&query=" + ailment + "&specialty_uid=" + specialtyUid + "&location=45.5231%2C-122.6765%2C100&user_location=45.5231%2C-122.6765&skip=0&limit=20&user_key=" + apiKey;
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

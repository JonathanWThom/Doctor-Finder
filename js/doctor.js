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
  $.get(call)
  .then(function(result) {
    if (result.data.length === 0) {
      displayError("Oopsies, there are no doctors in this area that meet those parameters. Try again!");
    } else {
      result.data.forEach(function(doctor) {
        var firstName = doctor.profile.first_name;
        var lastName = doctor.profile.last_name;
        var title = doctor.profile.title;
        var visit_address = doctor.practices[0].visit_address;
        var address = visit_address.street + ", " + visit_address.city + ", " + visit_address.state + " " + visit_address.zip;
        var phones = [];
        doctor.practices[0].phones.forEach(function(phone) {
          var phoneNumbers = phone.number + " (" + phone.type + ")";
          phones.push(phoneNumbers);
        });
        phones.join(",");
        displayDoctors(firstName, lastName, title, address, phones);
      });
    }
  })
  .fail(function(error){
    displayError(error.responseJSON.message);
  });
};

exports.doctorModule = Doctor;

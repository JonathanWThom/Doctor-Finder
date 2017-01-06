var Doctor = require('./../js/doctor.js').doctorModule;

function displayDoctors(firstName, lastName, title) {
  $('#doctor-list').append("<li>" + firstName + " " + lastName + ", " + title);
}

$(document).ready(function(){
  $('#find-doctors').click(function() {
    var ailment = $('#ailment').val();
    var name = $('#name').val();
    var doctor = new Doctor();
    doctor.findDoctors(ailment, name, displayDoctors);
  });
});

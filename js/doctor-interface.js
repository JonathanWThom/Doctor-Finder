var Doctor = require('./../js/doctor.js').doctorModule;

$(document).ready(function(){
  $('#find-doctors').click(function() {
    var ailment = $('#ailment').val();
    var doctor = new Doctor();
    doctor.findDoctors(ailment);
  });
});

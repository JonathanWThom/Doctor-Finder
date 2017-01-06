var Doctor = require('./../js/doctor.js').doctorModule;

function displayDoctors(firstName, lastName, title, address, phones) {
  $('#doctor-list tbody').append("<tr><td>" + firstName + " " + lastName + ", " + title + "</td><td>" + address + "</td><td>" + phones + "</td></tr>");
}

function displayError(error) {
  $('#drnick-greeting').text(error);
  $('#doctor-list').hide();
}

function displaySpecialties(specialty, uid) {
  $('select').material_select();
  $('#specialties').append("<option value='" + uid + "'>" + specialty + "</option>");
}

$(document).ready(function(){
  $('#start').click(function(){
    $('select').material_select();
    $('#parameters').show();
    Doctor.allSpecialties(displaySpecialties);
    $('#start').hide();
    $('#drnick-greeting').text('Fill in as many of the fields as you\'d like to see which doctors in the Portland area would be a good match for you. You might have to wait a few seconds before the fields start working ; )')
  });

  $('#find-doctors').click(function() {
    $('#doctor-list tbody').empty();
    $('#drnick-greeting').empty();
    var ailment = $('#ailment').val();
    var name = $('#name').val();
    var specialtyUid = $("#specialties").val();

    if (!ailment && !name && !specialtyUid) {
      $('#drnick-greeting').text("Oopsies! You must fill in at least one field!");
    } else {
      $('#drnick-greeting').text("Here are some docs that might make you feel better! Change and resubmit your form if you want to see some different results.");
      $('#doctor-list').show();
      var doctor = new Doctor();
      doctor.findDoctors(ailment, name, specialtyUid, displayDoctors, displayError);
    }
  });

  $('#reset').click(function(){
    $('#ailment').val('');
    $('#name').val('');
    $("#specialties").prop('selectedIndex', 0);
    $('select').material_select();
    $('#doctor-list tbody').empty();
    $('#doctor-list').hide();
    $('#drnick-greeting').text("Fill in one, two, or all of the fields to my right to see some good matches in the Portland area.");
  });
});

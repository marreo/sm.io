import 'bootstrap';
import 'fabric';

$(document).ready(function () {

  console.log('Hello?');

  //Admin mode - show all grids
  //Not admin mode - show only facit grids
  //show and hide == kunna klicka på rutor == ge rätt klass

  $(document).on('mouseenter', '#grid-overlay td.clickable', function () {
    $(this).addClass("hover");
  });
  $(document).on('mouseleave', '#grid-overlay td.clickable', function () {
    $(this).removeClass("hover");
  });

  $(document).on('click', '#grid-overlay td.clickable', function () {
    console.log('Waht?');
    var typeSelected = $('input[name="radio_seatType"]:checked').val();
    $(this).attr("data-type", typeSelected);
    $(this)
      .toggleClass("selected")
      .toggleClass("unselected");
  });
});

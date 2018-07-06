import 'bootstrap';
import 'fabric';

$(document).ready(function () {
  //Admin mode - show all grids
  //Not admin mode - show only facit grids
  //show and hide == kunna klicka på rutor == ge rätt klass

  $(document).on('mouseenter', '.grid-overlay td.clickable', function () {
    $(this).addClass("hover");
  });
  $(document).on('mouseleave', '.grid-overlay td.clickable', function () {
    $(this).removeClass("hover");
  });

  $(document).on('click', '.grid-overlay td.clickable', function () {
    var typeSelected = $('input[name="radio_seatType"]:checked').val();
    var classSelected = "";

    switch (typeSelected) {
      case "1":
        classSelected = "bg-primary"
        break;
      case "2":
        classSelected = "bg-success"
        break;
      case "3":
        classSelected = "bg-warning"
        break;
    }

    $(this).attr("data-type", typeSelected);
    $(this)
      .toggleClass("selected")
      .toggleClass("unselected")
      .addClass(classSelected);
  });
});

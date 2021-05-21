$(document).ready(function() {
  $(".new-tweet textarea").on("input", function() {
    let curLength = 140 - this.value.length;
    $(this).parent().find(".counter").text(curLength);
    if (curLength < 0) {
      $(this).parent().find(".counter").css("color", "red");
    } else {
      $(this).parent().find(".counter").css("color", "#545149");
    }
  })
})
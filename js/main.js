// toggle
$(".nav-toggle").click(function () {
  $(this).toggleClass("on");
  $("nav").toggleClass("activated");
  $("nav").slideToggle();
});

// Mobile Click Drop Down
$(".dropdown  > a").on("click", function (e) {
  e.preventDefault();
  $(this).parent().toggleClass("active");
});

// Slider Banner
$(".slider_banner").owlCarousel({
  loop: true,
  margin: 0,
  nav: true,
  autoplay: true,
  autoplayTimeout: 3000,
  autoplayHoverPause: true,
  items: 1,
});

// number Count
$(".count").each(function () {
  $(this)
    .prop("Counter", 0)
    .animate(
      {
        Counter: $(this).text(),
      },
      {
        duration: 3000,
        easing: "swing",
        step: function (now) {
          $(this).text(Math.ceil(now));
        },
      }
    );
});

// Tab
$(document).ready(function () {
  $(".tablinlist").click(function () {
    var tab_id = $(this).attr("data-tab");

    $(".tablinlist").removeClass("active");
    $(".tacontSec").removeClass("active");

    $(this).addClass("active");
    $("#" + tab_id).addClass("active");
  });
});

//year
document.addEventListener("DOMContentLoaded", function () {
  const currentYear = new Date().getFullYear();
  document.getElementById("year").textContent = currentYear;
});


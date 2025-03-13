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
  margin: 20,
  nav: true,
  dots: true,
  autoplay: true,
  autoplayTimeout: 5000,
  autoplayHoverPause: true,
  items: 1,
  responsive: {
    0: {
      
    },
    768: {
      stagePadding: 0
    }
  }
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




//emi
const loanTenureRange = document.getElementById('loanTenureRange');
const loanTenureInput = document.getElementById('loanTenureInput');
loanTenureRange.addEventListener('input', function () {
  loanTenureInput.value = this.value;
});
loanTenureInput.addEventListener('input', function () {
  if (this.value < 12) this.value = 12;
  if (this.value > 240) this.value = 240;
  loanTenureRange.value = this.value;
});

// Sync the range and number inputs for Interest Rate
const interestRateRange = document.getElementById('interestRateRange');
const interestRateInput = document.getElementById('interestRateInput');
interestRateRange.addEventListener('input', function () {
  interestRateInput.value = parseFloat(this.value).toFixed(2);
});
interestRateInput.addEventListener('input', function () {
  if (this.value < 0) this.value = 0;
  if (this.value > 20) this.value = 20;
  interestRateRange.value = this.value;
});

function calculateEMI() {
  let loanAmount = parseFloat(document.getElementById("loanAmount").value);
  let tenure = parseInt(loanTenureInput.value);
  let annualInterestRate = parseFloat(interestRateInput.value);
  let monthlyInterestRate = annualInterestRate / 12 / 100;
  let emi;
  if (monthlyInterestRate === 0) {
    emi = loanAmount / tenure;
  } else {
    emi = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, tenure)) / (Math.pow(1 + monthlyInterestRate, tenure) - 1);
  }
  let totalAmount = emi * tenure;
  let totalInterest = totalAmount - loanAmount;
  document.getElementById("emiResult").innerText = `₹ ${emi.toFixed(2)}`;
  document.getElementById("totalInterest").innerText = `₹ ${totalInterest.toFixed(2)}`;
  document.getElementById("totalAmount").innerText = `₹ ${totalAmount.toFixed(2)}`;
}
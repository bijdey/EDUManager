// toggle
$(".nav-toggle").click(function () {
    $(this).toggleClass("on");
    $("nav").toggleClass("activated");
    $("nav").slideToggle();
});

// Mobile Click Drop Down
$('.dropdown  > a').on('click', function (e) {
    e.preventDefault();
    $(this).parent().toggleClass('active');
});

 // Slider 
$('.slider_banner').owlCarousel({
    loop: true,
    margin: 0,
    nav: false,
    dots: true,
    autoplay: true,
     autoplayTimeout: 5000,
    autoplayHoverPause: true,
    items: 1
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
  

    
  //emi

  let paymentChart;

  // Update displayed months value
  function updateMonthsValue(val) {
    document.getElementById('monthsValue').textContent = val;
  }

  // Update displayed interest value (with 2 decimals)
  function updateInterestValue(val) {
    document.getElementById('interestValue').textContent = parseFloat(val).toFixed(2);
  }

  // EMI calculation
  function calculateEMI() {
    const principal = parseFloat(document.getElementById('loanAmount').value) || 0;
    const months = parseInt(document.getElementById('monthsRange').value);
    const annualInterestRate = parseFloat(document.getElementById('interestRange').value);

    // Monthly interest rate
    const monthlyInterestRate = annualInterestRate / 12 / 100;

    // EMI formula:
    // EMI = [P x r x (1+r)^n] / [(1+r)^n - 1]
    let emi = 0;
    if (monthlyInterestRate > 0) {
      emi =
        (principal *
          monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, months)) /
        (Math.pow(1 + monthlyInterestRate, months) - 1);
    } else {
      // If interest rate is 0, then EMI is just principal / months
      emi = principal / months;
    }

    const totalAmount = emi * months;
    const totalInterest = totalAmount - principal;

    // Update the UI
    document.getElementById('emiPayable').textContent = '₹ ' + emi.toFixed(0);
    document.getElementById('totalInterest').textContent = '₹ ' + totalInterest.toFixed(0);
    document.getElementById('totalAmount').textContent = '₹ ' + totalAmount.toFixed(0);

    // Update the Chart
    updateChart(principal, totalInterest);
  }

  // Create/Update the Pie Chart with percentage labels
  function updateChart(principal, interest) {
    const ctx = document.getElementById('paymentChart').getContext('2d');
    
    // Destroy previous chart instance if it exists
    if (paymentChart) {
      paymentChart.destroy();
    }

    paymentChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Principal Amount', 'Interest Amount'],
        datasets: [
          {
            data: [principal, interest],
            backgroundColor: ['#1976d2', '#ff5722'],
            hoverOffset: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          },
          datalabels: {
            color: '#fff',
            font: {
              weight: 'bold'
            },
            formatter: function(value, context) {
              const dataArr = context.chart.data.datasets[0].data;
              const sum = dataArr.reduce((a, b) => a + b, 0);
              const percentage = sum ? (value * 100 / sum).toFixed(1) + '%' : '0%';
              return percentage;
            }
          }
        }
      },
      plugins: [ChartDataLabels]
    });
  }

  // Initialize with default calculation
  window.onload = function() {
    calculateEMI();
  };

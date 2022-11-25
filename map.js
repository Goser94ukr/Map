const colors = {
    "IT": "#F9693B",
    "Healthcare & Therapy": "#01ADAB",
    "Engineering": "#ABCB4E",
    "Accounting & Finance": "#A935D2",
    "Sales": "#6CA1D6",
    "Marketing & Advertising": "#D23E4E",
    "Law Enforcement/Security": "#F9DA3B",
    "C-Level & TOP management": "#7064BB",
    "Management level": "#47A338",
    "Science & Research": "#D8BD36",
    "Customer Service": "#1FF4E7",
    "Manufacturing. Warehouse & Production": "#5AD92E",
    "Human Resources": "#EA89C3",
    "Office & Administrative": "#CCE823",
    "Building & Construction": "#24FF00",
};

let tooltip = document.getElementById("tooltip");

const mapChart = document.getElementById('mapChart');



let timerId;

function showTooltip(evt) {
  if (timerId) {
    clearTimeout(timerId);
  }
  timerId = setTimeout(() => {
    const parent = evt.target.closest("g");
    const tooltipText = parent.querySelector(".tooltip");
    tooltip.innerHTML = tooltipText.innerHTML;
    tooltip.style.display = "block";
    tooltip.style.left = evt.pageX + 10 + 'px';
    tooltip.style.top = evt.pageY + 10 + 'px';
  }, 200);
}

const showTooltip2 = function (evt) {
  const parent = evt.target.parentElement;
  const tooltipText = parent.querySelector(".tooltip");
  console.log(parent);
  // const tooltipText = document.getElementById(evt + 'Tooltip');
  console.log(tooltipText);
  tooltip.innerHTML = tooltipText.innerHTML;
  // tooltip.appendChild(tooltipText);
  tooltip.style.display = "block";
  tooltip.style.left = evt.pageX + 10 + 'px';
  tooltip.style.top = evt.pageY + 10 + 'px';
}

function hideTooltip() {
  if (timerId) {
    clearTimeout(timerId);
  }
  // var tooltip = document.getElementById("tooltip");
  tooltip.style.display = "none";
}

window.addEventListener("load", function() {
  function printMousePos(event) {
    const xy =
      "clientX: " + event.clientX +
      " - clientY: " + event.clientY;
    console.log(xy);
  }
  Object.entries(colors).forEach(entry => {
    const [key, value] = entry;
    console.log(key, value);
    document.getElementById(key).style.background = value
  });
  mapChart.addEventListener("click", printMousePos)
    fetch('./data.json')
      .then((response) => response.json())
      .then((data) => {
        data.forEach(element => {
          let text = mapChart.getElementById(element.state + "Text");
          text.innerHTML = element.Position;
          mapChart.getElementById(element.state).setAttribute('fill', colors[element.industry]);
        })
      });
})


const ipc = require("electron").ipcRenderer;
const $ = require("jquery");
var Chart = require('chart.js');
console.log("in renderer!");

ipc.on("json", (evt, statuses) => {
  console.log(statuses);
  let ctx = document.getElementById("myChart");
  let labels = Object.keys(statuses);
  let values = [];
  labels.forEach(l => {
    values.push(statuses[l]);
  });
  var barChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Story Status",
          data: values,
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 206, 86)",
            "rgb(75, 192, 192)",
            "rgb(153, 102, 255)",
            "rgb(255, 159, 64)"
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)"
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  });
});

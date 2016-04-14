$(document).ready(function () {

  var a = $("#svgImage");
  var adoc = a.contentDocument;

  var s = Snap("#termometer");

  var ball = s.select("#ball");
  var line = s.select("#line");
  var line_height = 420.699;
  var max_temp = 360;
  var temperature = 190;
  var low_temp_color = "#1976D2";
  var high_temp_color = "#D32F2F";
  var color ="";

  if (temperature >= max_temp) {
      temperature = max_temp;
  }

  if (temperature>(max_temp/2)) {
      color = high_temp_color;
  } else {
      color = low_temp_color;
  }

  line_height = line_height-temperature;

  ball.animate({fill: color, fillOpacity:1}, 1000);
  line.animate({d:"M305.949,424.6V"+line_height.toString()+"c0-11.5-7.6-19.1-19.099-19.1c-11.5,0-19.1,9.6-19.1,19.1v"+temperature.toString()+"c0,1.9,0,1.9,0,3.801z",fill: color, fillOpacity:1}, 1000);
});

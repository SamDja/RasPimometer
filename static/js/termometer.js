angular.module('termoModule', [])
.controller('termoController', ['$scope', '$http', function($scope, $http) {

  var ctrl = this;

  var snap = Snap(".termometer");

  var t_border = snap.path("M 75 0 A 45 45 0 0 0 30 45 L 30 335 A 75 75 0 0 0 0 395 A 75 75 0 0 0 75 470 A 75 75 0 0 0 150 395 A 75 75 0 0 0 120 335.11523 L 120 45 A 45 45 0 0 0 75 0 z ");
  var t_bg = snap.path("M 65 0 A 35 35 0 0 0 30 35 L 30 330 A 65 65 0 0 0 0 385 A 65 65 0 0 0 65 450 A 65 65 0 0 0 130 385 A 65 65 0 0 0 100 330 L 100 35 A 35 35 0 0 0 65 0 z ");
  var t_mask = snap.path("M 30 0 L 30 295 A 65 65 0 0 0 0 350 A 65 65 0 0 0 65 415 A 65 65 0 0 0 130 350 A 65 65 0 0 0 100 295 L 100 0 L 30 0 z ");
  var t_rect = snap.path("M 0 0 L 0 460 L 150 460 L 150 0 L 0 0 z ");

  t_rect.attr({mask: t_mask});

  var t_border_box = t_border.getBBox();
  var t_bg_box = t_bg.getBBox();
  var t_mask_box = t_mask.getBBox();

  snap.attr({viewBox: '0 0 ' + t_border_box.width + ' ' + t_border_box.height});

  t_bg.transform("t " + ((t_border_box.width/2)-(t_bg_box.width/2)) + " " + "10");
  t_mask.transform("t " + ((t_border_box.width/2)-(t_mask_box.width/2))+ " " + "45");


  t_border.attr({fill: "#000"});
  t_bg.attr({fill: "#ffffff"});
  t_mask.attr({fill: "#ffffff"});
  t_rect.attr({fill: "#F44336", class: "line"});

  this.sensor= {
    id:"",
    temperature:"",
    humidity:""
  };

  this.getData = function () {
    $http.get('/api/sensor', {})
    .then (function (res) {
      console.log("success");
      ctrl.sensor.id  = res.data.name;
      ctrl.sensor.temperature  = res.data.temperature;
      ctrl.sensor.humidity  = res.data.humidity;
      ctrl.update_temp();
    }, function (res) {
      console.log("Error");
      console.log("Error status : " + res.status);
    })
  };

  this.getData();

  this.update_temp = function (){
    var value = this.sensor.temperature;
    console.log(ctrl.sensor);

  var color = "#BDBDBD";
      switch (true) {
        case (value >= 30):
        color = "#F44336";
        break;

        case (value < 30 && value > 15):
        color = "#FFAB00";
        break;

        case (value <= 15 && value > 5):
        color = "#2196F3";
        break;
        case (value <= 5 && value > 0):
        color = "#1565C0";
        break;
        case (value <= 0):
        color = "#304FFE";
        break;
        default:

  }

  var max_point = 0;
  var min_point = 335;
  var ass_min = 0;
  var ass_max = 40;
  var new_point = min_point - (((value - ass_min)*(min_point - max_point))/(ass_max - ass_min));
  console.log(new_point);

  t_rect.animate({
    d: "M 0 0 L 0 460 L 150 460 L 150 " + new_point + " L 0 " + new_point + " z ",
    fill: color,
  }, 1000);
}

}])
.directive('termo', function() {
  return {
    template: '<div><svg class="svg termometer"></svg></div>',
    link: function(sensor, elem, attrs) {
    }
  }
});

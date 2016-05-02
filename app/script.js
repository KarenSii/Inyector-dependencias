var app=angular.module('app',['ngRoute']);
app.config(function($routeProvider){});
app.controller('mainController', function ($scope){

  $scope.post=[
    {nombre:'Karen', comentario:'Esta es una prueba'},
  ];


    $scope.disabled={
    btn1:true,
    btn2:false
  };

});

/*
$(document).ready(function(){
  $("#primeras").on( "click", function() {
    $('#graph1').hide(); //muestro
    $('#graph2').show(); //oculto
  });
  $("#segundas").on( "click", function() {
    $('#graph2').show//muestro
    $('#graph1').show
  });
});

*/
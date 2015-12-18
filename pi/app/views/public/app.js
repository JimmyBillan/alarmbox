var mString = {
	nav_current : {
		connected : "Votre alarmeBox",
		disconnected : "Veuillez vous connecter"
	}
}

var chartDates = [];
var chartTemp  = [];
var chartMove = [];

var fullDates = [];
var fullTemp = [];
var fullMove = [];
		
var lineChartData = {
	labels : chartDates,
	 datasets: [{
         label: "My First dataset",
         type: "bar",
         yAxesGroup: "1",
         fillColor: "rgba(151,137,200,0.5)",
         strokeColor: "rgba(151,137,200,0.8)",
         highlightFill: "rgba(151,137,200,0.75)",
         highlightStroke: "rgba(151,137,200,1)",
         data: chartTemp
     }, {
         label: "My Second dataset",
         type: "line",
         yAxesGroup: "2",
         fillColor: "rgba(151,187,205,0.5)",
         strokeColor: "rgba(151,187,205,0.8)",
         highlightFill: "rgba(151,187,205,0.75)",
         highlightStroke: "rgba(151,187,205,1)",
         data: chartMove
     }],
     yAxes: [{
         name: "1",
         scalePositionLeft: false,
         scaleFontColor: "rgba(151,137,200,0.8)"
     }, {
         name: "2",
         scalePositionLeft: true,
         scaleFontColor: "rgba(151,187,205,0.8)"
     }]

}

function displayChart(){
	var ctx = document.getElementById("canvas").getContext("2d");
	
	window.myLine = new Chart(ctx).Line(lineChartData, {
		responsive: true,
		 showXLabels: 50
	});
}


$( document ).ready(function(){

	var zoom = 0;

	$('#zoom').click(function() {
		chartMove.length = 0;
		chartTemp.length =0;
		chartDates.length =0;
		var j = 0;
		for (var i = 0; i < fullMove.length; i++) {
			if(j == 5){
				chartMove.push(fullMove[i]);
				chartTemp.push(fullTemp[i]);
				chartDates.push(fullDates[i]);
				j= 0;
			}
			j++;
		};
		document.getElementById("canvas").getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
		//$("#hereCanvas").html('<canvas id="canvas" width="450" height="600"></canvas>');

		displayChart();

	})

	$('#dezoom').click(function() {

	})

	$('Auth_form').submit(false);
	$('#yourParameter').submit(false);

	$.getJSON( "/auth/charts/1/12", function( data ) {
	  var items = [];
	  var i = 0 ;
	  $.each( data, function( key, val ) {
	  	
	  	   fullDates.push(val.timestamp);
	  	   
	  	   	fullTemp.push(val.temp);
	  	   	chartTemp.push(val.temp);
	  	   
	  	   fullMove.push(val.moves);

	  	   chartDates.push(val.timestamp);
	  	   
	  	   chartMove.push(val.moves);

	  	  
	  });
	 
	});

	$("#Auth_btn_post").click(function() {

		this.blur();
		
		if($("#Auth_input_Identifiant").val() != ""){
			$.ajax({
				url :'/auth/login/',
				type : 'post',
				data : {identifiant : $("#Auth_input_Identifiant").val()},
				statusCode : {
					200 : function(data, textStatus, request) {
						document.cookie="identifiant = "+request.getResponseHeader("identifiant")+"; expires=Thu, 21 Dec 2099 12:00:00 UTC";
						//window.location.replace('http://'+location.hostname+':'+location.port+'/alarmBox');
							location.reload();
					},
					202 : function() {
	  					console.log('202 status code! user error');
	  					self.blur();
					},
					500 : function() {
						console.log('500 status code! user error');
						self.blur();
					}
				}
			}); 
		}
	});

	$('#showParameter').click(function() {
		$("#paramaterMenu").show(300);
		$("#SleepQuality").hide(300);
		$("#alarm").hide(300);
	})

	

	$('#showAlarm').click(function() {
		$("#alarm").show(300);
		$("#SleepQuality").hide(300);
		$("#paramaterMenu").hide(300);
	})
	$('#showSleepQuality').click(function() {
		$("#SleepQuality").show(300, displayChart);
		$("#paramaterMenu").hide(300);
		$("#alarm").hide(300);
	})

	$('#yourParameter_timeBeforeFirstEvent_btn').click(function() {
		$.ajax({
                url: '/auth/parameter/timeBeforeFirstEvent', 
                dataType: 'json', 
                data: {timeBeforeFirstEvent : $('#yourParameter_timeBeforeFirstEvent').val()},                         
                type: 'post', 
                success: function(res){
                    console.log(res);
                }
     	});
	})

	$('#yourParameter_timeForPerfect_btn').click(function() {
		$.ajax({
                url: '/auth/parameter/timeForPerfect', 
                dataType: 'json', 
                data: {timeForPerfect : $('#yourParameter_timeForPerfect').val()},                         
                type: 'post',
                success: function(res){
                    console.log(res);
                }
     	});
	})

	$('#setAlarm').click(function() {
		if($(this).attr("type") =="enable"){
			var self = $(this);
			$.ajax({
                url: '/auth/parameter/alarm', 
                data: {mdate : self.attr('date')},                         
                type: 'post',
                success: function(res){
                	self.attr('type', 'cancel')
                    self.html("Annuler l'alarme");
                }
     		});
		}else{
			var self = $(this);
			$.ajax({
			  url: '/auth/parameter/alarm',
			  success: function(res) {
			  	self.attr('type', 'enable')
			  	self.html("Activer l'alarme");
			  }
			});
		}
		
	})
	$('#cancelAnalyse').click(function() {
		$.ajax({
			  url: '/auth/capteur/stopRecording',
			  success: function(res) {
			  }
			});
		
	})
	$('#startAnalyse').click(function() {
		$.ajax({
			  url: '/auth/capteur/startRecording',
			  success: function(res) {
			  }
			});
	})

	

	$('#SetCalendar').on('submit', function (e) {
        // On empêche le navigateur de soumettre le formulaire
        e.preventDefault();
 
        if( $('#SetCalendar_file').prop('files').length == 1){
        	var file_data = $('#SetCalendar_file').prop('files')[0];   
        	var form_data = new FormData();                  
		    form_data.append('file', file_data); 
        	$.ajax({
                url: '/auth/ics', 
                dataType: 'text', 
                cache: false,
                contentType: false,
                processData: false,
                data: form_data,                         
                type: 'post',
                success: function(res){
                    console.log(res);
                }
     		});
        }else if($('#SetCalendar_url').val() !=""){
        	var url = $('#SetCalendar_url').val();
			if(url.substring(url.length - 4, url.length ) == ".ics"){
				$.ajax({
	                url: '/auth/ics/url', 
	                data: {url :url} ,                         
	                type: 'post',
	                success: function(res){
	                    console.log(res);
	                }
	     		});
			}else{
				alert("Extension fichier non valide");
			}

        	
        }
    });
})
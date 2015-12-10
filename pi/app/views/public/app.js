var mString = {
	nav_current : {
		connected : "Votre alarmeBox",
		disconnected : "Veuillez vous connecter"
	}
}

$( document ).ready(function(){
	$('Auth_form').submit(false);
	$('#yourParameter').submit(false);

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
        }
    });
})
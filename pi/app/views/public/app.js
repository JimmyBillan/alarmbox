


$( document ).ready(function(){

	$('Auth_form').submit(false);

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

	$('#SetCalendar').on('submit', function (e) {
        // On empêche le navigateur de soumettre le formulaire
        e.preventDefault();
 
        if( $('#SetCalendar_file').prop('files').length == 1){
        	var file_data = $('#SetCalendar_file').prop('files')[0];   
        	var form_data = new FormData();                  
		    form_data.append('file', file_data);
		    alert(form_data);                      
        	$.ajax({
                url: '/auth/ics', // point to server-side PHP script 
                dataType: 'text',  // what to expect back from the PHP script, if anything
                cache: false,
                contentType: false,
                processData: false,
                data: form_data,                         
                type: 'post',
                success: function(res){
                    console.log(res); // display response from the PHP script, if any
                }
     		});
        }
    });
})
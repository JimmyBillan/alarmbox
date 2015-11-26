


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
})
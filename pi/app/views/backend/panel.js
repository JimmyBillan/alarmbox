var STR = {
	EDIT_A_CARD : "EDIT A CARD",
	ADD_A_CARD : "ADD A CARD",
	CC_LABEL_TITLE_type_edit : "edit",
	CC_LABEL_TITLE_type_add : "add",
	CC_BTN_POST_type_edit : "UPDATE",
	CC_BTN_POST_type_add : "ADD",
}

function regExpURLImage (url) {
	var r = new RegExp(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?.(gif|jpg|jpeg|tiff|png)$/i);
	return r.test(url);
}

function regExpURL (url) {
	var r = new RegExp(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/);
	return r.test(url);
}

function html2text(html) {
    var tag = document.createElement('div');
    tag.innerHTML = html;
    
    return tag.innerText;
}

function cleanFormCC(){
	$("#CC_FORM :input").each(function() {
		$(this).val('');
	})
}

function changeFormState() {
	if($("#CC_FORM").attr("type") == STR.CC_LABEL_TITLE_type_edit){
		$("#CC_BTN_CANCELEDIT").show();
		$("#CC_BTN_DELETE").show();
		$("#CC_LABEL_TITLE").html(STR.EDIT_A_CARD);
		$("#CC_BTN_POST").html(STR.CC_BTN_POST_type_edit);
	}else
	if($("#CC_FORM").attr("type") == STR.CC_LABEL_TITLE_type_add){
		$("#CC_BTN_CANCELEDIT").hide();
		$("#CC_BTN_DELETE").hide();
		$("#CC_LABEL_TITLE").html(STR.ADD_A_CARD);
		$("#CC_BTN_POST").html(STR.CC_BTN_POST_type_add);
		$("#CC_FORM").attr("cardID", "");
	}
}

function addACardToEditACard(card) {
	
	cleanFormCC();
	$("#CC_FORM").attr("type", STR.CC_LABEL_TITLE_type_edit);
	changeFormState();
	$("#CC_FORM").attr("cardID", card.id);
	var $inputs = $("#CC_FORM :input");
	
	$inputs.each(function()  {
		for (var key in card){
			if(card.hasOwnProperty(key)){
				if(key == $(this).attr("name")){
					$(this).val(html2text(card[key]));
				}
				
			}
		}
	})
}

function EditACardToAddACard() {
	$("#CC_FORM").attr("type", STR.CC_LABEL_TITLE_type_add);
	changeFormState();
	cleanFormCC();
}


$( document ).ready(function(){
	
	$("#CC_BTN_POST").click(function() {

		var $inputs = $("#CC_FORM :input");
		var params = {};

		$inputs.each(function() {
			if($(this).val() !== ""){
				if($(this).attr("name") === "imageUrl"){
					if(regExpURLImage($(this).val()))
						params[$(this).attr("name")] = $(this).val();
				}
				else if($(this).attr("name") === "url1" || $(this).attr("name") ==="url2"){
					if(regExpURL($(this).val())){
						params[$(this).attr("name")] =$(this).val();
					}
				}else{
					params[$(this).attr("name")] =$(this).val();
				}

			}
		});
		if(params.title != undefined && params.subtitle != undefined){
			if($("#CC_FORM").attr("type") == STR.CC_LABEL_TITLE_type_add){
				$.ajax({
					url :'/auth/card/',
					type : 'post',
					data : params,
					statusCode : {
						200 : function() {
							console.log('ADD SUCCESS');
						},
						400 : function() {
		  					console.log('400 status code! user error');
						},
						500 : function() {
							console.log('500 status code! user error');
						}
					}
				});
			}else
			if($("#CC_FORM").attr("type") == STR.CC_LABEL_TITLE_type_edit){
				
				var id = $("#CC_FORM").attr("cardID");

				$.ajax({
					url :'/auth/card/'+id,
					type : 'put',
					data : params,
					statusCode : {
						200 : function() {
							console.log('ADD SUCCESS');
						},
						400 : function() {
		  					console.log('400 status code! user error');
						},
						500 : function() {
							console.log('500 status code! user error');
						}
					}
				});
			}
		}
	});

	$("#CC_BTN_CANCELEDIT").click(function() {
		EditACardToAddACard();
	})

	$("#CC_BTN_DELETE").click(function() {

		var id = $("#CC_FORM").attr("cardID");		

		$.ajax({
				url :'/auth/card/'+id,
				type : 'delete',
				statusCode : {
					200 : function() {
						console.log('deleted');
						EditACardToAddACard();
					},
					400 : function() {
	  					console.log('400 status code! user error');
					},
					500 : function() {
						console.log('500 status code! user error');
					}
				}
		});
	})


	$("body").on( "click","#LC_EDIT", function() {
		$.ajax({
				url :'/auth/card/'+$(this).attr("value"),
				type : 'get',
				dataType : 'json',
				statusCode : {
					200 : function(card) {
						addACardToEditACard(card);
					},
					400 : function() {
	  					console.log('400 status code! user error');
					},
					500 : function() {
						console.log('500 status code! user error');
					}
				}
		});
	});


});
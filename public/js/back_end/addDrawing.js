$(document).ready(function(){
	init();
	$('form#saveDrawingForm').submit(function(){
	
		saveCategories();
		
	});
	
});
function saveCategories()
{
	if($("form#saveDrawingForm").valid())
	{
		$('#saveDrawing').attr('disabled' ,"disabled");
		return true;
		
	}else {
			
		return false;
	}
	
}
/**
 * validRules oject contain all the messages that are visible when an elment
 * value is valid
 * 
 * structure to define a message for element: key is to be element name and Value is
 * message
 */

var validRules = {

		firstName : "First Name  looks great",
		lastName : " Last Name looks great",
	
		email : "Email looks great",
		password : "Password looks great",
		confPassword:"Re-type Password looks great",
		Title:"Title looks great",
		DrawingIconNameHidden:"Enter Re-type Password"
};

/**
 * focusRules oject contain all the messages that are visible on focus of an
 * elelement
 * 
 * structure to define a message for element : key is to be element name and Value is
 * message
 */
var focusRules = {

			firstName : "Enter First Name",
			lastName : "Enter Last Name",
		
			email : "Enter Email",
			password : "Enter Passwordat",
			confPassword:"Enter Re-type Password",
			Title:"Enter title",
			DrawingIconNameHidden:"Enter Re-type Password"
			

};

$(document).ready(init);

function init()
{
	// code used for character count
	var options = {
			'maxCharacterSize': 160,
			'displayFormat' : ''
	};
	$('#metaDescription').textareaCount(options, function(data){
		$('#metaTextLeft').val("Characters Left: "+data.left);
	});
	
	var options2 = {
			'maxCharacterSize': 500,
			'displayFormat' : ''
	};
	$('#description').textareaCount(options2, function(data){
		$('#descriptionLeft').val("Characters Left: "+data.left);
	});
	$("form").submit(function(){
		
		if (! jQuery.isEmptyObject(invalidForm) ) 
			
			for(var i in invalidForm)
			{
				if(invalidForm[i])
				{
					$('#saveDrawing').removeAttr('disabled');
					return false ;
				}
				
			}
	});
	
	//function call to validate new Drawing
	  validateFormAddNewDrawing();
	
}
$.validator.setDefaults({
	onkeyup : false,
	onfocusout : function(element) {
		$(element).valid();
	}

});



var invalidForm = {} ;
var errorBy = "" ;
/**
 * check file type to be uploaded
 * @author blal
 */
function checkFileType(e)
{
	 var el = e.target  ? e.target :  e.srcElement ;
	 
	 
	 var regex = /png|jpg|jpeg/ ;
	 if( regex.test(el.value) )
	 {
		
		 invalidForm[el.name] = false ;
		 		 
		 $(el).parents("div.mainpage-content-right")
		 .children("div.mainpage-content-right-inner-right-other").removeClass("focus")
		 .html("<span class='success help-inline'>Valid file</span>");
		 
	 } else {
		
		 $(el).parents("div.mainpage-content-right")
		 .children("div.mainpage-content-right-inner-right-other").removeClass("focus")
		 .html("<span class='error help-inline'>Please upload valid file</span>");
		 
		 invalidForm[el.name] = true ;
		 errorBy = el.name ;
		 
		 
}
}
var validatorForNewDrawing = null ;
/**
 * form validation during add Drawing 
 * @author blal
 */
function validateFormAddNewDrawing(){
  validatorForNewDrawing = $("form#saveDrawingForm").validate(
		  {
			    errorClass : 'error',
				validClass : 'success',
				errorElement : 'span',
				ignore: ".ignore, :hidden",
				afterReset  : resetBorders,
				errorPlacement : function(error, element) {
				element.parent("div").prev("div")
							.html(error);
				},
				rules : {
					firstName: {
								required : true,
								minlength : 2,
								maxlength :50,
					},
					lastName : {
						required : true,
						minlength : 2,
						maxlength :50,
					},
					email : {
						required : true,
					},
					password : {
						required : true,
						minlength : 2,
						maxlength :30,
					},
					confPassword : {
						required : true,
						minlength : 2,
						maxlength :30,
					},
					Title : {
						required : true,
						minlength : 2,
						maxlength :30,
					},

				},		
				messages : {
					firstName: {		
								required : "Please enter First name",
								minlength : "Please enter atleast 2 characters",
				},
				lastName  : {		
					required : "Please enter last name",
					minlength : "Please enter atleast 2 characters",
		
				},
				email  : {		
					required : "Please enter Email",
		
				},
				password  : {		
					required : "Please enter password",
					minlength : "Please enter atleast 2 characters",
		
				},
				confPassword  : {		
					required : "Please enter confirm password",
					minlength : "Please enter atleast 2 characters",
		
				},
				Title  : {		
					required : "Please enter Drawing title",
					minlength : "Please enter atleast 2 characters",
		
				}
		       },
		       
		       onfocusin : function(element) {
					
					// display hint messages when an element got focus 
					if (!$(element).parent('div').prev("div")
							.hasClass('success')) {
						
			    		 var label = this.errorsFor(element);
			    		 
			    		 if( $( label ).attr('hasError')  )
			    	     {
			    			 if($( label ).attr('remote-validated') != "true")
			    			 	{
									this.showLabel(element, focusRules[element.name]);
									
									$(element).parent('div').removeClass(
													this.settings.errorClass)
											.removeClass(
													this.settings.validClass)
											.prev("div")
											.addClass('focus')
											.removeClass(
													this.settings.errorClass)
											.removeClass(
													this.settings.validClass);
			    			 	}
			    			 
			    	     } else {
			    	    	 
							this.showLabel(element, focusRules[element.name]);
							
							$(element).parent('div').removeClass(
											this.settings.errorClass)
									.removeClass(
											this.settings.validClass)
									.prev("div")
									.addClass('focus')
									.removeClass(
											this.settings.errorClass)
									.removeClass(
											this.settings.validClass);
			    	     }
					}
				},

				highlight : function(element,
						errorClass, validClass) {

					// highlight borders in case of error  
					$(element).parent('div')
							.removeClass(validClass)
							.addClass(errorClass).prev(
									"div").removeClass(
									validClass)
							.addClass(errorClass);

					$('span.help-inline', $(element).parent('div')
									.prev('div')).removeClass(validClass) ;
									
				},
				unhighlight : function(element,
						errorClass, validClass) {
					
					// check for ignored elemnets and highlight borders when succeed
					if(! $(element).hasClass("ignore")) {
						
						$(element).parent('div')
								.removeClass(errorClass)
								.addClass(validClass).prev(
										"div").addClass(
										validClass)
								.removeClass(errorClass);
						$(
								'span.help-inline',
								$(element).parent('div')
										.prev('div')).text(
							validRules[element.name]) ;
					} else
					{
						
						// check to display errors for ignored elements or not 
						
						var showError = false ;
						
						// 
						switch( element.nodeName.toLowerCase() ) {
						case 'input':
							if ( this.checkable(element) ) {
								
								showError = this.getLength(element.value, element) > 0;
								
							} else if($.trim(element.value).length > 0) {
								
									showError =  true ;
									
								} else {
									
									showError = false ;
								}
									
							break ; 
						default:
							var val = $(element).val();
							showError =  $.trim(val).length > 0;
						}
						
						
						if(! showError )
						{
							// hide errors message and remove highlighted borders 
								$(
										'span.help-inline',
										$(element).parent('div')
										.prev('div')).hide();
								
									$(element).parent('div')
									.removeClass(errorClass)
									.removeClass(validClass)
									.prev("div")
									.removeClass(errorClass)
									.removeClass(validClass) ;
						}
						else
						{
							// show errors message and  highlight borders 
							
							// display green border and message 
							//if ignore element type is not file
						  
							if(element.type !== "file")
							{
								
								$(element).parent('div')
								.removeClass(errorClass)
								.addClass(validClass).prev(
										"div").addClass(
										validClass)
								.removeClass(errorClass);
								
								$('span.help-inline', $(element).parent('div')
												.prev('div')).text(
									 validRules[element.name] ).show();
							} 
							else
							{
								
							
								$(element).parent('div')
								.removeClass(errorClass)
								.removeClass(validClass)
								.removeClass("focus")
								.prev("div")
								.removeClass("focus")
								.removeClass(errorClass)
								.removeClass(validClass) ;
								
							}
						}
						
					} 

				},
				success: function(label , element) {
					
					$(element).parent('div')
					.removeClass(this.errorClass)
					.addClass(this.validClass).prev(
							"div").addClass(
									this.validClass)
					.removeClass(this.errorClass)
					.removeClass("focus");
				    $(label).append( validRules[element.name] ) ;
				    label.addClass('valid') ;
				    
				}

			});
}

function resetBorders(el)
{
	$(el).each(function(i,o){
	 $(o).parent('div')
		.removeClass("error success")
		.prev("div").removeClass('focus error success') ;
	
	});
}

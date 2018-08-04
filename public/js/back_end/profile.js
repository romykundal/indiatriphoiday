
function checkFileType(e)
{
	
	var el = e.target  ? e.target :  e.srcElement ;
	 var cls = '';
	if(parseInt($('input#editUserroleId').val()) > 0 )
	{
		cls = 'marginForError';
      
	}
	
	 var regex = /png|jpg|jpeg|gif/ ;
	 if( regex.test(el.value) )
	 {
		 
		 invalidForm[el.name] = false ;
		 		 
		 $(el).parents("div.mainpage-content-right").addClass('success')
		 .children("div.mainpage-content-right-inner-right-other").removeClass("focus")
		 .html("<span class='" + cls +" success help-inline'>Valid file</span>");
		 
	 } else {
		
		
		 $(el).parents("div.mainpage-content-right").addClass('error').removeClass('success')
		 .children("div.mainpage-content-right-inner-right-other").removeClass("focus")
		 .html("<span class='" + cls + " error help-inline'>Please upload valid file</span>");
		 
		 invalidForm[el.name] = true ;
		 errorBy = el.name ;
	 }
	 
	 return invalidForm[el.name];
	 
}

var locale = {
	    "fileupload": {
	        "errors": {
	        	"maxFileSize": "Maximum image size is 2MB",
	            "minFileSize": "File is too small",
	            "acceptFileTypes": "Please upload the valid file",
	            "maxNumberOfFiles": "Max number of files exceeded",
	            "uploadedBytes": "Uploaded bytes exceed file size",
	            "emptyResult": "Empty file upload result"
	        },
	        "error": "Error",
	        "start": "Start",
	        "cancel": "Cancel",
	        "destroy": "Delete"
	    }
	};




/**
 * validRules oject contain all the messages that are visible when an elment
 * val;ue is valid
 * 
 * structure to define a message for element key is to be element name Value is
 * message
 */
var validRules = {

	firstName : "First name looks great",
	email : "Email looks great",
	lastName : "Last name looks great",
	confirmNewPassword : "Password matched" ,
	newPassword : "ok!good Password",
	oldPassword : "Old Password Matched!",
	
	imageName:"Upload only jpg. or gif",
};


/**
 * focusRules oject contain all the messages that are visible on focus of an
 * elelement
 * structure to define a message for element key is to be element name Value is
 * message
 */
var focusRules = {

	firstName : "Enter your first name",
	email : "What &#39;s your Email address?",
	lastName : "Enter your last name.",
	oldPassword : "Enter Old Password to update Password",
	newPassword : "Choose New Password",
	confirmNewPassword : "Re-type New Password"

};


/**
 * locale holds all errors message for avtar uploading
 
 */




$(document).ready(init);



// used to buffer profile image
__pImg = new Image();
__pImg.src =  HOST_PATH_PUBLIC + "/images/back_end/user-avtar.jpg";



/**
 * initialize all the settings after document is ready
 * @author spsingh
 */

function init()
{
	
	$("input[type=password" , "form#userProfile").addClass("passwordField");
	
	
	$('.cancelButton').on('click', function(evt) {
		
		
		window.location.href = HOST_PATH + "admin/user/profile" ;
		
    });

	$("form#userProfile").submit(function(){
		
		
		
		if (! jQuery.isEmptyObject(invalidForm) ) 
			
			for(var i in invalidForm)
			{
				if(invalidForm[i])
				{
				
					return false ;
				}
				
			}
		
		
	});
	
	// validate user profile data
	validateUserProfile() ;
	
 }



/**
 * update user profile
 * 
 */



// global validation object  
var validator = null; 

/**
 * form validation during update user 
 * 
 */

function validateUserProfile()
{
	validator  = $("form#userProfile")
	.validate(
			{
				errorClass : 'error',
				validClass : 'success',
				errorElement : 'span',
				afterReset  : resetBorders,
				errorPlacement : function(error, element) {
					element.parent("div").prev("div")
							.html(error);
				},
				rules : {
					firstName : {
						required : true,
						minlength : 2,
						regex : /^[a-zA-Z\-]+$/
						//regex  :	 /^[a-zA-Z]+[\s]{1}[a-zA-Z]$|^[a-zA-Z]+[\.]{1}[\s]{1}[a-zA-Z]$/g
					},
					lastName : {
						required : true,
						minlength : 2,
						regex : /^[a-zA-Z\-]+$/
					},
					newPassword : {
						required : function(element)
						{
							// if condition true and apply required validation for element
							
							if($("input#oldPassword" , "form#userProfile").val().length > 0)
							{
								return true ;
								
							} else if ($("input#confirmNewPassword" , "form#userProfile").val().length > 0)
							{
								return true ;
									
							} else {
								
								
								//	Hide error message for new password feild and confirm password feild  
								
								
								$('span.help-inline' , $("[name=newPassword]")
										.parents('div.mainpage-content-right') ).hide();
						
								$('span.help-inline' , $("[name=confirmNewPassword]")
										.parents('div.mainpage-content-right') ).hide();
								
								
								$("input#newPassword" , "form#userProfile")
								.parents("div.mainpage-content-line")
								.find(".error,.success")
								.removeClass("error success");
								
								$("input#confirmNewPassword" , "form#userProfile")
									.parents("div.mainpage-content-line")
									.find(".error,.success")
									.removeClass("error success");
								
								
								// check if element not filled , then hide validation message for old password feild
								 if ( $(element).val().length == 0 ) 
								 {
										$('span.help-inline' , $("[name=oldPassword]")
											.parents('div.mainpage-content-right') ).hide();
		
										$("input#oldPassword" , "form#userProfile")
										.parents("div.mainpage-content-line")
										.find(".error,.success")
										.removeClass("error success");
								}
										


								return false ;
							}
						},
						minlength : 8,
						maxlength : 20
					},
					confirmNewPassword : {
						required: function(element)
						{
							// if condition true and apply required validation for element
							
							
							
							
							
							if($("input#oldPassword" , "form#userProfile").val().length > 0)
							{
								return true ;
								
							} else if ($("input#newPassword" , "form#userProfile").val().length > 0)
							{
								return true ;
								
							
									
							} else {
								
								
								
								
								//	hide error message for confirm password  feild
								
								$('span.help-inline' , $("[name=confirmNewPassword]")
										.parents('div.mainpage-content-right') ).hide();
								
								$("input#confirmNewPassword" , "form#userProfile")
								.parents("div.mainpage-content-line")
								.find(".error,.success")
								.removeClass("error success");
								
								
								/**
								 * check if element not filled , then hide validation message for old password feild
								 * as well as new password feild
								 */
 
								
								 if ( $(element).val().length == 0) 
								 {
										$('span.help-inline' , $("[name=newPassword]")
												.parents('div.mainpage-content-right') ).hide();

										$('span.help-inline' , $("[name=oldPassword]")
												.parents('div.mainpage-content-right') ).hide();
										
										
										$("input#newPassword" , "form#userProfile")
										.parents("div.mainpage-content-line")
										.find(".error,.success")
										.removeClass("error success");
										
										
										 $("input#oldPassword" , "form#userProfile")
										 .parents("div.mainpage-content-line")
										 .find(".error,.success")
										 .removeClass("error success");
								}
								 
								
								


								return false ;
								
								
							}
						},
						equalTo :	"#newPassword",
						minlength : 8,
						maxlength : 20
					},
					oldPassword : {
						required: function(element)
						{
							// if condition true and apply required validation for element
							
							if($("input#newPassword" , "form#userProfile").val().length > 0)
							{
								return true ;
								
							} else if ($("input#confirmNewPassword" , "form#userProfile").val().length > 0)
							{
								return true ;
								
							} else {
								
								/**
								 * Hide validation message for old password feild , new password feild
								 * and  old password feild
								 */
								
								$('span.help-inline' , $("[name=oldPassword]")
										.parents('div.mainpage-content-right') ).hide();
								
								$('span.help-inline' , $("[name=newPassword]")
										.parents('div.mainpage-content-right') ).hide();
								
								$('span.help-inline' , $("[name=confirmNewPassword]")
										.parents('div.mainpage-content-right') ).hide();


								$("input#oldPassword" , "form#userProfile")
								.parents("div.mainpage-content-line")
								.find(".error,.success")
								.removeClass("error success");
								
								
								$("input#newPassword" , "form#userProfile")
									.parents("div.mainpage-content-line")
									.find(".error,.success")
									.removeClass("error success");
								
								$("input#confirmNewPassword" , "form#userProfile")
									.parents("div.mainpage-content-line")
									.find(".error,.success")
									.removeClass("error success");
								
								return false ;
							}
						},
						minlength : 8,
						maxlength : 20,
						remote : {
							url: HOST_PATH + "admin/user/validatepassword",
				        	type: "post" ,
				        	data : { 
				        			id : $("input#id").val()  
				        			}
								,
				        	async: false,
				        	dataType : "JSON",
				        	beforeSend  : function ( xhr ) {
				        	    
				        		$('span[for=oldPassword]').html('please wait..').addClass('validating').show()
				        		.parent('div').attr('class' , 'mainpage-content-right-inner-right-other focus') ;
				        	  },
				        	complete : function(e) {
				        		
			        			$('span.help-inline' , $("[name=oldPassword]").parents('div.mainpage-content-right') ).removeClass('validating') ;
				        		
				        		if(e.responseText == "true")
				        		{
				        			$("[name=oldPassword]").parent('div').prev("div").removeClass('focus')
				        			.removeClass('error').addClass('success');
				        			
				        			$('span.help-inline' , $("[name=oldPassword]").parents('div.mainpage-content-right') )
				        				.html(validRules['oldPassword'])
				        				.attr('remote-validated' , true);
				        		} else
				        		{
				        			$('span.help-inline' , $("[name=oldPassword]").parents('div.mainpage-content-right') )
			        				.attr('remote-validated' , false);
				        			
				        			
				        			
				        		}
				        	}
						},						

					},
				},
				messages : {
					firstName : {
						required : "Please Enter Your First Name",
						regex : "First Name Should be Alphabets" ,
						minlength : "Please Enter Minimum 2 characters",

					},
					lastName : {
						required : "Please Enter Your last name",
						regex : "Last Name Should be Alphabets",
						minlength : "Please Enter Minimum 2 characters",
					},
					oldPassword : {
						minlength : "Old Password Don't matched",
						remote : "Old Password Don't matched",
						maxLength : "Please Enter Maximum 20 characters"
					},
					newPassword : {
						required : "Please Enter Your new Password",
						minlength : "Please Enter Minimum 8 characters",
						maxLength : "Please Enter Maximum 20 characters"
					},
					confirmNewPassword : {
						equalTo : "Please Enter the Same Value again",
						minlength : "Please Enter Minimum 8 characters",
						required : "Please re-type Your New Password",
						maxLength : "Please Enter Maximum 20 characters"
							
					}

				},

				onfocusin : function(element) {
					if (!$(element).parent('div').prev("div")
							.hasClass('success')) {
						
						
						
			    		 var label = this.errorsFor(element);
			    		 if( $( label).attr('hasError')  )
			    	     {
			    			 if($( label).attr('remote-validated') != "true")
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

					$(element).parent('div')
							.removeClass(validClass)
							.addClass(errorClass).prev(
									"div").removeClass(
									validClass)
							.addClass(errorClass);

				},
				unhighlight : function(element,
						errorClass, validClass) {
					
					if(! $(element).hasClass("passwordField"))
					{
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
								validRules[element.name]);
					}
				},
				success: function(label , element) {
					
					$(element).parent('div')
					.removeClass(this.errorClass)
					.addClass(this.validClass).prev(
							"div").addClass(
									this.validClass)
					.removeClass(this.errorClass);
					
				    $(label).append( validRules[element.name] ) ;
				    label.addClass('valid') ;
				    
				}

			});

 }


var invalidForm = {} ;


//used to validate upload logo type
function checkFileType(e)
{
	
		
		 var el = e.target  ? e.target :  e.srcElement ;
		 
		 var regex = /jpg|jpeg/ ;
		
		 if( regex.test(el.value) )
		 {
			 invalidForm[el.name] = false ;
			 		 
			 $(el).parent("div").removeClass("focus")
			 .removeClass("error").addClass("success")
			 .prev("div.mainpage-content-right-inner-right-other").removeClass("focus")
			 .removeClass("error").addClass("success")
			 .html("<span class='success help-inline'>Valid file</span>");
			 
		 } else {
			
			 $(el).parent("div").removeClass("focus").removeClass("success")
			 .addClass("error")
			 .prev("div.mainpage-content-right-inner-right-other")
			 .removeClass("focus").removeClass("success")
			 .addClass("error")
			 .html("<span class='error '>Please upload only .jpg or .png file</span>");
			 
			 invalidForm[el.name] = true ;
			 errorBy = el.name ;
			 
		}
	 
	 
}


/**
 * reset the validation border of the input filed
 * 
 * 
 */

function resetBorders(el)
{
	$(el).each(function(i,o){
		
		$(o).parent('div')
		.removeClass("error success")
		.prev("div").removeClass('focus error success') ;
	
	});
	
 }

$.validator.setDefaults({
	onkeyup : false,
	onfocusout : function(element) {
		$(element).valid();
	}

 });

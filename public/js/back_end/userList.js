var filter = "";
var userList = $('#userList').dataTable();
var _websiteAccess = null;
var _roles =null;
var _availableTags = null;
/**
 * validRules oject contain all the messages that are visible when an elment
 * val;ue is valid
 * structure to define a message for element key is to be element name Value is
 * message ddd
 */
var imageCount = 0;
function AddFile()
{
	++imageCount;
	var div = document.createElement('DIV');
	div.innerHTML ='<input id="image[]" name="image[]" type="file" /> <a  onclick="RemoveFile(this);"> Remove </a> ';
	//div.innerHTML ='<tr><td height="40" align="right"><h5>Image /h5></td><td height="40">&nbsp;</td><td height="40" align="left"><label><input id="image[]" name="image[]" type="file" /> <a  onclick="RemoveFile(this);"> Remove </a> </label></td></tr>';  
	document.getElementById("divFile").appendChild(div);
		if(imageCount==MaxImage){
		   $('#uploadMoreImages').hide(); 
		}

}

function RemoveFile(file)
{
		--imageCount;
		//alert("Do you want to remove this picture");
		document.getElementById("divFile").removeChild(file.parentNode);
		 $('#uploadMoreImages').show(); 
}

var validRules = {

		Title : "Enter your Title name",
		Price : "Enter Price",
	
		Address : "Address looks great",
		ZipCode : "Zip Code looks great",

		imageName:"Upload your profile picture"
};
/**
 * focusRules oject contain all the messages that are visible on focus of an
 * elelement
 * structure to define a message for element key is to be element name Value is
 * message
 */
var focusRules = {

		Title : "Enter your Title name",
		Price : "Enter Price",
	
		Address : "Address looks great",
		ZipCode : "Zip Code looks great",

		imageName:"Upload your profile picture"

};
var validatorAddUser = null;
$(document).ready(function() {
	 				$(":input").attr("autocomplete","off");
					//Get Role for Filter
					//auto complete
					//if press enter key the call search offer function
					$("input#tags").keypress(function(e)
					{
					   // if the key pressed is the enter key
						if (e.which == 13)
						{
							getUserList($("input#tags").val());
					    }
					});
					$("#tags").autocomplete({
                    minLength: 1,
                    source: function( request, response)
                    {
                    	$.ajax({
                 			url : HOST_PATH + "admin/user/gettopfive/for/0/text/" + $('#tags').val(),
                 			method : "post",
                 			dataType : "json",
                 			type : "post",
                 			success : function(data) {
                 				
                 				
                 				if (data != null) {
                 					//pass arrau of the respone in respone onject of the autocomplete
                 					response(data);
                 					
                 				} 
                 				
                 			},
                 			error: function(message) {
                 	            // pass an empty array to close the menu if it was initially opened
                 	            response([]);
                 	        }

                 		 });
                    },
                    select: function( event, ui ) {
                    }
                });
			    //function call when 
				$(".multiselect").multiselect();
				initializeSettingForEdit();
				// validate form ss
					validateFormAddNewUser();
						
						getUserList(undefined);
						//getWebsite();//getwebsite of logged user	
						
						//add code by kuldeep according to new changes in user module 
						//$('#deleteOne').click(deleteOne);
						//$('#addNewStore').click(addNewStore);
						//auto complete for shop search from database and get to ten best search store
						//var shopIds=[];
						
						$("#searchShopText").autocomplete({
					        minLength: 1,
					        source: function( request, response)
					        {
					        	$.ajax({
					        		url : HOST_PATH + "admin/user/searchtoptenshop/keyword/" + $('#searchShopText').val() + "/selectedShop/" + $('input#fevoriteStore').val(),
					     			method : "post",
					     			dataType : "json",
					     			type : "post",
					     			success : function(data) {
					     			btnSelectionAddNew();
					     			if (data != null) {
					     					
					     					//pass arrau of the respone in respone onject of the autocomplete
					     					response(data);
					     				} 
					     			},
					     			error: function(message) {
					     	            // pass an empty array to close the menu if it was initially opened
					     	            response([]);
					     	        }

					     		 });
					        },
					        select: function(event, ui ) {
					        	
					        	$('input#selectedShopId').val(ui.item.id);
					        	//$("#searchShopText").val(ui.item.label);
					        	//console.log(ui.item.id);
					        	
					        }
					       
					    }); 
						//code for selection of li
						//$('ul#favoriteStore li').click(changeSelectedClass);

						//end code 	
						
						//VALIDATION MESSAE DISPLAY OR NOT

						$("form").submit(function(){
							if (! jQuery.isEmptyObject(invalidForm) ) 
								
								for(var i in invalidForm)
								{
									if(invalidForm[i])
									{
										$("button#saveRegion").removeAttr('disabled');
										return false;
									}else {
										
										
									}
									
								}
						});
						$('form#addRegions').submit(function(){
							
							saveRegion();
							
						});
						
				});

$.validator.setDefaults({
	onkeyup : false,
	onfocusout : function(element) {
		$(element).valid();
	}

});
function saveRegion()
{
	if($("form#addRegions").valid())
	{
		$("button#saveRegion").attr('disabled' , 'disabled') ;
		return true;
		
	}else {
			
		return false;
	}
}
var invalidForm = {} ;
var errorBy = "" ;
//used to validate upload logo type
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
}
/**
 * check form i valid or not
 * @author kraj
 */
function validateFormAddNewUser()
{
	validatorAddUser  = $("form#addRegions")
	.validate(
			{
				errorClass : 'error',
				validClass : 'success',
				errorElement : 'span',
				afterReset  : resetBorders,
				errorPlacement : function(error,
						element) {

					element.parent("div").prev("div")
							.html(error);
				},
				rules : {
					email : {
						required : true,
						minlength : 6,
						email : true,
						remote : {
							url : HOST_PATH
									+ "admin/user/checkuser",
							type : "post",
							beforeSend : function(xhr) {

								$('span[for=email]')
										.html(
												'Validating...')
										.addClass(
												'validating')
										.parent('div')
										.addClass(
												'focus')
										.next('div')
										.addClass(
												'focus');
								;

							},

							complete : function(data) {
								$('span[for=email]')
										.removeClass(
												'validating');
								if (data.responseText == 'true') {
									$('span[for=email]')
											.html(
													'Valid Email')
											.parent(
													'div')
											.removeClass(
													'error')
											.addClass(
													'success')
											.prev("div")
											.removeClass(
													'error')
											.addClass(
													'success');
								} else {
                                   
									$('span[for=email]')
											.parent(
													'div')
											.removeClass(
													'success')
											.addClass(
													'error')
											.prev("div")
											.removeClass(
													'success')
											.addClass(
													'error');
								}

							}
						}
					},

					Title : {
						required : true,
						
					},
					Price : {
						required : true,
						
					},
					
					Address:{
						required: true,
					},
					Description:{
						required: true,
							
					},

				},
				messages : {
					Title : {
						required : "Please enter Title",
						minlength:"Please enter valid Title",
						
					},
					Price : {
						required : "Please enter Price",
						

					},
				Address:{
						
						required:"Please enter Address"
					},
					Description:{
						 
						required:"Please enter Description "
					},
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
						case 'select' :
							
							var val = $(element).val();
							
							if($($(element).children(':selected')).attr('default') == undefined)
							{
								showError = true ;
							} else
							{
								showError  = false;
							}
							break ; 
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
						} else
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
							} else
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
/**
 * show div according to slected div
 * @param divId
 */
function showDivByHashing(divId) {

	$("#" + divId).removeClass("display-none").siblings().addClass(
			"display-none");
}
/**
 * cod for website multiselect 
 * admin can select website without control
 * @author kraj
 */ 
jQuery.fn.multiselect = function() {
	
	$(this).each(function() {
		var checkboxes = $(this).find("input:checkbox");
		checkboxes.each(function() {
			var checkbox = $(this);
			// Highlight pre-selected checkboxes
			if (checkbox.attr("checked"))
				checkbox.parent().addClass("multiselect-on");

			// Highlight checkboxes that the user selects
			checkbox.click(function() {
				if (checkbox.attr("checked"))
					checkbox.parent().addClass("multiselect-on");
				else
					checkbox.parent().removeClass("multiselect-on");
			});
		});
	});
};



/**
 * Convert First character of the user in Capital letter
 * @author kraj
 */
function ucfirst(str) {
	var firstLetter = str.substr(0, 1);
	return firstLetter.toUpperCase() + str.substr(1);
}
/**
 * Get user list from database and show in dataTable
 * @author kraj
 */
function getUserList(searchtext) {
	//addOverLay();
    $("ul.ui-autocomplete").css('display','none');
	if(searchtext==undefined)
	{
		$('input[name=search]').val('');
	}
	$('#userList').addClass('widthTB');
	userList = $("#userList")
			.dataTable(
					{
					
						"bLengthChange" : false,
						"bInfo" : false,
						"bFilter" : true,
						"bDestroy" : true,
						"bProcessing" : false,
						"bServerSide" : true,
						"iDisplayLength" : 10,
						"aaSorting": [[ 1, 'ASC' ]], 
						"sPaginationType" : "bootstrap",
						"sAjaxSource" : HOST_PATH + "admin/user/getuserlist/searchtext/" + searchtext,
						"aoColumns" : [
							{
								"fnRender" : function(obj) {
							         var id=null;
									return id = obj.aData.id;
						
								},
								"bVisible":    false ,
								"bSortable" : false,
								"sType": 'numeric'
								
							},
							{
								"fnRender" : function(obj) {
									
									
									return obj.aData.firstName;
								},
								
								"bSortable" : true

							},
								
							{
								"fnRender" : function(obj) {

									return email = "<span class='word-wrap-email'>" + obj.aData.email + "</span>" ;

								},
								
								"bSortable" : true
							},
							{
								"fnRender" : function(obj) {

									return obj.aData.phonenumber ;

								},
								
								"bSortable" : true
							},
							{
								"fnRender" : function(obj) {
									
								var	onLine = 'btn-primary';
								var	offLine = '';
								if(!parseInt(obj.aData.status)){
									var	onLine = '';
									var	offLine = 'btn-primary'	;
								}	
									var html = "<div editId='" + obj.aData.id + "' class='btn-group' data-toggle='buttons-checkbox'>"
											+ "<button class='btn "+ onLine +"' onClick='changeStatus("+ obj.aData.id+",this,\"online\")'>Yes</button>"
											+ "<button class='btn "+ offLine +"'onClick='changeStatus("+ obj.aData.id+",this,\"offline\")'>No</button>"
                                            + "</div>";
                                    
									return html;
								},
								
								"bSearchable" : false,
								"bSortable" : false,
							},
							
							{
								"fnRender" : function(obj) {

									  var del = "<a href='javascript:void(0);' id='delete' onClick='deleteUserr(" + obj.aData. id +");' >Delete</a>";
                                      return  del;

								},
								"bSearchable" : false,
								"bSortable" : false

							} 
						
							],
						"fnInitComplete" : function(obj) {
							$('td.dataTables_empty').html('No record found !');
							$('td.dataTables_empty').unbind('click');
							$("form#addRegions").each(function() { this.reset(); });
							//removeOverLay();
						},
						 "fnDrawCallback": function() {
							
							
							 /*$("tbody" , this).find('tr').each(function () {
							        //var $tr = $(this);
							        //$tr.find('td').each(function() {
							        	//$(this).bind('click',callToEdit);
							        	//$(this).css( 'cursor', 'pointer' );
							        	
							       // });
							       });*/
							 window.scrollTo(0, 0);
						 },
						"fnServerData" : function(sSource, aoData, fnCallback) {
							$('#userList tr:gt(0)').remove();
							$.ajax({
								"dataType" : 'json',
								"type" : "POST",
								"url" : sSource,
								"data" : aoData,
								"success" : fnCallback
							});
						}
						
						
					});
}


/**
 * Fetch editable record information and file in form
 * @author spsingh
 */
function callToEdit()
{
	var id =  $(this).children('td').children('div.grid-img').attr('editId');
	 
	document.location.href =  HOST_PATH+"admin/user/edituser/id/" + id ;
	
}

/**
 *  initiallize sttings for update user
 *  @author spsingh
 */
function initializeSettingForEdit()
{
	// validations 
	validateFormEditUser() ;
	
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
 * set website in website select 
 * @param websites
 * @author spsingh
 */

function highlightExistingWebsites(websites)
{
	if(websites){
		websites = websites.split(',');
		
		for(i in websites)
		{
			$("li.list_" + websites[i]).addClass('selected').children('input').attr('checked' , 'checked');
		}
   }	
}

// global validation object  
var validator; 

/**
 * form validation during update user 
 * @author spsingh
 */
function validateFormEditUser()
{
	
	validator  = $("form#editRegister")
	.validate(
			{
				errorClass : 'error',
				validClass : 'success',
				errorElement : 'span',
				afterReset  : resetBorders ,
				errorPlacement : function(error, element) {
					element.parent("div").prev("div")
							.html(error);
				},
				rules : {
					firstName : {
						required : true,
						regex : /^[a-zA-Z \-]+$/
					},
					lastName : {
						required : true,
						regex : /^[a-zA-Z \-]+$/
					},
					newPassword : {
						required : function(element)
						{
							// if condition true and apply required validation for element
							
							if($("input#oldPassword" , "form#editRegister").val().length > 0)
							{
								return true ;
								
							} else if ($("input#confirmNewPassword" , "form#editRegister").val().length > 0)
							{
								return true ;
									
							} else {
								
								
								//	Hide error message for new password feild and confirm password feild  
								
								
								$('span.help-inline' , $("[name=newPassword]")
										.parents('div.mainpage-content-right') ).hide();
						
								$('span.help-inline' , $("[name=confirmNewPassword]")
										.parents('div.mainpage-content-right') ).hide();
								
								
								$("input#newPassword" , "form#editRegister")
								.parents("div.mainpage-content-line")
								.find(".error,.success")
								.removeClass("error success");
								
								$("input#confirmNewPassword" , "form#editRegister")
									.parents("div.mainpage-content-line")
									.find(".error,.success")
									.removeClass("error success");
								
								
								// check if element not filled , then hide validation message for old password feild
								 if ( $(element).val().length == 0 ) 
								 {
										$('span.help-inline' , $("[name=oldPassword]")
											.parents('div.mainpage-content-right') ).hide();
		
										$("input#oldPassword" , "form#editRegister")
										.parents("div.mainpage-content-line")
										.find(".error,.success")
										.removeClass("error success");
								}
										


								return false ;
							}
						},
						minlength : 8,
						maxlength:20
					},
					confirmNewPassword : {
						required: function(element)
						{
							// if condition true and apply required validation for element
							
							if($("input#oldPassword" , "form#editRegister").val().length > 0)
							{
								return true ;
								
							} else if ($("input#newPassword" , "form#editRegister").val().length > 0)
							{
								return true ;
								
							
									
							} else {
								
								
								
								
								//	hide error message for confirm password  feild
								
								$('span.help-inline' , $("[name=confirmNewPassword]")
										.parents('div.mainpage-content-right') ).hide();
								
								$("input#confirmNewPassword" , "form#editRegister")
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
										
										
										$("input#newPassword" , "form#editRegister")
										.parents("div.mainpage-content-line")
										.find(".error,.success")
										.removeClass("error success");
										
										
										 $("input#oldPassword" , "form#editRegister")
										 .parents("div.mainpage-content-line")
										 .find(".error,.success")
										 .removeClass("error success");
								}
								 
								
								


								return false ;
								
								
							}
						},
						equalTo :	"#newPassword",
						minlength : 8,
						maxlength:20
					},
					oldPassword : {
						required: function(element)
						{
							// if condition true and apply required validation for element
							
							if($("input#newPassword" , "form#editRegister").val().length > 0)
							{
								return true ;
								
							} else if ($("input#confirmNewPassword" , "form#editRegister").val().length > 0)
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


								$("input#oldPassword" , "form#editRegister")
								.parents("div.mainpage-content-line")
								.find(".error,.success")
								.removeClass("error success");
								
								
								$("input#newPassword" , "form#editRegister")
									.parents("div.mainpage-content-line")
									.find(".error,.success")
									.removeClass("error success");
								
								$("input#confirmNewPassword" , "form#editRegister")
									.parents("div.mainpage-content-line")
									.find(".error,.success")
									.removeClass("error success");
								
								return false ;
							}
						},
						minlength : 8,
						maxlength:20,
						remote : {
							url: HOST_PATH + "admin/user/validatepassword",
				        	type: "post" ,
				        	data : { id : $("input#id" , "form#editRegister").val()  } ,
				        	async: false,
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
					google:{
						
						regex: /^(?:(ftp|http|https):\/\/)?(?:[\w-]+\.)?plus.google.com/
						//regex  : /^(?:(ftp|http|https):\/\/)?(?:[\w-]+\.)+[a-z]{3,6}$/
							
					},
					twitter:{
						regex: /^(?:(ftp|http|https):\/\/)?(?:[\w-]+\.)?twitter.com/
						//regex  : /^(?:(ftp|http|https):\/\/)?(?:[\w-]+\.)+[a-z]{3,6}$/
							
					},
					pintrest:{
						regex: /^(?:(ftp|http|https):\/\/)?(?:[\w-]+\.)?pinterest.com/
						//regex  : /^(?:(ftp|http|https):\/\/)?(?:[\w-]+\.)+[a-z]{3,6}$/
							
					},
				},
				messages : {
					email : {
						required : "Please enter your email address",
						email : "Please enter valid email address"
					},
					firstName : {
						required : "Please enter your first name",
						regex : "First Name should be Alphabets"

					},
					lastName : {
						required : "Please enter your last name",
						regex : "Last Name should be Alphabets"
					},
					oldPassword : {
						required : "Please enter your old password",
						minlength : "It should be minimum 8 characters",
						remote : "Old password don't matched",
						maxlength : "Please enter maximum 20  characters"
					},
					newPassword : {
						required : "Please enter your new password",
						minlength : "Please enter minimum 8 characters",
						maxlength : "Please enter maximum 20  characters"
					},
					confirmNewPassword : {
						equalTo : "Please enter same as new password",
						minlength : "Please enter minimum 8 characters",
						required : "Please re-type your new password",
						maxlength : "Please enter maximum 20  characters"
							
					},
					twitter:{
						
						regex:"Please enter the valid twitter URL"
					},
					google:{
						
						regex:"Please enter the valid google+ URL"
					},
					pintrest:{
						
						regex:"Please enter the valid pinterest URL"
					},

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
									if( element.type=='file')
									{
										$(element).parent('div')
										.siblings('div.mainpage-content-right-inner-right-other')
										.children('span.help-inline').addClass('marginForError');
									}
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
						if($(element).val().length > 0) 
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
							validRules[element.name]) ;
						
							
						} else {
							
						$(element).parent('div')
								.removeClass(errorClass).removeClass(validClass)
								.addClass('focus').prev("div").addClass('focus').removeClass(validClass)
								.removeClass(errorClass);
								$('span.help-inline',$(element).parent('div').prev('div')).text(
							validRules[element.name]) ;
						}
					} else
					{
						
						// check to display errors for ignored elements or not 
						
						var showError = false ;
						
						// 
						switch( element.nodeName.toLowerCase() ) {
						case 'select' :
							
							var val = $(element).val();
							
							if($($(element).children(':selected')).attr('default') == undefined)
							{
								showError = true ;
							} else
							{
								showError  = false;
							}
							break ; 
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
						} else
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
							} else
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
/**
 * set hasing of the user panle
 * @author spsingh
 */
function hashUserList()
{
	$("div.web-address-list li.selected").removeClass('selected').children('input').removeAttr('checked');
	$("form").each(function() { this.reset(); }); 
	
	$("input[type=password" , "form#editRegister").addClass("passwordField");
}

/**
 * reset the validation border of imput field
 * @param el
 * @author spsingh
 */
function resetBorders(el)
{
	
	
	$(el).each(function(i,o){
		
		$(o).parent('div')
		.removeClass("error").removeClass('success')
		.prev("div").removeClass('focus').removeClass('error').removeClass('success') ;
	
	});
	

}

/**
 * delete store from list
 * @author kraj
 * @version 1.0
 */
function changeStatus(id,obj,status){
	 
    addOverLay();
	 $(obj).addClass("btn-primary").siblings().removeClass("btn-primary");
	 $.ajax({
			type : "POST",
			url : HOST_PATH+"admin/user/userstatus",
			data : "id="+id+"&status="+status
		}).done(function(msg) {
			removeOverLay();	
	}); 

}
/**
 * Checks With confirm box,whether permanently delete or not 
 * @param id
 * @author mkaur
 */
function deleteUserr(id) {
	bootbox.confirm('Are you sure you want to delete this record?', function(r){
		if(!r){
			return false;
		}
		else{
			deleteUser(id);
		}
	});
}
/**
 * Permanent delete user through usercontroller.
 * @param id
 * @author mkaur
 */
function deleteUser(id) {
	addOverLay();
	$.ajax({
		url : HOST_PATH + "admin/user/deleteUser",
		method : "post",
		data : {
			'id' : id
		},
		dataType : "json",
		type : "post",
		success : function(data) {
			if (data != null) {
				window.location.href = 	HOST_PATH + "admin/user/";
				//alert('Record has been deleted');

			} else {

				bootbox.alert('Problem in your data');
			}
			//getUserListFromTrash();
		}
	});
	
}





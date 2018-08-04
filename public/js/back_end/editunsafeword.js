
var wordsListTable = $('#wordsListTable').dataTable();


	
	var validRules = {

		Title : "Look Great",
		Description : "Look Great"
};
/**
 * focusRules oject contain all the messages that are visible on focus of an
 * elelement
 * structure to define a message for element key is to be element name Value is
 * message
 */
var focusRules = {

		Title : "Enter your Title Name",
		Description : "Fill Description "

};
			
		$(document).ready(function(){
			
				validateFormeditWords();
			
				//validateFormAddNewWords();
			$("form").bind("keypress", function(e) {
		          if (e.keyCode == 13) {
		              return false;
		         }
		    });
			
			  $("form#addWords").submit(function(){
				 
				  if($("form#addWords").valid()){
						$('button#saveWords').attr('disabled' ,"disabled");
						return true;
					}else {
						return false;
					}
			  });
			
		});	
			

		/**
		 * 
		 * form validation used for both edit and create FAQ.
		 */	
			
		function validateFormeditWords(){
			
			var badId = $("#badId").val();
			
			validateNewWidget  = $("form#addWords")
			.validate({	
			errorClass : 'error',
			validClass : 'success',
			errorElement : 'span',
			ignore : false,
			errorPlacement : function(error,element) {
					element.parent("div").prev("div").html(error);
						
			},
			rules : {
					Title : {
						required : true,
						regex : /^[A-Za-z ]\w+$/,
						remote : {
							url : HOST_PATH + "admin/unsafewords/checkeditbadword/badId/" + badId,
							type : "post",
							beforeSend : function(xhr) {

								$('span[for=Title]')
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
								$('span[for=Title]')
										.removeClass(
												'validating');
								if (data.responseText == 'true') {
									$('span[for=Title]')
											.html(
													'Valid Bad Word')
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
			                      
									$('span[for=Title]')
										.html('Already used')
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
					
				},
			messages : {
					Title : {
						required : "Please Enter Title",
						regex : "Space and one character not allowed"
						
					},
					
			},
			onfocusin : function(element) {
				if (!$(element).parent('div').hasClass('success')) {
					this.showLabel(element,focusRules[element.name]);
					$(element).parent('div')
					.removeClass(this.settings.errorClass)
					.removeClass(this.settings.validClass)
					.prev("div").addClass('focus').removeClass(this.settings.errorClass)
								.removeClass(this.settings.validClass);
			}
		},

			highlight : function(element,errorClass, validClass) {
			
			$(element)
				.parent('div')
				.removeClass(validClass)
				.addClass(errorClass)
				.prev("div")
					.removeClass(validClass)
					.addClass(errorClass);
			
		},
			unhighlight : function(element,
					errorClass, validClass) {
				$(element).parent('div')
				.removeClass(errorClass)
				.addClass(validClass).prev("div").addClass(validClass)
					.removeClass(errorClass);
				$('span.help-inline',$(element).parent('div')
						.prev('div')).text(
				validRules[element.name]);
				},
			
			});

		}

		
	
		//Edit funtion
	
		function callToEdit(id)
			{
			document.location.href =  HOST_PATH+"admin/unsafewords/editword/id/" + id ;
			
			}

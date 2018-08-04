$(document).ready(function(){
	
	init();
	
	$('form#editDrawingForm').submit(function(){
		updateDrawing();
	});
	
});
function updateDrawing()
{
	if($("form#editDrawingForm").valid())
	{
		return true;
		}else{
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

		categoryName : "Title looks great",
		permaLink : "Valid Url",
		metaTitle : "Meta title looks great",
		metaDescription : "Meta description looks great",
		imageName : "Valid file",
		description  : "Description looks great",
	

};

/**
 * focusRules oject contain all the messages that are visible on focus of an
 * elelement
 * 
 * structure to define a message for element : key is to be element name and Value is
 * message
 */
var focusRules = {

		categoryName : "Please enter category title",
		permaLink : "Please enter valid Url",
		metaTitle : "Please enter meta title",
		metaDescription : "Please enter meta description",
		imageName : "Please upload valid file",
		description : "Please enter description",
};


$(document).ready(init);

  function init()
  {
    //code used for character count
	
	$("form").submit(function(){
		
		if (! jQuery.isEmptyObject(invalidForm) ) 
			
			for(var i in invalidForm)
			{
				if(invalidForm[i])
				{
					return false ;
				}
			}
	});
	//function call to validate edit category
	validateUpdateDrawing();
}
  
  $.validator.setDefaults({
		onkeyup : false,
		onfocusout : function(element) {
			$(element).valid();
		}

});
  
 var validateUpdateDrawingform = null;

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
 
/**
 * validate form while editing category
 * @author blal
 */
function validateUpdateDrawing(){
	validateUpdateDrawingform = $("form#editDrawingForm").validate({
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
			Title: {
						required : true,
						minlength : 2,
						maxlength :50
							
			}
		},
		messages : {
			Title: {		
						required : "Please enter drawing title",
						minlength : "Please enter atleast 2 characters"
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

/**
 * reset the validation border of imput field
 * @param el
 * @author blal
 */
function resetBorders(el)
	{
		$(el).each(function(i,o){
		 $(o).parent('div')
			.removeClass("error success")
			.prev("div").removeClass('focus error success') ;
		
		});
	}
  
  
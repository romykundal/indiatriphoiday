
var productListTable = $('#productListTable').dataTable();


	
	var validRules = {

		category : "Category Looks Great",
		Title : "Title Looks Great",
		Price : "Price Looks Great",
};
/**
 * focusRules oject contain all the messages that are visible on focus of an
 * elelement
 * structure to define a message for element key is to be element name Value is
 * message
 */
var focusRules = {

		category : "Please Select the category!",
		Title : "Please Enter Title",
		Price : "Please enter Price",

};
			
		$(document).ready(function(){
			
				validateFormAddNewWords();
			
			$("form").bind("keypress", function(e) {
		          if (e.keyCode == 13) {
		              return false;
		         }
		    });
			
			  $("form#addProduct").submit(function(){
				 
				  if($("form#addProduct").valid()){
						$('button#saveProducts').attr('disabled' ,"disabled");
						return true;
					} else {
						return false;
					}
			  });
			
		});	
			
		/**
		 * 
		 * form validation used for both edit and create FAQ.
		 */	
			
		function validateFormAddNewWords(){
			
			validateNewWidget  = $("form#addPhoto")
			.validate({	
			errorClass : 'error',
			validClass : 'success',
			errorElement : 'span',
			ignore : false,
			errorPlacement : function(error,element) {
					element.parent("div").prev("div").html(error);
						
			},
			rules : {
				category : {
						required : true,
					},
					Title : {
						required : true,
					},
					Price : {
						required : true,
					}
				},
			messages : {
				category : {
						required : "Please Select the category!",
					},
				Title : {
						required : "Please enter Title",
					},
				Price : {
						required : "Please enter Price",
				}					
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
				}
			
			});

		}

		
		$(document).ready(function() {
			$(":input").attr("autocomplete","off");
			//if press enter key the call search offer function
			$("input#searchProduct").keypress(function(e)
			{
			   // if the key pressed is the enter key
				if (e.which == 13)
				{
					getproductsList($("input#searchProduct").val()) ;
			    }
			});
				$("input#searchProduct").autocomplete({
				    minLength: 1,
				    source: function( request, response)
				    {
				    	
				    	$("#removemsg").remove();
				    	$.ajax({
				    		url : HOST_PATH + "admin/product/searchkey/Keyword/" + $('#searchProduct').val(),
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
				getproductsList($('#searchProduct').val());
				$('div#productListTable_filter').hide();
				
				
		});
		

		function getproductsList(searchtext){
			
			$('#productListTable').addClass('widthTB');
			$("ul.ui-autocomplete").css('display','none');
				
			productListTable = $("#productListTable").dataTable(
					
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
						"sAjaxSource" : HOST_PATH + "admin/orders/getgallerylist/searchtext/"+$('#searchProduct').val(),
						"aoColumns" : [

			               {
							"fnRender" : function(obj) {
								return title  = obj.aData.name ;
							},
							"bSortable" : false
							},
							{
								"fnRender" : function(obj) {
									return title  = obj.aData.phoneNumber ;
							},
							"bSortable" : false
							},
							/*{
							"fnRender" : function(obj) {
								return title  = obj.aData.email ;
							},
							"bSortable" : false
							},*/
							{
							"fnRender" : function(obj) {
								return depDate  = obj.aData.departureDate ;
					
							},
							"bSortable" : false		
							},
							{
							"fnRender" : function(obj) {
								return returnDate  = obj.aData.returnDate;
								},
								"bSortable" : false		
							},
							{
							"fnRender" : function(obj) {
								return title  = obj.aData.departure ;
								},
								"bSortable" : false		
							},
							{
							"fnRender" : function(obj) {
								return title  = obj.aData.arrival ;
								},
								"bSortable" : false		
							},
							{	
								"fnRender" : function(obj) {
									return price  = obj.aData.status ;
								},
								"bSortable" : false
							},
							/*{	
								"fnRender" : function(obj) {
									return price  = obj.aData.travelType ;
								},
								"bSortable" : false
							},*/
							/*{
								"fnRender" : function(obj) {
									return price  = obj.aData.members ;
								},
								"bSortable" : false
							},*/
							{
								"fnRender" : function(obj) {
								  var del = "<a href='javascript:void(0);' id='View' onClick='callToEdit(" + obj.aData. id +");' >Edit</a>";
		                             return  del;
								},
								"bSearchable" : false,
								"bSortable" : false
							}
						
						],	
						"fnInitComplete" : function(obj) {
							$('td.dataTables_empty').html('No record found !');
							$('td.dataTables_empty').unbind('click');
							removeOverLay();
						},
						 "fnDrawCallback": function() {
							

								$('div#productListTable_filter').hide();
							 $("tbody" , this).find('tr').each(function () {
							       
							        $(this).find('td:lt(2)').each(function() {
							        	
							        	
							        });
							       });
							 window.scrollTo(0, 0);
						 },
						 "fnServerData" : function(sSource, aoData, fnCallback) {
								$('#regionsListDiv tr:gt(0)').remove();
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
		
		function callToView(id)
		{
			 
			document.location.href =  HOST_PATH+"admin/orders/view/id/"+id;
			
		}
		
		//Edit funtion
	
		function callToEdit(id)
			{
			document.location.href =  HOST_PATH+"admin/orders/edit/id/" + id ;
			
			}
			
			
		function deleterecd(id) {
			
			bootbox.confirm('Are you sure you want to delete this record?', function(r){
				if(!r){
					return false;
			}
				else{
					deletephotosrecord(id);
				}
			});
		}
		/**
		// * Permanent delete user through Faqcontroller.
		/ * @param id
		//// * @author Rohit
		//// */

		function deletephotosrecord(id) {
			addOverLay();
			$.ajax({
				url : HOST_PATH + "admin/product/deleteprodct",
				method : "post",
				data : {
					'id' : id
				},
				dataType : "json",
				type : "post",
				success : function(data) {
					
					if (data == true) {
						window.location.href = 	HOST_PATH + "admin/product ";
					} else {
						bootbox.alert('Problem in your data');
					}
				}
			});
			
		}
		
		var imageCount = 0;
		var MaxImage = 5;
		 function AddFile()
		 {
		 	++imageCount;
		 	var div = document.createElement('DIV');
		 	div.className = "raman"+imageCount; 
		 	div.innerHTML ='<div class="mainpage-content-line">'+
                '<div class="mainpage-content-left"><label><strong>Title</strong></label></div>'+
                '<div class="mainpage-content-right control-group">'+
                    '<div class="mainpage-content-right-inner-right-other help-inline"></div>'+
                    '<div class="mainpage-content-right-inner-left-other">'+
                    '<input type="text"  maxlength="54" name="Title[]" id="Title[]" placeholder="Title" class="span3">'+
                    '</div>'+                        
                '</div>'+
            '</div>'+
			'<div class="mainpage-content-line">'+
        		'<div class="mainpage-content-left"><label><strong>Description</strong></label></div>'+
        		'<div class="mainpage-content-right">'+
            		'<div class="mainpage-content-right-inner-right-other"></div>'+
            		'<div class="mainpage-content-right-inner-left-other" style="border-bottom-width: 0px; margin-bottom: 10px;" >'+
						'<textarea class="input-xlarge mbot bbot ignore" id="Description[]" placeholder="Description" name="Description[]"  rows="3" ></textarea>'+
        			'</div>'+
        		'</div>'+
            '</div>'+
            '<div class="mainpage-content-line">'+
        		'<div class="mainpage-content-left"><label><strong>Picture</strong></label></div>'+
        		'<div class="mainpage-content-right">'+
            		'<div class="mainpage-content-right-inner-right-other"></div>'+
            		'<div class="mainpage-content-right-inner-left-other" style="border-bottom-width: 0px; margin-bottom: 10px;" >'+
						'<input type="file" id="image[]" name = "image[]" style="margin-top:3px;margin-bottom:10px;"><a style="float: right;" href="javascript:;" onclick="RemoveFile('+imageCount+');"> Remove </a>'+
        			'</div>'+
        		'</div>'+
            '</div>';
		 	document.getElementById("divFile").appendChild(div);
		 		if(imageCount==MaxImage){
		 		   $('#uploadMoreImages').hide(); 
		 		}
		  
		  }
		 
		 function RemoveFile(count)
		 {
		 		--imageCount;
		 		$('.raman'+count).remove(); 
		 		$('#uploadMoreImages').show(); 
		 }


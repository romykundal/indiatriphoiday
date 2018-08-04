


var productListTable = $('#productListTable').dataTable();


	
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
			
				validateFormAddNewProduct();
			
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
			
		function validateFormAddNewProduct(){
			
			validateNewWidget  = $("form#addProduct")
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
						//regex : /\s/g,
						//regex : /^[A-Za-z ]\w+$/						
					},
					Model : {
						required : true,
					},
					Quantity : {
						required : true,
					},
					Price : {
						required : true,
					},
					
				},
			messages : {
					category : {
						required : "Please select category",
					},
					Title : {
						required : "Please Enter Title",
						//regex : "Space and one character not allowed"
						
					},
					Model : {
						required : "Please Enter model",
					},
					Quantity : {
						required : "Please entetr available quantity",
					},
					Price : {
						required : "Please Enter price",
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
				    		url : HOST_PATH + "admin/products/searchkey/Keyword/" + $('#searchProduct').val(),
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
			//addOverLay();
			
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
						"sAjaxSource" : HOST_PATH + "admin/products/getproductslist/searchtext/"+$('#searchProduct').val(),
						"aoColumns" : [

						               {
								
											"fnRender" : function(obj) {
											var imgSrc = "";
									          if (obj.aData.image == null || obj.aData.image=='' || obj.aData.image==undefined) {

									             imgSrc = HOST_PATH_PUBLIC
									             + "/images/back_end/user-avtar.jpg";
									              
									          } else {

									           var image = "thum_" + obj.aData.image;
									           imgSrc = HOST_PATH_PUBLIC +'/images/upload/products/thumb/'+ image;

									          }
									          var html = "<img id='prod_img' src='"
									            + imgSrc
									            + "'/>" ;
									          return html;
									          
											},
											"bSortable" : false
											
										},
						               {
								
											"fnRender" : function(obj) {
												return title  = obj.aData.title ;
									
											},
											"bSortable" : false
											
										},
										 {
											
											"fnRender" : function(obj) {
												return title  = obj.aData.Category.name ;
									
											},
											"bSortable" : false
											
										},
										 {
											
											"fnRender" : function(obj) {
												return title  = obj.aData.price ;
									
											},
											"bSortable" : false
											
										},
										{
											"fnRender" : function(obj) {
					  
												  var v = "<a href='javascript:void(0);'id='edit' onClick='callToEdit("+ obj.aData. id+");'>Edit</a>"; 
				                                  
												  return  v;

												},
												"bSearchable" : false,
												"bSortable" : false

											}, 
										{
								"fnRender" : function(obj) {

								  var del = "<a href='javascript:void(0);' id='delete' onClick='deleterecd(" + obj.aData. id +");' >Delete</a>";
		                             return  del;

								},
								"bSearchable" : false,
								"bSortable" : false

							} 
						
						],	
						"fnInitComplete" : function(obj) {
							$('td.dataTables_empty').html('No record found !');
							$('td.dataTables_empty').unbind('click');
							//removeOverLay();
						},
						 "fnDrawCallback": function() {
							
							
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
		
		
		//Edit funtion
	
		function callToEdit(id)
			{
			document.location.href =  HOST_PATH+"admin/products/editproduct/id/" + id ;
			
			}
			
			
		function deleterecd(id) {
			
			bootbox.confirm('Are you sure you want to delete this record?', function(r){
				if(!r){
					return false;
			}
				else{
					deletewordsrecord(id);
				}
			});
		}
		/**
		// * Permanent delete user through Faqcontroller.
		/ * @param id
		//// * @author Er.kundal
		//// */

		function deletewordsrecord(id) {
			//addOverLay();
			$.ajax({
				url : HOST_PATH + "admin/products/deleteproduct",
				method : "post",
				data : {
					'id' : id
				},
				dataType : "json",
				type : "post",
				success : function(data) {
					
					if (data == true) {
						
						window.location.href = 	HOST_PATH + "admin/products/index ";
						
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
			div.innerHTML ='<input type="file" id="image[]" name = "image[]" style="margin-top:3px;margin-bottom:10px;"> <a href="javascript:;" onclick="RemoveFile(this);"> Remove </a> ';
			// div.innerHTML ='<tr><td height="40" align="right"><h5>Image:</h5></td><td height="40">&nbsp;</td><td height="40" align="left"><label><input id="image[]" name="image[]" type="file" /> <a href="javascript:;" onclick="RemoveFile(this);"> Remove </a> </label></td></tr>';  
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

		 
		 function deleteImg(imgeid, pid, imagename){
			 
			 if(confirm('Are you sure you want to be delete this photo.')){
				 document.location.href=HOST_PATH + "admin/products/deleteproductimg/imgeId/"+imgeid+"/pid/"+pid+"/imagename/"+imagename;
				 }else{
				 return false;
				 }
			 
		 }


$(document).ready(function() {
	//cat to load drawing list 
	getDrawingList();
	$('#drawingListTbl_filter').hide();
	$('form#searchform').submit(function() {
		return false;
	});
	//bind with keypress of search box
	$("input#SearchDrawing").keypress(function(e)
		{
			// if the key pressed is the enter key
			  if (e.which == 13)
			  {
				  getDrawingList();
			  }
	});
	//Auto complete for search Drawing text box
	$("#SearchDrawing").autocomplete({
        minLength: 1,
        source: function( request, response){
        	
        	$.ajax({
        		url : HOST_PATH + "admin/drawing/searchtopfivedrawing/keyword/" + $('#SearchDrawing').val(),
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
        select: function( event, ui ) {}
    }); 
 
});

/**
 * function used for delete Drawing from list
 * and from database
 * @param id
 * @author Er.kundal
 */
function deletedrwaing(id) {
	
	bootbox.confirm("Are you sure you want to permanently delete this record?",'No','Yes',function(r){
		if(!r){
			return false;
		} else {
			$.ajax({
				type : "POST",
				url : HOST_PATH+"admin/drawing/delete",
				data : "id="+id
			}).done(function(msg) {
				
				window.location  =    HOST_PATH + 'admin/drawing';
				
		    }); 
		}
		
	});
	
}
drawingListTbl = $('table#drawingListTbl').dataTable();
/**
 * function used to get Drawing list from database
 * @author blal
 */
function getDrawingList() {
	addOverLay();
	$("ul.ui-autocomplete").css('display','none');
	$("ul.ui-autocomplete").html('');
	$('#drawingList').addClass('widthTB');
	$('#saveDrawingForm').addClass('display-none');
	$('#drawingList').removeClass('display-none');
	drawingListTbl = $("table#drawingListTbl")
			.dataTable(
					{
						"bLengthChange" : false,
						"bInfo" : false,
						"bFilter" : true,
						"bDestroy" : true,
						"bProcessing" : false,
						"bServerSide" : true,
						"iDisplayLength" : 10,
						"aaSorting": [[ 0, 'desc' ]], 
						"sPaginationType" : "bootstrap",
						"sAjaxSource" : HOST_PATH+"admin/drawing/list/SearchText/"+ $('#SearchDrawing').val(),
						"aoColumns" : [
								{
									"fnRender" : function(obj) {
										
								        var id = null;
										return id = obj.aData.id;
								
									},
									"bVisible":    false ,
									"bSortable" : false,
									"sType": 'numeric'
									
								},     
								{
									"fnRender" : function(obj) {
										
										var editLink = '<p editId="' + obj.aData.id + '" class="colorAsLink word-wrap-without-margin-drwaing">'  + obj.aData.title +'</p>';
										return editLink;
									 
									},
									
								},
								{
									"fnRender" : function(obj) {
										
									var	onLine = 'btn-primary';
										
										var html = "<div editId='" + obj.aData.id + "' class='btn-group'data-toggle='buttons-checkbox' 												style='padding-bottom:16px;margin-top:0px;'>"
												+ "<button class='btn "+ onLine +"' onClick='sendemail("+ obj.aData.userId+")'>Send Email</button>"
												+ ""
                                                + "</div>";
                                        
										return html;
									},
									
									"bSearchable" : false,
									"bSortable" : false,
								},{
									"fnRender" : function(obj) {
										
	                               var html ="<a href='javascript:;' alt='editId' onClick='callToEdit("+obj.aData.id+")'>Edit</a>";
											return html;
										},
										"bSearchable" : false,
										"bSortable" : false,
								},{
									"fnRender" : function(obj) {
										
			                               var html ="<a href='javascript:;' onClick='deletedrwaing("+obj.aData.id+")'>Delete</a>";
													return html;
												},
												"bSearchable" : false,
												"bSortable" : false,
										} ],
								
								
								"fnInitComplete" : function(obj) {
									$('td.dataTables_empty').html('No record found !');
									$('td.dataTables_empty').unbind('click');
									$('#drawingListTbl_filter').hide();
									 removeOverLay();
								},
						"fnDrawCallback" : function(obj) {
							
							$("#drawingListTbl").find('tr').each(function () {
								var $tr = $(this);
								$tr.find('td:lt(1)').each(function() {
								$(this).bind('click',callToEdit);
								$(this).css( 'cursor', 'pointer' );
														        	
							});
							});
							window.scrollTo(0, 0);

						},
						
						"fnServerData" : function(sSource, aoData, fnCallback) {
							$('#drawingListTbl tr:gt(0)').remove();
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
 * @author Er.kundal
 */
function callToEdit(id){
	
	//get id from editable row
	//var id =  $(this).children('p.colorAsLink').attr('editId');
	window.location  =    HOST_PATH + 'admin/drawing/edit/id/' +  id;


}


/**
 * change status of categories
 * @author Er.kundal
 */
function changeStatus(id,obj,status){
	 
	     addOverLay();
		 $(obj).addClass("btn-primary").siblings().removeClass("btn-primary");
		 $.ajax({
				type : "POST",
				url : HOST_PATH+"admin/drawing/status",
				data : "id="+id+"&status="+status
			}).done(function(msg) {
				removeOverLay();	
		}); 
	 
}
/**
 * used to remove highlighted bordes
 * @param el  current element
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




/**
 * Send email with username and password 
 * @author Er.kundal
 */
function sendemail(id){
	 
		 $.ajax({
				type : "POST",
				url : HOST_PATH+"admin/drawing/send",
				data : "uId="+id
			}).done(function(msg) {
				if(msg==1){
					alert("Success: Email has been Sent to user");
				}else{
					alert("Error: Email has been not Sent to user");
				}
		}); 
	 
}

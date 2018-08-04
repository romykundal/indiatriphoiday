$(document).ready(function() {
	//cat to load category list 
	getCategoryList();
	$('form#searchform').submit(function() {
		return false;
	});
	//bind with keypress of search box
	$("input#SearchCategory").keypress(function(e)
		{
			// if the key pressed is the enter key
			  if (e.which == 13)
			  {
			      getCategoryList();
			  }
	});
	//Auto complete for search category text box
	$("#SearchCategory").autocomplete({
        minLength: 1,
        source: function( request, response){
        	
        	$.ajax({
        		url : HOST_PATH + "admin/category/searchtopfivecategory/keyword/" + $('#SearchCategory').val(),
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
 * function used for delete category from list
 * and from database
 * @param id
 * @author blal
 */
function deleteCategory(id) {
	
	bootbox.confirm("Are you sure you want to permanently delete this record?",'No','Yes',function(r){
		if(!r){
			return false;
		} else {
			$.ajax({
				type : "POST",
				url : HOST_PATH+"admin/category/deletecategory",
				data : "id="+id
			}).done(function(msg) {
				
				window.location  =    HOST_PATH + 'admin/category';
				
		    }); 
		}
		
	});
	
}
categoryListTbl = $('table#categoryListTbl').dataTable();
/**
 * function used to get category list from database
 * @author blal
 */
function getCategoryList() {
	addOverLay();
	$("ul.ui-autocomplete").css('display','none');
	$("ul.ui-autocomplete").html('');
	$('#categoryList').addClass('widthTB');
	$('#saveCategoryForm').addClass('display-none');
	$('#categoryList').removeClass('display-none');
	categoryListTbl = $("table#categoryListTbl")
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
						"sAjaxSource" : HOST_PATH+"admin/category/categorylist/SearchText/"+ $('#SearchCategory').val(),
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
										
										var editLink = obj.aData.name ;
										return editLink;
									 
									},
									
								},
								{
									"fnRender" : function(obj) {
										
									var	onLine = 'btn-primary';
									var	offLine = '';
									if(!parseInt(obj.aData.status)){
										var	onLine = '';
										var	offLine = 'btn-primary'	;
									}	
										var html = "<div editId='" + obj.aData.id + "' class='btn-group'data-toggle='buttons-checkbox' 												style='padding-bottom:16px;margin-top:0px;'>"
												+ "<button class='btn "+ onLine +"' onClick='changeStatus("+ obj.aData.id 												+",this,\"online\")'>Yes</button>"
												+ "<button class='btn "+ offLine +"'onClick='changeStatus("+ obj.aData.id 												+",this,\"offline\")'>No</button>"
                                                + "</div>";
                                        
										return html;
									},
									
									"bSearchable" : false,
									"bSortable" : false,
								}
								/*,{
									"fnRender" : function(obj) {
										
	                               var html ="<a href='javascript:;' onClick='callToEdit("+obj.aData.id+")'>Edit</a>";
											return html;
										},
										"bSearchable" : false,
										"bSortable" : false,
								}*/
								 ],
								"fnInitComplete" : function(obj) {
									$('td.dataTables_empty').html('No record found !');
									$('td.dataTables_empty').unbind('click');
									 removeOverLay();
								},
						"fnDrawCallback" : function(obj) {
							
							$("#categoryListTbl").find('tr').each(function () {
								var $tr = $(this);
								$tr.find('td:lt(1)').each(function() {
								//$(this).bind('click',callToEdit);
								//$(this).css( 'cursor', 'pointer' );
														        	
							});
							});
							window.scrollTo(0, 0);

						},
						
						"fnServerData" : function(sSource, aoData, fnCallback) {
							$('#categoryListTbl tr:gt(0)').remove();
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
	// var id =  $(this).children('p.colorAsLink').attr('editId');
	window.location  =    HOST_PATH + 'admin/category/editcategory/id/' +  id;


}

/**
 * change status of categories
 * @author blal
 */
function changeStatus(id,obj,status){
	 
	     addOverLay();
		 $(obj).addClass("btn-primary").siblings().removeClass("btn-primary");
		 $.ajax({
				type : "POST",
				url : HOST_PATH+"admin/category/categorystatus",
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


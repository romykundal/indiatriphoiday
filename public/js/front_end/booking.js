$(document).ready(function() {
	//cat to load airport
	
	//bind with keypress of search box
	$("input#SearchAirport").keypress(function(e)
		{
			//console.log(e.which);
			
			// if the key pressed is the enter key
			  /*if (e.which == 13)
			  {
			      getCategoryList();
			  }*/
	});
	//Auto complete for search category text box
	$("#SearchAirport").autocomplete({
        minLength: 1,
        source: function( request, response){
        	
        	$.ajax({
        		url : HOST_PATH + "index/searchtopten/keyword/" + $('#SearchAirport').val(),
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

		//Auto complete for search category text box
	$("#findAirport").autocomplete({
        minLength: 1,
        source: function( request, response){
        	
        	$.ajax({
        		url : HOST_PATH + "index/searchtopten/keyword/" + $('#findAirport').val(),
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

$("button.btn-lg").click(function() {
     console.log("eventevent", this.value , $("input#travelType").val() );
     $("input#travelType").val(this.value)
});



});

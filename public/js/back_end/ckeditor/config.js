/**
 * 
 * @param config CKeditor config
 */

CKEDITOR.editorConfig = function( config )
{
	// Define changes to default configuration here. 

	// Change ckeditor defaul skin to Bootsrap skin
	config.skin = 'BootstrapCK-Skin';
	
	config.toolbarCanCollapse = false;
	config.resize_enabled = false;
	
	//config.removePlugins = 'elementspath';
	
	// File uploading setup
	
	
   config.filebrowserBrowseUrl =  CKEDITOR_BASEPATH + '/kcfinder/browse.php?type=files';
   config.filebrowserImageBrowseUrl = CKEDITOR_BASEPATH + '/kcfinder/browse.php?type=images';
   config.filebrowserFlashBrowseUrl = CKEDITOR_BASEPATH  + '/kcfinder/browse.php?type=flash';
   config.filebrowserUploadUrl = CKEDITOR_BASEPATH + '/kcfinder/upload.php?type=files';
   config.filebrowserImageUploadUrl = CKEDITOR_BASEPATH  + '/kcfinder/upload.php?type=images';
   config.filebrowserFlashUploadUrl = CKEDITOR_BASEPATH + '/kcfinder/upload.php?type=flash';
	
   
   // toolbar options 
   config.toolbar_BasicToolbar = 
		[
		 	
		 	{ items : [ 'Bold','Underline', 'Italic','Strike', '-' ,  
		 	            'BulletedList', 'NumberedList','-', 'Anchor', 'Link','Unlink', '-' ,
		 	           	'Image','Source', '-' ,
		 	           	'JustifyLeft','JustifyCenter','JustifyRight', 'JustifyBlock' ,
		 	           	'Font','FontSize','Find','TextColor','Background-color','Style','liststyle']  }
		 
		] ;
	
};


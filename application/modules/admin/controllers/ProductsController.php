<?php

class Admin_ProductsController extends Zend_Controller_Action
{

	/**
	 * For switch the connection
	 * @author rkumar
	 * @version 1.0
	 */
	public function preDispatch() {
		
		$params = $this->_getAllParams();
		if (!Auth_StaffAdapter::hasIdentity()) {
			$referer = new Zend_Session_Namespace('referer');
			$referer->refer = "http://".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
			$this->_redirect('/admin/auth/index');
		}
		
		$this->view->controllerName = $this->getRequest()->getParam('controller');
		$this->view->action = $this->getRequest()->getParam('action');
	
	}
/**
 * Flash success and error messages.
 * (non-PHPdoc)
 * @see Zend_Controller_Action::init()
 * 
 */
    public function init()
    {
    	$flash = $this->_helper->getHelper('FlashMessenger');
    	$message = $flash->getMessages();
    	$this->view->messageSuccess = isset($message[0]['success']) ?
    	$message[0]['success'] : '';
    	$this->view->messageError = isset($message[0]['error']) ?
    	$message[0]['error'] : '';
    }

   public function indexAction()
    {
    	
    	
   	}
    
  /**
     * function use for get all products info
     * 
     */
    public function getproductslistAction()
    {
    	
    	$params = $this->_getAllParams();
    	$productslist = Products::getProductsList($params);
    	
    	echo $productslist;
    	exit();
    } 
    
    public function checkbadwordAction()
    {
    	 
    	//$params = $this->_getAllParams();
    	$wordslist = Unsafwords::checkpreword($this->_getParam('Title'));
    	
    				if($wordslist == 0)
					    	{
					    		echo Zend_Json::encode(true);
					    	
					    
					    	} else {
					    
					    		echo Zend_Json::encode(false);
					    	}
		exit();			    	
    }

    
    public function checkeditbadwordAction()
    {
    	$params = $this->_getAllParams();
    	
    	
    	$wordslist = Unsafwords::checkpreeditword($this->_getParam('badId'),$this->_getParam('Title'));
    	 
    	if($wordslist == 0)
    	{
    		echo Zend_Json::encode(true);
    
    			
    	} else {
    			
    		echo Zend_Json::encode(false);
    	}
    	exit();
    }
    
        
    /*
     * Function use for edit product
     * 
     * 
     */
    public function editproductAction()
    {
 
    	$id = intval($this->getRequest()->getParam('id'));
    	$params = $this->_getAllParams();
    	$uploadPath = HTTP_PATH."public/images/upload/products/";
      
    	if(intval($id) > 0 )
    	{
    	
      $data = Products::getproduct($id);
      $this->view->catg = Category::getCategories();   
      
    		$rslt = @$data[0];
    		$this->view->productdata = @$rslt ;
    		if($rslt["image"]){
    		  $this->view->imgprodct = $uploadPath.'thumb/thum_'.$rslt["image"];
        }
    		$this->view->id = $id;
    	}
    	
    	if ($this->_request->isPost())
    	{
	
    		$ImgName = array();
    		if (count($_FILES["image"]["name"])>0  && @$_FILES["image"]["name"][0] != "")
    		{
         /*echo $rslt["image"];
            echo "<pre>";
    print_r($params);
    print_r($_FILES);
    die("**********787887878787877***************************");*/
      if($rslt["image"]){
      $delrootpath = ROOT_PATH."images/upload/products/".$rslt["image"];
      $delthumrootpath = ROOT_PATH."images/upload/products/thumb/thum_".$rslt["image"];
      $delmidrootpath = ROOT_PATH."images/upload/products/medium/thum_medium_".$rslt["image"];
      
        @unlink($delrootpath);
        @unlink($delthumrootpath);
        @unlink($delmidrootpath);
      }

    			$uploadPath = "images/upload/products/";
    		
    			foreach ( $_FILES['image']['name'] as $key => $val ) {
    				 

            $ImgName[]=self::upload($key.$_FILES['image']['name'][$key]);
            
            $originalpath = ROOT_PATH. $uploadPath . $ImgName[$key];
          /*  print_r($_FILES);
       die;*/
            //call function resize image
            $thumbpath = ROOT_PATH . $uploadPath .'thumb/'. "thum_" . $ImgName[$key];
            BackEnd_Helper_viewHelper::romyresizeImage($originalpath, 100, 65, $thumbpath,$_FILES['image']['type'][$key]);
            
            //call function resize image
            $mediumpath = ROOT_PATH . $uploadPath .'medium/'. "thum_medium_" . $ImgName[$key];
            BackEnd_Helper_viewHelper::romyresizeImage($originalpath, 415,275, $mediumpath,$_FILES['image']['type'][$key]);

    			}
    		}    		

    		
    		$product= Products :: editProducts($params, $ImgName);
    		$flash = $this->_helper->getHelper('FlashMessenger');
    		if($product)
    		{
    			$message = $this->view->translate('Record has been updated successfully');
    			$flash->addMessage(array('success' => $message));
    			$this->_helper->redirector(null , 'products' , null ) ;
    
    		} else
    		{
    			$message = $this->view->translate('Problem in your data.');
    			$flash->addMessage(array('error' => $message));
    			$this->_helper->redirector(null , 'products' , null ) ;
    		}
    	}
    	
    }

    public function deleteproductimgAction()
    {
    	 
    	$productid = intval($this->getRequest()->getParam('pid'));
    	$id = intval($this->getRequest()->getParam('imgeId'));
    	$imagename = $this->getRequest()->getParam('imagename');
    	$delrootpath = ROOT_PATH."images/upload/products/".$imagename;
    	$delthumrootpath = ROOT_PATH."images/upload/products/thum_".$imagename;
    	$delmidrootpath = ROOT_PATH."images/upload/products/medium/thum_medium_".$imagename;
    	$result = Image::deleteImg( $id );
    	if($result){
		    	
    		@unlink($delrootpath);
    		@unlink($delthumrootpath);
    		@unlink($delmidrootpath);
    	$redirectpath = HTTP_PATH.'admin/products/editproduct/id/'.$productid;
    	$flash = $this->_helper->getHelper('FlashMessenger');
    	$message = $this->view->translate('Record has been deleted permanentally.');
    	$flash->addMessage(array('success' => $message ));
    	$this->_redirect($redirectpath);
    	
    	}else{
    		
    		$this->_redirect("admin/products/");
    	}
   
    	echo $result;
    	exit();
    }

    
    public function deleteproductAction()
    {
    
    	$this->_helper->viewRenderer->setNoRender(true);
    	$this->_helper->layout->disableLayout();
    	$id = intval($this->getRequest()->getParam('id'));
    	
    	$details = Products::getproduct($id);
    	
    	$result = Products::deleteProduct($id);
    	
    	if($details[0]){
    		
    			@unlink(ROOT_PATH."images/upload/products/".$details[0]["image"]);
    			@unlink(ROOT_PATH."images/upload/products/thumb/thum_".$details[0]["image"]);
    			@unlink(ROOT_PATH."images/upload/products/medium/thum_medium_".$details[0]["image"]);
    			 
    		echo Zend_Json::encode(true);
    	}else{
    		echo Zend_Json::encode(false);
    	}
    	exit();
    }
    
    
    
    public function addproductAction()
    {
    	$params = $this->getRequest()->getParams();
/*echo "<pre>";
print_r($params);*/
    	if ($this->getRequest()->isPost()){
    		// $ownerId =  Auth_StaffAdapter::hasIdentity();
			
    		$ImgName = array();
    		if (count($_FILES["image"]["name"])>0 && @$_FILES["image"]["name"][0] != "")
    		{
          
    			$uploadPath = "images/upload/products/";
    		
	    		foreach ( $_FILES['image']['name'] as $key => $val ) {
	    		
	    			
	    			$ImgName[]=self::upload($key.$_FILES['image']['name'][$key]);
	    			
	    			$originalpath = ROOT_PATH. $uploadPath . $ImgName[$key];
	    		/*	print_r($_FILES);
       die;*/
	    			//call function resize image
	    			$thumbpath = ROOT_PATH . $uploadPath .'thumb/'. "thum_" . $ImgName[$key];
	    			BackEnd_Helper_viewHelper::romyresizeImage($originalpath, 100, 65, $thumbpath,$_FILES['image']['type'][$key]);
	    			
	    			//call function resize image
	    			$mediumpath = ROOT_PATH . $uploadPath .'medium/'. "thum_medium_" . $ImgName[$key];
	    			BackEnd_Helper_viewHelper::romyresizeImage($originalpath, 415,275, $mediumpath,$_FILES['image']['type'][$key]);
	    		}
    		}
    		
    		$result= Products::addProducts($params, $ImgName);
    		
    		if($result)
    		{
    			$flash = $this->_helper->getHelper('FlashMessenger');
    			$message = $this->view->translate('Record has been saved successfully.');
    			$flash->addMessage(array('success' => $message ));
    			return   $this->_redirect(HTTP_PATH.'admin/products/index');	 
    		}
    	}

    	$this->view->catg = Category::getCategories();	
    }
    
    public function searchkeyAction(){
    	 
    	$srh = $this->getRequest()->getParam('Keyword');
    	$data = Products::searchKeyword($srh);
    	$ar = array();
    	if (sizeof($data) > 0) {
    		foreach ($data as $d) {
    			$ar[] = ucfirst($d['title']);
    		}
    	}
    	else{
    		$ar[] = "No Record Found.";
    	}
    	echo Zend_Json::encode($ar);
    	die;
    	 
    
    
    }
    
    
    
    // upload Image
    
	public function upload($image) {

		$uploadPath = "images/upload/products/";
          $adapter = new Zend_File_Transfer_Adapter_Http();
          $user_path = ROOT_PATH . $uploadPath;
          $img=$image;
          
          if ($img) {
          	@unlink($user_path . $img);
          	@unlink($user_path . "thum_" . $img);
          }

          if (!file_exists($user_path)) mkdir($user_path);

          $adapter->setDestination(ROOT_PATH . $uploadPath);
          $adapter->addValidator('Extension', false, 'jpg,png,gif');

          $files = $adapter->getFileInfo();
          foreach ($files as $file => $info) {
              $name = $adapter->getFileName($file);
              $orgName = time() . "_" . $info['name'];
              $fname = $user_path . $orgName;

              // file uploaded & is valid
              if (!$adapter->isUploaded($file)) continue; 
              if (!$adapter->isValid($file)) continue;

              
              $adapter->addFilter(
              		new Zend_Filter_File_Rename(
              				array('target' => $fname,
              						'overwrite' => true)), null, $file);
              
              
              // receive the files into the user directory
              $adapter->receive($file); // this has to be on top

            $status = "";
 			$data = "";
 			$msg = "";
 			if ($adapter->isValid($file) == 1) {
 				$data = $orgName;
 				$status = "200";
 				$statusMessage = $this->view->translate("File uploaded successfully.");
 				 
 			} else
 			{
 				 
 				$status = "-1";
 				$msg = $this->view->translate("Please upload the valid file");
 				 
 			}
 			return $data;
 			
 		}
 	
  }
  
  
  
  //Upload Logo
  
  public static function uploadImage($imgName){
  		
  
  	$uploadPath = "images/upload/products/";
  	$adapter = new Zend_File_Transfer_Adapter_Http();
  	$user_path = ROOT_PATH . $uploadPath;
  	$img = $imgName;
  
  	//unlink image file from folder if exist
  	if ($img) {
  		@unlink($user_path . $img);
  		@unlink($user_path . "thum_" . $img);
  	}
  	if (!file_exists($user_path))
  		mkdir($user_path);
  	$adapter->setDestination(ROOT_PATH . $uploadPath);
  	$adapter->addValidator('Extension', false, 'jpg,jpeg,png,gif');
  	$files = $adapter->getFileInfo();
  	foreach ($files as $file => $info) {
  			
  			
  		$name = $adapter->getFileName($file, false);
  		$name = $adapter->getFileName($file);
  		$orgName = time() . "_" . $info['name'];
  		$fname = $user_path . $orgName;
  
  		$adapter->addFilter(
  				new Zend_Filter_File_Rename(
  						array('target' => $fname,
  								'overwrite' => true)), null, $file);
  			
  		$adapter->receive($file);
  		$status = "";
  		$data = "";
  		$msg = "";
  		if ($adapter->isValid($file) == 1) {
  			$data = $orgName;
  			$status = "200";
  			$statusMessage = "File uploaded successfully.";
  
  		} else
  		{
  			$status = "-1";
  			$msg = "Please upload the valid file";
  
  		}
  		return $data;
  	}
  
  }
  
  
 	

  public static function d($p){
	  echo "<pre>";
	  print_r($p);
	  echo "</pre>";
  }
   
// End class
}

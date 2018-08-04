<?php

class Admin_OrdersController extends Zend_Controller_Action
{

	/**
	 * For switch the connection
	 * @author 	Raman
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
    public function getgallerylistAction()
    {
    	
    	$params = $this->_getAllParams();
    	$wordslist = Inquiries::getOrderlist($params);
    	
    	echo $wordslist;
    	exit();
    } 
    
    /*
     * Function use for edit
     */
    public function editAction()
    {
 
    	$id = intval($this->getRequest()->getParam('id'));
    	$params = $this->_getAllParams();
            
    	if(intval($id) > 0 )
    	{
    		$data = Inquiries::getOrderDetails($id);
    		$this->view->productdata = $data ;
    		$this->view->id = $id;

    	}
    	
    	if ($this->_request->isPost())
    	{
            /*echo "<pre>";
            print_r($params);
            die;*/
    		$w = Doctrine_Core::getTable("Inquiries")->find($params['id']);
    		$booking= $w->updateInquiry($params);

        /*$to = "romykundal@gmail.com";
        $frm = "info@mailinator.com";
            $mail = new Zend_Mail();
            $mail->setBodyHtml("DEAR ,<br> Your new order / Inquiry as below:<br><br> User name and email : ".$params["name"]." <br> Email is : ".$params["email"]."<br> Phone is : ".$params["phone"]."<br><br> <a href='".HTTP_PATH."/admin/' >Click here</a> to find more detail in your admin panel.  <br><br>Thank You,<br>".$params["email"]."<br>".$params["phone"]."");
            $mail->setFrom($frm, 'The brothers travel');
            $mail->addTo($to, "Mr. Lovely");
            $mail->setSubject('Your new Order');
            $mail->send();*/
            
    		$flash = $this->_helper->getHelper('FlashMessenger');
    		if($booking)
    		{
                

    			$message = $this->view->translate('Record has been updated successfully');
    			$flash->addMessage(array('success' => $message));
    			$this->_helper->redirector(null , 'orders' , null ) ;
    
    		} else
    		{
    			$message = $this->view->translate('Problem in your data.');
    			$flash->addMessage(array('error' => $message));
    			$this->_helper->redirector(null , 'orders' , null ) ;
    		}
    	}
    }

    public function deleteprodctAction()
    {
    	$id = $this->getRequest()->getParams();
    	//$id = $param['id'];
    	$result = Product::deleteProduct ( $id['id'] );
    	$flash = $this->_helper->getHelper('FlashMessenger');
    	$message = $this->view->translate('Record has been deleted permanently.');
    	$flash->addMessage(array('success' => $message ));
    	
        echo $result;
    	exit();
    }
    
    
    public function addAction()
    {
    	$params = $this->getRequest()->getParams();
    	
    	$categories = Category::getCategories();
    	$this->view->category = $categories;
    	if ($this->getRequest()->isPost()){
    		//echo "<pre>";print_r($params);die;
    		
    		/*if (count($_FILES["image"]["name"])>0) {
    			$uploadPath = "images/upload/gallery/";
    			foreach ( $_FILES['image']['name'] as $key => $val ) {
    				$ImgName[]=self::upload($key.$_FILES['image']['name'][$key]);
	    			$originalpath = ROOT_PATH. $uploadPath . $ImgName[$key];
    				//call function resize image
    				$thumbpath = ROOT_PATH . $uploadPath . "thum_" . $ImgName[$key];
    				BackEnd_Helper_viewHelper::romyresizeImage($originalpath, 150, 0, $thumbpath, $_FILES["image"]['type'][$key]);
    				//call function resize image
    				$mediumpath = ROOT_PATH . $uploadPath . "thum_medium_" . $ImgName[$key];
    				BackEnd_Helper_viewHelper::romyresizeImage($originalpath, 1100,0, $mediumpath,$_FILES["image"]['type'][$key]);
    		
    				$title = $params['Title'][$key];
    				$description = $params['Description'][$key];
    				$category = $params['category'];
    				$result = Gallery::addGallery($category, $title, $description, $ImgName[$key]);
    			}
    		}*/
                    $title = $params['Title'];
                   // $price = $params['Price'];
                    $description = $params['Description'];
                    $category = $params['category'];
                    $result = Product::addProduct($category, $title,  $description);   		
    		
    		if($result)
    		{
    			$flash = $this->_helper->getHelper('FlashMessenger');
    			$message = $this->view->translate('Record has been saved successfully.');
    			$flash->addMessage(array('success' => $message ));
    			return   $this->_redirect(HTTP_PATH.'admin/product/index');
    			 
    		}
    	}
    }
    
/**
	 * search top file category for predictive search
	 * 
	 * @author Raman
	 * @version 1.0
	 */
	public function searchkeyAction() {
		
		
		$srh = $this->getRequest ()->getParam ( 'Keyword' );
		$data = Gallery::searchGalleryPics ( $srh);
		$ar = array ();
		if (sizeof ( $data ) > 0) {
			foreach ( $data as $d ) {
				
				$ar [] = $d ['name'];
			}
		} else {
			$msg = $this->view->translate ( 'No Record Found' );
			$ar [] = $msg;
		}
		echo Zend_Json::encode ( $ar );
		die ();
		
		// action body
	}
    
    
    
    //Upload Logo
    
    public function uploadLogo($imgName){
    	
    
    	$uploadPath = "images/upload/";
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
    		//call function resize image
    		$path = ROOT_PATH . $uploadPath . "thum_" . $orgName;
    		BackEnd_Helper_viewHelper::resizeImage($_FILES["imageName"], $orgName, 126, 90, $path);
    			
    		//call function resize image
    		$path = ROOT_PATH . $uploadPath . "thum_medium_" . $orgName;
    		BackEnd_Helper_viewHelper::resizeImage($_FILES["imageName"], $orgName, 100, 85, $path);
    
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
    			$statusMessage = $this->view->translate("File uploaded successfully.");
    
    		} else
    		{
    
    			$status = "-1";
    			$msg = $this->view->translate("Please upload the valid file");
    
    		}
    		return $data;
    
    	}
    
    
    }
    
    // upload Image
    
	public function upload($image) {

	$uploadPath = "images/upload/gallery/";
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
 	

   
// End class
}

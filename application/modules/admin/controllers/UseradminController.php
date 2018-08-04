<?php
class Admin_UseradminController extends Zend_Controller_Action
{

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

	
    public function init()
    {
		
		
    	BackEnd_Helper_viewHelper::addConnection();
		/* Initialize action controller here */
    }

 
   
    
    public function uploadFile($imgName){
    	
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
    		/*echo Zend_Json::encode(
    				array("fileName" => $data, "sttaus" => $status,
    						"msg" => $msg, "displayFileName" => $info['name'],
    						"path" => "$uploadPath")); */
    		//die();
    	}
    	
    	
    	
    }
    
 
   

    /**
     * save image for user in database
     * @param objec $file
     * @version 1.0
     * @author jsingh
     */
    public function uploadimageAction()
    {

		$uploadPath = "images/upload/";
		$adapter = new Zend_File_Transfer_Adapter_Http();
		$user_path = ROOT_PATH . $uploadPath;
		$img = $this->getRequest()->getParam('imageName');
		
		//unlink image file from folder if exist
		if ($img) {
			@unlink($user_path . $img);
			@unlink($user_path . "thum_" . $img);
			@unlink($user_path . "thum_large" . $img);
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
			BackEnd_Helper_viewHelper::resizeImage($_FILES["files"], $orgName,
					126, 90, $path);

			//call function resize image
			$path = ROOT_PATH . $uploadPath . "thum_large" . $orgName;
			BackEnd_Helper_viewHelper::resizeImage($_FILES["files"], $orgName,
					132, 95, $path);

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

			} else {

				$status = "-1";
				$msg = $this->view->translate("Please upload the valid file");

			}
			echo Zend_Json::encode(
					array("fileName" => $data, "sttaus" => $status,
							"msg" => $msg, "displayFileName" => $info['name'],
							"path" => "$uploadPath"));
			die();
		}

    }



    
    /**
     * render profile with data
     * @author jsingh 
     * @version 1.0
     */
    public function profileAction()
    {
    	
	    // action body
    	$id =  Auth_StaffAdapter::getIdentity()->id; 
  		$data = Doctrine_Query::create()->select("u.*")
    	->from('User u')
    	//->leftJoin("u.profileimage pi")
    	->where("u.id = ". $id)
    	->fetchOne(null , Doctrine::HYDRATE_ARRAY);
    	//$user = Doctrine_Core::getTable("User")->find($id);
    	//echo "<pre>";
    	//print_r($data);
    	$this->view->profile = $data ;
    	
    	$flash = $this->_helper->getHelper('FlashMessenger');
		$message = $flash->getMessages();
		$this->view->messageSuccess = isset($message[0]['success']) ? $message[0]['success'] : '';
		$this->view->messageError = isset($message[0]['error']) ? $message[0]['error'] : '';
    	
    }
    
    public function updateprofileAction()
    {
    	$this->_helper->layout()->disableLayout();
    	$this->_helper->viewRenderer->setNoRender();
    
    
    
    	if ($this->getRequest()->isPost()) {
    
    		$params = $this->getRequest()->getParams();
    		$id = Auth_StaffAdapter::getIdentity()->id  ;
    		$flash = $this->_helper->getHelper('FlashMessenger');
    		if ($params) {
    
    			$uesrPicName = '';
    			if(isset($_FILES['imageName']['name']) && $_FILES['imageName']['name']!=''){
    				$uesrPicName=self::uploadFile($_FILES['imageName']['name']);
    			}
    
    			$user = Doctrine_Core::getTable("User")->find($id);
    			$user->email =$params['email'];
    			$user->firstName = $params['firstName'];
    			$user->lastName = $params['lastName'];
    			$user->save();
    			$user->update($params,$uesrPicName);
    			//die('Hello');
    		}
    		$flash = $this->_helper->getHelper('FlashMessenger');
    		$message = $this->view->translate('Profile has been updated successfully.');
    		$flash->addMessage(array('success' => $message ));
    		$this->_redirect(HTTP_PATH.'admin/useradmin/profile');
    		die();
    
    
    	}
    
    }

    
 // end class   
}
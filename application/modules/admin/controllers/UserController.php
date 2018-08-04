<?php
class Admin_UserController extends Zend_Controller_Action
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

 
    public function indexAction()
    {
    	
		//get flashes
		$flash = $this->_helper->getHelper('FlashMessenger');
		$message = $flash->getMessages();
		$this->view->messageSuccess = isset($message[0]['success']) ? $message[0]['success'] : '';
		$this->view->messageError = isset($message[0]['error']) ? $message[0]['error'] : '';
	 }
    
	 public function userstatusAction() {
	     //echo "yessss"; die;
	 	$params = $this->_getAllParams ();
	 	User::changeStatus ( $params );
	 	die ();
	 }
    /**
     * add user form
     * @author 
     */
    public function adduserAction()
    {
    	
    	$u = Auth_StaffAdapter::getIdentity();
    	$this->view->id = $u->id;
    	$this->view->role = $u->roleId;
    	
    	$this->view->roles = Role::createUserPermission($u->roleId);
    	
   	
    }
    
 
    /**
     * function use for getalluser from database
     * @return array $data
     * @author 
     * @version 1.0
     */
    public function getuserlistAction()
    {
    	
    	$params = $this->_getAllParams();
    	$userList =  User::getUserList($params);
    	
    	echo $userList;
		exit();

    }

    /**
     * function use for save the new user in database
     * @return integr $id
     * @author jsingh
     * @param posted data and image
     */
    public function saveuserAction()
    {
		$params = $this->getRequest()->getParams();
		$uesrPicName = '';
		if(isset($_FILES['imageName']['name']) && $_FILES['imageName']['name']!=''){
		 $uesrPicName=self::uploadFile($_FILES['imageName']['name']);
		}
	
		$id = null;
		if ($params) {

			$u = new User();
			$id = $u->addUser($params,$uesrPicName);
			
		}
		echo Zend_Json::encode($id);
		$flash = $this->_helper->getHelper('FlashMessenger');
		$message = $this->view->translate('User has been created successfully.');
		$flash->addMessage(array('success' => $message ));
		$this->_redirect(HTTP_PATH.'admin/user');
		
		die();
    }
    
	public function searchkeyAction(){
		$srh = $this->getRequest()
		->getParam('keyword');
		$data = User::searchKeyword($srh);
		$ar = array();
		if (sizeof($data) > 0) {
			foreach ($data as $d) {
					$ar[] = ucfirst($d['firstname']);
			}
		}
		else{
			$ar[] = "No Record Found.";
		}
		echo Zend_Json::encode($ar);
		die;
	}
    /** 
     * save image for user in database
     * @param objec $file
     * @version 1.0
     * @author jsingh
     */
    
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
    	
    	// (9478255599) mob no hai , kal main teri call da wait karu ga , tere naal gal karni hai ok
    	
    	
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

 public function deleteuserAction()
    {

		$id = $this->getRequest()->getParam('id');
		if ($id) {

			$u = Doctrine_Core::getTable("User")->find($id);
			
			
			
			$del = Doctrine_Query::create()->delete()->from('User u')
					->where("u.id=" . $id)->execute();
			

		} else {

			$id = null;
		}
		$flash = $this->_helper->getHelper('FlashMessenger');
		$message = $this->view->translate('User has been deleted permanently.');
		$flash->addMessage(array('success' => $message ));
		//call cache function
		
		echo Zend_Json::encode($id);
		die();
    }
   
    /**
     * check duplicate usr 
     * @param string $email
     * @version 1.0
     * @author 
     */
    public function checkuserAction()
    {
		
		$u =  new User();
		$cnt  = intval($u->checkDuplicateUser($this->_getParam('email')));
	    if($cnt > 0)
	    {
	    	echo Zend_Json::encode(false);
	    	
	    } else {
	    	
	    	echo Zend_Json::encode(true);
	    }
	
		die();
    }

    /**
     * function for edit user and  fetch data form database
     * @version 1.0
     * @author jsingh
   	 */
     public function edituserAction()
     {
 	 
    $id =($this->getRequest()->getParam('id'));
  
  	 if($id > 0)
  	 {
  	 	$u = Auth_StaffAdapter::getIdentity();
  	 	$data = Doctrine_Query::create()->select("u.* , pi.name,pi.path")
  	    								->from('User u')
  	    								->leftJoin("u.profileimage pi")
  	    								->where("u.id = ?" , $id)
 	    								->fetchOne(null , Doctrine::HYDRATE_ARRAY);
  	    
  	    $this->view->id = $u->id;
  	    $this->view->roles = Role::createUserPermission($u->roleId);
  	    $this->view->roleId = $data['roleId'];
  	    $this->view->userId = $id;
 	    
  	    $this->view->userDetail = $data;
  	    $this->view->role = $u->roleId;
 	   
 	  
  	}
   
 	   // echo Zend_Json::encode($data) ;
 	    
	    
}
 	


  /**
    * Update user 
    * @version 1.0
    * 
    *     */
    public function updateuserAction()
    {
 			
 		
    	if ($this->getRequest()->isPost()) {
 			
 			$params = $this->getRequest()->getParams();
 			
 			$id = null ; 
 			
 			if ($params) {
 			    
 				$uesrPicName = '';
 				if(isset($_FILES['imageName']['name']) && $_FILES['imageName']['name']!=''){
 					$uesrPicName=self::uploadFile($_FILES['imageName']['name']);
 				}
 				
 			    $user = Doctrine_Core::getTable("User")->find($params['id']);
 			    $user->firstName = $params['firstName'];
 			    $user->lastName = $params['lastName'];
 			    $user->save();
 			    $id = $user->update($params,$uesrPicName);
 			}
 			$flash = $this->_helper->getHelper('FlashMessenger');
 			$message = $this->view->translate('User details has been updated successfully.');
 			$flash->addMessage(array('success' => $message ));
 			$this->_redirect(HTTP_PATH.'admin/user');
 			//echo Zend_Json::encode($id);
 			die();
 		
   		
    	}
    }
	/**
     * function use for getwebbsite acccording to useId and role
     * @return array $data
     * @author jsingh
     * @version 1.0
     */
    public function validatepasswordAction(){
 
 			$params = $this->getRequest()->getParams();
 			
 			$isValid = false ;
 			
 			if(intval($params['id']) > 0 )
 			{
 				
				$user = Doctrine_Core::getTable("User")->find($params['id']);
				
				//echo $params['oldPassword'];
				//die();
				if($user->validatePassword($params['oldPassword'])){
		 			$isValid = true;
				}
 				
 			}
 			    
 			echo Zend_Json::encode($isValid);
 			die();
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
  		$data = Doctrine_Query::create()->select("u.* ,pi.id, pi.name,pi.path")
    	->from('User u')
    	->leftJoin("u.profileimage pi")
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
    
	/**
	 * update user profile
	 * @author spsingh
	 * @version 1.0
	 */
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
			$this->_redirect(HTTP_PATH.'admin/user/profile');
			die();
				
			 
		}
		
    }
    /**
     * Get roles according to the authenticated user
     * @author 
     * @version 1.0
     */
	public function getrolesAction()
    {
    	$roles = User::getRoles();
    	echo Zend_Json::encode($roles);
    	die();
    }
}
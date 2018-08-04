<?php

class UserprofileController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    	$user = new Zend_Session_Namespace('user');
    	if(!isset($user->userId))
    	{
    		@$path = HTTP_PATH . 'user/login';
    		$this->_redirect($path);
    	}

    }

    public function indexAction()
    {
    	
    	$user = new Zend_Session_Namespace('user') ;
        //action body
        /*echo $user->userId;
    	die("Here");
    	*/
        $this->view->topTitle = "My Dashboard" ;
    	$userINfo =  User::getuserDetails($user->userId); 
        $hotProducts = Products::getProductsByCategory("DASHBOARD");
            		
    	$this->view->username = $userINfo["firstName"]. " " .$userINfo["lastName"] ;
    	$this->view->hotProducts = $hotProducts ;
    	
    }

    public function profilesettingAction()
    {
        $flash = $this->_helper->getHelper('FlashMessenger');

        $this->view->heading = "My Account" ;
        $this->view->topTitle = "My Account" ;
        $user = new Zend_Session_Namespace('user');
        $userINfo =  User::getuserDetails($user->userId); 
                    
        $this->view->username = $userINfo["firstName"]. " " .$userINfo["lastName"] ;
        $this->view->user = $userINfo ;
        $params = $this->_getAllParams();
        if ($this->getRequest()->isPost()) {
            
            $user = Doctrine_Core::getTable("User")->find($params['id']);
            $user->update($params); 

            $message = $this->view->translate('Information has been updated successfully.');
            $flash->addMessage(array('success' => $message ));
            $this->_redirect(HTTP_PATH.'/userprofile/profilesetting');
        }  

        $message = $flash->getMessages();
        $this->view->messageSuccess = isset($message[0]['success']) ? $message[0]['success'] : '';
        $this->view->messageError = isset($message[0]['error']) ? $message[0]['error'] : '';
    }

    public function ordersAction() { 
        
        $this->view->heading = "User Orders" ;
        $this->view->topTitle = "User Orders" ;
        $user = new Zend_Session_Namespace('user');
        
        $params = $this->_getAllParams();
        
        $list = Inquiries::getOrdersForFront($user->userId);
        $this->view->orders = $list ;

//      echo "<pre>";
//      print_r($productslist);
//      die;
    }

    public function ordersinfoAction(){

        $this->view->heading = "User Order Details" ;
        $this->view->topTitle = "User Order Details" ;
        $user = new Zend_Session_Namespace('user');
        $params = $this->_getAllParams();
        
        $info = Inquiries::getOrderDetails($params["order"]);
        $this->view->order = $info ;

     /*echo "<pre>";
     print_r($info);
     die;*/



    }
    
    


}


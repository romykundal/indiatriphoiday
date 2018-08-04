<?php
/**
 * this class is used for index (home ) of the site 
 * get value from database and display on home page
 * 
 *
 */

class ContactController extends Zend_Controller_Action {

	public function init() {

		/*
		 * Initialize action controller here
		 */
	}

	public function indexAction() {
		
		$this->view->controller = $instance = $this->getRequest()->getControllerName();
		$this->view->action = $this->getRequest()->getActionName();

	}
	
	/**
	 * Send Query
	 * @version 1.0
	 * @author Rohit
	 */
	public function sendqueryAction() {
		if ($this->getRequest ()->isPost ()) {
			
			$params = $this->getRequest ()->getParams ();
			// echo "<pre>"; print_r($params); die;
			
			$from = $params['email'];
			$name= $params['name'];
			$phone = $params['phone'];
			$body= $params['message'];

			$mail = new Zend_Mail();
			$mail->setBodyHtml($body);
			$mail->setFrom($from, $name);
			$mail->addTo('kaibareatery@gmail.com', 'Kaibarandeatery');
			$mail->setSubject('Enquiry Message from Kaibarandeatery.com');
			
			if($mail->send()){
				$message = 'Your Query has been sent! We will respond you soon!!';
				setcookie('message', $message, time() + 5, '/');
				$this->_redirect ( HTTP_PATH . '/index/contact' );
			}else{
				$message = 'Problem sending mail! Try Again!';
				setcookie('message', $message, time() + 5, '/');
				$this->_redirect ( HTTP_PATH . '/index/contact' );
			}

			
		
		}
	}
	
	public function addMessageStack($message,$type='success'){
	
		$session = new Zend_Session_Namespace('identity');
 
    		// write a value to the session
    		$session->sess_MessageStack = array($type,$message);
   		//$_SESSION['sess_MessageStack'][] =  array($type,$message);  
	}
	



}


<?php
/**
 * this class is used for index (home ) of the site 
 * get value from database and display on home page
 * 
 *
 */
class IndexController extends Zend_Controller_Action {

	public function init() {

		$footerAbout = Page::getPageById(35);
		$this->view->footerAbout = $footerAbout ;

		/*
		 * Initialize action controller here
		 */
	}

	public function indexAction() {
		
		$this->view->action = $this->getRequest()->getParam('action');
		$this->view->controller = $this->getRequest()->getParam('controller');
		
		
		$topProducts = Products::getProductsByCategory(34,6);
		
		$pageWhatWeAre = Page::getPageById(31);
		$this->view->whatweare = $pageWhatWeAre ;
		$this->view->topProducts = $topProducts ;
		
	}
	
	public function contactAction() {
		$this->view->topTitle = "Contact Us" ;
		
		$this->view->action = $this->getRequest()->getParam('action');
		$this->view->controller = $this->getRequest()->getParam('controller');
		
		$pageContent = Page::getPageById(39);
		$this->view->contactusContent = $pageContent ;
		


	}	

	public function aboutusAction() {
		
		$this->view->action = $this->getRequest()->getParam('action');
		$this->view->controller = $this->getRequest()->getParam('controller');
		$this->view->topTitle = "About Us" ;
		$pageObj = new Page();
		$pageInfo = $pageObj->getPageInfo(29);
		$this->view->pageInfo = @$pageInfo[0];
	}

	public function teamAction() {
		
		$this->view->action = $this->getRequest()->getParam('action');
		$this->view->controller = $this->getRequest()->getParam('controller');
		$this->view->topTitle = "Our Team" ;
		$pageObj = new Page();
		$pageInfo = $pageObj->getPageInfo(37);
		$this->view->pageInfo = @$pageInfo[0];
	}

	public function networkAction() {
		
		$this->view->action = $this->getRequest()->getParam('action');
		$this->view->controller = $this->getRequest()->getParam('controller');
		$this->view->topTitle = "Our Network" ;
		$pageObj = new Page();
		$pageInfo = $pageObj->getPageInfo(38);
		$this->view->pageInfo = @$pageInfo[0];
	}

	public function missionAction() {
		
		$this->view->action = $this->getRequest()->getParam('action');
		$pageObj = new Page();
		$this->view->topTitle = "Vision and Mission" ;
		$pageInfo = $pageObj->getPageInfo(32);
		$this->view->pageInfo = @$pageInfo[0];
	}
	
	public function termscondAction() {
		
		$this->view->action = $this->getRequest()->getParam('action');
		$pageObj = new Page();
		$this->view->topTitle = "Terms and Conditions" ;
		$pageInfo = $pageObj->getPageInfo(33);
		$this->view->pageInfo = @$pageInfo[0];
	}

	public function faqAction() {
		
		$this->view->action = $this->getRequest()->getParam('action');
		$pageObj = new Page();
		$this->view->topTitle = "FAQ" ;
		$pageInfo = $pageObj->getPageInfo(20);
		$this->view->pageInfo = @$pageInfo[0];
	}

	public function privacyAction() {
		
		$this->view->action = $this->getRequest()->getParam('action');
		$this->view->topTitle = "Privacy" ;

		$pageObj = new Page();
		$pageInfo = $pageObj->getPageInfo(36);
		$this->view->pageInfo = @$pageInfo[0];
	}

	public function booknowAction() {

		$this->view->topTitle = "Book Now" ;
		$user = new Zend_Session_Namespace('user');

		$flash = $this->_helper->getHelper('FlashMessenger');
		$this->view->action = $this->getRequest()->getParam('action');
		$this->view->controller = $this->getRequest()->getParam('controller');
		$message = $flash->getMessages();
		$this->view->messageSuccess = isset($message[0]['success']) ? $message[0]['success'] : '';
		$this->view->messageError = isset($message[0]['error']) ? $message[0]['error'] : '';

		$userINfo =  User::getuserDetails($user->userId); 
		//$airports =  Airport::getAirportForFront(); 

		$category = Category::getCategoryForFront();
/*echo "<pre>";
print_r($airports);
echo "</pre>";
die;*/
		$this->view->user = $userINfo;
		$this->view->category = $category;

	}

	/**
	 * search top file category for predictive search
	 * 
	 * @author Rohit kumar
	 * @version 1.0
	 */
	public function searchtoptenAction() {
		
		$srh = $this->getRequest ()->getParam ( 'keyword' );
		$data = Airport::searchToTen ( $srh);
		$ar = array ();
		if (sizeof ( $data ) > 0) {
			foreach ( $data as $d ) {
				
				$ar [] = $d ['name'] . ', ' .$d ['airport'];
			}
		} else {
			$msg = $this->view->translate ( 'No Record Found' );
			$ar [] = $msg;
		}
		echo Zend_Json::encode ( $ar );
		die ();
		
		// action body
	}

	 /**
     * save page detail in the dadtabase
     * @return array $data
     * @author romykundal
     * @version 1.0
     */
    
    public function bookingAction() {

    	$params = $this->_getAllParams();
		/*$user = new Zend_Session_Namespace('user');
		$params["user_id"] = $user->userId ;*/
/*echo "<pre>";
print_r($params);
echo "</pre>";
die;*/
    	$InquiriesObj = new Inquiries();
    	$InquiriesObj->saveInquiry($params); 		
    	

	    	$flash = $this->_helper->getHelper('FlashMessenger');
	    	$message = $this->view->translate('You has been request submitted successfully. Agent will contect via phone call or email about your booking');
	    	$flash->addMessage(array('success' => $message ));
	    	//$this->_redirect(HTTP_PATH.'index/booknow');
	    	$this->_redirect('https://www.instamojo.com/@sarthee22');
	    	exit;
    }
	
	public function serviceAction() {
		
		$this->view->action = $this->getRequest()->getParam('action') ;
	}

}


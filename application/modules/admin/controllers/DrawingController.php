<?php
class Admin_DrawingController extends Zend_Controller_Action
{
	
	/**
	 * check authentication before load the page
	 * 
	 * @see Zend_Controller_Action::preDispatch()
	 * @author Er.kundal
	 * @version 1.0
	 */
	public function preDispatch() {
		
		$conn2 = BackEnd_Helper_viewHelper::addConnection (); // connection
		                                                     // generate with second
		                                                     // database
		$params = $this->_getAllParams ();
		if (! Auth_StaffAdapter::hasIdentity ()) {
			$this->_redirect ( '/admin/auth/index' );
		}
		BackEnd_Helper_viewHelper::closeConnection ( $conn2 );
		$this->view->controllerName = $this->getRequest ()->getParam ( 'controller' );
		$this->view->action = $this->getRequest ()->getParam ( 'action' );
	
	}
	public function init() {
	
	ini_set('max_execution_time', 1800); //300 seconds = 5 minutes
		/*
		 * Initialize action controller here
		 */
	}
	public function indexAction() {
		// get flashes
		$flash = $this->_helper->getHelper ( 'FlashMessenger' );
		$message = $flash->getMessages ();
		$this->view->messageSuccess = isset ( $message [0] ['success'] ) ? $message [0] ['success'] : '';
		$this->view->messageError = isset ( $message [0] ['error'] ) ? $message [0] ['error'] : '';
	}
	/**
	 * add new drawing in database
	 * 
	 * @version 1.0
	 * @author Er.kundal
	 */
	public function addAction() {
		if ($this->getRequest ()->isPost ()) {
			$params = $this->getRequest ()->getParams ();
			

			
			$drawing = Drawings::addUser( $params );
			if ($drawing != null) {
				$flash = $this->_helper->getHelper ( 'FlashMessenger' );
				$message = $this->view->translate ( 'Record has been created successfully' );
				$flash->addMessage ( array ('success' => $message ) );
				$this->_redirect ( HTTP_PATH . 'admin/drawing' );
			}
		
		}
	}
	/**
	 * upload image in edit mode
	 * 
	 * @version 1.0
	 * @author Er.kundal
	 */
	public function uploadimageAction() {
		
		Category::uploadCategoriesImage ( $this->getRequest ()->getParams () );
	}
	
	
	/**
	 * Send email
	 *
	 * @version 1.0
	 * @author Er.kundal
	 */
	public function sendAction() {
	
		$this->_helper->viewRenderer->setNoRender(true);
		$this->_helper->layout->disableLayout();
		$params = $this->_getAllParams ();
		$user = User::getuserdetail($params);
		
		if(count($user)>0){
			$pass = self :: gen_trivial_password();
			$passw = md5($pass);
			
			$pwd = "'".$passw."'";
			$daf = "info@dafinteriors.com";
			$q = Doctrine_Query::create()
			->update('User u')
			->set('u.password', $pwd)
			->where('u.id=?', $params['uId'])
			//->getSqlQuery();
			->execute();
			
			$mail = new Zend_Mail();
			$mail->setBodyHtml("DEAR ".$user["firstName"].",<br> Your New  Login details as below:<br><br> User name or email : ".$user["email"]." <br> Password is : ".$pass."<br><br> <a href='http://www.dafinteriors.com/user/login' >Click here</a> to get your drawing, if you get any problem then reply us on info@dafinteriors.com<br><br>Thank You,<br>Daf Interiors");
			$mail->setFrom($daf, 'Dafinteriors');
			$mail->addTo($user["email"], $user["firstName"]);
			$mail->setSubject('Your user name and password');
			
			if($mail->send()){
				echo 1;
			}else{
				echo 0;
			}
		}else{
			echo -1;
		}
		
		die();
	}
	
	/**
	 * search top file drawing for predictive search
	 * 
	 * @author Er.kundal
	 * @version 1.0
	 */
	public function searchtopfivedrawingAction() {
		
		$srh = $this->getRequest ()->getParam ( 'keyword' );
		$data = Drawings::searchKeyword ( $srh);
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
	/**
	 * get all category from database
	 * @author Er.kundal
	 * @version 1.0
	 */
	public function listAction() {
		
		$params = $this->_getAllParams ();
		// cal to function in category model class
		$List = Drawings::getList ( $params );
		 echo $List ;
		die ();
	
	}
	
	/**
	 * edit drwaing by id
	 * 
	 * @author Er.kundal
	 * @version 1.0
	 */
	public function editAction() {
		
		
		$id = $this->getRequest ()->getParam ( 'id' );
		if ($id > 0) {
			
			// get edit $drawing
			$drawing = Drawings::getdetail($id);
			$this->view->editRec = $drawing;
// 			echo "<pre>";
// 			print_r($drawing);
// 			die;
		}
		if ($this->getRequest ()->isPost ()) {
			
			$params = $this->getRequest ()->getParams ();
			// cal to update category function
			$drawing = Drawings::update($params) ;
			
			$flash = $this->_helper->getHelper ( 'FlashMessenger' );
			$message = $this->view->translate ( 'Record details have been updated successfully.' );
			$flash->addMessage ( array ('success' => $message ) );
			$this->_redirect ( HTTP_PATH . 'admin/drawing' );
		}
	}
	/**
	 * change drawing status(online/ofline)
	 * 
	 * @version 1.0
	 * @author Er.kundal
	 */
	public function statusAction() {
		
		$params = $this->_getAllParams ();
		Category::changeStatus ( $params );
		die ();
	}
	/**
	 * deleted drawing by id
	 * 
	 * @version 1.0
	 * @author Er.kundal
	 */
	public function deleteAction() {
		
		$params = $this->_getAllParams ();
		
			$id = $this->getRequest()->getParam('id');
		if ($id) {

			$d = Doctrine_Core::getTable("Drawings")->find($id);
			
			if(!empty($d->images["id"])){
				$imagedel = Doctrine_Query::create()->delete()->from('Image b')
				->where("b.id=" . $d->images["id"])->execute();
			}
			
			if(!empty($d->User["id"])){
				$userdele = Doctrine_Query::create()->delete()->from('User u')
				->where("u.id=" . $d->User["id"])->execute();
			}
			
			$drawingdele = Doctrine_Query::create()->delete()->from('Drawings d')
			->where("d.id=" . $id)->execute();
			
			
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
	 * validate permalink
	 * 
	 * @version 1.0
	 * @author blal
	 */
	public function validatepermalinkAction() {
		
		$url = $this->getRequest ()->getParam ( "permaLink" );
		$isEdit = $this->getRequest()->getParam("isEdit") ;
		
		$pattern = array ( '/[^.a-zA-Z0-9- ]/i' ,
				 	       '/\s/', '/^-+|^\.+/', 
				           '/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/', 
				           '/[\.]+/', '/[- ]+/' );
		
		$replace = array ("", "-", "", "", ".", "-" );
		$url = preg_replace ( $pattern, $replace, $url );
		
		
		if($isEdit)
		{
			$id = $this->getRequest()->getParam("id") ;
			$category = Doctrine_Core::getTable("Drawing")->find($id);
		
			if($category->permaLink ==  $url )
			{
				 
				$res = array( 	'status' => '200' ,
						'url' => $url ,
						'permaLink' => $url ) ;
				 
				echo Zend_Json::encode( $res ) ;
				die ;
			}
		}
		 
		
		if (strlen ( $url ) > 0) {
			
			$i = 0;
			DO {
				$q = Doctrine_Query::create ()
				             ->from ( 'Category c' )
				             ->where ( 'c.permaLink = ? ', $url ) 
				             ->fetchArray ();
				
				
				
				if (count ( $q ) == 0) {
					break;
				} else {
					++ $i;
					$url = $url . $i;
				}
			} while ( 1 );
			
			$res = array ( 'status' => '200',
					       'url' => $url,
					       'permaLink' =>
									 $this->getRequest ()->getParam ( "permaLink" )
							 );
		} else {
			
			$res = false;
		}
		echo Zend_Json::encode ( $res );
		
		die ();
	}
	
	
	public function gen_trivial_password($len = 6){
		$r = '';
		for($i=0; $i<$len; $i++)
			$r .= chr(rand(0, 25) + ord('a'));
			return $r;
	}
	
	
	
	
// End class	
}
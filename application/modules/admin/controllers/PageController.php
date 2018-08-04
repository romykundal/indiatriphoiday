<?php
class Admin_PageController extends Zend_Controller_Action {
	/**
	 * check authentication before load the page
	 * @see Zend_Controller_Action::preDispatch()
	 * @author kraj
	 * @version 1.0
	 */
	public function preDispatch() {

		$conn2 = BackEnd_Helper_viewHelper::addConnection();//connection generate with second database
		$params = $this->_getAllParams();
		if (!Auth_StaffAdapter::hasIdentity()) {
			$referer = new Zend_Session_Namespace('referer');
			$referer->refer = "http://".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
			$this->_redirect('/admin/auth/index');
		}
		BackEnd_Helper_viewHelper::closeConnection($conn2);
		$this->view->controllerName = $this->getRequest()
				->getParam('controller');
		$this->view->action = $this->getRequest()->getParam('action');

	}
	public function init() {
		/* Initialize action controller here */
	}
	/**
	 * display list of pages in this view
	 * @author kkumar
	 * @version 1.0
	 */
	public function indexAction() {
		// action body
		$flash = $this->_helper->getHelper('FlashMessenger');
		$message = $flash->getMessages();
		$this->view->messageSuccess = isset($message[0]['success']) ? $message[0]['success'] : '';
		$this->view->messageError = isset($message[0]['error']) ? $message[0]['error'] : '';

	}
	
	/**
	 * add new pages
	 * @author kkumar
	 * @version 1.0
	 * @param $pageData
	 */
  
    public  function addpageAction() {
    	
    	
    	$conn2 = BackEnd_Helper_viewHelper::addConnection();
    	if (Auth_StaffAdapter::hasIdentity()) {
    		$this->view->roleId = 	Zend_Auth::getInstance()->getIdentity()->roleId;
    	}
    	$userObj = new User();
    	BackEnd_Helper_viewHelper::closeConnection($conn2);
    }
    
    /**
     * get page detail for edit page
     * @author kkumar
     * @version 1.0
     * @param $pageData
     */
    
    public function editpageAction(){

    	$this->view->role = Zend_Auth::getInstance ()->getIdentity ()->roleId;
    	$this->view->qstring = $_SERVER['QUERY_STRING'];
    	$params = $this->_getAllParams();

    	$this->view->pageId = $params['id'];
    	$pageObj = new Page();
    	$pageDetail = $pageObj->getPageDetail($params['id']);
    	/*echo "<pre>";
    	print_r($pageDetail);
    	die;*/
    	$this->view->pageDetail = $pageDetail['0'] ;
    	
	}
    
/**
 * update page detail
 * @author rkumar
 * @version 1.0
 * @param $pageData
 */

    
    public function updatepageAction()
    {
    	$params = $this->_getAllParams();
    	
   
	
    			$pageobj = Doctrine_Core::getTable("Page")->find($params['pageId']);
		    	$updatePage = $pageobj->updatePage($params);
		    	$flash = $this->_helper->getHelper('FlashMessenger');
		    	if($updatePage){
		    		$message = $this->view->translate('Page has been updated successfully.');
		    		$flash->addMessage(array('success' => $message ));
		    	}else{
		    		$message = $this->view->translate('Error: Your file size exceeded 2MB');
		    		$flash->addMessage(array('error' => $message ));
		    	}
		    	$this->_redirect(HTTP_PATH.'admin/page#'.$params['qString']);

    	
    }
   
    /**
     * get all pages from database
     * @return array $data
     * @author kkumar
     * @version 1.0
     */
    public function pagelistAction()
    {
    	$params = $this->_getAllParams();
    
    	
    	$pageObj = new Page();
    	// cal to function in network model class
   	$pageList =  $pageObj->getPages($params);
   	echo Zend_Json::encode ( $pageList );
    	die ;
    }
    
    
    /**
     * get all trashed pages from database
     * @return array $data
     * @author kkumar
     * @version 1.0
     */
    public function trashlistAction()
    {
    	$params = $this->_getAllParams();
    	$pageObj = new Page();
    	// cal to function in network model class
    	$pageList =  $pageObj->gettrashedPages($params);
    	echo Zend_Json::encode ( $pageList );
    	die ;
    }
   
    /**
     * save page detail in the dadtabase
     * @return array $data
     * @author rkumar
     * @version 1.0
     */
    
    public function savepageAction() {
    	$params = $this->_getAllParams();
    	$pageObj = new Page();
 
    	$pageObj->savePage($params); 		
    			
		    	$flash = $this->_helper->getHelper('FlashMessenger');
		    	$message = $this->view->translate('Page has been created successfully.');
		    	$flash->addMessage(array('success' => $message ));
		    	$this->_redirect(HTTP_PATH.'admin/page');
		    	exit;
    	
    	
    }
/**
	 * search to five shop from database by flag
	 * flag (1 deleted  or 0 not deleted )
	 * @author kraj
	 * @version 1.0
	 */
	public function searchtopfiveshopAction() {

		$srh = $this->getRequest()->getParam('keyword');
		$flag = $this->getRequest()->getParam('flag');
		//cal to searchToFiveShop function from offer model class
		$data = Page::searchToFivePage($srh, $flag);
		$ar = array();
		$removeDup = array();
		if (sizeof($data) > 0) {
			foreach ($data as $d) {
               
					$id =  $d['page']['id'];
					//array fro remove duplicate search text
					if(isset($removeDup[$id]))
					{
						$removeDup[$id] = $id;
						
					} else {
						
						$removeDup[$id] = $id;
						$ar[] = ucfirst($d['name']);
					}
			}

		} else {

			$msg = $this->view->translate('No Record Found');
			$ar[] = $msg;
		}
		echo Zend_Json::encode($ar);
		die;

		// action body
	}
	/**
	 * Export Page list in Excel file 
	 * @author Jsingh
	 * @version 1.0
	 */
	public function exportpagelistAction() {
		// get all shop from database
		$data = Page::exportpagelist();
		//echo "<pre>";
		//print_r($data);
		// create object of phpExcel
		$objPHPExcel = new PHPExcel();
		$objPHPExcel->setActiveSheetIndex(0);
		$objPHPExcel->getActiveSheet()->setCellValue('A1', $this->view->translate('Page Title'));
		$objPHPExcel->getActiveSheet()->setCellValue('B1', $this->view->translate('Type'));
		$objPHPExcel->getActiveSheet()->setCellValue('C1', $this->view->translate('Locked'));
		$objPHPExcel->getActiveSheet()->setCellValue('D1', $this->view->translate('Created'));
		$objPHPExcel->getActiveSheet()->setCellValue('E1', $this->view->translate('Published'));
		$objPHPExcel->getActiveSheet()->setCellValue('F1', $this->view->translate('Author'));
		$column = 2;
		$row = 2;
		// loop for each page
		foreach ($data as $page) {

			// condition apply on pagetitle
			$title = '';
			if ($page['pageTitle'] == '' || $page['pageTitle'] == 'undefined'
					|| $page['pageTitle'] == null || $page['pageTitle'] == '0') {

				$title = '';

			} else {

				$title = $page['pageTitle'];
			}
		
			// condition apply on type	
			$type = $page['pageType'] ;
			// condition apply on locked  
			$Locked = '';
    		if($page['pageLock']==true){
    			
    			$Locked= $this->view->translate('Yes');
    		}
    		else{
    			$Locked = $this->view->translate('No');
    		}
    
			// get created from array
			$Created = date("d-m-Y", strtotime($page['created_at']));
			
			// get Published from Array
			
			$Published = '';
			if($page['publish']==true){
				 
				$Published= $this->view->translate('Yes');
			}
			else{
				$Published = $this->view->translate('No');
			}
			
			//get author name
				$Author = $page['contentManagerName'];  

			
			// set value in column of excel
			$objPHPExcel->getActiveSheet()->setCellValue('A' . $column, $title);
			$objPHPExcel->getActiveSheet()->setCellValue('B' . $column, $type);
			$objPHPExcel->getActiveSheet()->setCellValue('C' . $column, $Locked);
			$objPHPExcel->getActiveSheet()->setCellValue('D' . $column, $Created);
			$objPHPExcel->getActiveSheet()->setCellValue('E' . $column, $Published);
			$objPHPExcel->getActiveSheet()->setCellValue('F' . $column, $Author);
			// counter incriment by 1
			$column++;
			$row++;
		}
		// FORMATING OF THE EXCELL
		$headerStyle = array(
				'fill' => array('type' => PHPExcel_Style_Fill::FILL_SOLID,
						'color' => array('rgb' => '00B4F2')),
				'font' => array('bold' => true));
		$borderStyle = array(
				'borders' => array(
						'outline' => array(
								'style' => PHPExcel_Style_Border::BORDER_THICK,
								'color' => array('argb' => '000000'))));
		// HEADER COLOR

		$objPHPExcel->getActiveSheet()->getStyle('A1:' . 'F1')
				->applyFromArray($headerStyle);

		// SET ALIGN OF TEXT
		$objPHPExcel->getActiveSheet()->getStyle('A1:F1')->getAlignment()
				->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
		$objPHPExcel->getActiveSheet()->getStyle('B2:F' . $row)->getAlignment()
				->setVertical(PHPExcel_Style_Alignment::VERTICAL_TOP);

		// BORDER TO CELL
		$objPHPExcel->getActiveSheet()->getStyle('A1:' . 'F1')
				->applyFromArray($borderStyle);
		$borderColumn = (intval($column) - 1);
		$objPHPExcel->getActiveSheet()->getStyle('A1:' . 'F' . $borderColumn)
				->applyFromArray($borderStyle);

		// SET SIZE OF THE CELL
		$objPHPExcel->getActiveSheet()->getColumnDimension('A')->setAutoSize(true);
		$objPHPExcel->getActiveSheet()->getColumnDimension('B')->setAutoSize(true);
		$objPHPExcel->getActiveSheet()->getColumnDimension('C')->setAutoSize(true);
		$objPHPExcel->getActiveSheet()->getColumnDimension('D')->setAutoSize(true);
		$objPHPExcel->getActiveSheet()->getColumnDimension('E')->setAutoSize(true);
		$objPHPExcel->getActiveSheet()->getColumnDimension('F')->setAutoSize(true);
	
		// redirect output to client browser
		$fileName =  $this->view->translate('pageList.xlsx');
		header(
				'Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
		header('Content-Disposition: attachment;filename='.$fileName);
		header('Cache-Control: max-age=0');
		$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
		$objWriter->save('php://output');
		die();

	}
	

	/**
	 * get trashed offer from database
	 * @author jsingh5
	 * @version 1.0
	 */
	public function trashAction() {
	    
		$role =  Zend_Auth::getInstance()->getIdentity()->roleId;
		if($role=='1' || $role=='2')
		{
		$flash = $this->_helper->getHelper('FlashMessenger');
	    $message = $flash->getMessages();
	    $this->view->messageSuccess = isset($message[0]['success']) ? $message[0]['success'] : '';
	    $this->view->messageError = isset($message[0]['error']) ? $message[0]['error'] : '';
		}else{
			$this->_redirect(HTTP_PATH.'admin/page');
		}
	}
	/**
	 * delete page from database by id
	 * @author jsingh5
	 * @version 1.0
	 */
	public function deletepageAction() {
     
		 $id = $this->getRequest()->getParam('id');
		//cal to deleteOffer function from offer model class
		$deletePermanent = Page::deletepage($id);
        $flash = $this->_helper->getHelper('FlashMessenger');
		if (intval($deletePermanent) > 0) {
			$message = $this->view
					->translate('Record has been deleted successfully.');
			$flash->addMessage(array('success' => $message));

		} else {

			$message = $this->view->translate('Problem in your data.');
			$flash->addMessage(array('error' => $message));
		}
		echo Zend_Json::encode($deletePermanent);
		die;
	}
	
	
	
	/**
	 * restore page by id
	 * @author jsingh5
	 * @version 1.0
	 */
	public function restorepageAction() {
	
		$id = $this->getRequest()->getParam('id');
		//cal to restoreOffer function from offer model class
		$restore = Page::restorePage($id);
	
		if (intval($restore) > 0) {
	
			$flash = $this->_helper->getHelper('FlashMessenger');
			$message = $this->view
			->translate('Record has been restored successfully.');
			$flash->addMessage(array('success' => $message));
	
		} else {
	
			$message = $this->view->translate('Problem in your data.');
			$flash->addMessage(array('error' => $message));
		}
	
		echo Zend_Json::encode($restore);
		die;
	}
	
	/**
	 * move to trash
	 * @author jsingh5
	 * @version 1.0
	 */
	
	public function movetotrashAction() {
	
		$id = $this->getRequest()->getParam('id');
		
		$trash = Page::moveToTrash($id);
	
		if (intval($trash) > 0) {
	
			$flash = $this->_helper->getHelper('FlashMessenger');
			$message = $this->view->translate('Page has been moved to trash successfully');
			$flash->addMessage(array('success' => $message));
	
		} else {
	
			$message = $this->view->translate('Problem in your data.');
			$flash->addMessage(array('error' => $message));
		}
		echo Zend_Json::encode($trash);
		die;
	}
	
	
	/**
	 * ssearch top five pages for predictive search
	 *
	 * @author jsingh5
	 * @version 1.0
	 */
	public function searchtopfivepageAction() {
	
		$params = $this->_getAllParams();
		
		$srh = $params['keyword'];
		$flag = isset($params['flag']) ? $params['flag'] : '0';
		
		$data =Page::searchToFivePage( $srh,$flag);
		
		$ar = array ();
		if (sizeof ( $data ) > 0) {
			foreach ( $data as $d ) {
	
				$ar [] = $d ['pagetitle'];
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
	 * delete page image
	 *
	 * @version 1.0
	 * @author kkumar
	 */
	
	public function deleteimageAction(){
		$params = $this->_getAllParams();
		$pageObj = new Page();
		echo $pageObj->deletePageImage($params);
		die;
	}
	
	/**
	 * validate permalink
	 *
	 * @version 1.0
	 * @author kkumar
	 */
	public function validatepermalinkAction() {
	
		$url = $this->getRequest ()->getParam ( "pagepermalink" );
		$id = $this->getRequest()->getParam("id") ;
	
		$pattern = array ('/\s/','/[\,+@#$%^&*!]+/');
	
		$replace = array ("-","-");
		$url = preg_replace ( $pattern, $replace, $url );
		$url = strtolower($url);
		$rp = Doctrine_Query::create()->select()->from("RoutePermalink")->where("permalink = '".urlencode($url)."'")->fetchArray();
		
		if($id!='')
		{
			
			$exactLinkIndex = 'index/index/attachedpage/'.$id;
			$exactLinkOfferPop = 'offer/popularoffer/attachedpage/'.$id;
			$exactLinkOffer = 'offer/index/attachedpage/'.$id;
			$exactLinkStore = 'store/index/attachedpage/'.$id;
			$exactLinkCategory = 'category/index/attachedpage/'.$id;
			$exactLinkMsGuide = 'bw/index/attachedpage/'.$id;
			$exactLinkAbout = 'about/index/attachedpage/'.$id;
			$exactLinkMyFav = 'myfavorite/index/attachedpage/'.$id;
			$exactLinkLogin = 'login/index/attachedpage/'.$id;
			$exactLinkForgot = 'login/forgotpassword/attachedpage/'.$id;
			$exactLinkFree = 'freesignup/index/attachedpage/'.$id;
			$exactLinkWelcome = 'login/memberwelcome/attachedpage/'.$id;
			
			
			if(@$rp[0]['permalink'] == $url )
			{
				if( @$rp[0]['exactlink'] == $url || @$rp[0]['exactlink'] == $exactLinkIndex ||
					@$rp[0]['exactlink'] == $exactLinkOfferPop || @$rp[0]['exactlink'] == $exactLinkOffer ||
					@$rp[0]['exactlink'] == $exactLinkStore || @$rp[0]['exactlink'] == $exactLinkCategory ||
					@$rp[0]['exactlink'] == $exactLinkMsGuide || @$rp[0]['exactlink'] == $exactLinkAbout ||
					@$rp[0]['exactlink'] == $exactLinkMyFav || @$rp[0]['exactlink'] == $exactLinkLogin ||
					@$rp[0]['exactlink'] == $exactLinkForgot || @$rp[0]['exactlink'] == $exactLinkFree ||
					@$rp[0]['exactlink'] == $exactLinkWelcome
				  ){ 
					$res = array( 	'status' => '200' ,
							'url' => $url ,
							'shopNavUrl' => $url ) ;
					 
					echo Zend_Json::encode($res ) ;
					die ;
				}else	{
					
					$res = false ;
					echo Zend_Json::encode( $res ) ;
					die ;
				}
			}
		}
			
	
		if( strlen($url )  > 0)
    	{ 
	    	
    		if(@$rp[0]['permalink'] != $url )
    		{
				$res = array ( 'status' => '200',
						'url' => $url,
						'permaLink' =>
						$this->getRequest ()->getParam ( "pagepermalink" )
				);
			}else {
	
			$res = false;
			}
    	} else	{
    		
    		$res = false ;
    	} 
		echo Zend_Json::encode ( $res );
	
		die ();
	}
 }


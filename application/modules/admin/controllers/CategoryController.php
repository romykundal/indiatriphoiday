<?php

class Admin_CategoryController extends Zend_Controller_Action {
	
	/**
	 * check authentication before load the page
	 * 
	 * @see Zend_Controller_Action::preDispatch()
	 * @author kraj
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
	 * add new category in database
	 * 
	 * @version 1.0
	 * @author blal
	 */
	public function addcategoryAction() {
		if ($this->getRequest ()->isPost ()) {
			$params = $this->getRequest ()->getParams ();
			
			
			$category = Category::saveCategories ( $params );
			if ($category != null) {
				$flash = $this->_helper->getHelper ( 'FlashMessenger' );
				$message = $this->view->translate ( 'Category has been created successfully' );
				$flash->addMessage ( array ('success' => $message ) );
				$this->_redirect ( HTTP_PATH . 'admin/category' );
			}
		
		}
	}
	/**
	 * upload image in edit mode
	 * 
	 * @version 1.0
	 * @author blal
	 */
	public function uploadimageAction() {
		
		Category::uploadCategoriesImage ( $this->getRequest ()->getParams () );
	}
	/**
	 * search top file category for predictive search
	 * 
	 * @author blal
	 * @version 1.0
	 */
	public function searchtopfivecategoryAction() {
		
		$srh = $this->getRequest ()->getParam ( 'keyword' );
		$data = Category::searchToFiveCategory ( $srh);
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
	 * @author blal updated by kraj
	 * @version 1.0
	 */
	public function categorylistAction() {
		
		$params = $this->_getAllParams ();
		// cal to function in category model class
		$categoryList = Category::getCategoryList ( $params );
		echo Zend_Json::encode ( $categoryList );
		die ();
	
	}
	
	/**
	 * edit category by id
	 * 
	 * @author blal
	 * @version 1.0
	 */
	public function editcategoryAction() {
		
		
		$id = $this->getRequest ()->getParam ( 'id' );
		if ($id > 0) {
			
			// get edit category
			$category = Category::getCategory ($id);
			echo "<pre>";
			print_r($category);
			die;
			$this->view->editRec = $category[0];
		}
		if ($this->getRequest ()->isPost ()) {
			
			$params = $this->getRequest ()->getParams ();
			
			// cal to update category function
			$category = Category::updateCategory ( $params );
			$flash = $this->_helper->getHelper ( 'FlashMessenger' );
			$message = $this->view->translate ( 'Category details have been updated successfully.' );
			$flash->addMessage ( array ('success' => $message ) );
			$this->_redirect ( HTTP_PATH . 'admin/category' );
		}
	}
	/**
	 * change category status(online/ofline)
	 * 
	 * @version 1.0
	 * @author blal
	 */
	public function categorystatusAction() {
		
		$params = $this->_getAllParams ();
		Category::changeStatus ( $params );
		die ();
	}
	/**
	 * deleted category by id
	 * 
	 * @version 1.0
	 * @author blal
	 */
	public function deletecategoryAction() {
		
		$params = $this->_getAllParams ();
		Category::deleteCategory ( $params );
		$flash = $this->_helper->getHelper ( 'FlashMessenger' );
		$message = $this->view->translate ( 'Category has been deleted successfully' );
		$flash->addMessage ( array ('success' => $message ) );
		die ();
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
			$category = Doctrine_Core::getTable("Category")->find($id);
		
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
	
	/**
	 * export category list
	 * 
	 * @version 1.0
	 * @author blal updated by kraj
	 */
	public function exportcategorylistAction() {
		// get all category from database
		$data = Category::exportcategoryList ();
		// create object of phpExcel
		$objPHPExcel = new PHPExcel ();
		$objPHPExcel->setActiveSheetIndex ( 0 );
		$objPHPExcel->getActiveSheet ()->setCellValue ( 'A1', $this->view->translate ( 'Category' ) );
		$objPHPExcel->getActiveSheet ()->setCellValue ( 'B1', $this->view->translate ( 'Online' ) );
		$column = 2;
		$row = 2;
		// loop for each category
		foreach ( $data as $category ) {
			
			// condition apply on offer
			$name = '';
			if ($category ['name'] == '' || $category ['name'] == 'undefined' || $category ['name'] == null || $category ['name'] == '0') {
				
				$name = '';
			
			} else {
				
				$name = $category ['name'];
			}
			
			$status = '';
			if ($category ['status'] == true) {
				
				$status = $this->view->translate ( 'Yes' );
			
			} else {
				
				$status = $this->view->translate ( 'No' );
			}
			// set value in column of excel
			$objPHPExcel->getActiveSheet ()->setCellValue ( 'A' . $column, $name );
			$objPHPExcel->getActiveSheet ()->setCellValue ( 'B' . $column, $status );
			// counter incriment by 1
			$column ++;
			$row ++;
		}
		// FORMATING OF THE EXCELL
		$headerStyle = array ('fill' => array ('type' => PHPExcel_Style_Fill::FILL_SOLID, 'color' => array ('rgb' => '00B4F2' ) ), 'font' => array ('bold' => true ) );
		$borderStyle = array ('borders' => array ('outline' => array ('style' => PHPExcel_Style_Border::BORDER_THICK, 'color' => array ('argb' => '000000' ) ) ) );
		// HEADER COLOR
		
		$objPHPExcel->getActiveSheet ()->getStyle ( 'A1:' . 'B1' )->applyFromArray ( $headerStyle );
		
		// SET ALIGN OF TEXT
		$objPHPExcel->getActiveSheet ()->getStyle ( 'A1:B1' )->getAlignment ()->setHorizontal ( PHPExcel_Style_Alignment::HORIZONTAL_CENTER );
		$objPHPExcel->getActiveSheet ()->getStyle ( 'B2:I' . $row )->getAlignment ()->setVertical ( PHPExcel_Style_Alignment::VERTICAL_TOP );
		
		// BORDER TO CELL
		$objPHPExcel->getActiveSheet ()->getStyle ( 'A1:' . 'B1' )->applyFromArray ( $borderStyle );
		$borderColumn = (intval ( $column ) - 1);
		$objPHPExcel->getActiveSheet ()->getStyle ( 'A1:' . 'B' . $borderColumn )->applyFromArray ( $borderStyle );
		
		// SET SIZE OF THE CELL
		$objPHPExcel->getActiveSheet ()->getColumnDimension ( 'A' )->setAutoSize ( true );
		$objPHPExcel->getActiveSheet ()->getColumnDimension ( 'B' )->setAutoSize ( true );
		
		// redirect output to client browser
		header ( 'Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' );
		header ( 'Content-Disposition: attachment;filename="categoryList.xlsx"' );
		header ( 'Cache-Control: max-age=0' );
		$objWriter = PHPExcel_IOFactory::createWriter ( $objPHPExcel, 'Excel2007' );
		$objWriter->save ( 'php://output' );
		die ();
	
	}

}


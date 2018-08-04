<?php

class ProductsController extends Zend_Controller_Action {

	public function init() {

		$this->view->controller = $instance = $this->getRequest()->getControllerName();
		$this->view->action = $this->getRequest()->getActionName();
		$footerAbout = Page::getPageById(35);
		$this->view->footerAbout = $footerAbout ;
		/*
		 * Initialize action controller here
		 */
	}

	public function indexAction() { 
		
		$params = $this->_getAllParams();
		/*echo "<pre>";
		print_r($params);
		echo "</pre>";
		die;
*/
		$title = "All Products" ;
		if(isset($params["t"]) && $params["t"] != ""){
			$title = $params["t"];
		}


		$this->view->action = $this->getRequest()->getParam('action');
		$this->view->controller = $this->getRequest()->getParam('controller');
		$this->view->heading = ucfirst($title) ;
		$this->view->topTitle = ucfirst($title) ;
		$pId = 0 ;
		if(isset($params["t"]) && $params["p"] != ""){
			$pId = $params["p"];
		}

		$hotProducts = Products::getProductsByCategory($pId);
		$this->view->hotProducts = $hotProducts ;

		
	}

	public function showproductAction() {
		
		
		$params = $this->_getAllParams();
		$productId = $params["p"]; 
		$product = Products::showProductdetailPage($productId);
		$this->view->heading = ucfirst($product["title"]) ;
		$this->view->topTitle = ucfirst($product["title"]) ;
		//echo "<pre>"; print_r($product); die;
		$this->view->showproduct = $product ;
				
	}
}

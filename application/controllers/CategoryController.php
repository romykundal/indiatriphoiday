<?php

class CategoryController extends Zend_Controller_Action {

	public function init() {

		/*
		 * Initialize action controller here
		 */
	}

	public function indexAction() {

		$this->view->controller =  $this->getRequest()->getControllerName();
		$this->view->action = $this->getRequest()->getActionName();
		$category = Category::getCategoryForFront();
		$this->view->category = $category;
		
	}

	public function showAction() { }
}

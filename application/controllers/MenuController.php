<?php

class MenuController extends Zend_Controller_Action
{

    public function init()
    {

		/*
		 * Initialize action controller here
		 */
    }

    public function indexAction()
    {
		
        //$params = $this->_getAllParams();
		$this->view->action = $this->getRequest()->getParam('action');
        $params = $this->_getAllParams();
        $category = Category::getCategoryForFront();
        $this->view->category = $category;
		
		
    }

    
    public function foodAction(){
    
    	$this->view->action = $this->getRequest()->getParam('action');
    	$params = $this->_getAllParams();

        $catgId = base64_decode($params["catd"]);
        $products = Product::getproductForFront($catgId);
        $this->view->product = $products;
    
   /* echo "<pre>";
print_r($products);
die;*/
    }
        
    
    
// End Class
}




<?php

class PageController extends Zend_Controller_Action
{

    public function init()
    {

		/*
		 * Initialize action controller here
		 */
    }

    public function indexAction()
    {
		
		$this->_helper->layout()->disableLayout();
		$this->_helper->viewRenderer->setNoRender(true);
		/*
		 * echo "<pre>";
		$params = $this->_getAllParams();
		print_r($params); 
		*/
    }

    // WS for returing Unsafe Words for IPHONE App
    public function helpCmsPageAction(){
    
    	$this->_helper->layout()->disableLayout();
    	$params = $this->_getAllParams();
    
    
    	$detail = Cmspages::gethelpcmspage();
   
    	if(count($detail)>0){
    		$result = Zend_Json::encode($detail);
    			
    	}else{
    		$detail = array("Status"=>300,"massage"=>"Record No Found!");
    		$result = Zend_Json::encode($detail);
    	}
    
    	echo $result;
    	exit();
    }
    
    public function tearmsandconditionAction(){
        $this->view->topTitle = "Terms and Conditions" ;
    
    	$params = $this->_getAllParams();
       	
    	
    }
    
    
    
    
    
// End Class
}




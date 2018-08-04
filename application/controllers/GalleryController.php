<?php
/**
 * this class is used for index (home ) of the site 
 * get value from database and display on home page
 * 
 *
 */
class GalleryController extends Zend_Controller_Action {

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
		//echo "<pre>"; print_r($category); die;
	}
	
	
	public function galleryAction() {
	
		$this->view->controller =  $this->getRequest()->getControllerName();
		$this->view->action = $this->getRequest()->getActionName();
 		$id = $this->getRequest()->getParam('id');
		$images = Gallery::getgalleryForFront($id);
		
// 		echo "<pre>";
// 		print_r($images); die;
		
		$effecttype = array("effectType"=>"Random");
		$imagesArray = array();
		$i= 1;
		foreach($images as $key=>$imgArr){
		//  if($i <=10){
		  	$imagesArray[$key]['title'] = $imgArr['title'];
		  	$imagesArray[$key]['desc'] = "";
		  	$imagesArray[$key]['contentType'] = "image";
		  	$imagesArray[$key]['content'] = "";
		  	$imagesArray[$key]['interval'] = -1;
		  	$imagesArray[$key]['effect'] = $effecttype ;
		  	$imagesArray[$key]['pauseOnMouseOver'] = -1;
		  	
		  	$imagesArray[$key]['src'] = PUBLIC_PATH.$imgArr['Image']['path'].$imgArr['Image']['name'];
		    $imagesArray[$key]['thumbSrc'] = PUBLIC_PATH.$imgArr['Image']['path']."thum_".$imgArr['Image']['name'];
		    $imagesArray[$key]['largeSrc'] = PUBLIC_PATH.$imgArr['Image']['path'].$imgArr['Image']['name'];
		  // }
		   $i++;
		
		}

		//$img_array = Zend_Json::encode($imagesArray);

// 		$imagepath = PUBLIC_PATH."js/front_end/Hi-Slider/";
// 		$sliderjson = '[{ title:"1377920820_11",desc:"",contentType:"image",content:"",interval:-1,effect:{ effectType:"Random"},pauseOnMouseOver:-1,src:"'.$imagepath.'dataimages/1377920820_11.jpg",thumbSrc:"'.$imagepath.'dataimages/1377920820_11-th.jpg",largeSrc:"'.$imagepath.'dataimages/1377920820_11-org.jpg"},
// 		{ title:"1377920821_DSC_0017",desc:"",contentType:"image",content:"",interval:-1,effect:{ effectType:"Random"},pauseOnMouseOver:-1,src:"'.$imagepath.'dataimages/1377920821_DSC_0017.jpg",thumbSrc:"'.$imagepath.'dataimages/1377920821_DSC_0017-th.jpg",largeSrc:"'.$imagepath.'dataimages/1377920821_DSC_0017-org.jpg"},
// 		{ title:"1377920823_DSC_0088",desc:"",contentType:"image",content:"",interval:-1,effect:{ effectType:"Random"},pauseOnMouseOver:-1,src:"'.$imagepath.'dataimages/1377920823_DSC_0088.jpg",thumbSrc:"'.$imagepath.'dataimages/1377920823_DSC_0088-th.jpg",largeSrc:"'.$imagepath.'dataimages/1377920823_DSC_0088-org.jpg"},
// 		{ title:"1377920824_DSC_0095",desc:"",contentType:"image",content:"",interval:-1,effect:{ effectType:"Random"},pauseOnMouseOver:-1,src:"'.$imagepath.'dataimages/1377920824_DSC_0095.jpg",thumbSrc:"'.$imagepath.'dataimages/1377920824_DSC_0095-th.jpg",largeSrc:"'.$imagepath.'dataimages/1377920824_DSC_0095-org.jpg"}]';
	
		$firstimg = current($imagesArray);
		$this->view->firstimg = $firstimg; 
		array_splice($imagesArray, 0, 1);
		$this->view->restall = $imagesArray;
		
		/*echo "<pre>";
		print_r($this->view->firstimg);
		print_r($imagesArray);
		die;*/
		
	}
	
		


}


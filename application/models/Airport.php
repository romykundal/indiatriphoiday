<?php

/**
 * Airport
 * 
 * This class has been auto-generated by the Doctrine ORM Framework
 * 
 * @package    ##PACKAGE##
 * @subpackage ##SUBPACKAGE##
 * @author     ##NAME## <##EMAIL##>
 * @version    SVN: $Id: Builder.php 7691 2011-02-04 15:43:29Z jwage $
 */
class Airport extends BaseAirport
{
	
	/**
	 * Author  Rohit
	 * @param varchar $params
	 * return Array
	 * Version 1.0
	 */
	
	public static function getAirportlist($params){
		
		$srh = isset($params["searchtext"]) ? $params["searchtext"] : '';
		

		$data = Doctrine_Query::create()
				->select('g.code','g.name','g.cityName','g.countryName','g.created_at')
				->from('airport g')
				->where('g.name LIKE ?', "$srh%")
				->andWhere('g.deleted = 0')
				->orderBy('g.code DESC');
		
		$result =  Zend_Json::encode(DataTable_Helper::generateDataTableResponse($data, 
				$params, 
				array("__identifier" => 'g.code', 'g.name', 'g.cityName', 'g.countryName','g.created_at'),
						array(),
						array()
				));

		return $result;
	}
	
	
	/**
	 * Save gallery pics
	 * @author Rohit
	 * @version 1.0
	 */
	
	public static function addProduct($category, $title, $description)
	{
		
		  $Obj = new Product();
		  $Obj->title = BackEnd_Helper_viewHelper::stripSlashesFromString($title);
		  //$Obj->price = BackEnd_Helper_viewHelper::stripSlashesFromString($price);
		  $Obj->categoryid = BackEnd_Helper_viewHelper::stripSlashesFromString($category);
		  $Obj->description = BackEnd_Helper_viewHelper::stripSlashesFromString($description);
		  
		  $Obj->save();
		  $lid = $Obj->id;
		  
		  /*$uploadPath = "images/upload/gallery/";
		  $imagobj = new Image();
		  $imagobj->itemId = $lid;
		  $imagobj->type = "IMGGLR";
		  $imagobj->ext = BackEnd_Helper_viewHelper::getImageExtension( $imgfile );
		  $imagobj->path = $uploadPath;
		  $imagobj->name = $imgfile;
		  $imagobj->save();*/
		return $lid ;
	}
	
	/**
	 * get to five category
	 * @param string $keyword
	 * @return array $data
	 * @author Rohit
	 * @version 1.0
	 */
	public static function searchProduct($keyword) {
	
		$data = Doctrine_Query::create()->select('g.name as name')
		->from("airport g")
		->andWhere("g.name LIKE ?", "%$keyword%")
		->orderBy("g.name ASC")
		->limit(5)
		->fetchArray();

		return $data;
	}
	
	/**
	 * Delete product photo by id
	 * @param integer $params
	 * @author Rohit
	 * @version 1.0
	 */
	public static function deleteAirport($code) {
		$q = Doctrine_Query::create()->update('airport g')
		->set('g.deleted', 1)
		->where('g.code=?', $code)
		->execute();
		return true;
	}
	
	/**
	 * Author  Rohit
	 * @param integer $catId
	 * return Array
	 * Version 1.0
	 */
	
	public static function getAirportForFront(){
	
		$data = Doctrine_Query::create()
		->select('a.*')
		->from('airport a')
		->orderBy('a.name ASC')
		->limit(100)
		//->getSqlQuery();
		->fetchArray();
		return $data;
	}

	/**
	 * get to five category 
	 * @param string $keyword
	 * @return array $data
	 * @author Rohit kumar
	 * @version 1.0
	 */
	public static function searchToTen($keyword) {

		$data = Doctrine_Query::create()->select('c.cityName as name, c.name as airport,')
				->from("Airport c")->where('c.deleted=0')
				->andWhere("c.cityName LIKE ?", "$keyword%")->orderBy("c.cityName ASC")
				->limit(20)->fetchArray();
		return $data;
	}

	
}
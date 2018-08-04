<?php

/**
 * Site
 * 
 * This class has been auto-generated by the Doctrine ORM Framework
 * 
 * @package    ##PACKAGE##
 * @subpackage ##SUBPACKAGE##
 * @author     ##NAME## <##EMAIL##>
 * @version    SVN: $Id: Builder.php 7691 2011-02-04 15:43:29Z jwage $
 */
class Site extends BaseSite
{
	
	/**
	 * Author  Raman
	 * @param varchar $params
	 * return Array
	 * Version 1.0
	 */
	
	public static function getSiteList($params){
		
		$srh = isset($params["searchtext"]) ? $params["searchtext"] : '';
		
		$data = Doctrine_Query::create()
				->select('s.address, s.longitude, s.latitude, s.created_at, s.updated_at')
				->from('site s')
				->where('s.deleted = 0')
				->andWhere("s.address LIKE ?", "%$srh%")
				->orderBy('s.id DESC');
		
		return Zend_Json::encode(DataTable_Helper::generateDataTableResponse($data, 
				$params, 
				array("__identifier" => 's.address', 's.logitude', 's.latitude', 's.created_at', 's.updated_at'),
						array(),
						array()
				));
		exit();
		
		
		
	}
	
	
	/**
	 * Save Sites
	 * @author Raman
	 * @version 1.0
	 */
	
	public static function addSite($address, $longitude, $latitude)
	{
		
		  $siteObj = new Site();
		  $siteObj->address = BackEnd_Helper_viewHelper::stripSlashesFromString($address);
		  $siteObj->longitude = BackEnd_Helper_viewHelper::stripSlashesFromString($longitude);
		  $siteObj->latitude = BackEnd_Helper_viewHelper::stripSlashesFromString($latitude);
		  
		  $siteObj->save();
		  $lid = $siteObj->id;
		  
		  return $lid ;
	}
	
	/**
	 * get to five category
	 * @param string $keyword
	 * @return array $data
	 * @author Raman
	 * @version 1.0
	 */
	public static function searchSites($keyword) {
	
		$data = Doctrine_Query::create()->select('s.address as name')
		->from("Site s")
		->where('s.deleted = 0')
		->andWhere("s.address LIKE ?", "%$keyword%")
		->orderBy("s.id ASC")
		->limit(5)
		->fetchArray();
		return $data;
	}
	
	/**
	 * Delete gallery photo by id
	 * @param integer $params
	 * @author Raman
	 * @version 1.0
	 */
	public static function deleteSite($id) {
		$q = Doctrine_Query::create()->update('Site s')
		->set('s.deleted', 1)
		->where('s.id=?', $id)
		->execute();
		return true;
		
	}
	
}
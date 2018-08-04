<?php

/**
 * Cms
 * 
 * This class has been auto-generated by the Doctrine ORM Framework
 * 
 * @package    ##PACKAGE##
 * @subpackage ##SUBPACKAGE##
 * @author     ##NAME## <##EMAIL##>
 * @version    SVN: $Id: Builder.php 7691 2011-02-04 15:43:29Z jwage $
 */
class Cms extends BaseCms
{

	/**
	 * get default page
	 * @author romykundal 
	 * @version 1.0
	 */
	
	public function DefaultPagesList(){
		$q = Doctrine_Query::create()
			->select('id,pagetitle')
			->from('Page p')
			->where('p.pagetype="default"')
			->andWhere('p.deleted = 0')
			->andWhere('p.publish = 1')
			->orderBy('p.pagetitle ASC')
			->fetchArray();
		return $q;
	}
	
	/**
	 * get all pages
	 * @author romykundal
	 * @version 1.0
	 */
	
	public function getPages($params){
		
		$srhPage  = 	(isset($params["searchText"]) && trim($params["searchText"])!='undefined') ? $params["searchText"] : '';
		$conn2 = BackEnd_Helper_viewHelper::addConnection();
		
		if (Auth_StaffAdapter::hasIdentity()) {
			$roleId = 	Zend_Auth::getInstance()->getIdentity()->roleId;
		}
		
		BackEnd_Helper_viewHelper::closeConnection($conn2);
		
		$pageList = Doctrine_Query::create()
		->select('p.pageTitle,p.pageType,p.pageLock,p.created_at,p.publishDate,p.contentManagerName,p.publish')
		->from('Page p')
		->where('p.deleted=0')
		->andWhere("p.pagetitle LIKE ?", "$srhPage%");
	  if($roleId>2){
	  	$pageList->andWhere("p.pageLock = 0");
	  }

	  if(trim($params["searchType"])!='undefined'){
	  	$pageList->andWhere("p.pagetype = '".$params['searchType']."'");
	  }
		    
		$result = 	DataTable_Helper::generateDataTableResponse($pageList,
				$params,
				array("__identifier" => 'p.pageTitle','p.pageType','p.pageLock','p.created_at','p.publishDate','p.contentManagerName'),
				array(),
				array());
		return $result;
		
	}
	
	/**
	 * get trashed pages
	 * @author romykundal
	 * @version 1.0
	 */
	public function gettrashedPages($params){
	
		$srhPage 	= 	(isset($params["searchText"]) && trim($params["searchText"])!='') ? $params["searchText"] : '';
		$pageList = Doctrine_Query::create()
		->select('p.pageTitle,p.created_at,p.updated_at,p.contentManagerName')
		->from('Page p')
		->where('p.deleted=1')
		->andWhere("p.pagetitle LIKE ?", "$srhPage%");
	
		$result = 	DataTable_Helper::generateDataTableResponse($pageList,
				$params,
				array("__identifier" => 'p.pageTitle','p.created_at','p.updated_at','p.contentManagerName'),
				array(),
				array());
		return $result;
	
	}
	
	/**
	 * save page detail
	 * @author kkumar
	 * @version 1.0
	 */
	
	public function savePage($params){
	    
	    
	   
		
		$this->pageType='default';
		if (isset($params['selectedpageType'])){
				  
			  $this->pageType='offer';
			  if(trim($params['maxOffer'])!=''){
				$this->maxOffers = BackEnd_Helper_viewHelper::stripSlashesFromString($params['maxOffer']);
			  }
			  $this->oderOffers = 'desc';
			  if(isset($params['offersOrderchk'])){
			  $this->oderOffers = 'asc';
			  }
			 if(isset($params['timeCostraintchk'])){
			 	$this->enableTimeConstraint=1;
				$this->timenumberOfDays = BackEnd_Helper_viewHelper::stripSlashesFromString($params['numberofDays']);
				$this->timeType = BackEnd_Helper_viewHelper::stripSlashesFromString($params['postwithin']);
			}
			if(isset($params['wordCostraintchk'])){
			   $this->enableWordConstraint=1;
			   $this->wordTitle = BackEnd_Helper_viewHelper::stripSlashesFromString($params['wordConstraintTxt']);
			}
			if(isset($params['awardCostraintchk'])){
			   $this->awardConstratint=1;
			   $this->awardType = BackEnd_Helper_viewHelper::stripSlashesFromString($params['awardConstraintDropdown']);
			}
			 if(isset($params['clickCostraintchk'])){
				$this->enableClickConstraint=1;
				$this->numberOfClicks = BackEnd_Helper_viewHelper::stripSlashesFromString($params['clickConstraintTxt']);
			}
			 if(isset($params['coupconCoderegularchk'])){
				$this->couponRegular =BackEnd_Helper_viewHelper::stripSlashesFromString($params['coupconCoderegularchk']);	
			 }
			 if(isset($params['coupconCodeeditorchk'])){
				$this->couponEditorPick = BackEnd_Helper_viewHelper::stripSlashesFromString($params['coupconCodeeditorchk']); 
			 }
			 if(isset($params['coupconCodeeclusivechk'])){
				$this->couponExclusive=BackEnd_Helper_viewHelper::stripSlashesFromString ($params['coupconCodeeclusivechk']);
			 }
			 if(isset($params['saleregularchk'])){
				$this->saleRegular= BackEnd_Helper_viewHelper::stripSlashesFromString($params['saleregularchk']);
			 }
			 if(isset($params['saleeditorchk'])){
				 $this->saleEditorPick =BackEnd_Helper_viewHelper::stripSlashesFromString($params['saleeditorchk']);
			 }
			 if(isset($params['saleeclusivechk'])){
			 	$this->saleExclusive=BackEnd_Helper_viewHelper::stripSlashesFromString($params['saleeclusivechk']); 
			 }
			 if(isset($params['printableregularchk'])){
				$this->printableRegular =BackEnd_Helper_viewHelper::stripSlashesFromString($params['printableregularchk']);
			 }
		     if(isset($params['printableeditorchk'])){
				$this->printableEditorPick = BackEnd_Helper_viewHelper::stripSlashesFromString ($params['printableeditorchk']);	
			 }
			 if(isset($params['printableexclusivechk'])){
                $this->printableExclusive = BackEnd_Helper_viewHelper::stripSlashesFromString($params['printableexclusivechk']);
			 }
			 
			 $this->showPage =BackEnd_Helper_viewHelper::stripSlashesFromString($params['showPage']);
				
		}
		
		$this->publish 	 = 1;
		if($params['savePagebtn']=='draft'){
			$this->publish 	 = 0;
		}
		
		
		
		if(isset($params['publishDate']) && $params['publishDate']!=''){
		$this->publishDate = date('Y-m-d',strtotime($params['publishDate'])).' '.date('H:i:s',strtotime($params['publishTimehh'])) ;
		}
		$this->pageTitle = BackEnd_Helper_viewHelper::stripSlashesFromString($params['pageTitle']);
		$this->permaLink = BackEnd_Helper_viewHelper::stripSlashesFromString($params['pagepermalink']);
		$this->metaTitle = BackEnd_Helper_viewHelper::stripSlashesFromString($params['pagemetaTitle']);
		$this->metaDescription = BackEnd_Helper_viewHelper::stripSlashesFromString($params['pagemetaDesc']);
		$this->content = BackEnd_Helper_viewHelper::stripSlashesFromString($params['pageDesc']);
		$this->pageLock = 0;
		if (isset($params['lockPageStatuschk'])){
			$this->pageLock = 1;
		}
		
		
	   $page = $this->save();
			$pageId =  $this->id;
	    return $pageId;
	  
	}
	
	
	/**
	 * get page detail
	 * @author romykundal
	 * @version 1.0
	 */
	
	function getPageDetail($pageId){
		
		$q = Doctrine_Query::create()
		->select('p.*,w.*,logo.*,artcatg.pageid,artcatg.categoryid')->from('Page p')
		->leftJoin('p.widget w')
		->leftJoin("p.logo logo")
		->leftJoin("p.moneysaving artcatg")
		->where('p.id='.$pageId.'')
		->fetchArray();
		return $q;
	}

	


}
<?php
//Doctrine_Manager::getInstance()->bindComponent('Page', 'doctrine');

/**
 * BasePage
 * 
 * This class has been auto-generated by the Doctrine ORM Framework
 * 
 * @property integer $id
 * @property string $pageType
 * @property string $pageTitle
 * @property string $permaLink
 * @property string $slug
 * @property string $metaTitle
 * @property string $metaDescription
 * @property blob $content
 * @property boolean $publish
 * @property boolean $pageLock
 * @property integer $pageAttributeId
 * @property boolean $enableTimeConstraint
 * @property integer $timenumberOfDays
 * @property integer $timeType
 * @property integer $timeMaxOffer
 * @property boolean $timeOrder
 * @property boolean $enableWordConstraint
 * @property string $wordTitle
 * @property integer $wordMaxOffer
 * @property boolean $wordOrder
 * @property boolean $enableAwardConstraint
 * @property string $awardType
 * @property integer $awardMaxOffer
 * @property boolean $awardOrder
 * @property boolean $enableClickConstraint
 * @property integer $numberOfClicks
 * @property integer $clickMaxOffer
 * @property boolean $clickOrder
 * @property boolean $couponRegular
 * @property boolean $couponEditorPick
 * @property boolean $couponExclusive
 * @property boolean $saleRegular
 * @property boolean $saleEditorPick
 * @property boolean $saleExclusive
 * @property boolean $printableRegular
 * @property boolean $printableEditorPick
 * @property boolean $printableExclusive
 * @property boolean $showPage
 * @property PageAttribute $pageattribute
 * @property Doctrine_Collection $offer
 * @property Doctrine_Collection $widget
 * @property Doctrine_Collection $shop
 * @property Doctrine_Collection $refPageWidget
 * @property Doctrine_Collection $refOfferPage
 * 
 * @package    ##PACKAGE##
 * @subpackage ##SUBPACKAGE##
 * @author     ##NAME## <##EMAIL##>
 * @version    SVN: $Id: Builder.php 7691 2011-02-04 15:43:29Z jwage $
 */
abstract class BasePage extends Doctrine_Record
{
    public function setTableDefinition()
    {
        $this->setTableName('page');
        $this->hasColumn('id', 'integer', 20, array(
             'primary' => true,
             'type' => 'integer',
             'autoincrement' => true,
             'comment' => 'PK',
             'length' => '20',
             ));
        $this->hasColumn('pageTitle', 'string', 255, array(
             'type' => 'string',
             'length' => '255',
             ));
        $this->hasColumn('slug', 'string', 255, array(
        		'type' => 'string',
        		'length' => '255',
        ));
        $this->hasColumn('metaTitle', 'string', null, array(
             'type' => 'string'
             ));
        $this->hasColumn('metaDescription', 'string', 1024, array(
             'type' => 'string',
             'length' => '1024',
             ));
        $this->hasColumn('content', 'blob', null, array(
             'type' => 'blob',
             ));
        $this->hasColumn('publish', 'boolean', null, array(
             'type' => 'boolean',
             'comment' => 'defines page is published',
             ));
        $this->hasColumn('wordTitle', 'string', 100, array(
             'type' => 'string',
             'length' => '100',
             ));
        $this->hasColumn('wordOrder', 'boolean', null, array(
             'type' => 'boolean',
             ));
        $this->hasColumn('showPage', 'boolean', null, array(
             'type' => 'boolean',
             'comment' => 'Show as page when creating offers.',
             ));
        
        $this->hasColumn('logoId', 'integer', 20, array(
        		'unique' => true,
        		'type' => 'integer',
        		'comment' => 'FK to image.id',
        		'length' => '20',
        ));
    }

    public function setUp()
    {
        parent::setUp();
         // ...
     /*   $this->actAs('Sluggable', array(
                'unique'    => true,
                'fields'    => array('pageTitle'),
                'canUpdate' => true
            )
        ); */
        $this->hasOne('Logo as logo', array(
        		'local' => 'logoId',
        		'foreign' => 'id'));
         $softdelete0 = new Doctrine_Template_SoftDelete(array(
             'name' => 'deleted',
             'type' => 'boolean',
             ));
        $timestampable0 = new Doctrine_Template_Timestampable(array(
             'created' => 
             array(
              'name' => 'created_at',
             ),
             'updated' => 
             array(
              'name' => 'updated_at',
             ),
             ));
        $this->actAs($softdelete0);
        $this->actAs($timestampable0);
    }
}
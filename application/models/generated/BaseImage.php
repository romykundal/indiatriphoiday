<?php
Doctrine_Manager::getInstance()->bindComponent('Image', 'doctrine');

/**
 * BaseImage
 * 
 * This class has been auto-generated by the Doctrine ORM Framework
 * 
 * @property integer $id
 * @property string $ext
 * @property string $type
 * @property string $path
 * @property string $name
 * 
 * @package    ##PACKAGE##
 * @subpackage ##SUBPACKAGE##
 * @author     ##NAME## <##EMAIL##>
 * @version    SVN: $Id: Builder.php 7691 2011-02-04 15:43:29Z jwage $
 */
abstract class BaseImage extends Doctrine_Record
{
    public function setTableDefinition()
    {
        $this->setTableName('image');
        $this->hasColumn('id', 'integer', 20, array(
             'primary' => true,
             'type' => 'integer',
             'autoincrement' => true,
             'comment' => 'PK',
             'length' => '20',
             ));
        $this->hasColumn('itemId', 'integer', 20, array(
             'type' => 'integer',
             'comment' => 'FK to items.id',
             'length' => '20',
             ));
        $this->hasColumn('ext', 'string', 5, array(
             'type' => 'string',
             'length' => '5',
             ));
        $this->hasColumn('type', 'string', 10, array(
             'type' => 'string',
             'comment' => 'specifies image type : Logo image, category image, media iamge etc',
             'length' => '255',
             ));
        $this->hasColumn('path', 'string', 255, array(
             'type' => 'string',
             'length' => '255',
             ));
        $this->hasColumn('name', 'string', 255, array(
             'type' => 'string',
             'length' => '255',
             ));

        $this->setSubClasses(array(
             'Logo' => 
             array(
              'type' => 'LG',
             ),
             'HowToUseSmallImage' => 
             array(
              'type' => 'HTUS',
             ),
             'HowToUseBigImage' => 
             array(
              'type' => 'HTUB',
             ),
             'MediaImage' => 
             array(
              'type' => 'MI',
             ),
             'CategoryIcon' => 
             array(
              'type' => 'CATICON',
             ),
        	 'VisitorImage' =>
        	 array(
        	  'type' => 'VISITORPIC',
        	 ),
        	 'ArticleCategoryIcon' =>
        	 array(
        	  'type' => 'ARTCATICON',
             ),
        	 'ArticlesIcon' =>
        	 array(
        	  'type' => 'ARTICON',
        	 ),
        	'WebsiteScrenshot' =>
        		array(
        			'type' => 'SCREENSHOT',
        	 )
         ));
    }

    public function setUp()
    {
        parent::setUp();
        /*$softdelete0 = new Doctrine_Template_SoftDelete(array(
             'name' => 'deleted',
             'type' => 'boolean',
             ));*/
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
        //$this->actAs($softdelete0);
        $this->actAs($timestampable0);
    }
}
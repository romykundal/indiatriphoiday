<?php

/**
 * User
 * 
 * This class has been auto-generated by the Doctrine ORM Framework
 * 
 * @package    ##PACKAGE##
 * @subpackage ##SUBPACKAGE##
 * @author     ##NAME## <##EMAIL##>
 * @version    SVN: $Id: Builder.php 7691 2011-02-04 15:43:29Z jwage $
 */
class User extends BaseUser
{
	
	//const USER_SET_STATUS = 0;
	
	const INVALID_NEW_PASSWORD_STATUS = "-2";
	const INVALID_OLD_PASSWORD_STATUS = "-1";
	const SUCCESS = "200";

	public function setPassword($password) {
		
		return $this->_set('password', md5($password));
	}

	public function validatePassword($passwordToBeVerified) {
		if ($this->password == md5($passwordToBeVerified)) {

               return true;
		}
		return false;
	}
	
	public function validateEmail($emailToBeVerified) {
		if ($this->email == ($emailToBeVerified)) {
			return true;
		}
		return false;
	}


		public function signupUser($params) {
		
		
		$this->firstName = BackEnd_Helper_viewHelper::stripSlashesFromString($params['firstName']);
		$this->email = BackEnd_Helper_viewHelper::stripSlashesFromString($params['email']);
		$this->lastName =BackEnd_Helper_viewHelper::stripSlashesFromString($params['lastName']);
		$this->password = BackEnd_Helper_viewHelper::stripSlashesFromString($params['password']);
		$this->phonenumber= BackEnd_Helper_viewHelper::stripSlashesFromString($params['phonenumber']);
		$this->address= BackEnd_Helper_viewHelper::stripSlashesFromString($params['address']);
		$this->zipcode= BackEnd_Helper_viewHelper::stripSlashesFromString($params['zipcode']);
		$this->status = 1;
		$this->roleId = 2;

		
		//call doctrine save function 
		$this->save();
		return $this->id;

		}
	

	public function addUser($params,$imageName) {
		
		//get extension of the file 
		$ext =  BackEnd_Helper_viewHelper::getImageExtension($params['imageName']);
		$this->firstName = BackEnd_Helper_viewHelper::stripSlashesFromString($params['firstName']);
		$this->email = BackEnd_Helper_viewHelper::stripSlashesFromString($params['email']);
		$this->lastName =BackEnd_Helper_viewHelper::stripSlashesFromString($params['lastName']);
		$this->password = BackEnd_Helper_viewHelper::stripSlashesFromString($params['password']);
		$this->phoneNumber= BackEnd_Helper_viewHelper::stripSlashesFromString($params['phoneNumber']);
		$this->Address= BackEnd_Helper_viewHelper::stripSlashesFromString($params['Address']);
		$this->ZipCode= BackEnd_Helper_viewHelper::stripSlashesFromString($params['ZipCode']);
		$this->status = '1';
		
		$this->createdBy = Auth_StaffAdapter::getIdentity()->id;
		
		$pattern = '/^[0-9]{10}_(.+)/i' ;
		
		//call doctrine save function 
		$this->save();
		return $this->id;

}
	
	
	public static function checkDuplicateUser($email)
	{

		// $cnt  = Doctrine_Core::getTable("User")->findBy('email', $email)->count();
		$cnt  = Doctrine_Query::create()
		->from("User")->select()->where('email= ?', $email)->andWhere("deleted= 0")->fetchArray();
		// ->findBy('email', $email)->count();
		
		return count($cnt);
	}
	


	public function updateLoginTime($id){
		
		$user = Doctrine_Core::getTable("User")->find($id);
		if($user->currentLogIn=='0000-00-00 00:00:00'){
			$user->currentLogIn = date('Y-m-d H:i:s');
		}
		$user->lastLogIn = $user->currentLogIn;
		$user->currentLogIn = date('Y-m-d H:i:s');
		$user->save();
	}

	
	public function update($params,$imageName='') {
	   
		
		$this->firstName = BackEnd_Helper_viewHelper::stripSlashesFromString ($params['firstName']);
		$this->lastName = BackEnd_Helper_viewHelper::stripSlashesFromString ($params['lastName']);
		$this->email = BackEnd_Helper_viewHelper::stripSlashesFromString ($params['email']);
		$this->phonenumber= BackEnd_Helper_viewHelper::stripSlashesFromString($params['phonenumber']);
		$this->address= BackEnd_Helper_viewHelper::stripSlashesFromString($params['address']);
		$this->zipcode= BackEnd_Helper_viewHelper::stripSlashesFromString($params['zipcode']);
			
		$this->save();
		
		// check user want to update password or not based upon old password
		if( @strlen($params['oldPassword'])  > 7 )
		{
			// check user entered correct old password or not 
			if(self::validatePassword($params['oldPassword']))
			{
				if(strlen($params['confirmNewPassword'])  > 7)
				{
					
					// encrypt new passsword
					self::setPassword($params['confirmNewPassword']) ;
					
				} else {
					// send error code and message
					return array("status" => self::INVALID_NEW_PASSWORD_STATUS ,
							"message" => "Invalid new password" );					
				}
			} else
			{
				// send error code and message
				return array("status" => self::INVALID_OLD_PASSWORD_STATUS ,
						 "message" => "Old Password don't matched" );
			}
			
		}
		
		$this->save();
	
		// update session if profile is being updated
		if($this->id == Auth_StaffAdapter::getIdentity()->id)
		{
				new Zend_Auth_Result(Zend_Auth_Result::SUCCESS, $this);
		}
		



		
		return array("ret" => $this->id , "status" => self::SUCCESS, 
				"message" => "Record has been updated successfully");
	}		
		

	
	public static function getuserdetail($params) {
	
		$id = @$params['uId'];
		$data = Doctrine_Query::create()->select("u.*")
		->from('User u')
		//->leftJoin("u.profileimage pi")
		->where('u.id=?',$id)
		->andWhere("u.id != 1")
		->fetchArray();
	
		$result = @$data[0];
		return $result;
	}
	
  public static function getUserList($params){
  	//$role = $params['role'];
  	$srh = @$params['searchtext'];
  	
  	$data = Doctrine_Query::create()
  		->select()
  		->from("User u")
  		->where('u.deleted=0')
  		->andWhere('u.id!=1');
  		if($srh!='undefined'){
  		$data->andWhere("u.firstName LIKE ?", "$srh%");
  		}
  		$data->orderBy("u.id DESC");
    return Zend_Json::encode(
  			DataTable_Helper::generateDataTableResponse($data,
  					$params,
  					array("__identifier" => 'u.firstName', 'u.phoneNumber','u.email','u.created_at','u.updated_at'),
  					array(),
  					array()
  					));
  	
  }
  
  public static function searchKeyword($keyword) {
  	$status="null";
  	$data = Doctrine_Query::create()
  	->select('u.firstname as firstname')
  	->from("User u")
  	->where('u.deleted=0')
  	->andWhere("u.firstname LIKE ?", "$keyword%")
  	->andWhere('u.id!=1')
  	->andWhere("u.deleted=0")
  	->orderBy("u.firstname ASC")
  	->limit(5)->fetchArray();
  	return $data;
  }
  

 

  public static function getAllUserDetail(){
  	
  $data = Doctrine_Query::create()->select("u.firstName, u.lastName,u.phoneNumber,u.address,u.ZipCode")
  	->from('User u')
  //	->leftJoin("u.profileimage pi")
  	->where("u.deleted = 0")
  	->fetchArray();
  	return $data;
  }

  public static function changeStatus($params) {
   //echo "<pre>";
   //print_r($params); die;
  	$status = $params['status'] == 'offline' ? '0' : '1';
  	$q = Doctrine_Query::create()
					  	->update('User u')
					  	->set('u.status', $status)
					  	->where('u.id=?', $params['id'])
					  	->execute();
  	print_r($q); 
  	die;
  
  }
  
 /************************************Front End**************************************************/

  
  
  public static function getuserDetails($uid) {
  
  	$data = Doctrine_Query::create()->select("u.*")
  	->from('User u')
  	->where('u.id=?',$uid)
  	->fetchArray();
  
  	$result = @$data[0];
  	return $result;
  }
  

  // End Class  
}
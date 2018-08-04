<?php
class BackEnd_Helper_viewHelper
{
	/**
	 * Mail sent ot the user registration and forgot password etc
	 * @param array $recipents
	 * @param string $subject
	 * @param string $body
	 * @param string $fromEmail
	 * @param string $config
	 */
   public static function SendMail($recipents,$subject,$body,$fromEmail = null,$config = null)
	{
		
		
		
		$to = array() ; $cc =array() ; $bcc = array() ;
		
		foreach($recipents as $key => $value)
		{
		
			switch($key)
			{
				case "to" : 
					if(gettype($value) == "string")
					{		
							
						$to[] = $value; 
								
					}
					else
					{
						foreach($value as $val)
						{
							if(gettype($val) == "string")
							{
								$to[] = $val; 
							}
						}
					}
					
					break;
					
				case "cc" : 
					if(gettype($value) == "string")
					{
						$cc[] = $value; 
					}
					else
					{
						foreach($value as $val)
						{
							if(gettype($val) == "string")
							{
								$cc[] = $val; 
							}
						}
					}
		
					break;
					
				case "bcc" : 
					if(gettype($value) == "string")
						{
							$bcc[] = $value; 
						}
						else
						{
							foreach($value as $val)
							{
								if(gettype($val) == "string")
								{
									$bcc[] = $val; 
								}
							}
						}
				
					break;	
				default:
					if(gettype($value) == 'string')
					{
						$to[] = $value; 
					}
				
			}
			
		}
		if($config == null)
		{
			$config = array('auth' => 'login',
			'server' => '192.178.1.2',
			'username' => 'kraj@seasiaconsulting.com',
			'password' => 'Mind@123',
			'ssl' => 'ssl',
			'port' => '25'
			);
			
		} 
		

		//$transport = new Zend_Mail_Transport_Smtp('smtp.gmail.com',$config);
		
		$mail = new Zend_Mail();
		$mail->setBodyHtml($body);
		$mail->setBodyText(strip_tags($body));
		
// 		$mail = new Zend_Mail();
// 		$mail->setBodyText("Dear ".$params['first_name'].",\n\nYour new account has been created on ".$this->view->SiteName." your login credentials are given below.\nUsername: ".$params['email']."\nPassword: ".$params['password']."\nTo activate your account click on the link given below\n".HTTP_PATH."index/confirm/refId/".base64_encode($registerUser)."\n\nThank You \n".$this->view->SiteName." ");
// 		$mail->setFrom($this->view->SiteName, $this->view->EmailFrom);
// 		$mail->addTo($params['email'], $params['first_name']);
// 		$mail->setSubject('Account detail on '.$this->view->SiteName.' ');
// 		$mail->send();
	
		if(count($to) > 0)
		{
			foreach($to as $email)
			{
				$mail->addTo($email);
			}
			foreach($cc as $email)
			{
				$mail->addCc($email);
			}
			foreach($bcc as $email)
			{
				$mail->addBcc($email);
			}

		  	$mail->setFrom("kortingscode.nl");
			$mail->setSubject($subject);
			$mail->send();
		}
		
	}
  	/**
	 * Split with . and get extension from file 
	 * @param string $filename
	 * @return string
	 */
	public static function getImageExtension($filename)
	{
		
			$pos = strrpos($filename,".");
			$ext = substr($filename,$pos+1);
			return $ext;
		
	}
	/**
	 * Create connection with other databse
	 * mean Imbull
	 */
	 public static function addConnection()
	{
	
// 		$manager = Doctrine_Manager::getInstance();
// 		$bootstrap = Zend_Controller_Front::getInstance()->getParam('bootstrap');
// 		$options = $bootstrap->getOptions();
// 		$conn2 = $manager->connection($options['doctrine']['imbull'],
// 				"connection1");
// 		$conn2->execute('SHOW TABLES');
// 		if ($conn2 === $manager->getCurrentConnection()) {
// 			//echo 'jee';
// 		   return $conn2;
// 		}
		
}

public static function addConnectionSite()
{

// 	$manager = Doctrine_Manager::getInstance();
// 	$bootstrap = Zend_Controller_Front::getInstance()->getParam('bootstrap');
// 	$options = $bootstrap->getOptions();
// 	$conn2 = $manager->connection($options['doctrine']['dsn'],
// 			"connection2");

// 	if ($conn2 === $manager->getCurrentConnection()) {
// 		//echo 'jee'; die;
// 		return $conn2;
// 	}

}
	

	/**
	 * Close databse connection
	 * mean Imbull
	 */

	
	public static function closeConnection($conn)
	{
// 		$manager = Doctrine_Manager::getInstance();
// 		$manager->closeConnection($conn);
		
	}
	/**
	 * Generate thumnail 
	 * @param Array $file
	 * @param string $orFileName
	 * @param integer $toWidth
	 * @param integer $toHeight
	 * @param string $savePath
	 * @author er.kundal
	 */
	public static function resizeImage($file,$orFileName,$toWidth,$toHeight,$savePath)
	{
		
		$image =$file["name"];
		$uploadedfile = $file['tmp_name'];
		if ($image)
		{
	
			$filename = $file['name'];
			//get extension of the file
			$extension = self::getImageExtension($filename);
			
			$extension = strtolower($extension);
			if (($extension != "jpg") && ($extension != "jpeg") && ($extension != "png") && ($extension != "gif"))
			{
	
				//echo "Error 1";
			}
			else
			{
	
				
				if($toWidth==0 && $toHeight!=0)
				{
					//get width
					$width = self::resizeToHeightImage($toHeight,$uploadedfile);
					$toWidth = $width;
					$height = $toHeight;
				}
				elseif($toWidth!=0 && $toHeight==0)
				{
					//get height
					$height 	= self::resizeToWidthImage($toWidth,$uploadedfile);
					$toHeight = $height;
					$width   	= $toWidth;
				
				}
				elseif($toWidth!=0 && $toHeight!=0)
				{
					$width   	= $toWidth;
					$height = $toHeight;
				}
				$size=filesize($file['tmp_name']);
				if ($size > 400*1024)
				{
					//echo 'Max size';
				}
				if($extension=="jpg" || $extension=="jpeg" )
				{
					$uploadedfile = $file['tmp_name'];
					$src = imagecreatefromjpeg($uploadedfile);
				}
				else if($extension=="png")
				{
					$uploadedfile = $file['tmp_name'];
					$src = imagecreatefrompng($uploadedfile);
				}
				else
				{
					$src = imagecreatefromgif($uploadedfile);
				}
				//get size of the uploaded file
				list($width, $height) = getimagesize($uploadedfile);
				$tmp1=imagecreatetruecolor($toWidth,$toHeight);
				//resize the image and generate thumnail
				imagecopyresampled($tmp1,$src,0,0,0,0,$toWidth,$toHeight,$width,$height);
				$filename1 = $savePath;
				imagejpeg($tmp1,$filename1,100);
				imagedestroy($src);
				//imagedestroy($tmp);
				imagedestroy($tmp1);
			}
		}
	
	}
	
	
	static function romyresizeImage($originalImage,$toWidth,$toHeight,$path,$type)
	{
		ini_set("memory_limit", "200M");
		$imgType = $type;
	
	
		// Get the original geometry and calculate scales
		list($width, $height) = getimagesize($originalImage);
		if($width < $toWidth){
			$toWidth = $width;
		}
		if($height < $toHeight){
			$toHeight = $height;
		}
		if($toWidth != 0){
			$xscale=$width/$toWidth;
		}
		if($toHeight != 0){
			$yscale=$height/$toHeight;
		}
		// Recalculate new size with default ratio
		if ($yscale>$xscale){
			$new_width = round($width * (1/$yscale));
			$new_height = round($height * (1/$yscale));
		}
		else
		{
			$new_width = round($width * (1/$xscale));
			$new_height = round($height * (1/$xscale));
		}
	
		// Resize the original image
		$imageResized = imagecreatetruecolor($new_width, $new_height);
		if ($imgType =="image/gif"){
			$imageTmp = imagecreatefromgif($originalImage);
			imagecopyresampled($imageResized, $imageTmp, 0, 0, 0, 0, $new_width, $new_height, $width, $height);
			imagegif($imageResized, $path);
		}
		elseif($imgType =="image/png")
		{
			$imageTmp = imagecreatefrompng($originalImage);
			imagecopyresampled($imageResized, $imageTmp, 0, 0, 0, 0, $new_width, $new_height, $width, $height);
			imagepng( $imageResized,$path);
		}
		else {
			//$imageTmp  = imagecreatefromjpeg(TEMP_PATH.$originalImage);
			$imageTmp  = imagecreatefromjpeg($originalImage);
			imagecopyresampled($imageResized, $imageTmp, 0, 0, 0, 0, $new_width, $new_height, $width, $height);
			imagejpeg($imageResized,$path);
		}
	
		return $imageResized;
	
	}
	
	
	
	/**
	 * get the width of image
	 * @author kraj
	 * @return  $size
	 */
	public static function getWidthImage($file) {
	
		$size = getimagesize($file);
		return $size[0];
	}
	/**
	 * get the height of image
	 * @author kraj
	 * @return  $size
	 */
	public static function getHeightImage($file) {
	
		$size = getimagesize($file);
		return $size[1];
	}
	/**
	 * get size of uploaded image
	 * @author kraj
	 * @return $width
	 */
	public static function resizeToHeightImage($height,$file) {
	
		$ratio = $height / self::getHeightImage();
		$width = self::getWidthImage($file) * $ratio;
		return  $width;
		//self::resize($width,$height);
	}
	/**
	 * get size of uploaded image
	 * @author kraj
	 * @return $height
	 */
	public static function resizeToWidthImage($width,$file) {
		$ratio = $width / self::getWidthImage($file);
		$height = self::getheightImage($file) * $ratio;
		return  $height;
		//self::resize($width,$height);
	}
	/**
	 * function for image upload
	 * @author mkaur
	 *
	 */
	var $image;
	var $image_type;
	
	function load($filename) {
	
		$image_info = getimagesize($filename);
		$this->image_type = $image_info[2];
		if($this->image_type == IMAGETYPE_JPEG ) {
	
			$this->image = imagecreatefromjpeg($filename);
		} elseif( $this->image_type == IMAGETYPE_GIF ) {
	
			$this->image = imagecreatefromgif($filename);
		} elseif( $this->image_type == IMAGETYPE_PNG ) {
	
			$this->image = imagecreatefrompng($filename);
		}
	}
	function save($filename, $image_type=IMAGETYPE_JPEG, $compression=75, $permissions=null) {
	
		if( $image_type == IMAGETYPE_JPEG ) {
			imagejpeg($this->image,$filename,$compression);
		} elseif( $image_type == IMAGETYPE_GIF ) {
	
			imagegif($this->image,$filename);
		} elseif( $image_type == IMAGETYPE_PNG ) {
	
			imagepng($this->image,$filename);
		}
		if( $permissions != null) {
	
			chmod($filename,$permissions);
		}
	}
	function output($image_type=IMAGETYPE_JPEG) {
	
		if( $image_type == IMAGETYPE_JPEG ) {
			imagejpeg($this->image);
		} elseif( $image_type == IMAGETYPE_GIF ) {
	
			imagegif($this->image);
		} elseif( $image_type == IMAGETYPE_PNG ) {
	
			imagepng($this->image);
		}
	}
	public function getWidth() {
	
		return imagesx($this->image);
	}
	function getHeight() {
	
		return imagesy($this->image);
	}
	function resizeToHeight($height) {
	
		$ratio = $height / self::getHeight();
		$width = self::getWidth() * $ratio;
		self::resize($width,$height);
	}
	
	function resizeToWidth($width) {
		$ratio = $width / self::getWidth();
		$height = self::getheight() * $ratio;
		self::resize($width,$height);
	}
	
	function scale($scale) {
		$width = self::getWidth() * $scale/100;
		$height = self::getheight() * $scale/100;
		self::resize($width,$height);
	}
	
	function resize($width,$height) {
		$new_image = imagecreatetruecolor($width, $height);
		imagecopyresampled($new_image, $this->image, 0, 0, 0, 0, $width, $height, self::getWidth(), self::getHeight());
		$this->image = $new_image;
	}
	
	public static function stripSlashesFromString($string){
		$shopName = preg_replace ( "@[\\\]@", "", $string );
		return $shopName;
	}
	
}
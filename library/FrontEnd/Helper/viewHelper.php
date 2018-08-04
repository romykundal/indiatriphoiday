<?php

class FrontEnd_Helper_viewHelper
{

	/**
	 * Version.
	 */
	const VERSION = '0.0.1';
	
	/**
	 * Default options for curl.
	 */
	public static $CURL_OPTS = array(
			CURLOPT_CONNECTTIMEOUT => 10,
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_TIMEOUT        => 60,
			CURLOPT_USERAGENT      => 'musicxmatch-php-0.0.1',
	);
	
	
/**
 * returns web service response as object based on parameter passed
 * 
 * @param $method accept method type that wether 'GET' or  'POST' 
 * @param $url holds the url to call web service 
 * @param $data holds an array of data that is passed to web service
 *   
 * @author Er.kundal
 * @return object 
 * 
 */
	public static function callWebService( $method , $url , $data = null)
	{
		
			
				$curl_handle=curl_init();
	            curl_setopt($curl_handle,CURLOPT_URL, $url);
	            curl_setopt($curl_handle, CURLOPT_CUSTOMREQUEST, $method);
	            curl_setopt($curl_handle,CURLOPT_CONNECTTIMEOUT,2);
	            curl_setopt($curl_handle, CURLOPT_RETURNTRANSFER, true);
	            curl_setopt($curl_handle, CURLOPT_SSL_VERIFYPEER, false);
	            
	            $result = curl_exec($curl_handle);
	            curl_close($curl_handle);
				
				$response = Zend_Json::decode($result);
				
				
				return 	$response;		
		
	}
	
	
	// End class 
}

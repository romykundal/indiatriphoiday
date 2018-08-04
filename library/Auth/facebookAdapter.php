<?php
/**
 * Check frontend visitor is authenticated or not 
 * @author rohit
 * @version 1.0
 */
class Auth_StaffAdapter implements Zend_Auth_Adapter_Interface  {
    private $token = null;
    private $user = null;
 
    public function __construct($token) {
        $this->token = $token;
    }
 
    public function getUser() {
        return $this->user;
    }
 
    public function authenticate()  {
        if($this->token == null) {
            return new Zend_Auth_Result(Zend_Auth_Result::FAILURE_CREDENTIAL_INVALID,
                            false, array('Token was not set'));
        }
 
        $graph_url = "https://graph.facebook.com/me?access_token=" . $this->token;
        $details = json_decode(file_get_contents($graph_url));
        $user = lookUpUserInDB($details->email); // NOT AN ACTUALL FUNCTION
        if($user ==  false) { // first time login, register user
            registerUser($user); // NOT AN ACTUAL FUNCTION
        }
        $this->user = $user;
        return new Zend_Auth_Result(Zend_Auth_Result::SUCCESS,$user);
    }
}
?>
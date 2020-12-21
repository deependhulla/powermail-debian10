<?php

use go\core\model\Token;
use go\modules\community\apikeys\model\Key;

$updates['201911071216'][] = function() {
  foreach(Key::find() as $key) {

    $token = Token::find()->where(['accessToken' => $key->accessToken])->single();
    if($token == false) {
      $token = new \go\core\model\Token();
      $token->accessToken = $key->accessToken;
      $token->userId = 1;
    }
     
    $token->expiresAt = null;
    if(!$token->refresh()) {
      throw new \Exception("Could not create token for API key");      
    }
  }
};

$updates['201911071216'][] = "ALTER TABLE `apikeys_key` ADD FOREIGN KEY (`accessToken`) REFERENCES `core_auth_token`(`accessToken`) ON DELETE RESTRICT ON UPDATE RESTRICT;";

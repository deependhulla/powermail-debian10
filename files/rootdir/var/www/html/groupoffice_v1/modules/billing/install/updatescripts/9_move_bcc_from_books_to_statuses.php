<?php

//require_once(GO::config()->root_path.'GO.php');

$books = \GO\Billing\Model\Book::model()->find();

foreach($books as $book){

	if(!empty($book->bcc)){
		
		$orderStatusses = \GO\Billing\Model\OrderStatus::model()->findByAttribute('book_id', $book->id);
		
		foreach($orderStatusses as $orderStatus){
			$orderStatus->email_bcc = $book->bcc;
			$orderStatus->save();
			echo 'Moved bcc from book: '.$book->id.' to status:'.$orderStatus->id.'.<br />';
		}		
	}
}

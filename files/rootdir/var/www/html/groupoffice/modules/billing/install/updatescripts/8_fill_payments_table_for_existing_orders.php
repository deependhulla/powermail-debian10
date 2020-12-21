<?php

require_once(GO::config()->root_path.'GO.php');

$findParams = \GO\Base\Db\FindParams::newInstance();
$findParams->getCriteria()->addCondition('total_paid', 0,'>');

$orders = \GO\Billing\Model\Order::model()->find($findParams);

foreach($orders as $order){

	$hasPayments = $order->payments(\GO\Base\Db\FindParams::newInstance()->single());

	if(!$hasPayments){
		echo 'Order id: '.$order->id.' - Save new payment with amount:'.$order->total_paid.'<br />';
		$payment = new \GO\Billing\Model\Payment();
		$payment->order_id = $order->id;
		$payment->amount = $order->total_paid;
		$payment->date = $order->ptime;
		$payment->description = 'Automatic created record (created in GO update on'.date("d-m-Y").')';
		$payment->save();
	}
}

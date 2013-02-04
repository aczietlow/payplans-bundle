<?php

/**
 * @copyright	Copyright (C) 2009 - 2009 Ready Bytes Software Labs Pvt. Ltd. All rights reserved.
 * @license		GNU/GPL, see LICENSE.php
 * @package		Payplans
 * @subpackage	Discount
 * @contact		shyam@joomlaxi.com
 */
// no direct access
defined( '_JEXEC' ) or die( 'Restricted access' );

/**
 * Payplans Bundle Plugin
 *
 * @author Chris Zietlow
*/
class plgPayplansBundle extends XiPlugin
{

	public function onPayplansSystemStart()
	{
		//add bundle app path to app loader
		$appPath = dirname(__FILE__).DS.'bundle'.DS.'app';
		PayplansHelperApp::addAppsPath($appPath);

		return true;
	}

	public function onPayplansViewBeforeRender(XiView $view, $task)
	{
		//change the price of plans (View only?)
		if(($view instanceof PayplanssiteViewPlan) && $task == 'subscribe')
		{
			$plans = $view->get('plans');
			foreach ($plans as $id => $plan) {
				$plan = PayplansPlan::getInstance($id, null, $plan);
				$price = $plan->getPrice();
				$price = $price + .50;
				$plan->getDetails()->set('price', $price);
			}
		}

		//if user is not logged in then display the modified price on login page
		if(($view instanceof PayplanssiteViewPlan) && $task == 'login')
		{

		}

		if(($view instanceof PayplanssiteViewInvoice && $task == 'confirm') || ($view instanceof PayplansadminViewInvoice && $task == 'edit')) {
			$invoiceId 	= $view->getModel()->getId();
			$invoice 	= PayPlansInvoice::getInstance($invoiceId);
			$invoiceKey	= $invoice->getKey();

			$this->_assign('invoiceId', $invoiceId);
			$this->_assign('invoiceKey', $invoiceKey);

			$invoiceId 	= $invoice->getObjectId();
			$order		= PayplansApi::getOrder($orderId);
			$subId		= $order->getSubscription();
			$sub		= PayplansApi::getSubscription($subId);
			$params		= $sub->getParams();
			$data		= $params->toArray();
			//$sub->setPrice(44.00);
			$var		= JRequest::getVar('var');
			var_dump($sub->getPrice());
				
		}

		if (($view instanceof PayplanssiteViewPayment) && $task == 'pay') {
			$paymentId 	= $view->getModel()->getId();
			$payment 	= PayplansApi::getPayment($paymentId);
			$invoiceId	= $payment->getInvoice();
			$invoice	= PayplansApi::getInvoice($invoiceId);
			$orderId	= $invoice->getObjectId();
			$order 		= PayplansApi::getOrder($orderId);
			$sub		= $order->getSubscription();
			$subParams	= $sub->getParams()->toArray();
			
			//if ($subParams['name'] == Chris) {
				$sub->setPrice(99.00);
				$order->set('total', 99.00);
				$invoice->set('total', 99.00);
				//$invoice->set($property);
				$dump = $payment->getProperties();
				var_dump($dump);	
			//}
		}
	}

}

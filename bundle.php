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
 * Payplans Discount Plugin
 *
 * @author shyam
*/
class plgPayplansBundle extends XiPlugin
{

	public function onPayplansSystemStart()
	{
		//add discount app path to app loader
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
			$plan = $view->get('plan');
			$status = $plan->getStatus();
			//var_dump($status);
		}

		if(($view instanceof PayplanssiteViewInvoice && $task == 'confirm') || ($view instanceof PayplansadminViewInvoice && $task == 'edit')) {
			$invoiceId 	= $view->getModel()->getId();
			$invoice 	= PayPlansInvoice::getInstance($invoiceId);
			$invoiceKey	= $invoice->getKey();
				
			$this->_assign('invoiceId', $invoiceId);
			$this->_assign('invoiceKey', $invoiceKey);
				
			$sub = PayplansApi::getSubscription(22);
			
			$params = $sub->getParams();
			$data = $params->toArray();
			//var_dump();
			var_dump($data['address']);
		}

		if (($view instanceof PayplanssiteViewPayment) && $task == 'pay') {
			$payment = $view->get('payment');
			//var_dump($view);
		}
	}

}

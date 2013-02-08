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


		//Add style sheet for input fields
		$document = &JFactory::getDocument();
		$css = JURI::base() . 'plugins' . DS . 'payplans' .
				DS .'bundle' . DS . 'bundle' . DS . 'app' . DS . 'bundle' . DS . 'bundle.css';
		$document->addStyleSheet($css);


		//$js = JURI::base() . 'plugins' . DS . 'payplans' . DS .'bundle' . DS . 'bundle' . DS . 'app' . DS . 'bundle' . DS . 'bundle.js';
		//add noconflict to use jQuery with Mootools
		//added the script in the body. Has access to the payplans jquery functions
		// 		$document->addScript('http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js');
		// 		$document->addCustomTag( '<script type="text/javascript">jQuery.noConflict();</script>' );
		// 		$document->addScript($js);

		//  		$js_test = JURI::base() . 'plugins' . DS . 'payplans' . DS .'bundle' . DS . 'bundle' . DS . 'app' . DS . 'bundle' . DS . 'test.js';
		//  		PayplansHtml::script($js_test);
		//yplansHtml::s

			
		return true;
	}

	public function onPayplansViewBeforeRender(XiView $view, $task)
	{
		//change the price of plans (View only?)
		if(($view instanceof PayplanssiteViewPlan) && $task == 'subscribe')
		{
		}

		//if user is not logged in then display the modified price on login page
		if(($view instanceof PayplanssiteViewPlan) && $task == 'login')
		{
		}

		//If user is logged in and confirming payment task
		if(($view instanceof PayplanssiteViewInvoice && $task == 'confirm') || ($view instanceof PayplansadminViewInvoice && $task == 'edit'))
		{
			$invoiceId = $view->getModel()->getId();
			$invoice = PayplansApi::getInvoice($invoiceId);

			$payplans_js = "<script src='" . PayplansHelperUtils::pathFS2URL(dirname(__FILE__).DS. 'bundle' . DS . 'app' . DS . 'bundle' . DS . 'bundle.js') ."' type='text/javascript'></script>";
			$html = $payplans_js . "
					<div class ='pp-app-bundle'>
						<button id='pp-custom-calculate' type='button'>add to total</button><br />
						<button id='pp-custom-addFamily' type='button'>Add</button>
						<button id='pp-custom-removeFamily' type='button'>Remove</button>
						<button id='pp-custom-resetFamily' type='button'>Reset</button>
						<div class='pp-app-bundle-inputs'>
							<input type='hidden' name='invoiceId' value='". $invoiceId ."'/>
						</div>
					</div>
							";
			var_dump($invoice->getParam('familyChildren'));
			var_dump($invoice->getParam('familyAdult'));
			return array('pp-subscription-details' => $html);
		}

		//view of subscription invoice.
		if (($view instanceof PayplanssiteViewPayment) && $task == 'pay')
		{
		}
	}
	/**
	 * custom pricing update trigger. Is triggered via ajax call from bundle.js
	 * @param int $invoiceId
	 * Invoice id used for querying the invoice whose price will be updated.
	 */
	public function onPayplansInvoiceUpdatePricing($invoiceId, $familyChildren, $familyAdult) {

		if ($familyChildren < 0) {
			$familyChildren = 0;
		}

		if ($familyAdult < 0) {
			$familyAdult = 0;
		}
		
		$invoice = PayplansApi::getInvoice($invoiceId);
		
		$invoice->setParam('familyChildren', $familyChildren);
		$invoice->setParam('familyAdult', $familyAdult);

		$amount = ($familyChildren * 75.00) + ($familyAdult * 120.00);		
		
		$modifier = PayplansModifier::getInstance();
		$modifier->set('message', 'Applying additional cost here')
		->set('invoice_id', $invoiceId)
		->set('user_id', $invoice->getBuyer())
		->set('type', 'bundle')
		->set('amount', $amount)
		->set('reference', 'bundle')
		->set('percentage', false)
		->set('frequency', PayplansModifier::FREQUENCY_EACH_TIME)
		->set('serial', PayplansModifier::FIXED_NON_TAXABLE)
		->save();

		$invoice->refresh()->save();
	}

}

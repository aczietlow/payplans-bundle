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
	/**
	 * loader function, used to load apps, stylesheets, and javascript
	 * @return boolean
	 */
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
		$document->addScript('http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js');
		$document->addScript('http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.0/jquery-ui.min.js');

		return true;
	}


	/**
	 * Hooks invoice before view is rendered.
	 *
	 * @param XiView $view
	 * @param unknown $task
	 * @return multitype:string
	 */
	public function onPayplansViewBeforeRender(XiView $view, $task)
	{

		if($view instanceof PayplanssiteViewSubscription && $task == 'display')
		{
			$tmpl = 'subscription_edit';
			$itemId = $view->getModel()->getId();
			$invoice = PayplansApi::getInvoice($itemId);
			$invoiceId = $invoice->getId();
			$subscriptionApp  = new PayplansAppBundle();

			$db = JFactory::getDBO();

			$query = $db->getQuery(true);

			$query
			->select(array('*'))
			->from('#__bundle')
			->where("invoice_id = 211");

			$db->setQuery($query);
			$results = $db->loadObjectList();
			
			return $subscriptionApp->renderWidget($results, $tmpl);
		}

		if(($view instanceof PayplanssiteViewInvoice && $task == 'confirm') || ($view instanceof PayplansadminViewInvoice && $task == 'edit'))
		{
			$tmpl  =  'orderconfirm';
			$itemId = $view->getModel()->getId();
			$invoice = PayplansApi::getInvoice($itemId);
				
			$payplans_js_src = PayplansHelperUtils::pathFS2URL(dirname(__FILE__).DS. 'bundle' . DS . 'app' . DS . 'bundle' . DS . 'bundle.js');
				
			$this->_assign('payplans_js_src', $payplans_js_src);
			$this->_assign('invoice_id', $invoice->getId());
				
			return $this->_render($tmpl);
		}

		return false;
	}
	/**
	 * custom pricing update trigger. Is triggered via ajax call from bundle.js
	 * @param int $invoiceId
	 * Invoice id used for querying the invoice whose price will be updated.
	 */
	//#TODO change fix amount to variable amount set during instantiation of app
	public function onPayplansInvoiceUpdatePricing($invoiceId, $familyChildren, $familyAdults) {

		//prevent a signed number being passed.
		// 		if ($familyChildren < 0) {
		// 			$familyChildren = 0;
		// 		}

		// 		if ($familyAdult < 0) {
		// 			$familyAdult = 0;
		// 		}

		$invoice = PayplansApi::getInvoice($invoiceId);



		$amount = ($familyMembers * 75.00) + ($familyMembers * 120.00);

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

	/**
	 * Adds child family members to the invoice object.
	 *
	 * @param int $invoiceId
	 * the invoice_id used to reference the invoice
	 * @param string $familyName
	 * name of the family member
	 * @param string $dob
	 * date choosen by jquery ui datepicker
	 * @param enum $sex
	 * (M male, F female) Sex of the family member
	 * @param int $age
	 * the age of the family member
	 */
	//#TODO create table on install on app (#__payplans_bundle)
	//#TODO update #__bundle to #__payplans_bundle (see above)
	public function onPayplansInvoiceAddChildren($invoiceId, $familyName, $dob, $sex, $age) {
		$invoice = PayplansApi::getInvoice($invoiceId);
		$db = JFactory::getDBO();

		$query = $db->getQuery(true);

		$query
		->select(array('*'))
		->from('#__bundle')
		->where("invoice_id = '$invoiceId'")
		->where("family_name ='$familyName'")
		->where("dob = '$dob'")
		->where("sex = '$sex'")
		->where("age = '$age'");

		$db->setQuery($query);


		try {
			$result = $db->loadObjectList();
		} catch (Exception $e) {
			$invoice->setParam('Error', $e->getMessage(). " on line" . $e->getLine());
		}

		//logic check fails
		if (count($result) > 0){
			$invoice->setParam('Error', "A record for that family member already exists.");
		} else {
			$familyMember = new stdClass();
			$familyMember->invoice_id = $invoiceId;
			$familyMember->family_name = $familyName;
			$familyMember->dob = $dob;
			$familyMember->sex = $sex;
			$familyMember->age = $age;

			JFactory::getDBO()->insertObject('#__bundle', $familyMember);
		}

		$numberOfChildren = $invoice->getParam('familyChildren');
		$invoice->setParam('familyChildren', $numberOfChildren++);

		//update the invoice object
		$invoice->refresh()->save();


	}

	/**
	 * Adds Adult family members to the invoice object.
	 *
	 * @param int $invoiceId
	 * the invoice_id used to reference the invoice
	 * @param string $familyName
	 * name of the family member
	 * @param string $dob
	 * date choosen by jquery ui datepicker
	 * @param enum $sex
	 * sex of family member. either M or F
	 * @param int $age
	 * the age of the family member
	 */
	//#TODO create table on install on app (#__payplans_bundle)
	//#TODO update #__bundle to #__payplans_bundle (see above)
	public function onPayplansInvoiceAddAdult($invoiceId, $familyName, $dob, $sex, $age) {
		$invoice = PayplansApi::getInvoice($invoiceId);
		$db = JFactory::getDBO();

		$query = $db->getQuery(true);

		$query
		->select(array('*'))
		->from('#__bundle')
		->where("invoice_id = '$invoice_id'")
		->where("family_name ='$familyName'")
		->where("dob = '$dob'")
		->where("sex = '$sex'")
		->where("age = '$age'")
		->order('id');

		$db->setQuery($query);



		try {
			$result = $db->loadObjectList();
		} catch (Exception $e) {
			$invoice->setParam('Error', $e->getMessage(). " on line" . $e->getLine());
		}

		if (count($result) > 0){
			$invoice->setParam('Error', "A record for that family member already exists");
		} else {
			$familyMember = new stdClass();
			$familyMember->invoice_id = $invoiceId;
			$familyMember->family_name = $familyName;
			$familyMember->dob = $dob;
			$familyMember->sex = $sex;
			$familyMember->age = $age;

			JFactory::getDBO()->insertObject('#__bundle', $familyMember);
		}

		$numberOfAdults = $invoice->getParam('familyAdults');
		$invoice->setParam('familyAdults', $numberOfAdults++);

		//update the invoice object
		$invoice->refresh()->save();


	}

}

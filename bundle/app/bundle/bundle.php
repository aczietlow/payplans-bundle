<?php 

defined ('_JEXEC' ) or die();

/**
 * Context System
*/
class PayplansAppBundle extends PayplansApp {
	// helps Payplans get location of the file
	protected $_location = __FILE__;

	/** Let the system know if your app-instance should be triggered for given event and reference object.
	 $refObject : reference object of any type, check its type on which you want to work. It is generally a type Transaction / Invoice / Payment /Plan / Subscription
	 $eventName : a string which starts from onPayplans

	 === IMP : ==
	 This function ensures your app is triggered for certain plans (as defined by user during app instance creation)
	 Therefore
	 1. Do not override this function until it is essential.
	 2. Better to override function _isApplicable

	 */
	function isApplicable($refObject = null, $eventName='')
	{
		//if you want to decide to trigger app as per event name
		// then return true from here
		if($eventName == 'onPayplansControllerCreation'){
			return true;
		}

		// make sure to let system handle default behaviour
		return parent::isApplicable($refObject,$eventName);
	}


	// if you need additional checks of refObject, then do it here
	function _isApplicable($refObject = null, $eventName='')
	{
		return true;
	}

	//trigger update based on this event
	public function onPayplansSubscriptionAfterSave($prev, $new) {

	}

	public function onPayplansInvoiceAfterSave($prev, $new) {
		
	}
	
	//my custom trigger
	public function onPayplansInvoiceUpdatePricing($invoiceId) {
		
		
		$invoice = PayplansApi::getInvoice($invoiceId);
		
		$modifier = PayplansModifier::getInstance();
		$modifier->set('message', 'Applying additional cost here')
		->set('invoice_id', $invoiceId)
		->set('user_id', $invoice->getBuyer())
		->set('type', 'bundle')
		->set('amount', 0.99)
		->set('reference', 'bundle')
		->set('percentage', false)
		->set('frequency', PayplansModifier::FREQUENCY_EACH_TIME)
		->set('serial', PayplansModifier::FIXED_NON_TAXABLE)
		->save();
			
		$invoice->refresh()->save();
		//header('location: index.php?option=com_payplans&view=invoice&task=confirm&invoice_key=8XRE0BAJGB6J&Itemid=228');
	}

	/**

	Available events

	onPayplansPlanBeforeSave
	onPayplansPlanAfterSave

	onPayplansSubscriptionBeforeSave
	onPayplansSubscriptionAfterSave

	onPayplansOrderBeforeSave
	onPayplansOrderAfterSave

	onPayplansPaymentBeforeSave
	onPayplansPaymentAfterSave

	onPayplansAppBeforeSave
	onPayplansAppAfterSave

	onPayplansUserBeforeSave
	onPayplansUserAfterSave

	onPayplanswalletUpdate

	onPayplansInvoiceBeforeSave
	onPayplansInvoiceAfterSave

	onPayplansOrderAfterSave
	onPayplansOrderBeforeSave


	Control Events : Events triggered during processing of any request
	*/
}



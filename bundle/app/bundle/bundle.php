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
	
//  	public function onPayplansSubscriptionAfterSave($prev, $new) {
//  		//$subId	= $new->getId();
//  		//$new->setPrice(11.00);
//  		//$new->save();
// 	}
	
	public function onPayplansInvoiceAfterSave($new) {
		//$new->setPrice(22.00);
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
	onPlayplansOrderBeforeSave
	
	Control Events : Events triggered during processing of any request
	*/
}



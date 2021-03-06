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
	
	function renderWidget($results, $tmpl)
	{
		$user = XiFactory::getUser();
		if(!$user->id){
			return false;
		}
	
		$this->assign('results', $results);
		return array('pp-subscription-details' => $this->_render($tmpl));
		
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



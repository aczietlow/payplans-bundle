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
// 		$modifier = PayplansModifier::getInstance();
// 		$modifier
// 		->set('message',XiText::_('COM_PAYPLANS_APP_BASIC_DISCOUNT_MESSAGE'))
// 		->set('invoice_id', $object->getId())
// 		->set('user_id', $object->getBuyer())
// 		->set('type', $this->getType())
// 		->set('amount', - $this
// 				->getAppParam('coupon_amount', $amount)) // Discount should be negative
// 				->set('reference', $this
// 						->getAppParam('coupon_code', ''))
// 						->set('percentage', $isPercentage ? true : false)
// 						->set('frequency', $this
// 								->getAppParam('onlyFirstRecurringDiscount', false) ? PayplansModifier::FREQUENCY_ONE_TIME : PayplansModifier::FREQUENCY_EACH_TIME);
// 		$serial = ($isPercentage === true)? PayplansModifier::PERCENT_NON_TAXABLE: PayplansModifier::FIXED_NON_TAXABLE;
// 		// XITODO : add error checking
// 		$modifier
// 		->set('serial', $serial)
// 		->save();
	}

	public function onPayplansInvoiceAfterSave($prev, $new) {
// 		$invoiceId 	= $new->getObjectId();
// 		$order		= PayplansApi::getOrder($orderId);
// 		$subId		= $order->getSubscription();
// 		$sub		= PayplansApi::getSubscription($subId);
// 		$params		= $sub->getParams();
// 		$data		= $params->toArray();
// 		$sub->setPrice(33.00);
// 		$var = $sub->setOrder($order);
// 		$sub->save();


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



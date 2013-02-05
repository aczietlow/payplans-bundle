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

		
		//external method1
 		$document = &JFactory::getDocument();
 		$js = JURI::base() . 'plugins' . DS . 'payplans' . DS .'bundle' . DS . 'bundle' . DS . 'app' . DS . 'bundle' . DS . 'bundle.js';
 		//add noconflict to use jQuery with Mootools
 		$document->addScript('http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js');
 		$document->addCustomTag( '<script type="text/javascript">jQuery.noConflict();</script>' );
 		$document->addScript($js);
		
 		//Include jquery framework
 		//JHtml::_('jquery.framework');
 		
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

						$html = "
								
								<label>Family member</label><input type='text' name='family'  /><br />
								<button id='pp-custom-calculate' type='button' onclick='test_joomla_js()'>add to total</button>
								";
						var_dump();
						return array('pp-subscription-details' => $html);
		}

		//view of subscription invoice.
		if (($view instanceof PayplanssiteViewPayment) && $task == 'pay')
		{
		}
	}

}

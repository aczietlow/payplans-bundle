



jQuery('document').ready(function(){
	jQuery('#pp-custom-calculate').click(function(){
		var invoiceId = jQuery('input[name="invoiceId"]').val();
		var url = "index.php?option=com_payplans&view=invoice&task=trigger&event=onPayplansInvoceiUpdatePricing";	
		var args   = { 'event_args' : {'invoice_id' : invoiceId} };
		alert(url);
		
		
	});
});

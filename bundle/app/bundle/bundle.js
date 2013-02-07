
(function($) {
	// START :
	// Scoping code for easy and non-conflicting access to $.
	// Should be first line, write code below this line.
	if (typeof (payplans.apps) == 'undefined') {
		payplans.apps = {};
	}
	
	payplans.apps.bundle = {
		calculatePricing : function(invoiceId) {

			var url = "index.php?option=com_payplans&view=invoice&task=trigger&event=onPayplansInvoiceUpdatePricing";
			var args = {
				'event_args' : {
					'invoiceId' : invoiceId
				}
			};
			//alert(invoiceId+'|'+url);
			payplans.ajax.go(url, args);
			alert(window.location.search);
		}
	};

	payplans.jQuery('document').ready(function() {
		payplans.jQuery('#pp-custom-calculate').click(function () {
			var invoiceId = payplans.jQuery('input[name="invoiceId"]').val();
			payplans.apps.bundle.calculatePricing(invoiceId);
		});
		
	});
	// ENDING :
	// Scoping code for easy and non-conflicting access to $.
	// Should be last line, write code above this line.
})(payplans.jQuery);

// jQuery('document').ready(function(){
// jQuery('#pp-custom-calculate').click(function(){
// var invoiceId = jQuery('input[name="invoiceId"]').val();
// var url =
// "index.php?option=com_payplans&view=invoice&task=trigger&event=onPayplansInvoceiUpdatePricing";
// var args = { 'event_args' : {'invoice_id' : invoiceId} };
// alert(url);
//		 
//		
// });
// });

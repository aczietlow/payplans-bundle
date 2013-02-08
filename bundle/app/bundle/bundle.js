
(function($) {
	// START :
	// Scoping code for easy and non-conflicting access to $.
	// Should be first line, write code below this line.
	if (typeof (payplans.apps) == 'undefined') {
		payplans.apps = {};
	}
	
	payplans.apps.bundle = {
		calculatePricing : function(invoiceId, familyChildren, familyAdult) {

			var url = "index.php?option=com_payplans&view=invoice&task=trigger&event=onPayplansInvoiceUpdatePricing";
			var args = {
				'event_args' : {
					'invoiceId' : invoiceId,
					'familyChildren' : 1,
					'familyAdult'	:4,
				}
			};
			//alert(invoiceId+'|'+url);
			payplans.ajax.go(url, args);
			//window.location.href = window.location.href;
		}
	};

	payplans.jQuery('document').ready(function() {
		
		var i = payplans.jQuery('#.pp-app-bundle-inputs input').size() + 1;
		
		payplans.jQuery('#pp-custom-calculate').click(function () {
			var invoiceId = payplans.jQuery('input[name="invoiceId"]').val();
			alert($(":input[name='family']").val().length);
			
			payplans.apps.bundle.calculatePricing(invoiceId);
		});
		
		payplans.jQuery('#pp-custom-addFamily').click(function() {
			payplans.jQuery('<div><input type="text" class="field" name="dynamic[]" value="' + i + '" /></div>').fadeIn('slow').appendTo('.pp-app-bundle-inputs');
	        i++;
		});
		payplans.jQuery('#pp-custom-removeFamily').click(function() {
			if(i > 1) {
		        $('.field:last').remove();
		        i--;
		    }
		});
		payplans.jQuery('#pp-custom-resetFamily').click(function() {
			while(i > 2) {
		        $('.field:last').remove();
		        i--;
		    }
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

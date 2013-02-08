
(function($) {
	// START :
	// Scoping code for easy and non-conflicting access to $.
	// Should be first line, write code below this line.
	if (typeof (payplans.apps) == 'undefined') {
		payplans.apps = {};
	}
	
	payplans.apps.bundle = {
		calculatePricing : function(invoiceId, familyMembers) {

			var url = "index.php?option=com_payplans&view=invoice&task=trigger&event=onPayplansInvoiceUpdatePricing";
			var args = {
				'event_args' : {
					'invoiceId' : invoiceId,
					'familyChildren' : familyMembers,
				}
			};
			//alert(invoiceId+'|'+url);
			payplans.ajax.go(url, args);
			//window.location.href = window.location.href;
		}
	};

	payplans.jQuery('document').ready(function() {
		
		var i = payplans.jQuery('#.pp-app-bundle-inputs input').size();
		
		payplans.jQuery('#pp-custom-calculate').click(function () {
			var invoiceId = payplans.jQuery('input[name="invoiceId"]').val();
			var familyMembers = i - 1;
			payplans.apps.bundle.calculatePricing(invoiceId, familyMembers );
		});
		
		//add 1 add family field set
		payplans.jQuery('#pp-custom-addFamily').click(function() {
			payplans.jQuery('<div class="field">' +
					'<label>Family Member Name</label><input type="text" class="fieldFamilyName" name="dynamic[]" value="' + i + '" /><br />'+
					'<label>Sex| </label>' +
					'<label>Male</label><input type="radio" name="dynamic[]" value="M" />'+
					'<label>Female</label><input type="radio" name="dynamic[]" value="F" /><br />'+
					'<label>Date of Birth</label><input type="text"  name="dynamic[]" value="' + i + '" /><br />'+
					'<label>Under 18 | </label>' +
					'<label>Yes</label><input type="radio" name="dynamic[]" value="True" />'+
					'<label>No</label><input type="radio" name="dynamic[]" value="False" /><br /><hr />'+
					'</div>').fadeIn('slow').appendTo('.pp-app-bundle-inputs');
	        i++;
		});
		
		//remove 1 add family field set
		payplans.jQuery('#pp-custom-removeFamily').click(function() {
			if(i > 1) {
		        $('.field:last').remove();
		        i--;
		    }
		});
		
		//reset add family fields
		payplans.jQuery('#pp-custom-resetFamily').click(function() {
			while(i > 2) {
		        $('.field:last').remove();
		        i--;
		    }
		});
		
		//sibmit function
		payplans.jQuery('#payplans-order-confirm').click(function(){
            
		    var answers = [];
		    payplans.jQuery.each(payplans.jQuery('.fieldFamilyName'), function() {
		        answers.push(payplans.jQuery(this).val());
		    });
		     
		    if(answers.length == 0) {
		        answers = "none";
		    }  
		 
		    alert(answers);
		     
		    return false;
		                                 
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

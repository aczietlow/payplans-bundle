
(function($) {
	// START :
	// Scoping code for easy and non-conflicting access to $.
	// Should be first line, write code below this line.
	if (typeof (payplans.apps) == 'undefined') {
		payplans.apps = {};
	}
	
	payplans.apps.bundle = {
		// update the price of the invoice object via ajax call
		calculatePricing : function(invoiceId, familyMembers) {

			var url = "index.php?option=com_payplans&view=invoice&task=trigger&event=onPayplansInvoiceUpdatePricing";
			var args = {
				'event_args' : {
					'invoiceId' : invoiceId,
					'familyChildren' : familyMembers,
					//'familyAdult'	: array,
				}
			};
			//alert(invoiceId+'|'+url);
			payplans.ajax.go(url, args);
			//window.location.href = window.location.href;
		},
		
		addParams : function(invoiceId, familyName, dob, sex, u18) {
			var url = "index.php?option=com_payplans&view=invoice&task=trigger&event=onPayplansInvoiceAddParams";
			var args = {
				'event_args' : {
					'invoiceId' : invoiceId,
					'familyName' : familyName,
					'dob' : dob,
					'sex' : sex,
					'u18' : u18,
				}
			};
			for (var i =0; i < familyName.length; i++) {
				alert(familyName[i] + " "  +
						dob[i] + " "  +
						sex[i] + " "  +
						u18[i]);
			}
			
			//payplans.ajax.go(url, args);
		},
		

	};
	


	payplans.jQuery('document').ready(function() {
		
		var i = payplans.jQuery('#.pp-app-bundle-inputs input').size();
		
		payplans.jQuery('#pp-custom-calculate').click(function () {
			var invoiceId = payplans.jQuery('input[name="invoiceId"]').val();
			
			var familyMembers = new Object();
			familyMembers.name = [];
			familyMembers.dob = [];
			familyMembers.sex = [];
			familyMembers.u18 = [];
			
			var familyChildren = new Object();
			familyChildren.name = [];
			familyChildren.dob = [];
			familyChildren.sex = [];
			familyChildren.u18 = [];
			
			var familyAdults = new Object();
			familyAdults.name = [];
			familyAdults.dob = [];
			familyAdults.sex = [];
			familyAdults.u18 = [];
			
			payplans.jQuery.each(payplans.jQuery('.fieldFamilyName'), function() {
		        familyMembers.name.push(payplans.jQuery(this).val());
		    });
			payplans.jQuery.each(payplans.jQuery('.fieldFamilySex'), function() {
				familyMembers.dob.push(payplans.jQuery(this).val());
			});
			payplans.jQuery.each(payplans.jQuery('.fieldFamilyDOB'), function() {
				familyMembers.sex.push(payplans.jQuery(this).val());
			});
			payplans.jQuery.each(payplans.jQuery('.fieldFamilyU18'), function() {
				familyMembers.u18.push(payplans.jQuery(this).val());
			});
			
			for (var i = 0; i < familyMembers.name.length; i++) {
				if (familyMembers.u18[i] == 'True') {
					familyChildren.name.push(familyMembers.name[i]);
					familyChildren.sex.push(familyMembers.sex[i]);
					familyChildren.dob.push(familyMembers.dob[i]);
					familyChildren.u18.push(familyMembers.u18[i]);
				}
				else {
					familyAdults.name.push(familyMembers.name[i]);
					familyAdults.sex.push(familyMembers.sex[i]);
					familyAdults.dob.push(familyMembers.dob[i]);
					familyAdults.u18.push(familyMembers.u18[i]);
				}
				
			}
			payplans.apps.bundle.addParams(invoiceId, familyMembers);
			payplans.apps.bundle.calculatePricing(invoiceId, familyMembers.name.length );
		});
		
		//add 1 add family field set
		payplans.jQuery('#pp-custom-addFamily').click(function() {
			payplans.jQuery('<div class="field">' +
					'<label>Family Member Name</label><input type="text" class="fieldFamilyName" name="bundle[]" value="' + i + '" /><br />'+
					'<label>Sex| </label>' +
					'<label>Male</label><input type="radio" class="fieldFamilySex" name="bundle-sex-' + i + '[]" value="M" />'+
					'<label>Female</label><input type="radio" class="fieldFamilySex" name="bundle-sex-' + i + '[]" value="F" /><br />'+
					'<label>Date of Birth</label><input type="text" class="fieldFamilyDOB" name="bundle-dob[]" value="' + i + '" /><br />'+
					'<label>Under 18 | </label>' +
					'<label>Yes</label><input type="radio" class="fieldFamilyU18" name="bundle-u18-' + i + '[]" value="True" />'+
					'<label>No</label><input type="radio" class="fieldFamilyU18" name="bundle-u18-' + i + '[]" value="False" /><br /><hr />'+
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
		
		//submit function
		payplans.jQuery('#payplans-order-confirm').click(function(){
            
		    var answers = [];
		    payplans.jQuery.each(payplans.jQuery('.fieldFamilyName'), function() {
		        answers.push(payplans.jQuery(this).val());
		    });
		     
		    if(answers.length == 0) {
		        answers = "none";
		    }  
		 
		    alert(answers);
		     
		    return false; //stop the completion of the order for debugging only
		                                 
		    });
	});
	// ENDING :
	// Scoping code for easy and non-conflicting access to $.
	// Should be last line, write code above this line.
})(payplans.jQuery);

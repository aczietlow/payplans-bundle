
(function($) {
	// START :
	// Scoping code for easy and non-conflicting access to $.
	// Should be first line, write code below this line.
	if (typeof (payplans.apps) == 'undefined') {
		payplans.apps = {};
	}
	
	payplans.apps.bundle = {
		/**
		 * Updates the price of the invoice object via ajax call
		 * @param int invoiceId
		 * The id of the invoice to be updated
		 * @param int familyMembers
		 * The number of family members that have been added to the subscription.
		 */
		calculatePricing : function(invoiceId, familyMembers) {
			
			var url = "index.php?option=com_payplans&view=invoice&task=trigger&event=onPayplansInvoiceUpdatePricing";
			var args = {
				'event_args' : {
					'invoiceId' : invoiceId,
					'familyChildren' : familyMembers,
					//'familyAdult'	: array,
				}
			};
			//makes ajax call
			payplans.ajax.go(url, args);
		},
		
		/**
		 * Adds the family members to the invoice object params property
		 * 
		 * @param invoiceId
		 * The id of the invoice to be updated
		 * @param familyName
		 * The name of the family member to be added to the invoice
		 * @param dob
		 * The date of birth of the family member
		 * @param sex
		 * The sex of the family member
		 * @param u18
		 * Determines if the family member is under 18
		 */
		//#TODO use dob to check the date of the family member
		addParams : function(invoiceId, familyChildren, familyAdults) {
			
			for (var i = 0; i < familyChildren.name.length; i++) {
				var url = "index.php?option=com_payplans&view=invoice&task=trigger&event=onPayplansInvoiceAddChildren";
				var args = {
					'event_args' : {
						'invoiceId' : invoiceId,
						'familyName' : familyChildren.name[i],
						'dob' : familyChildren.dob[i],
						'sex' : familyChildren.sex[i],
						'u18' : familyChildren.u18[i],
					}
				};
				//makes ajax call
				payplans.ajax.go(url, args);
			};
			
			for (var i = 0; i < familyAdults.name.length; i++) {
				var url = "index.php?option=com_payplans&view=invoice&task=trigger&event=onPayplansInvoiceAddAdult";
				var args = {
						'event_args' : {
							'invoiceId' : invoiceId,
							'familyName' : familyAdults.name[i], 
							'dob' : familyAdults.dob[i],
							'sex' : familyAdults.sex[i],
							'u18' : familyAdults.u18[i],
						}
				};
				//makes ajax call
				payplans.ajax.go(url, args);
			};
			
			
		
		},
		

	};
	


	payplans.jQuery('document').ready(function() {
		
		var i = payplans.jQuery('#.pp-app-bundle-inputs input').size();

		payplans.jQuery('#pp-custom-calculate').click(function () {
			var count = i-1;
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
			
			
			//populate familyMembers object
			payplans.jQuery.each(payplans.jQuery('.fieldFamilyName'), function() {
		        familyMembers.name.push(payplans.jQuery(this).val());
		    });
			payplans.jQuery.each(payplans.jQuery('.fieldFamilyDOB'), function() {
				familyMembers.dob.push(payplans.jQuery(this).val());
			});
			payplans.jQuery.each(payplans.jQuery('.fieldFamilySex'), function() {
				familyMembers.sex.push(payplans.jQuery(this).val());
			});
			payplans.jQuery.each(payplans.jQuery('.fieldFamilyU18:checked'), function() {
				familyMembers.u18.push(payplans.jQuery(this).val());
			});
			//polymorph members object to children or adults respectively
			for (var j = 0; j < count; j++) {
				if (familyMembers.u18[j] === 'True') {
					familyChildren.name.push(familyMembers.name[j]);
					familyChildren.sex.push(familyMembers.sex[j]);
					familyChildren.dob.push(familyMembers.dob[j]);
					familyChildren.u18.push(familyMembers.u18[j]);
				}
				else {
					familyAdults.name.push(familyMembers.name[j]);
					familyAdults.sex.push(familyMembers.sex[j]);
					familyAdults.dob.push(familyMembers.dob[j]);
					familyAdults.u18.push(familyMembers.u18[j]);
				}
				
			}
			
			payplans.apps.bundle.addParams(invoiceId, familyChildren, familyAdults);
//			payplans.apps.bundle.calculatePricing(invoiceId, count );
		});
		
		//add 1 add family field set
		payplans.jQuery('#pp-custom-addFamily').click(function() {
			
			//day select input for dob
			dobDay = '';
			for (var x =1; x <= 31; x++ ) {
				dobDay = dobDay + '<option value="' + x + '">' + x + '</option>';
			}
			
			//year select input for dob
			dobYear = '';
			for (var x =2013; x >= 1900 ; x-- ) {
				dobYear = dobYear + '<option value="' + x + '">' + x + '</option>';
			}
			
			payplans.jQuery('<div class="field">' +
					'<label>Family Member Name</label><input type="text" class="fieldFamilyName" name="bundle[]" value="' + i + '" /><br />'+
					'<label>Sex| </label>' +
					'<label>Male</label><input type="radio" class="fieldFamilySex" name="bundle-sex-' + i + '[]" value="M" />'+
					'<label>Female</label><input type="radio" class="fieldFamilySex" name="bundle-sex-' + i + '[]" value="F" /><br />'+
					'<label>Date of Birth</label><select class="fieldFamilyDOB-month" name="bundle-dob[month]">' +
						'<option value="01">Jan</option>' +
						'<option value="02">Feb</option>' +
						'<option value="03">March</option>' +
						'<option value="04">April</option>' +
						'<option value="05">May</option>' +
						'<option value="06">June</option>' +
						'<option value="07">July</option>' +
						'<option value="08">Aug</option>' +
						'<option value="09">Sept</option>' +
						'<option value="10">Oct</option>' +
						'<option value="11">Nov</option>' +
						'<option value="12">Dec</option>' +
					'</select>'+
					'<select class="fieldFamilyDOB-day" name="bundle-dob[day]">' +
						dobDay +
					'</select>' +
					'<select class="fieldFamilyDOB-year" name="bundle-dob[year]">' +
						dobYear +
					'</select><br />' +
						
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
			while(i > 1) {
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
		 
		     
		    return false; //stop the completion of the order for debugging only
		                                 
		    });
	});
	// ENDING :
	// Scoping code for easy and non-conflicting access to $.
	// Should be last line, write code above this line.
})(payplans.jQuery);

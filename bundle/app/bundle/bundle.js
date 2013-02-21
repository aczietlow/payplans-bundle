
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
		calculatePricing : function(invoiceId, familyChildren, familyAdults) {
			
			var url = "index.php?option=com_payplans&view=invoice&task=trigger&event=onPayplansInvoiceUpdatePricing";
			var args = {
				'event_args' : {
					'invoiceId' : invoiceId,
					'familyChildren' : familyChildren,
					'familyAdult' : familyAdults,
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
		 * @param age
		 * Age of family member; used for calculating total price to be added
		 */
		addParams : function(invoiceId, familyChildren, familyAdults) {
			alert('addParams');
			for (var i = 0; i < familyChildren.name.length; i++) {
				var url = "index.php?option=com_payplans&view=invoice&task=trigger&event=onPayplansInvoiceAddChildren";
				var args = {
					'event_args' : {
						'invoiceId' : invoiceId,
						'familyName' : familyChildren.name[i],
						'dob' : familyChildren.dob[i],
						'sex' : familyChildren.sex[i],
						'age' : familyChildren.age[i],
					}
				};
				//makes ajax call
//				alert (familyChildren.name[i] + " is a child");
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
							'age' : familyAdults.age[i],
						}
				};
				//makes ajax call
//				alert (familyAdults.name[i] + " is an adult");
				payplans.ajax.go(url, args);
			};
		},
	};
	

	//loader function
	payplans.jQuery('document').ready(function() {
		
		//gets number of input fields already in the bundle field set
		var i = payplans.jQuery('#.pp-app-bundle-inputs input').size();
		
		
		payplans.jQuery('#pp-custom-calculate').click(function () {
			var count = i-1; 			//subtract number of manually added input fields (hidden id field)
			var invoiceId = payplans.jQuery('input[name="invoiceId"]').val(); //gets invoice_id
			
			var familyMembers = new Object(); //generic family member object
			familyMembers.name = [];
			familyMembers.dob = [];
			familyMembers.sex = [];
			familyMembers.age = [];
			
			var familyChildren = new Object(); //child member object (psuedo extends family member object)
			familyChildren.name = [];
			familyChildren.dob = [];
			familyChildren.sex = [];
			familyChildren.age = [];
			
			var familyAdults = new Object(); //Adult member object (psuedo extends family member object)
			familyAdults.name = [];
			familyAdults.dob = [];
			familyAdults.sex = [];
			familyAdults.age = [];
			
			
			//populate familyMembers object
			payplans.jQuery.each(payplans.jQuery('.fieldFamilyName'), function() {
		        familyMembers.name.push(payplans.jQuery(this).val());
		    });
			payplans.jQuery.each(payplans.jQuery('.fieldFamilySex:checked'), function() {
				familyMembers.sex.push(payplans.jQuery(this).val());
			});
			payplans.jQuery.each(payplans.jQuery('.fieldFamilyDOB'), function() {
				familyMembers.dob.push(payplans.jQuery(this).val());
				familyMembers.age.push(calcAge(payplans.jQuery(this).val()));
			});
			
			
			//polymorph members object to children or adults respectively
			for (var j = 0; j < count; j++) {
				if (familyMembers.age[j] < 18) {
					familyChildren.name.push(familyMembers.name[j]);
					familyChildren.sex.push(familyMembers.sex[j]);
					familyChildren.dob.push(familyMembers.dob[j]);
					familyChildren.age.push(familyMembers.age[j]);
				}
				else {
					familyAdults.name.push(familyMembers.name[j]);
					familyAdults.sex.push(familyMembers.sex[j]);
					familyAdults.dob.push(familyMembers.dob[j]);
					familyAdults.age.push(familyMembers.age[j]);
				}
			}
			
			//calls ajax triggers to php class
			payplans.apps.bundle.addParams(invoiceId, familyChildren, familyAdults);
//			payplans.apps.bundle.calculatePricing(invoiceId, count );
		});
		
		//add 1 add family field set
		payplans.jQuery('#pp-custom-addFamily').click(function() {
			
			//html of fieldset
			payplans.jQuery('<div class="field">' +
					'<div class="pp-parameter">' +
					'<div class="pp-row">' +
					'<span class="pp-grid_4 pp-col pp-label">' +
					'<label>Name</label>' +
					'</span>' +
					'<span class="pp-grid_8 pp-col pp-input">' +
					'<input type="text" class="fieldFamilyName" name="bundle[]" value="Chris' + i + '" />'+
					'</span>' +
					'</div>' +
					'</div>' +
					
					'<div class="pp-parameter">' +
					'<div class="pp-row">' +
					'<span class="pp-grid_4 pp-col pp-label">' +
					'<label>Sex</label>' +
					'</span>' +
					'<span class="pp-grid_8 pp-col pp-input">' +
					'<label id="subscription_detailsexM" >Male</label>'+
					'<input type="radio" class="fieldFamilySex" id="pp-bundle-detailsexM" name="bundle-sex-' + i + '[]" value="M"/>'+
					'<label id="subscription_detailsexF" >Female</label>'+
					'<input type="radio" class="fieldFamilySex" id="pp-bundle-detailsexF" name="bundle-sex-' + i + '[]" value="F"/>'+
					'</span>' +
					'</div>' +
					'</div>' +
					
					'<div class="pp-parameter">' +
					'<div class="pp-row">' +
					'<span class="pp-grid_4 pp-col pp-label">' +
					'<label>Date of Birth</label>' +
					'</span>' +
					'<span class="pp-grid_8 pp-col pp-input">' +
					'<input type="text" id="datepicker" class="fieldFamilyDOB" name="bundle-dob[]" value="02/01/2010" />'+
					'</span>' +
					'</div>' +
					'</div>' +

					
					'</div>').fadeIn('slow').appendTo('.pp-app-bundle-inputs');
			//applies the datepicker to the dob field
			 jQuery( "#datepicker" ).datepicker({
				 changeMonth: true,
				 changeYear: true,
				 yearRange: '1900:+nn',
			});
	        i++; //tracks count of number of fieldsets added
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
            
			var count = i-1; 			//subtract number of manually added input fields (hidden id field)
			var invoiceId = payplans.jQuery('input[name="invoiceId"]').val(); //gets invoice_id
			
			var familyMembers = new Object(); //generic family member object
			familyMembers.name = [];
			familyMembers.dob = [];
			familyMembers.sex = [];
			familyMembers.age = [];
			
			var familyChildren = new Object(); //child member object (psuedo extends family member object)
			familyChildren.name = [];
			familyChildren.dob = [];
			familyChildren.sex = [];
			familyChildren.age = [];
			
			var familyAdults = new Object(); //Adult member object (psuedo extends family member object)
			familyAdults.name = [];
			familyAdults.dob = [];
			familyAdults.sex = [];
			familyAdults.age = [];
			
			
			//populate familyMembers object
			payplans.jQuery.each(payplans.jQuery('.fieldFamilyName'), function() {
		        familyMembers.name.push(payplans.jQuery(this).val());
		    });
			payplans.jQuery.each(payplans.jQuery('.fieldFamilySex:checked'), function() {
				familyMembers.sex.push(payplans.jQuery(this).val());
			});
			payplans.jQuery.each(payplans.jQuery('.fieldFamilyDOB'), function() {
				familyMembers.dob.push(payplans.jQuery(this).val());
				familyMembers.age.push(calcAge(payplans.jQuery(this).val()));
			});
			
			
			//polymorph members object to children or adults respectively
			for (var j = 0; j < count; j++) {
				if (familyMembers.age[j] < 18) {
					familyChildren.name.push(familyMembers.name[j]);
					familyChildren.sex.push(familyMembers.sex[j]);
					familyChildren.dob.push(familyMembers.dob[j]);
					familyChildren.age.push(familyMembers.age[j]);
				}
				else {
					familyAdults.name.push(familyMembers.name[j]);
					familyAdults.sex.push(familyMembers.sex[j]);
					familyAdults.dob.push(familyMembers.dob[j]);
					familyAdults.age.push(familyMembers.age[j]);
				}
			}
			
			//calls ajax triggers to php class
//			setTimeout("payplans.apps.bundle.calculatePricing(invoiceId, count )", 2000);
			
			setTimeout("testcall()", 2000);
//			setTimeout("testcall("+invoiceId+", "+familyChildren+", "+familyAdults+")", 5000);
//			payplans.apps.bundle.calculatePricing(invoiceId, count );
			
		    return false; //stop the completion of the order for debugging only
		                                 
		    });
	});
	// ENDING :
	// Scoping code for easy and non-conflicting access to $.
	// Should be last line, write code above this line.
})(payplans.jQuery);

function testcall() {
	//gets number of input fields already in the bundle field set
	var i = payplans.jQuery('#.pp-app-bundle-inputs input').size();
	
	var count = i-1; 			//subtract number of manually added input fields (hidden id field)
	var invoiceId = payplans.jQuery('input[name="invoiceId"]').val(); //gets invoice_id
	
	var familyMembers = new Object(); //generic family member object
	familyMembers.name = [];
	familyMembers.dob = [];
	familyMembers.sex = [];
	familyMembers.age = [];
	
	var familyChildren = new Object(); //child member object (psuedo extends family member object)
	familyChildren.name = [];
	familyChildren.dob = [];
	familyChildren.sex = [];
	familyChildren.age = [];
	
	var familyAdults = new Object(); //Adult member object (psuedo extends family member object)
	familyAdults.name = [];
	familyAdults.dob = [];
	familyAdults.sex = [];
	familyAdults.age = [];
	
	
	//populate familyMembers object
	payplans.jQuery.each(payplans.jQuery('.fieldFamilyName'), function() {
        familyMembers.name.push(payplans.jQuery(this).val());
    });
	payplans.jQuery.each(payplans.jQuery('.fieldFamilySex:checked'), function() {
		familyMembers.sex.push(payplans.jQuery(this).val());
	});
	payplans.jQuery.each(payplans.jQuery('.fieldFamilyDOB'), function() {
		familyMembers.dob.push(payplans.jQuery(this).val());
		familyMembers.age.push(calcAge(payplans.jQuery(this).val()));
	});
	
	
	//polymorph members object to children or adults respectively
	for (var j = 0; j < count; j++) {
		if (familyMembers.age[j] < 18) {
			familyChildren.name.push(familyMembers.name[j]);
			familyChildren.sex.push(familyMembers.sex[j]);
			familyChildren.dob.push(familyMembers.dob[j]);
			familyChildren.age.push(familyMembers.age[j]);
		}
		else {
			familyAdults.name.push(familyMembers.name[j]);
			familyAdults.sex.push(familyMembers.sex[j]);
			familyAdults.dob.push(familyMembers.dob[j]);
			familyAdults.age.push(familyMembers.age[j]);
		}
	}
	
	payplans.apps.bundle.addParams(invoiceId, familyChildren, familyAdults);
}

/**
 * Helper function that date input from jquery datepicker and caclulates age/
 * @param dob
 * @returns age
 */
function calcAge(dob) {
	dob = dob.split('/');
	month = dob[0];
	month--;
	day = parseInt(dob[1]);
	year = parseInt(dob[2]);
	today = new Date();
	
	age = today.getFullYear() - year;
	
	//getMonth method returns the month in base 0. i.e. Jan is 0 and Feb is 1
	if(today.getMonth() < month) {
		age--;
	}
	
	if (today.getMonth()==month && today.getDate()<day){
		age--;
	}
	return age;
}

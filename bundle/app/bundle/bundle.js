//(function(jQuery){
//if (typeof(payplans.apps)=='undefined'){
//		payplans.apps = {};
//		alert('payplans app started');
//}
//payplans.apps.custom = {
//	calculatePricing : function(invoice_id){
// 
//               var url = "index.php?option=com_payplans&view=invoice&task=trigger&event=onPayplansInvoceiUpdatePricing";	
//	       var args   = { 'event_args' : {'invoice_id' : invoice_id} };
// 
//            payplans.ajax.go(url, args);
//	}
//};
// 
//payplans.jQuery(document).ready(function(){
//	alert('success');
//jQuery("#pp-custom-calculate").click(function(){
//
//		alert("we're going to need more money now");
//        var invoice_id = jQuery(this).attr('value');
//
//        payplans.apps.custom.calculatePricing(invoice_id);
//	});
//});
 
//})(payplans.jQuery);




//function test_joomla_js() {
//	alert('load successful');
//}
jQuery('document').ready(function(){
	jQuery('#pp-custom-calculate').click(function(){
		var split = location.search.replace('?', '').split('&').map(function(val){
			 //return val;
			return val.split('=');
			});
		alert(split[0][1]);
		//for (value in split) {
			
		//}
		
		
		//var url = "index.php?option=com_payplans&view=invoice&task=trigger&event=onPayplansInvoiceUpdatePricing";
		//window.location.replace(url);
	});
});

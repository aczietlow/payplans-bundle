//(function($){
//if (typeof(payplans.apps)=='undefined'){
//		payplans.apps = {};
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
//$("#pp-custom-calculate").click(function(){
//
//		alert("we're going to need more money now");
//        var invoice_id = $(this).attr('value');
//
//        payplans.apps.custom.calculatePricing(invoice_id);
//	});
//});
// 
//})(payplans.jQuery);
//



function test_joomla_js() {
	alert('load successful');
}

(function($) {
    $(document).ready(function() {
        alert("jquery load successful");
    });
})(jQuery);

//alert('test');
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
		var query_string = {};
		  var query = window.location.search.substring(1);
		  var vars = query.split("&");
		  for (var i=0;i<vars.length;i++) {
		    var pair = vars[i].split("=");
		    	// If first entry with this name
		    if (typeof query_string[pair[0]] === "undefined") {
		      query_string[pair[0]] = pair[1];
		    	// If second entry with this name
		    } else if (typeof query_string[pair[0]] === "string") {
		      var arr = [ query_string[pair[0]], pair[1] ];
		      query_string[pair[0]] = arr;
		    	// If third or later entry with this name
		    } else {
		      query_string[pair[0]].push(pair[1]);
		    }
		  } 
		  for (value in query_string){
			  alert(value + '=' + query_string[value]);
		  }
		
		//for (value in split) {
			
		//}
		
		
		//var url = "index.php?option=com_payplans&view=invoice&task=trigger&event=onPayplansInvoiceUpdatePricing";
		//window.location.replace(url);
	});
});

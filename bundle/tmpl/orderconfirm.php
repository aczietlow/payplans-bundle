

<div class="pp-app-subscriptiondetail clearfix">
	<div class='pp-app-bundle'>
		<script src='<?php echo $payplans_js_src; ?>' type='text/javascript'></script>
		<h4>Additional Family Members</h4>
		<button id='pp-custom-calculate' type='button'>add to total</button>
		<br />
		<button id='pp-custom-addFamily' type='button'>Add</button>
		<button id='pp-custom-removeFamily' type='button'>Remove</button>
		<button id='pp-custom-resetFamily' type='button'>Reset</button>
		<div class='pp-app-bundle-inputs'>
			<input type='hidden' name='invoiceId' value='<?php echo $invoice_id; ?>' />
		</div>
	</div>
</div>


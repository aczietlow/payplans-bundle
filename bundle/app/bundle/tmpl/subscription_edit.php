<div class="pp-bundle-details">
<h4	>Family Members</h4>
<?php foreach($results as $result): ?>
	<hr />
	<?php foreach($result as $key=>$value): ?>
		<?php if ($key != 'id' && $key != 'invoice_id'):?>
		<div class="pp-row">
				<div class="pp-col pp-label"><?php echo $key;?></div>
				<div class="pp-col pp-input"><?php echo $value;?></div>
		</div>
		<?php endif; ?>
	<?php endforeach;?>
<?php endforeach;?>

</div>
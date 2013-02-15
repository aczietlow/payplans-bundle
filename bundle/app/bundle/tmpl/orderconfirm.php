<?php
/**
* @copyright	Copyright (C) 2009 - 2009 Ready Bytes Software Labs Pvt. Ltd. All rights reserved.
* @license		GNU/GPL, see LICENSE.php
* @package		PayPlans
* @subpackage	Frontend
* @contact 		payplans@readybytes.in
*/
if(defined('_JEXEC')===false) die();
?>

<?php if(!empty($subscriptionparams) && is_array($subscriptionparams)):?>
<div class="pp-app-subscriptiondetail clearfix">
	<?php foreach($subscriptionparams as $parameter):?>
		<div class="pp-parameter">
			<div class="pp-row">
					<span class="pp-grid_4 pp-col pp-label"><?php echo array_shift($parameter);?></span>
					<span class="pp-grid_8 pp-col pp-input"><?php echo array_shift($parameter);?></span>
			</div>
		</div>
	<?php endforeach;?>
</div>
<?php endif;?>
<h1>test</h1>
<?php 
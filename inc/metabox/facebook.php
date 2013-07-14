<?php
$prefix = 'facebook_';

$fields = array(
	array( // select box
		'label'	=> 'Choose Posts', // <label>
		'desc'	=> 'These posts will appear on your Facebook page.', // description
		'id'	=>  $prefix.'posts', // field id and name
		'type'	=> 'post_chosen', // type of field
		'multiple' => true,
		'post_type' => array('post') // post types to display, options are prefixed with their post type
	)
);

/**
 * Instantiate the class with all variables to create a meta box
 * var $id string meta box id
 * var $title string title
 * var $fields array fields
 * var $page string|array post type to add meta box to
 * var $js bool including javascript or not
 */
$facebook = new custom_add_meta_box( 'facebook', 'Facebook Details', $fields, array('facebook'), true );

?>

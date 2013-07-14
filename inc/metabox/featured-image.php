<?php
$prefix = 'featured_image';

$fields = array(
	array( // Repeatable & Sortable Text inputs
		'label' => 'Image',
		'id'	=> $prefix, // field id and name
		'type'	=> 'image' // type of field
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
$featured_image = new custom_add_meta_box( 'featured_image', 'Featured Image', $fields, array('post', 'video'), true );

?>

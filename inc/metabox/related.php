<?php
$prefix = 'related_';

$fields = array(
	array( // select box
		'label'	=> 'Choose Posts', // <label>
		'desc'	=> 'Related posts will appear on the right side of the post.', // description
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
$related = new custom_add_meta_box( 'related', 'Related Details', $fields, array('post'), true );

?>

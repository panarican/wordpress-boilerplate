<?php
$prefix = 'homepage_';

$fields = array(
	array( // select box
		'label'	=> 'Featured Slider', // <label>
		'desc'	=> 'The first 5 items will be generated for this post.', // description
		'id'	=>  $prefix.'featured_slider', // field id and name
		'type'	=> 'post_chosen', // type of field
		'multiple' => true,
		'post_type' => array('post') // post types to display, options are prefixed with their post type
	),
	array( // select box
		'label'	=> 'New This Week', // <label>
		'desc'	=> 'The first 2 items will be generated for this post.', // description
		'id'	=>  $prefix.'new_this_week', // field id and name
		'type'	=> 'post_chosen', // type of field
		'multiple' => true,
		'post_type' => array('post') // post types to display, options are prefixed with their post type
	),
	array( // select box
		'label'	=> 'Semi Featured Articles', // <label>
		'desc'	=> 'The first 8 items will be generated for this post.', // description
		'id'	=>  $prefix.'semi_featured', // field id and name
		'type'	=> 'post_chosen', // type of field
		'multiple' => true,
		'post_type' => array('post') // post types to display, options are prefixed with their post type
	),
	array( // select box
		'label'	=> 'Other Articles', // <label>
		'desc'	=> 'The first 8 items will be generated for this post.', // description
		'id'	=>  $prefix.'other_articles', // field id and name
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
$homepage = new custom_add_meta_box( 'homepage', 'Homepage Details', $fields, array('homepage'), true );

?>

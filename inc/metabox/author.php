<?php
$prefix = 'author_';

$fields = array(
	array( // Text
		'label'	=> 'Authored By', // <label>
		'desc'	=> '.', // description
		'id'	=> $prefix.'by', // field id and name
		'type'	=> 'text' // type of field
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
$featured_image = new custom_add_meta_box( 'author', 'Author Details', $fields, array('post', 'video'), true );

?>

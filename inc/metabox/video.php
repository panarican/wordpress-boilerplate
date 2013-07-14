<?php
$prefix = 'video_';

$fields = array(
	array( // Text
		'label'	=> 'Video ID', // <label>
		'desc'	=> 'Please input a Brightcove video id.', // description
		'id'	=> $prefix.'id', // field id and name
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
$video = new custom_add_meta_box( 'video', 'Video Details', $fields, array('post', 'video'), true );

?>

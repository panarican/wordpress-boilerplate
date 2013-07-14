<?php
$prefix = 'audio_';

$fields = array(
	array( // Text Input
		'label'	=> 'Title', // <label>
		'desc'	=> 'Title of the soundcloud group.', // description
		'id'	=> $prefix.'title', // field id and name
		'type'	=> 'text' // type of field
	),
	array( // Repeatable & Sortable Text inputs
		'label'	=> 'Soundcloud', // <label>
		'desc'	=> 'Please include full soundcloud track URL.', // description
		'id'	=> $prefix.'track_urls', // field id and name
		'type'	=> 'repeatable', // type of field
		'sanitizer' => array( // array of sanitizers with matching kets to next array
			'featured' => 'meta_box_santitize_boolean',
			'title' => 'sanitize_text_field',
			'desc' => 'wp_kses_data'
		),
		'repeatable_fields' => array ( // array of fields to be repeated
			'url' => array(
				'label' => 'Track URL',
				'id' => 'track_url',
				'type' => 'text'
			)
		)
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
$audio = new custom_add_meta_box( 'audio', 'Audio Details', $fields, array('post'), true );

?>

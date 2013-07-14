<?php
$prefix = 'sample_';

$fields = array(
	array( // Text Input
		'label'	=> 'Text Input', // <label>
		'desc'	=> 'A description for the field.', // description
		'id'	=> $prefix.'text', // field id and name
		'type'	=> 'text' // type of field
	),
	array( // Textarea
		'label'	=> 'Textarea', // <label>
		'desc'	=> 'A description for the field.', // description
		'id'	=> $prefix.'textarea', // field id and name
		'type'	=> 'textarea' // type of field
	),
	array( // Single checkbox
		'label'	=> 'Checkbox Input', // <label>
		'desc'	=> 'A description for the field.', // description
		'id'	=> $prefix.'checkbox', // field id and name
		'type'	=> 'checkbox' // type of field
	),
	array(
	    'label' => 'Chosen Select Box',
	    'desc'  => 'A description for the field.',
	    'id'    => $prefix . 'select',
	    'type'  => 'chosen',
	    'multiple' => true,
	    'options' => array (
	        'one' => array (
	            'label' => 'Option One',
	            'value' => 'one'
	        ),
	        'two' => array (
	            'label' => 'Option Two',
	            'value' => 'two'
	        ),
	        'three' => array (
	            'label' => 'Option Three',
	            'value' => 'three'
	        )
	    )
	),
	array ( // Radio group
		'label'	=> 'Radio Group', // <label>
		'desc'	=> 'A description for the field.', // description
		'id'	=> $prefix.'radio', // field id and name
		'type'	=> 'radio', // type of field
		'options' => array ( // array of options
			'one' => array ( // array key needs to be the same as the option value
				'label' => 'Option One', // text displayed as the option
				'value'	=> 'one' // value stored for the option
			),
			'two' => array (
				'label' => 'Option Two',
				'value'	=> 'two'
			),
			'three' => array (
				'label' => 'Option Three',
				'value'	=> 'three'
			)
		)
	),
	array ( // Checkbox group
		'label'	=> 'Checkbox Group', // <label>
		'desc'	=> 'A description for the field.', // description
		'id'	=> $prefix.'checkbox_group', // field id and name
		'type'	=> 'checkbox_group', // type of field
		'options' => array ( // array of options
			'one' => array ( // array key needs to be the same as the option value
				'label' => 'Option One', // text displayed as the option
				'value'	=> 'one' // value stored for the option
			),
			'two' => array (
				'label' => 'Option Two',
				'value'	=> 'two'
			),
			'three' => array (
				'label' => 'Option Three',
				'value'	=> 'three'
			)
		)
	),
	array( // Taxonomy Select box
		'label'	=> 'Category', // <label>
		// the description is created in the callback function with a link to Manage the taxonomy terms
		'id'	=> 'category', // field id and name, needs to be the exact name of the taxonomy
		'type'	=> 'tax_chosen' // type of field
	),
	array( // Post ID select box
		'label'	=> 'Post List', // <label>
		'desc'	=> 'A description for the field.', // description
		'id'	=>  $prefix.'post_id', // field id and name
		'type'	=> 'post_chosen', // type of field
		'post_type' => array('post','portfolio') // post types to display, options are prefixed with their post type
	),
		array( // Post ID select box
		'label'	=> 'Post List Multi', // <label>
		'desc'	=> 'A description for the field.', // description
		'id'	=>  $prefix.'post_id_multi', // field id and name
		'type'	=> 'post_chosen', // type of field
		'multiple' => true,
		'post_type' => array('post','portfolio') // post types to display, options are prefixed with their post type
	),
	array( // jQuery UI Date input
		'label'	=> 'Date', // <label>
		'desc'	=> 'A description for the field.', // description
		'id'	=> $prefix.'date', // field id and name
		'type'	=> 'date' // type of field
	),
	array( // jQuery UI Slider
		'label'	=> 'Slider', // <label>
		'desc'	=> 'A description for the field.', // description
		'id'	=> $prefix.'slider', // field id and name
		'type'	=> 'slider', // type of field
		'min'	=> '0', // lowest possible number
		'max'	=> '100', // highest possible number
		'step'	=> '5' // how the slider steps as it is dragged
	),
	array( // Image ID field
		'label'	=> 'Image', // <label>
		'desc'	=> 'A description for the field.', // description
		'id'	=> $prefix.'image', // field id and name
		'type'	=> 'image' // type of field
	),
	array( // Repeatable & Sortable Text inputs
		'label'	=> 'Repeatable', // <label>
		'desc'	=> 'A description for the field.', // description
		'id'	=> $prefix.'repeatable', // field id and name
		'type'	=> 'repeatable', // type of field
		'sanitizer' => array( // array of sanitizers with matching kets to next array
			'featured' => 'meta_box_santitize_boolean',
			'title' => 'sanitize_text_field',
			'desc' => 'wp_kses_data'
		),
		'repeatable_fields' => array ( // array of fields to be repeated
			'featured' => array(
				'label' => 'Featured?',
				'id' => 'featured',
				'type' => 'checkbox'
			),
			array( // Image ID field
				'label'	=> 'Image', // <label>
				'id'	=> 'image', // field id and name
				'type'	=> 'image' // type of field
			),
			'title' => array(
				'label' => 'Title',
				'id' => 'title',
				'type' => 'text'
			),
			'desc' => array(
				'label' => 'Description',
				'id' => 'desc',
				'type' => 'textarea'
			)
		)
	),
	array(
	    'label' => 'Color',
	    'desc'  => 'Using wordpress color picker',
	    'id'    =>  $prefix . 'color',
	    'type'  => 'color',
	),
	array(
	    'label' => 'WYSIWYG Field',
	    'desc'  => 'A description goes here',
	    // There is support for wp_editor but pay very close attention, else you'll be pulling 
	    // your hair out like I did. You cannot have dashes or underscores in your id/name for this field.
	    // You can add in the custom settings for this field (see Codex) and must include this option in the
	    // array with a minimum of the textarea_name as outlined below.
	    'id'    => 'editorField',
	    'type'  => 'editor',
	    'sanitizer' => 'wp_kses_post',
	    'settings' => array(
	        'textarea_name' => 'editorField'
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
$sample = new custom_add_meta_box( 'sample', 'Sample Box', $fields, array('post','portfolio'), true );

?>

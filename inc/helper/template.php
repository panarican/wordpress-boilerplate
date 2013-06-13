<?php 

// get field data
function get($field_name, $id = null) {
	
	// get $post;
	global $post;

	// get id
	$id = ($id) ? $id : $id = $post->ID;

  	// get post meta
	$meta = get_post_meta($id);

	// get field
	$field = $meta[$field_name][0];

	// check if data needs to be unserialized
	if(is_serialized($field)) {
		$field = unserialize($field);
	}
	
	// return field
	return $field;

}

// get img
function get_img($field_name, $size = null, $id = null) {
	
	// get $post;
	global $post;

	// get id
	$id = ($id) ? $id : $id = $post->ID;

	// get field data
	$id = get($field_name, $id);

	// get size
	$size = ($size) ? $size : $size = 'thumbnail';

  	// http://codex.wordpress.org/Function_Reference/wp_get_attachment_image
	$img = wp_get_attachment_image($id, $size);

	return $img;
}

//  get img src
function get_img_src($field_name, $size = null, $id = null) {

	// get $post;
	global $post;

	// get id
	$id = ($id) ? $id : $id = $post->ID;

	// get field data
	$id = get($field_name, $id);

	// get size
	$size = ($size) ? $size : $size = 'thumbnail';

  	// http://codex.wordpress.org/Function_Reference/wp_get_attachment_image_src
	$img = wp_get_attachment_image_src($id, $size);

	return $img[0];
}

// meta
function meta($id = null){
	// get $post;
	global $post;

	// get id
	$id = ($id) ? $id : $id = $post->ID;
	// get rid of first two edit meta fields
	$meta = array_slice(get_post_meta($id),2);
	foreach($meta as $key => $value) {
  		$meta[$key] = get($key);
	}

	return $meta;
}

// get date format
function get_date_format($field_name, $format='MMM DD, YYYY', $id = null){
	$date = get($field_name, $id);
	// http://php.net/manual/en/datetime.format.php
	return date_format($date, $format);
}

// img
function img($id, $size = 'thumbnail') {
	// http://codex.wordpress.org/Function_Reference/wp_get_attachment_image
	return wp_get_attachment_image($id, $size);
}

// img src
function img_src($id, $size = 'thumbnail') {
	// http://codex.wordpress.org/Function_Reference/wp_get_attachment_image_src
	return wp_get_attachment_image_src($id, $size);
}

// pre meta
function pre_meta($id = null) {
	// get $post;
	global $post;

	// get id
	$id = ($id) ? $id : $id = $post->ID;
	// get rid of first two edit meta fields
	$meta = array_slice(get_post_meta($id),2);
	foreach($meta as $key => $value) {
  		pre_get($key);
	}
}

// pre get meta

function pre_get($field_name, $id = null) {
	echo '<h2>' . $field_name . '</h2>';
	echo '<pre>';
	print_r(get($field_name, $id));
	echo '</pre>';
	echo '<hr />';
}

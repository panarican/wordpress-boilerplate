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

	// check if field contains array then remove empty keys
	if( is_array($field) ) {
		$field = array_filter_recursive($field);
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
	$img = wp_get_attachment_image_src($id, $size);
	return $img[0];
}

// img metadata
function img_meta( $attachment_id ) {

	$attachment = get_post( $attachment_id );
	return array(
		'alt' => get_post_meta( $attachment->ID, '_wp_attachment_image_alt', true ),
		'caption' => $attachment->post_excerpt,
		'description' => $attachment->post_content,
		'href' => get_permalink( $attachment->ID ),
		'src' => $attachment->guid,
		'title' => $attachment->post_title
	);
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

// check if array is empty
function is_array_empty($a){
	foreach($a as $elm)
	if(!empty($elm)) return false;
	return true;
}

// enchanced version of array_filter
function array_filter_recursive($input) 
{ 
foreach ($input as &$value) 
{ 
  if (is_array($value)) 
  { 
    $value = array_filter_recursive($value); 
  } 
} 

return array_filter($input); 
} 

// Truncate Post Function
function truncate_post($content, $amount, $wpAutoBoolean, $tagsAllowed='') {
	if(strlen($content) > $amount) {
		$truncate = $content; 
		$truncate = preg_replace('@<script[^>]*?>.*?</script>@si', '', $truncate);
		$truncate = preg_replace('@<style[^>]*?>.*?</style>@si', '', $truncate);
		$truncate = strip_tags($truncate, $tagsAllowed);
		$truncate = substr($truncate, 0, strrpos(substr($truncate, 0, $amount), ' ')); 
		if($wpAutoBoolean) { 
			echo wpautop($truncate.'...');
		} else {
			echo $truncate.'...';
		}
	} else {
		echo $content;
	}
}

// add http to string
function addhttp($url) {
    if (!preg_match("~^(?:f|ht)tps?://~i", $url)) {
        $url = "http://" . $url;
    }
    return $url;
}
<?php

add_action( 'init', 'register_cpt_video' );

function register_cpt_video() {

    $labels = array( 
        'name' => _x( 'Video', 'video' ),
        'singular_name' => _x( 'video', 'video' ),
        'add_new' => _x( 'Add New Video', 'video' ),
        'all_items' => _x( 'Videos', 'video' ),
        'add_new_item' => _x( 'Add New Video', 'video' ),
        'edit_item' => _x( 'Edit Video', 'video' ),
        'new_item' => _x( 'New Video', 'video' ),
        'view_item' => _x( 'View Video', 'video' ),
        'search_items' => _x( 'Search Videos', 'video' ),
        'not_found' => _x( 'No Videos found', 'video' ),
        'not_found_in_trash' => _x( 'No Videos found in Trash', 'video' ),
        'parent_item_colon' => _x( 'Parent video:', 'video' ),
        'menu_name' => _x( 'Video', 'video' ),
    );

    $args = array( 
        'labels' => $labels,
        'hierarchical' => true,
        'public' => true,
        'show_ui' => true,
        'show_in_menu' => true
    );

    register_post_type( 'video', $args );
}
<?php

add_action( 'init', 'register_cpt_portfolio' );

function register_cpt_portfolio() {

    $labels = array( 
        'name' => _x( 'Portfolio Pieces', 'portfolio' ),
        'singular_name' => _x( 'Portfolio', 'portfolio' ),
        'add_new' => _x( 'Add New', 'portfolio' ),
        'all_items' => _x( 'Portfolio Pieces', 'portfolio' ),
        'add_new_item' => _x( 'Add New Portfolio', 'portfolio' ),
        'edit_item' => _x( 'Edit Portfolio', 'portfolio' ),
        'new_item' => _x( 'New Portfolio', 'portfolio' ),
        'view_item' => _x( 'View Portfolio', 'portfolio' ),
        'search_items' => _x( 'Search Portfolio Pieces', 'portfolio' ),
        'not_found' => _x( 'No portfolio pieces found', 'portfolio' ),
        'not_found_in_trash' => _x( 'No portfolio pieces found in Trash', 'portfolio' ),
        'parent_item_colon' => _x( 'Parent Portfolio:', 'portfolio' ),
        'menu_name' => _x( 'Portfolio Pieces', 'portfolio' ),
    );

    $args = array( 
        'labels' => $labels,
        'hierarchical' => true,
        'public' => true,
        'show_ui' => true,
        'show_in_menu' => true
    );

    register_post_type( 'portfolio', $args );
}
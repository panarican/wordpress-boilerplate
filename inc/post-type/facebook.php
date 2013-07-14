<?php

add_action( 'init', 'register_cpt_facebook' );
add_action( 'admin_menu', 'register_cpt_facebook_link' );


function register_cpt_facebook() {

    $labels = array( 
        'name' => _x( 'facebook', 'facebook' ),
        'singular_name' => _x( 'facebook', 'facebook' ),
        'add_new' => _x( 'Add New', 'facebook' ),
        'add_new_item' => _x( 'Add New Facebook', 'facebook' ),
        'edit_item' => _x( 'Edit Facebook', 'facebook' ),
        'new_item' => _x( 'New Facebook', 'facebook' ),
        'view_item' => _x( 'View Facebook', 'facebook' ),
        'search_items' => _x( 'Search Facebook', 'facebook' ),
        'not_found' => _x( 'No Facebook found', 'facebook' ),
        'not_found_in_trash' => _x( 'No Facebook found in Trash', 'facebook' ),
        'parent_item_colon' => _x( 'Parent Facebook:', 'facebook' ),
        'menu_name' => _x( 'facebook', 'facebook' ),
    );

    $args = array( 
        'labels' => $labels,
        'hierarchical' => false,
        
        'supports' => array( 'title', 'editor' ),
        
        'public' => true,
        'show_ui' => true,
        'show_in_menu' => false,
        
        'show_in_nav_menus' => false,
        'publicly_queryable' => true,
        'exclude_from_search' => true,
        'has_archive' => false,
        'query_var' => true,
        'can_export' => true,
        'rewrite' => true,
        'capability_type' => 'post'
    );

    register_post_type( 'facebook', $args );

}

function register_cpt_facebook_link() {

        // query the facebook posts
        $facebook = new WP_Query( 'post_type=facebook' );

        // if we have facebook post, show the edit link else the add facebook link
        if ( $facebook->have_posts() ) {
            $facebook->the_post();
            $link = 'post.php?post=' . get_the_ID() . '&action=edit';
            $title = 'Edit Facebook';
        } else {
            // in case if the user has deleted the default post
            $link = 'post-new.php?post_type=facebook';
            $title = 'Add Facebook';
        }

    add_menu_page( 'Facebook', $title, 'edit_posts', $link, '', '', 8 );
}
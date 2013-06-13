<?php

add_action( 'init', 'register_cpt_homepage' );
add_action( 'admin_menu', 'register_cpt_homepage_link' );


function register_cpt_homepage() {

    $labels = array( 
        'name' => _x( 'Homepage', 'homepage' ),
        'singular_name' => _x( 'homepage', 'homepage' ),
        'add_new' => _x( 'Add New', 'homepage' ),
        'add_new_item' => _x( 'Add New homepage', 'homepage' ),
        'edit_item' => _x( 'Edit homepage', 'homepage' ),
        'new_item' => _x( 'New homepage', 'homepage' ),
        'view_item' => _x( 'View homepage', 'homepage' ),
        'search_items' => _x( 'Search Homepage', 'homepage' ),
        'not_found' => _x( 'No homepage found', 'homepage' ),
        'not_found_in_trash' => _x( 'No homepage found in Trash', 'homepage' ),
        'parent_item_colon' => _x( 'Parent homepage:', 'homepage' ),
        'menu_name' => _x( 'Homepage', 'homepage' ),
    );

    $args = array( 
        'labels' => $labels,
        'hierarchical' => false,
        
        'supports' => array( 'title', 'editor' ),
        
        'public' => true,
        'show_ui' => true,
        'show_in_menu' => false,
        
        
        'show_in_nav_menus' => true,
        'publicly_queryable' => true,
        'exclude_from_search' => false,
        'has_archive' => true,
        'query_var' => true,
        'can_export' => true,
        'rewrite' => true,
        'capability_type' => 'post'
    );

    register_post_type( 'homepage', $args );
}

function register_cpt_homepage_link() {

        // query the homepage posts
        $homepage = new WP_Query( 'post_type=homepage' );

        // if we have homepage post, show the edit link else the add homepage link
        if ( $homepage->have_posts() ) {
            $homepage->the_post();
            $link = get_edit_post_link( get_the_ID(), 'return' );
            $title = 'Edit Home Page';
        } else {
            // in case if the user has deleted the default post
            $link = get_bloginfo( 'url' ). '/wp-admin/post-new.php?post_type=homepage';
            $title = 'Add Home Page';
        }


    add_menu_page( 'Homepage', $title, 'edit_posts', $link, '', '', 6  );
}
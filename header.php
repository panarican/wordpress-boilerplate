<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"> 
<html lang='en'> 
	<head> 
	<title><?php bloginfo('name'); ?> <?php wp_title(); ?></title>
	<link rel="stylesheet" href="<?php bloginfo('stylesheet_directory'); ?>/reset.css" type="text/css"> 
	<link rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>" type="text/css"> 
	<!--[if IE]>
	<link rel="stylesheet" href="<?php bloginfo('stylesheet_directory'); ?>/ie.css" type="text/css" />
	<![endif]-->
	</head> 
	<body class="home blog">
	<div id="top-bar-tile">
		<div id="top-bar-content">
			<h1><a href="<?php bloginfo('url'); ?>"><?php bloginfo('name'); ?></a></h1>
			<span class="slogan"><?php bloginfo('description'); ?></span>
			<div id="search-box">
				<form method="get" id="searchform" action="" > 
					<input type="text" value="Search..." onfocus="if(this.value == this.defaultValue) this.value = ''" name="s" id="s" /> 
				</form>
			</div><!-- search-box -->
		</div><!-- top-bar-content -->
	</div><!-- top-bar-tile -->
	<div id="nav-bar-tile">
			 <?php wp_nav_menu(array( 'menu' => 'mainnav', 'menu_class' => 'nav-bar-content', 'menu_id' => 'navigation', 'container' => false, 'theme_location' => 'primary-menu', 'show_home' => '1')); ?>
	</div><!-- nav-bar-tile -->
	<div id="wrapper">
		<div id="content">
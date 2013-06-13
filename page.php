<?php get_header(); ?>

<?php /* If there are no posts to display, such as an empty archive page */ ?>
<?php if ( ! have_posts() ) : ?>
		<h1>Not Found</h1>
			<p>Apologies, but no results were found for the requested archive. Perhaps searching will help find a related post</p>
<?php endif; ?>

<?php while ( have_posts() ) : the_post(); ?>

<div class="post">
	<h1><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h1>
	<div class="dots"></div>
	
	<?php if ( is_archive() || is_search() ) : // Only display excerpts for archives and search. ?>
			<?php the_excerpt(); ?>
	<?php else : ?>
			<?php the_content('Read More'); ?>
	<?php endif; ?>
	
	<div class="dots"></div>
</div><!-- post -->

<div class="spacer"></div>

<?php comments_template( '', true ); ?>

<?php endwhile; ?>

<div class="spacer"></div>
<?php get_footer(); ?>
<?php get_header(); 

 if ( ! have_posts() ) : ?>
		<h1>Not Found</h1>
			<p>Apologies, but no results were found for the requested archive. Perhaps searching will help find a related post</p>
<?php endif; ?>

<?php while ( have_posts() ) : the_post();
	
	pre_meta();
	$categories = get_the_category();
	
 ?>

<div class="post">

	<div class="post-head">
		<h2><?php the_title(); ?></h2>
			<div class="tags">
				<?php $index = 0;
				foreach($categories as $cat) {
					$index++;
					echo '<a href="/category/' . $cat->slug . '">' . $cat->cat_name . '</a>';
					if ( $catCount != $index ) echo ', ';
					//echo $cat->'cat_name';
				}?>
			</div><!-- / .tags -->
	</div><!-- / .post-head -->

			<?php if($post->post_content != "") { ?>
			<div class="post-content">
				<?php the_content(); ?>
			</div><!-- / .post-content -->
		<?php } ?>

</div><!-- post -->

<?php endwhile;

get_footer(); ?>
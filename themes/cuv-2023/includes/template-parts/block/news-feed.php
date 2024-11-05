<?php
/**
 * Block Name: List Block
 *
 * This is the template that displays the list block.
 */

// create id attribute for styling
$id = 'news-feed-' . $block['id'];

$news_feed = get_field('news_feed');

$args = array(
    'numberposts' => 3
);

if ($news_feed['category']) {
    $args['category'] = $news_feed['category'];
}
?>
			<style>
				@media (max-width: 991px) {
					.module .news-feed .border-end {
						border-right: none !important;
					}
				}
			</style>
            <!-- news-feed -->
            <div id="<?php echo $id; ?>" class="module padded-extra<?php if( !empty($block['className'])) { echo " ".$block['className']; } ?>">
                <div class="news-feed">
                    <div class="container-fluid">
                        <div class="d-flex flex-wrap flex-md-nowrap justify-content-between align-items-center mb-5">
                            <?php if ($news_feed['title']) { ?> 
                            <<?php echo $news_feed['title_tag']; ?> class="lh-1 <?php echo $news_feed['title_css_class']; ?>">
                                <?php echo $news_feed['title']; ?>
                            </<?php echo $news_feed['title_tag']; ?>>
                            <?php } ?> 
                            <a href="<?php echo $news_feed['category'] ? get_category_link($news_feed['category']) : get_permalink(get_option('page_for_posts')); ?>" class="display-4">
                                <?php _e('SEE ALL', 'cuvtwentythree'); ?> 
                            </a>
                        </div>
                        <?php if ($news_feed['category']) { ?> 
                        <div class="row">
                        <?php if ($posts = get_posts($args)) { ?> 
                            <?php 
                            $i = 0;
                            foreach ($posts as $article) { ?> 
                            <div class="col-lg-4 news-feed-item<?php echo $i <= 1 ? ' border-end border-black mb-4' : ''; ?>">
                                <article class="post d-flex flex-column justify-content-between border-top border-bottom border-black padded-limited h-100">
                                    <a href="<?php echo get_permalink($article->ID); ?>" class="stretched-link">
                                        <h3 class="post-title lh-sm display-2">
                                            <?php echo get_the_title($article->ID); ?> 
                                        </h3>
                                    </a>
                                    <div class="post-content d-flex flex-nowrap align-items-center">
                                         <a href="<?php echo get_permalink($article->ID); ?>" class="site-link me-3">
                                			<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M38.5239 49.88V44.03H33.0639V42.17H38.5239V36.32H40.4739V42.17H45.9339V44.03H40.4739V49.88H38.5239Z"></path>
			                                </svg>
										</a>
										<div class="post-meta">
											<?php echo get_the_category_list('.', '', $article->ID); ?>
											<span><?php echo get_the_date('d.m.Y', $article->ID); ?></span>
										</div>
                                    </div>
                                </article>
                            </div>
                            <?php $i++; } ?> 
                        <?php } ?> 
                        </div>
                        <?php } ?> 
                    </div>
                </div>
            </div>
            <!-- / news-feed -->

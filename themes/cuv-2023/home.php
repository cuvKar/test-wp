<?php
/**
 * The template for displaying the blog listing when a static 
 * home page is selected
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package     WordPress
 * @subpackage  cuvtwentythree
 * @author      Clinuvel <www.clinuvel.co.uk>
 */
get_header(); ?>

				<?php $page_for_posts_id = get_option( 'page_for_posts' ); ?>
                <!-- post-data -->
                <div class="module post-data pt-2">
                    <div class="container-fluid">
                        <?php cuv_2023_the_breadcrumbs(); ?> 
                    </div>
                </div>
                <!-- / post-data -->

                <!-- post-titles -->
                <div class="module post-titles bg-warmgrey">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-xxl-8">
                                <h1 class="post-title lh-1 mb-4">
                                    <?php echo $current_title = (is_home() ) ? get_the_title($page_for_posts_id) : get_the_archive_title(); ?>
                                </h1>
                            </div>
                            <div class="col-xxl-4 post-meta align-self-end">
                                <div class="post-subtitle display-3 fw-normal lh-sm mb-4">
                                    <?php echo category_description( get_category_by_slug( 'news' )->term_id ); // Use the main news category if it's the blog listing page. ?>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- / post-titles -->

				<!-- test::post filter -->
				<div class="container-fluid filter-post pseudo-border-top bg-warmgrey">
					<div class="row">
						<div class="col-12">
							<form id="category-select" class="category-select" action="<?php echo esc_url( home_url( '/' ) ); ?>" method="get">
								<div class="row">
									<div class="col-lg-4">
										<h3 class="display-3">Filters:</h3>
									</div>
									<div class="col-lg-4">
										<label for="select-categories">Category</label>
										<div class="wrapper-select">
											<?php
												$args_dropdown = array(
													'name'				=>	'select-categories',
													'orderby'			=>	'name',
													'show_option_none'	=>	'Latest'
												);
												wp_dropdown_categories( $args_dropdown );
											?>
										</div>

										<script type="text/javascript">
											<!--
											var dropdown = document.getElementById("select-categories");
											function onCatChange() {
												if ( dropdown.options[dropdown.selectedIndex].value > 0 ) {
													location.href = "<?php echo esc_url( home_url( '/' ) ); ?>?cat="+dropdown.options[dropdown.selectedIndex].value;
												} else {
													location.href = "<?php echo esc_url( home_url( '/' ) ); ?>news/";
												}
											}
											dropdown.onchange = onCatChange;
											-->
										</script>
									</div>
									<div class="col-lg-4">

									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
				<!-- / test::post filter -->

                <?php if (have_posts()) : $i = 0; ?> 
                <!-- news-feed -->
                <div class="module padded-top bg-white">
                    <div class="news-feed">
                        <div class="container-fluid">
                            <div class="row">
                                <?php 
                                while (have_posts()) : the_post(); 
                                    if ($i == 0) : 
                                ?> 
                                <div class="col-12 news-feed-item lead-item">
                                    <article class="post d-flex flex-column justify-content-between border-top border-bottom border-black padded-limited h-100 position-relative">
                                        <a href="<?php the_permalink(); ?>" class="stretched-link">
                                            <h3 class="post-title lh-sm display-1">
                                                <?php the_title(); ?> 
                                            </h3>
                                        </a>
                                        <div class="post-content d-flex flex-nowrap align-items-center">
                                            <a href="<?php the_permalink(); ?>" class="site-link me-3">
                                                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M38.5239 49.88V44.03H33.0639V42.17H38.5239V36.32H40.4739V42.17H45.9339V44.03H40.4739V49.88H38.5239Z" fill="#161616" />
												</svg>
                                            </a>
											<div class="post-meta">
												<?php echo get_the_category_list('.', ''); ?> 
												<span><?php echo get_the_date('d.m.Y'); ?></span>
											</div>
                                        </div>
                                    </article>
                                </div>
                                <?php else : ?> 
                                <div class="col-md-6 col-xxl-4 news-feed-item follow-item border-end border-black">
                                    <article class="post d-flex flex-column justify-content-between border-top border-bottom border-black padded-limited h-100 position-relative">
                                        <a href="<?php the_permalink(); ?>" class="stretched-link">
                                            <h3 class="post-title lh-sm display-2">
                                                <?php the_title(); ?> 
                                            </h3>
                                        </a>
                                        <div class="post-content d-flex flex-nowrap align-items-center">
                                            <a href="<?php the_permalink(); ?>" class="site-link me-3">
                                                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M38.5239 49.88V44.03H33.0639V42.17H38.5239V36.32H40.4739V42.17H45.9339V44.03H40.4739V49.88H38.5239Z" fill="#161616" />
												</svg>
                                            </a>
											<div class="post-meta">
												<?php echo get_the_category_list('.', ''); ?> 
												<span><?php echo get_the_date('d.m.Y'); ?></span>
											</div>
                                        </div>
                                    </article>
                                </div>
                                <?php endif; $i++; endwhile; ?> 
                            </div>
                        </div>
                    </div>.
                </div>
                <!-- / news-feed -->
                <?php endif; ?> 

                <?php cuv_2023_pagination(); ?>

<?php get_footer();
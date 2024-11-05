<?php
/**
 * Block Name: Link Carousel
 *
 * This is the template that displays the card(s) block.
 */

// create id attribute for styling
$id = 'link-carousel-' . $block['id'];

$link_carousel = get_field('link_carousel');
?>

                <!-- link-carousel -->
                <div class="module padded-extra<?php if( !empty($block['className'])) { echo " ".$block['className']; } ?>">
                    <div class="link-carousel">
                        <div class="container-fluid">
                            <?php if ($link_carousel['title']) { ?> 
                            <<?php echo $link_carousel['title_tag']; ?> class="mb-5 lh-1 <?php echo $link_carousel['title_css_class']; ?>">
                                <?php echo $link_carousel['title']; ?> 
                            </<?php echo $link_carousel['title_tag']; ?>>
                            <?php } ?> 
                            <?php if ($link_carousel['slides']) {
                              $count = count($link_carousel['slides']); ?> 
                            <div class="row carousel">
                                <?php foreach ($link_carousel['slides'] as $slide) { ?> 
                                <div class="col-md-6 col-xxl-4">
                                    <div class="link-carousel-card h-100">
                                        <?php if ($slide['image']) { ?> 
                                        <figure class="figure">
                                            <img src="<?php echo esc_url($slide['image']['sizes']['link-carousel']); ?>" alt="" class="figure-img img-fluid">
                                        </figure>
                                        <?php } ?> 
										<div class="d-flex flex-nowrap align-items-start">

											<?php if ($slide['external_link']) { ?> 
											<a href="<?php echo esc_url($slide['external_link']); ?>" class="site-link me-3" target="_blank">
												<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
													<line y1="-1" x2="10.1109" y2="-1" transform="matrix(0.706452 -0.707761 0.706452 0.707761 29.9668 36.8691)" stroke="none" stroke-width="2"/>
													<line y1="-1" x2="9.09979" y2="-1" transform="matrix(0.706452 0.707761 -0.706452 0.707761 22.8564 29.7134)" stroke="none" stroke-width="2"/>
												</svg>
											</a>
											<?php } elseif ($slide['internal_link']) { ?> 
											<a href="<?php echo esc_url($slide['internal_link']); ?>" class="site-link me-3">
												<svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M38.5239 49.88V44.03H33.0639V42.17H38.5239V36.32H40.4739V42.17H45.9339V44.03H40.4739V49.88H38.5239Z" fill="#161616" />
												</svg>
											</a>
											<?php } ?>

											<div class="link-carousel-content">
                                                <?php if ($slide['title']) { ?> 
                                                <h6 class="display-3 mb-3 lh-1">
                                                    <?php echo $slide['title']; ?> 
                                                </h6>
                                                <?php } ?>
                                                <?php if ($slide['text']) { ?> 
                                                <p class="display-4 mb-0 lh-sm fw-normal">
                                                    <?php echo nl2br($slide['text']); ?> 
                                                </p>
                                                <?php } ?> 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <?php } ?> 
                            </div>
								<?php if ( $count >= 4 ) { ?>
							<div class="pager">
								<a class="prev" href="#" role="button">&lsaquo;</a>
								<a class="next" href="#" role="button">&rsaquo;</a>
							</div>
								<?php } ?>
                            <?php } ?> 
                        </div>
                    </div>
                </div>
                <!-- / link-carousel -->
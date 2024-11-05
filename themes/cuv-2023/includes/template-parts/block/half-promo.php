<?php
/**
 * Block Name: Half Promo
 *
 * This is the template that displays the half promo block.
 */

// create id attribute for styling
$id = 'half-promo-' . $block['id'];

$half_promo = get_field('half_promo');
?>

                <!-- half-promos -->
                <div id="<?php echo $id; ?>" class="module<?php if( !empty($block['className'])) { echo " ".$block['className']; } ?>">
                    <div class="row g-0">
                        <?php foreach ($half_promo as $promo) { ?> 
                        <div class="col-xxl-6 bg-nearly-white half-promo rect-outer<?php echo $promo['external_link'] || $promo['internal_link'] ? ' has-link' : ''; ?>">
							<div class="half-promo-image rect-inner"<?php if( $promo['image'] ) { echo ' style="background-image: url('.esc_url($promo['image']['url']).')"'; } ?>></div>
                            <div class="half-promo-content rect-inner d-flex flex-column justify-content-end">
                                <div class="half-promo-content-inner<?php echo $promo['vignette'] ? ' no-vignette' : ''; ?><?php echo $promo['white_text'] ? ' text-white' : ''; ?>">
                                    <<?php echo $promo['title_tag']; ?> class="lh-1 mb-3 <?php echo $promo['title_css_class']; ?>">
                                        <?php echo $promo['title']; ?>
                                    </<?php echo $promo['title_tag']; ?>>
                                    <div class="d-flex flex-nowrap align-items-start align-items-md-center">
                                        <?php if ($promo['external_link']) { ?> 
                                        <a href="<?php echo esc_url($promo['external_link']); ?>" class="site-link stretched-link me-3<?php echo $promo['white_text'] ? ' text-white border-white' : ''; ?>" target="_blank">
											<svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
												<line y1="-1" x2="10.1109" y2="-1" transform="matrix(-0.707761 -0.706452 0.707761 -0.706452 45.8691 40.0327)" stroke="none" stroke-width="2" />
												<line y1="-1" x2="9.09979" y2="-1" transform="matrix(0.707761 -0.706452 0.707761 0.706452 38.7129 47.1436)" stroke="none" stroke-width="2" />
											</svg>
										</a>
                                        <?php } elseif ($promo['internal_link']) { ?> 
                                    	<a href="<?php echo esc_url($promo['internal_link']); ?>" class="site-link stretched-link me-3<?php echo $promo['white_text'] ? ' text-white border-white' : ''; ?>">
											<svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M38.5239 49.88V44.03H33.0639V42.17H38.5239V36.32H40.4739V42.17H45.9339V44.03H40.4739V49.88H38.5239Z" fill="#161616"/>
											</svg>
										</a>
                                        <?php } ?>
										
                                        <?php if ($promo['text']) { ?> 
                                        <p class="mb-0 lh-sm">
                                            <?php echo nl2br($promo['text']); ?> 
                                        </p>
                                        <?php } ?> 
                                    </div>
                                </div>
                            </div>
                        </div>
                        <?php } ?> 
                    </div>
                </div>
                <!-- / half-promos -->
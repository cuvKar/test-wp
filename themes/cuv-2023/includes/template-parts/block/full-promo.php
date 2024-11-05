<?php
/**
 * Block Name: List Block
 *
 * This is the template that displays the list block.
 */

// create id attribute for styling
$id = 'full-promo-' . $block['id'];

$full_promo = get_field('full_promo');
$full_promo_image = $full_promo['image'] ? ' style="background-image: url('.esc_url($full_promo['image']['url']).')"' : '';
$external_link = $full_promo['external_link'];
?>
				<!-- full-promo -->
				<div id="<?php echo $id; ?>" 
					class="module<?php if( !empty($block['className'])) { echo " ".$block['className']; } ?>">
					<div class="full-promo rect-outer<?php echo $full_promo['external_link'] || $full_promo['internal_link'] ? ' has-link' : ''; ?>" <?php echo $full_promo_image; ?>>
						<?php /*== Note: commented out, but fully expecting to need to change this. <img src="<?php echo esc_url($full_promo['image']['sizes']['full-promo']); ?>" alt="" class="img-fluid mb-5 mb-md-0" srcset="<?php echo esc_url($full_promo['image']['sizes']['full-promo']); ?> 1920w, <?php echo esc_url($full_promo['image']['sizes']['tablet']); ?> 834w, <?php echo esc_url($full_promo['image']['sizes']['mobile']); ?> 393w" sizes="(max-width: 576px) calc(100vw - 0), (max-width: 768px) calc(100vw - 0), (max-width: 1920px) calc(100vw - 0)"> */ ?>
						<div class="full-promo-content rect-inner d-flex flex-column justify-content-end">
							<div class="full-promo-content-inner<?php echo $full_promo['vignette'] ? ' no-vignette' : ''; ?><?php echo $full_promo['white_text'] ? ' text-white' : ''; ?>">
								<<?php echo $full_promo['title_tag']; ?> class="lh-1 mb-3 <?php echo $full_promo['title_css_class']; ?>">
									<?php echo $full_promo['title']; ?>
								</<?php echo $full_promo['title_tag']; ?>>
								<div class="d-flex flex-nowrap align-items-start align-items-md-center full-promo-text<?php echo $full_promo['indentation'] ? ' ps-xxl-5 ms-xxl-4' : ''; ?>">
									<?php if ($full_promo['external_link']) { ?> 
									<a href="<?php echo esc_url($full_promo['external_link']); ?>" class="site-link stretched-link me-3<?php echo $full_promo['white_text'] ? ' text-white border-white' : ''; ?>" <?php if ( str_starts_with( $full_promo['external_link'], '#' )) {
										echo '><svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" class="link-named"><line y1="-1" x2="10.1109" y2="-1" transform="matrix(0.706452 -0.707761 0.706452 0.707761 29.9668 36.8691)" stroke="none" stroke-width="2"/><line y1="-1" x2="9.09979" y2="-1" transform="matrix(0.706452 0.707761 -0.706452 0.707761 22.8564 29.7134)" stroke="none" stroke-width="2"/></svg>';
									} else {
										echo 'target="_blank"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" class="link-ext"><line class="cls-1" x1="36.16" y1="30.74" x2="29.01" y2="23.6" stroke="none" stroke-width="2" /><line class="cls-1" x1="29.01" y1="36.44" x2="35.45" y2="30.01" stroke="none" stroke-width="2" /></svg>';
									} ?>
									</a>
									<?php } elseif ($full_promo['internal_link']) { ?> 
									<a href="<?php echo esc_url($full_promo['internal_link']); ?>" class="site-link stretched-link me-3<?php echo $full_promo['white_text'] ? ' text-white border-white' : ''; ?>">
										<svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M38.5239 49.88V44.03H33.0639V42.17H38.5239V36.32H40.4739V42.17H45.9339V44.03H40.4739V49.88H38.5239Z" fill="#161616" />
										</svg>
									</a>
									<?php } ?>
									
									<?php if ($full_promo['text']) { ?> 
									<p class="mb-0 lh-sm">
										<?php echo nl2br($full_promo['text']); ?> 
									</p>
									<?php } ?>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- / full-promo -->
				<?php if ( str_starts_with( $full_promo['external_link'], '#' )) { ?>
				<div id="<?php echo substr( $full_promo['external_link'], 1 ) ?>" class="anchor-named"></div>
				<?php } ?>


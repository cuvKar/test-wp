<?php
/**
 * Block Name: Stack Block
 *
 * This is the template that displays the stack block.
 */

// create id attribute for styling
$id = 'stack-promo-' . $block['id'];

$stack_promo = get_field('stack_promo');
?>

				<!-- stack-promo -->
				<div class="module stack-promo bg-nearly-white padded">
					<div class="container-fluid">
						<div class="row">
							<?php if ($stack_promo['layout'] === 'image-first') { ?> 
							<div class="col-xxl-6 half-promo text-center mb-4 mb-xxl-0">
								<figure class="figure mb-0">
									<img src="<?php echo esc_url($stack_promo['image']['sizes']['stack-promo']); ?>" alt="" class="figure-img img-fluid mb-0">
								</figure>
							</div>
							<?php } ?>
							<div class="col-xxl-6 half-promo<?php echo $stack_promo['layout'] === 'text-first' ? ' order-2 order-xxl-1' : ''; ?>">
								<div class="half-promo-content d-flex flex-column justify-content-<?php echo $stack_promo['content_alignment']; ?> h-100">
									<div class="half-promo-content-inner<?php echo $stack_promo['vignette'] ? ' no-vignette' : ''; ?>">
										<<?php echo $stack_promo['title_tag']; ?> class="mb-3 <?php echo $stack_promo['title_css_class']; ?>">
											<?php echo $stack_promo['title']; ?>
										</<?php echo $stack_promo['title_tag']; ?>>
										<?php if ($stack_promo['external_link'] || $stack_promo['internal_link']) { ?>

										<div class="d-flex flex-nowrap align-items-center">

											<?php if ($stack_promo['external_link']) { ?> 
											<a href="<?php echo esc_url($stack_promo['external_link']); ?>" class="site-link me-3" target="_blank">
												<svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
													<line y1="-1" x2="10.1109" y2="-1" transform="matrix(-0.707761 -0.706452 0.707761 -0.706452 45.8691 40.0327)" stroke="none" stroke-width="2" />
													<line y1="-1" x2="9.09979" y2="-1" transform="matrix(0.707761 -0.706452 0.707761 0.706452 38.7129 47.1436)" stroke="none" stroke-width="2" />
												</svg>
											</a>
											<?php } elseif ($stack_promo['internal_link']) { ?> 
											<a href="<?php echo esc_url($stack_promo['internal_link']); ?>" class="site-link me-3">
												<svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M38.5239 49.88V44.03H33.0639V42.17H38.5239V36.32H40.4739V42.17H45.9339V44.03H40.4739V49.88H38.5239Z" fill="#161616"/>
												</svg>
											</a>
											<?php } ?>
											<?php if ($stack_promo['text']) { ?> 
											<p class="mb-0 lh-sm display-4 fw-normal">
												<?php echo nl2br($stack_promo['text']); ?>
											</p>
											<?php } ?>

										</div>
										<?php } else { ?> 

											<?php if ($stack_promo['text']) { ?> 
										<p class="mb-0 lh-sm display-4 fw-normal">
											<?php echo nl2br($stack_promo['text']); ?> 
										</p>
											<?php }
										} ?> 
									</div>

								</div>
							</div>
							<?php if ($stack_promo['layout'] === 'text-first') { ?> 
							<div class="col-xxl-6 half-promo text-center mb-4 mb-xxl-0 order-1 order-xxl-2">
								<figure class="figure mb-0">
									<img src="<?php echo esc_url($stack_promo['image']['sizes']['stack-promo']); ?>" alt="" class="figure-img img-fluid mb-0">
								</figure>
							</div>
							<?php } ?>
						</div>
					</div>
				</div>
				<!-- / stack-promo -->
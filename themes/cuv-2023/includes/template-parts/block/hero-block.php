<?php
/**
 * Block Name: Hero Block
 *
 * This is the template that displays the hero block.
 */

// create id attribute for styling
$id = 'hero-block-' . $block['id'];

$hero_block = get_field('hero_block');
$hero_image = $hero_block['image'] ? ' style="background-image: url('.esc_url($hero_block['image']).')"' : '';
?>

				<!-- hero -->
				<div id="<?php echo $id; ?>" class="module hero" <?php echo $hero_image; ?>>
					<div class="hero-inner h-100 d-flex flex-column justify-content-end<?php echo $hero_block['external_link'] || $hero_block['internal_link'] ? ' has-link' : ''; ?>">
						<?php if ($hero_block['title_line_1'] || $hero_block['title_line_2'] || $hero_block['title_line_3']) { ?>
						<div class="row g-5" style="width: 100%; margin-right: auto; margin-left: auto;">

							<div style="width: 100%;">
								<h1 class="hero-title text-white fw-light">
									<?php if ($hero_block['title_line_1']) { ?>
									<span class="d-block text-center"><?php echo $hero_block['title_line_1']; ?></span>
									<?php } ?>
									<?php if ($hero_block['title_line_2']) { ?>
									<span class="d-block text-center"><?php echo $hero_block['title_line_2']; ?></span>
									<?php } ?>
									<?php if ($hero_block['title_line_3']) { ?>
									<span class="d-block text-center"><?php echo $hero_block['title_line_3']; ?></span>
									<?php } ?>
								</h1>
							</div>

							<div class="hero-content-inner<?php echo $hero_block['vignette'] ? ' no-vignette' : ''; ?><?php echo $hero_block['white_text'] ? ' text-white' : ''; ?>">
								<div class="d-flex flex-nowrap align-items-start align-items-md-center hero-content-inner-text px-1 mx-4 pb-4">
									<?php if ($hero_block['external_link']) { ?>
									<a href="<?php echo esc_url($hero_block['external_link']); ?>" class="site-link stretched-link me-3<?php echo $hero_block['white_text'] ? ' text-white border-white' : ''; ?>" <?php if ( str_starts_with( $hero_block['external_link'], '#' )) {
										echo '><svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" class="link-named"><line y1="-1" x2="10.1109" y2="-1" transform="matrix(0.706452 -0.707761 0.706452 0.707761 29.9668 36.8691)" stroke="none" stroke-width="2"/><line y1="-1" x2="9.09979" y2="-1" transform="matrix(0.706452 0.707761 -0.706452 0.707761 22.8564 29.7134)" stroke="none" stroke-width="2"/></svg>';
									} else {
										echo 'target="_blank"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" class="link-ext"><line class="cls-1" x1="36.16" y1="30.74" x2="29.01" y2="23.6" stroke="none" stroke-width="2" /><line class="cls-1" x1="29.01" y1="36.44" x2="35.45" y2="30.01" stroke="none" stroke-width="2" /></svg>';
									} ?>
									</a>
									<?php } elseif ($hero_block['internal_link']) { ?>
									<a href="<?php echo esc_url($hero_block['internal_link']); ?>" class="site-link stretched-link me-3<?php echo $hero_block['white_text'] ? ' text-white border-white' : ''; ?>"><svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M38.5239 49.88V44.03H33.0639V42.17H38.5239V36.32H40.4739V42.17H45.9339V44.03H40.4739V49.88H38.5239Z" fill="#161616"/> </svg></a>
									<?php } ?>
									
									<?php if ($hero_block['text']) { ?>
									<p class="mb-0 lh-sm">
										<?php echo nl2br($hero_block['text']); ?>
									</p>
									<?php } ?>
								</div>
							</div>

						</div>
						<?php } ?>
					</div>
				</div>
				<!-- / hero -->
				<?php if ( str_starts_with( $hero_block['external_link'], '#' )) { ?>
				<div id="<?php echo substr( $hero_block['external_link'], 1 ) ?>" class="anchor-named"></div>
				<?php } ?>
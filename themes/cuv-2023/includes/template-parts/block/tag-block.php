<?php
/**
 * Block Name: Tag Block
 *
 * This is the template that displays the tag block.
 */

// create id attribute for styling
$id = 'tag-block-' . $block['id'];

$tag_block = get_field('tag_block');
?>
				<style>
				/** === START: Module - Tag block ====== **/
				h3.tag-block-content {
					margin-top: 0;
					margin-bottom: 0.5rem;
					font-family: "SilkSerifLight", sans-serif;
					font-size: 1.875rem;
					font-weight: 500;
					line-height: 1.2;
					color: var(--bs-heading-color);
				}


				@media (min-width: 768px) {
					h3.tag-block-content { font-size: 2.5rem; }
				}


				@media (min-width: 1366px) {
					h3.tag-block-content { font-size: 3.125rem; }
				}


				@media (min-width: 1920px) {
					h3.tag-block-content { font-size: 4.375rem; }
				}
				/* === END: Module - Tag block === */
				</style>
                <!-- tag-block -->
                <div id="<?php echo $id; ?>" class="module padded<?php if( !empty($block['className'])) { echo " ".$block['className']; } ?>">
                    <div class="tag-block">
                        <div class="container-fluid d-flex flex-column justify-content-between h-100">
                            <?php if ($tag_block['title']) { ?> 
                            <<?php echo $tag_block['title_tag']; ?> class="lh-1 fw-semibold <?php echo $tag_block['title_css_class'] ?: ''; ?>"><?php echo $tag_block['title']; ?></<?php echo $tag_block['title_tag']; ?>>
                            <?php } ?> 
                            <?php if ($tag_block['tags']) { ?> 
                            <h3 class="tag-block-content mt-5 mb-0">
                                <?php foreach ($tag_block['tags'] as $tag) { ?>
									<?php $tag_delimiter = ($tag === end($tag_block['tags'])) ? '.' : ', '; ?>
									<?php echo '<a href="'. $tag['link']['url'] .'" target="' . $tag['link']['target'] .'">' . $tag['link']['title'] . $tag_delimiter .'</a>'; ?>
                                <?php } ?> 
                            </h3>
                            <?php } ?> 
                        </div>
                    </div>
                </div>
                <!-- / tag-block -->

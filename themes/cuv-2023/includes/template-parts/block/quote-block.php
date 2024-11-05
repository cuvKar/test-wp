<?php
/**
 * Block Name: Quote Block
 *
 * This is the template that displays the quote block.
 */

// create id attribute for styling
$id = 'quote-block-' . $block['id'];

$quote_block = get_field('quote_block');
?>

                <!-- quote-block -->
                <div id="<?php echo $id; ?>" class="module padded-limited">
                    <div class="quote-block">
                        <div class="container-fluid d-flex flex-column justify-content-start h-100">
                            <svg xmlns="http://www.w3.org/2000/svg" width="83" height="51" viewBox="0 0 83 51" fill="none">
                                <path d="M29.4159 0L30.3945 0.652643C25.3197 3.77019 22.456 8.40938 21.8041 14.5716C31.4805 17.4353 36.3202 23.2161 36.3202 31.9154C36.3202 37.28 34.544 41.8031 30.9916 45.481C27.4392 49.1611 23.0899 51 17.9423 51C12.7226 51 8.42668 49.1517 5.05601 45.4543C1.68534 41.757 0 37.0276 0 31.2627C0 24.013 2.7988 17.3438 8.4 11.2543C14.0012 5.1649 21.0065 1.41346 29.4159 0ZM75.957 0L76.9356 0.652643C71.8608 3.77019 68.9971 8.40938 68.3452 14.5716C78.0216 17.4353 82.8613 23.2161 82.8613 31.9154C82.8613 37.28 81.0851 41.8031 77.5327 45.481C73.9803 49.1611 69.631 51 64.4834 51C59.2637 51 54.9678 49.1517 51.5971 45.4543C48.2264 41.757 46.5411 37.0276 46.5411 31.2627C46.5411 24.013 49.3399 17.3438 54.9411 11.2543C60.543 5.1649 67.5476 1.41346 75.957 0Z" fill="#CCC3BC"/>
                            </svg>
                            <?php if ($quote_block['title']) { ?> 
                            <<?php echo $quote_block['title_tag']; ?> class="lh-1 mt-4 <?php echo $quote_block['title_css_class'] ?: ''; ?>">
                                <?php echo $quote_block['title']; ?> 
                            </<?php echo $quote_block['title_tag']; ?>>
                            <?php } ?> 
                            <?php if ($quote_block['cite_name']) { ?> 
                            <p class="mb-0 display-3 fw-normal mt-auto">
                                <?php echo $quote_block['cite_name']; ?>
                                <?php if ($quote_block['cite_position']) { ?> 
                                <br>
                                <?php echo $quote_block['cite_position']; ?> 
                                <?php } ?> 
                            </p>
                            <?php } ?> 
                        </div>
                    </div>
                </div>
                <!-- / quote-block -->


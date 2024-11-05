<?php
/**
 * Block Name: Product Block
 *
 * This is the template that displays the product block.
 */

// create id attribute for styling
$id = 'product-block-' . $block['id'];

$image_carousel = get_field('image_carousel');
$product_tabs   = get_field('tabs');
?>
                <!-- product-block -->
                <div id="<?php echo $id; ?>" class="module">
                    <div class="product-block">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-xxl-6">
                                    <?php if ($image_carousel) { ?> 
                                    <div class="image-carousel">
                                        <div class="carousel">
                                            <?php foreach ($image_carousel as $slide) { ?> 
                                            <figure class="figure mb-0">
                                                <img src="<?php echo esc_url($slide['image']['sizes']['half-promo']); ?>" alt="" class="figure-img img-fluid mb-0">
                                            </figure>
                                            <?php } ?> 
                                        </div>
                                    </div>
                                    <div class="pager d-none">
                                        <a class="prev" href="#" role="button">&lsaquo;</a>
                                        <a class="next" href="#" role="button">&rsaquo;</a>
                                    </div>
                                    <?php } ?> 
                                </div>
                                <div class="col-xxl-6 align-self-center">

                                    <?php if ($product_tabs) { ?> 
                                    <!-- Nav tabs -->
                                    <ul class="nav nav-underline nav-fill border-bottom border-black" id="product-tabs" role="tablist">
                                        <?php 
                                        $i = 1;
                                        foreach ($product_tabs as $tab) { 
                                        ?> 
                                        <li class="nav-item" role="presentation">
                                            <button class="nav-link display-3<?php echo $i > 1 ? '' : ' active'; ?>" id="tabs-<?php echo $block['id']; ?>-tab-<?php echo $i; ?>" data-bs-toggle="tab" data-bs-target="#tabs-<?php echo $block['id']; ?>-pane-<?php echo $i; ?>" type="button" role="tab" aria-controls="tabs-<?php echo $block['id']; ?>-pane-<?php echo $i; ?>" aria-selected="<?php echo $i > 1 ? 'false' : 'true'; ?>"><?php echo $tab['tab']['title']; ?></button>
                                        </li>
                                        <?php $i++; } ?> 
                                    </ul>

                                    <!-- Tab panes -->
                                    <div class="tab-content padded">
                                        <?php 
                                        $n = 1;
                                        foreach ($product_tabs as $tab) { 
                                        ?> 
                                        <div class="tab-pane<?php echo $n > 1 ? '' : ' active'; ?>" id="tabs-<?php echo $block['id']; ?>-pane-<?php echo $n; ?>" role="tabpanel" aria-labelledby="tabs-<?php echo $block['id']; ?>-tab-<?php echo $n; ?>" tabindex="0">
                                            <?php echo wpautop($tab['tab']['text']); ?> 
                                        </div>
                                        <?php $n++; } ?> 
                                    </div>
                                    <?php } ?> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- / product-block -->


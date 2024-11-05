<?php
/**
 * Block Name: People Block
 *
 * This is the template that displays the people block.
 */

// create id attribute for styling
$id = 'people-block-' . $block['id'];

$people_block = get_field('people_block');
$peoples      = array_chunk($people_block['people'], 3);
?>

<!-- people-block -->
<div id="<?php echo $id; ?>" class="module padded">
    <div class="people-block">
        <div class="container-fluid">
            <?php if ($people_block['title']) { ?>
            <<?php echo $people_block['title_tag']; ?>
                class="mb-5 lh-1 <?php echo $people_block['title_css_class']; ?>">
                <?php echo $people_block['title']; ?>
            </<?php echo $people_block['title_tag']; ?>>
            <?php } ?>
            <?php 
                            $x = 1;
                            foreach ($peoples as $people) { ?>
            <div id="<?php echo $id; ?>-<?php echo $x; ?>" class="row">
                <?php 
                                $i = 1;
                                foreach ($people as $person) { ?>
                <div id="person-<?php echo $block['id']; ?>-collapse-<?php echo $x; ?>-<?php echo $i; ?>"
                    class="col-xxl-4 mb-4 mb-xxl-0 person">
                    <figure class="figure mb-0 text-center">
                        <img src="<?php echo esc_url($person['image']['sizes']['half-promo']); ?>" alt=""
                            class="figure-img img-fluid mb-0">
                    </figure>
                    <div class="d-flex flex-nowrap align-items-start people-data">
                        <a aria-controls="people-<?php echo $block['id']; ?>-collapse-<?php echo $x; ?>-<?php echo $i; ?>"
                            aria-expanded="<?php echo ($x > 1) ? 'false' : (($i > 1) ? 'false' : 'true'); ?>"
                            data-bs-toggle="collapse"
                            href="#people-<?php echo $block['id']; ?>-collapse-<?php echo $x; ?>-<?php echo $i; ?>"
                            class="site-link me-3" role="button">
                            <svg width="80" height="80" viewBox="0 0 80 80"
                                fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="40" cy="40" r="39.5" transform="rotate(-90 40 40)" />
                                <circle cx="40" cy="40" r="39.5" transform="rotate(-90 40 40)" 
                                    stroke-opacity="0.2" />
                                <circle cx="40" cy="40" r="39.5" transform="rotate(-90 40 40)" 
                                    stroke-opacity="0.2" />
                                <circle cx="40" cy="40" r="39.5" transform="rotate(-90 40 40)" 
                                    stroke-opacity="0.2" />
                                <line y1="-1" x2="10.1109" y2="-1"
                                    transform="matrix(-0.707761 -0.706452 0.707761 -0.706452 45.8691 40.0327)"
                                    stroke-width="2" />
                                <line y1="-1" x2="10.1109" y2="-1"
                                    transform="matrix(-0.707761 -0.706452 0.707761 -0.706452 45.8691 40.0327)"
                                     stroke-opacity="0.2" stroke-width="2" />
                                <line y1="-1" x2="10.1109" y2="-1"
                                    transform="matrix(-0.707761 -0.706452 0.707761 -0.706452 45.8691 40.0327)"
                                     stroke-opacity="0.2" stroke-width="2" />
                                <line y1="-1" x2="10.1109" y2="-1"
                                    transform="matrix(-0.707761 -0.706452 0.707761 -0.706452 45.8691 40.0327)"
                                     stroke-opacity="0.2" stroke-width="2" />
                                <line y1="-1" x2="9.09979" y2="-1"
                                    transform="matrix(0.707761 -0.706452 0.707761 0.706452 38.7129 47.1436)"
                                    stroke-width="2" />
                                <line y1="-1" x2="9.09979" y2="-1"
                                    transform="matrix(0.707761 -0.706452 0.707761 0.706452 38.7129 47.1436)"
                                     stroke-opacity="0.2" stroke-width="2" />
                                <line y1="-1" x2="9.09979" y2="-1"
                                    transform="matrix(0.707761 -0.706452 0.707761 0.706452 38.7129 47.1436)"
                                     stroke-opacity="0.2" stroke-width="2" />
                                <line y1="-1" x2="9.09979" y2="-1"
                                    transform="matrix(0.707761 -0.706452 0.707761 0.706452 38.7129 47.1436)"
                                     stroke-opacity="0.2" stroke-width="2" />
                            </svg>
                        </a>
                        <div class="d-flex flex-nowrap flex-column">
                            <?php if ($person['name']) { ?>
                            <h6 class="display-3 lh-1">
                                <?php echo $person['name']; ?>
                            </h6>
                            <?php } ?>
                            <?php if ($person['position']) { ?>
                            <p class="display-3 mb-0 lh-sm fw-normal">
                                <?php echo nl2br($person['position']); ?>
                            </p>
                            <?php } ?>
                        </div>
                    </div>
                    <div class="people-text">
                        <?php if ($person['text_left']) { ?>
                        <?php echo apply_filters('the_content', $person['text_left']); ?>
                        <?php } ?>
                        <?php if ($person['text_right']) { ?>
                        <?php echo apply_filters('the_content', $person['text_right']); ?>
                        <?php } ?>
                    </div>
                </div>
                <?php $i++; } ?>
            </div>
            <div class="people-panes">
                <?php 
                                $n = 1;
                                foreach ($people as $person) { ?>
                <div id="people-<?php echo $block['id']; ?>-collapse-<?php echo $x; ?>-<?php echo $n; ?>"
                    class="people-pane bg-white collapse" data-bs-parent="#<?php echo $id; ?>"
                    data-person="person-<?php echo $block['id']; ?>-collapse-<?php echo $x; ?>-<?php echo $n; ?>">
                    <?php if ($person['text_left'] || $person['text_right']) { ?>
                    <div class="row">
                        <?php if ($person['text_left']) { ?>
                        <div class="col-xxl-6 people-pane-text">
                            <div class="display-4 lh-sm fw-normal">
                                <?php echo apply_filters('the_content', $person['text_left']); ?>
                            </div>
                        </div>
                        <?php } ?>
                        <?php if ($person['text_right']) { ?>
                        <div class="col-xxl-6 people-pane-text">
                            <div class="display-4 lh-sm fw-normal">
                                <?php echo apply_filters('the_content', $person['text_right']); ?>
                            </div>
                        </div>
                        <?php } ?>
                    </div>
                    <?php } ?>
                </div>
                <?php $n++; } ?>
            </div>
            <?php $x++; } ?>
        </div>
    </div>
</div>
<!-- / people-block -->
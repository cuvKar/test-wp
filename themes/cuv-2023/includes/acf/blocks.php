<?php
/**
 * Adds a Clinuvel Block Category to the Gutenberg category list.
 *
 * @param  array  $categories The existing categories.
 * @param  object $post The current post.
 * @return array  The updated array of categories.
 */
function cuv_2023_register_block_category($categories, $post) {

    $new = array(
        'cuv-2023-blocks-library' => array(
            'slug'  => 'cuv-2023-blocks-library',
            'title' => esc_html__('Clinuvel Blocks Library', 'cuvtwentythree')
        )
    );

    // just decide here at what position your custom category should appear
    $position = 0; // 2 – Before Text and Media, so technically it is a 3rd position

    $categories = array_slice($categories, 0, $position, true) + $new + array_slice($categories, $position, null, true);

    // reset array indexes
    $categories = array_values($categories);

    return $categories;
}
add_filter('block_categories_all', 'cuv_2023_register_block_category', 10, 2);



function cuv_2023_acf_init() {
    
    // check function exists
    if (function_exists('acf_register_block')) {
        
        // register a copy block
        acf_register_block(array(
            'name'              => 'copy-block',
            'title'             => __('Copy Block', 'cuvtwentythree'),
            'description'       => __('A custom copy block.', 'cuvtwentythree'),
            'render_callback'   => 'cuv_2023_acf_block_render_callback',
            'category'          => 'cuv-2023-blocks-library',
            'icon'              => 'editor-paragraph',
            'keywords'          => array('copy', 'text', 'wysiwyg'),
        ));

        // register a list block
        acf_register_block(array(
            'name'              => 'list-block',
            'title'             => __('List Block', 'cuvtwentythree'),
            'description'       => __('A custom list block.', 'cuvtwentythree'),
            'render_callback'   => 'cuv_2023_acf_block_render_callback',
            'category'          => 'cuv-2023-blocks-library',
            'icon'              => 'editor-ul',
            'keywords'          => array('copy', 'text', 'wysiwyg'),
        ));      

        // register a full promo block
        acf_register_block(array(
            'name'              => 'full-promo',
            'title'             => __('Full Promo', 'cuvtwentythree'),
            'description'       => __('A custom full promo block.', 'cuvtwentythree'),
            'render_callback'   => 'cuv_2023_acf_block_render_callback',
            'category'          => 'cuv-2023-blocks-library',
            'icon'              => 'id',
            'keywords'          => array('copy', 'text', 'wysiwyg'),
        ));      

        // register a half promo block
        acf_register_block(array(
            'name'              => 'half-promo',
            'title'             => __('Half Promo(s)', 'cuvtwentythree'),
            'description'       => __('A custom half promo(s) block.', 'cuvtwentythree'),
            'render_callback'   => 'cuv_2023_acf_block_render_callback',
            'category'          => 'cuv-2023-blocks-library',
            'icon'              => 'id-alt',
            'keywords'          => array('copy', 'text', 'wysiwyg'),
        ));

        // register a stack promo block
        acf_register_block(array(
            'name'              => 'stack-promo',
            'title'             => __('Stack Promo', 'cuvtwentythree'),
            'description'       => __('A custom stack promo block.', 'cuvtwentythree'),
            'render_callback'   => 'cuv_2023_acf_block_render_callback',
            'category'          => 'cuv-2023-blocks-library',
            'icon'              => 'id-alt',
            'keywords'          => array('copy', 'text', 'wysiwyg'),
        ));

        // register a accordion block
        acf_register_block(array(
            'name'              => 'accordion-block',
            'title'             => __('Accordion Block', 'cuvtwentythree'),
            'description'       => __('A custom accordion block.', 'cuvtwentythree'),
            'render_callback'   => 'cuv_2023_acf_block_render_callback',
            'category'          => 'cuv-2023-blocks-library',
            'icon'              => 'editor-kitchensink',
            'keywords'          => array('copy', 'text', 'wysiwyg'),
        ));

        // register a card block
        acf_register_block(array(
            'name'              => 'card-block',
            'title'             => __('Card Block', 'cuvtwentythree'),
            'description'       => __('A custom card block.', 'cuvtwentythree'),
            'render_callback'   => 'cuv_2023_acf_block_render_callback',
            'category'          => 'cuv-2023-blocks-library',
            'icon'              => 'text-page',
            'keywords'          => array('copy', 'text', 'wysiwyg'),
        ));

        // register a quote block
        acf_register_block(array(
            'name'              => 'quote-block',
            'title'             => __('Quote Block', 'cuvtwentythree'),
            'description'       => __('A custom quote block.', 'cuvtwentythree'),
            'render_callback'   => 'cuv_2023_acf_block_render_callback',
            'category'          => 'cuv-2023-blocks-library',
            'icon'              => 'format-quote',
            'keywords'          => array('copy', 'text', 'wysiwyg'),
        ));

        // register a video block
        acf_register_block(array(
            'name'              => 'video-block',
            'title'             => __('Video Block', 'cuvtwentythree'),
            'description'       => __('A custom video block.', 'cuvtwentythree'),
            'render_callback'   => 'cuv_2023_acf_block_render_callback',
            'category'          => 'cuv-2023-blocks-library',
            'icon'              => 'format-video',
            'keywords'          => array('copy', 'text', 'wysiwyg'),
        ));

        // register a link carousel block
        acf_register_block(array(
            'name'              => 'link-carousel',
            'title'             => __('Link Carousel', 'cuvtwentythree'),
            'description'       => __('A custom link carousel block.', 'cuvtwentythree'),
            'render_callback'   => 'cuv_2023_acf_block_render_callback',
            'category'          => 'cuv-2023-blocks-library',
            'icon'              => 'admin-links',
            'keywords'          => array('copy', 'text', 'wysiwyg'),
        ));

        // register a text carousel block
        acf_register_block(array(
            'name'              => 'text-carousel',
            'title'             => __('Text Carousel', 'cuvtwentythree'),
            'description'       => __('A custom text carousel block.', 'cuvtwentythree'),
            'render_callback'   => 'cuv_2023_acf_block_render_callback',
            'category'          => 'cuv-2023-blocks-library',
            'icon'              => 'admin-page',
            'keywords'          => array('copy', 'text', 'wysiwyg'),
        ));

        // register a quote carousel block
        acf_register_block(array(
            'name'              => 'quote-carousel',
            'title'             => __('Quote Carousel', 'cuvtwentythree'),
            'description'       => __('A custom quote carousel block.', 'cuvtwentythree'),
            'render_callback'   => 'cuv_2023_acf_block_render_callback',
            'category'          => 'cuv-2023-blocks-library',
            'icon'              => 'format-status',
            'keywords'          => array('copy', 'text', 'wysiwyg'),
        ));

        // register a news feed block
        acf_register_block(array(
            'name'              => 'news-feed',
            'title'             => __('News Feed', 'cuvtwentythree'),
            'description'       => __('A custom news feed block.', 'cuvtwentythree'),
            'render_callback'   => 'cuv_2023_acf_block_render_callback',
            'category'          => 'cuv-2023-blocks-library',
            'icon'              => 'category',
            'keywords'          => array('copy', 'text', 'wysiwyg'),
        ));

        // register a statement block
        acf_register_block(array(
            'name'              => 'statement',
            'title'             => __('Statement', 'cuvtwentythree'),
            'description'       => __('A custom statement block.', 'cuvtwentythree'),
            'render_callback'   => 'cuv_2023_acf_block_render_callback',
            'category'          => 'cuv-2023-blocks-library',
            'icon'              => 'testimonial',
            'keywords'          => array('copy', 'text', 'wysiwyg'),
        ));

        // register a tag block block
        acf_register_block(array(
            'name'              => 'tag-block',
            'title'             => __('Tag Block', 'cuvtwentythree'),
            'description'       => __('A custom tag block.', 'cuvtwentythree'),
            'render_callback'   => 'cuv_2023_acf_block_render_callback',
            'category'          => 'cuv-2023-blocks-library',
            'icon'              => 'tagcloud',
            'keywords'          => array('copy', 'text', 'wysiwyg'),
        ));

        // register a hero block
        acf_register_block(array(
            'name'              => 'hero-block',
            'title'             => __('Hero', 'cuvtwentythree'),
            'description'       => __('A custom hero block.', 'cuvtwentythree'),
            'render_callback'   => 'cuv_2023_acf_block_render_callback',
            'category'          => 'cuv-2023-blocks-library',
            'icon'              => 'format-image',
            'keywords'          => array('copy', 'text', 'wysiwyg'),
        ));

        // register a image annotation block
        acf_register_block(array(
            'name'              => 'image-annotation',
            'title'             => __('Image Annotation', 'cuvtwentythree'),
            'description'       => __('A custom image annotation block.', 'cuvtwentythree'),
            'render_callback'   => 'cuv_2023_acf_block_render_callback',
            'category'          => 'cuv-2023-blocks-library',
            'icon'              => 'format-image',
            'keywords'          => array('copy', 'text', 'wysiwyg'),
        ));

        // register a people block
        acf_register_block(array(
            'name'              => 'people-block',
            'title'             => __('People Block', 'cuvtwentythree'),
            'description'       => __('A custom people block.', 'cuvtwentythree'),
            'render_callback'   => 'cuv_2023_acf_block_render_callback',
            'category'          => 'cuv-2023-blocks-library',
            'icon'              => 'groups',
            'keywords'          => array('copy', 'text', 'wysiwyg'),
        ));

        // register a product block
        acf_register_block(array(
            'name'              => 'product-block',
            'title'             => __('Product Block', 'cuvtwentythree'),
            'description'       => __('A custom product block.', 'cuvtwentythree'),
            'render_callback'   => 'cuv_2023_acf_block_render_callback',
            'category'          => 'cuv-2023-blocks-library',
            'icon'              => 'products',
            'keywords'          => array('copy', 'text', 'wysiwyg'),
        ));

        // register a table block
        acf_register_block(array(
            'name'              => 'table-block',
            'title'             => __('Table Block', 'cuvtwentythree'),
            'description'       => __('A custom table block.', 'cuvtwentythree'),
            'render_callback'   => 'cuv_2023_acf_block_render_callback',
            'category'          => 'cuv-2023-blocks-library',
            'icon'              => 'editor-table',
            'keywords'          => array('copy', 'text', 'wysiwyg'),
        ));

        // register a share price block
        acf_register_block(array(
            'name'              => 'share-price',
            'title'             => __('Share Price', 'cuvtwentythree'),
            'description'       => __('A custom share price block.', 'cuvtwentythree'),
            'render_callback'   => 'cuv_2023_acf_block_render_callback',
            'category'          => 'cuv-2023-blocks-library',
            'icon'              => 'money-alt',
            'keywords'          => array('copy', 'text', 'wysiwyg'),
        ));

        // register a asx header block
        acf_register_block(array(
            'name'              => 'asx-header',
            'title'             => __('ASX Header', 'cuvtwentythree'),
            'description'       => __('A custom asx header block.', 'cuvtwentythree'),
            'render_callback'   => 'cuv_2023_acf_block_render_callback',
            'category'          => 'cuv-2023-blocks-library',
            'icon'              => 'format-aside',
            'keywords'          => array('copy', 'text', 'wysiwyg'),
        ));

        // register a tech note block
        acf_register_block(array(
            'name'              => 'tech-note',
            'title'             => __('Tech Note', 'cuvtwentythree'),
            'description'       => __('A custom tech note block.', 'cuvtwentythree'),
            'render_callback'   => 'cuv_2023_acf_block_render_callback',
            'category'          => 'cuv-2023-blocks-library',
            'icon'              => 'format-aside',
            'keywords'          => array('copy', 'text', 'wysiwyg'),
        ));

        // register a download block
        acf_register_block(array(
            'name'              => 'download-block',
            'title'             => __('Download Block', 'cuvtwentythree'),
            'description'       => __('A custom download block.', 'cuvtwentythree'),
            'render_callback'   => 'cuv_2023_acf_block_render_callback',
            'category'          => 'cuv-2023-blocks-library',
            'icon'              => 'pdf',
            'keywords'          => array('copy', 'text', 'wysiwyg'),
        ));

        // register a regulatory footer block
        acf_register_block(array(
            'name'              => 'regulatory-footer',
            'title'             => __('Regulatory Footer', 'cuvtwentythree'),
            'description'       => __('A custom regulatory footer block.', 'cuvtwentythree'),
            'render_callback'   => 'cuv_2023_acf_block_render_callback',
            'category'          => 'cuv-2023-blocks-library',
            'icon'              => 'info',
            'keywords'          => array('copy', 'text', 'wysiwyg'),
        ));

        // register a post data block
        acf_register_block(array(
            'name'              => 'post-data',
            'title'             => __('Post Data', 'cuvtwentythree'),
            'description'       => __('A custom post data block.', 'cuvtwentythree'),
            'render_callback'   => 'cuv_2023_acf_block_render_callback',
            'category'          => 'cuv-2023-blocks-library',
            'icon'              => 'clock',
            'keywords'          => array('copy', 'text', 'wysiwyg'),
        ));

        // register a post titles block
        acf_register_block(array(
            'name'              => 'post-titles',
            'title'             => __('Post Titles', 'cuvtwentythree'),
            'description'       => __('A custom post titles block.', 'cuvtwentythree'),
            'render_callback'   => 'cuv_2023_acf_block_render_callback',
            'category'          => 'cuv-2023-blocks-library',
            'icon'              => 'heading',
            'keywords'          => array('copy', 'text', 'wysiwyg'),
        ));
    }
}
add_action('acf/init', 'cuv_2023_acf_init');



function cuv_2023_acf_block_render_callback($block) {
    
    // convert name ("acf/XXX-block") into path friendly slug
    $slug = str_replace('acf/', '', $block['name']);
    
    // include a template part from within the "template-parts/block" folder
    if (file_exists(get_theme_file_path("/includes/template-parts/block/{$slug}.php"))) {
        include (get_theme_file_path("/includes/template-parts/block/{$slug}.php"));
    }
}

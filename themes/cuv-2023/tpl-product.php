<?php
/**
 * Template Name: Product
 * Description: A Page Template for the "Product" pages of the site.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package     WordPress
 * @subpackage  cuvtwentythree
 * @author      Clinuvel <www.clinuvel.co.uk>
 */
get_header(); ?>

        <!-- main -->
        <main id="main">

            <?php if (have_posts()) : while (have_posts()) : the_post(); ?>

            <article id="<?php the_ID(); ?>" <?php post_class(); ?>>

                <!-- post-data -->
                <div class="module post-data pt-2">
                    <div class="container-fluid">
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="#">HOME</a></li>
                                <li class="breadcrumb-item"><a href="#">PHOTOCOSMETICS</a></li>
                                <li class="breadcrumb-item"><a href="#">POLYCHROMATIC PHOTOPROTECTION</a></li>
                                <li class="breadcrumb-item active" aria-current="page">CYACELLE</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <!-- / post-data -->

                <!-- full-promo -->
                <div class="module">
                    <div class="full-promo rect-outer">
                        <img src="<?php echo get_template_directory_uri() . '/public/img/modules/full-promo/full-promo-6.png'; ?>" alt="" class="img-fluid mb-5 mb-md-0" srcset="<?php echo get_template_directory_uri() . '/public/img/modules/full-promo/full-promo-6.png'; ?> 1366w, <?php echo get_template_directory_uri() . '/public/img/modules/full-promo/full-promo-6-md.png'; ?> 834w, <?php echo get_template_directory_uri() . '/public/img/modules/full-promo/full-promo-6-sm.png'; ?> 393w">
                        <div class="full-promo-content rect-inner d-flex flex-column justify-content-end">
                            <div class="full-promo-content-inner no-vignette">
                                <h1 class="mb-3 lh-1">
                                    CYACÊLLE<sup>&#174;</sup>
                                </h1>
                                <div class="d-flex flex-nowrap align-items-center full-promo-text">
                                    <a href="#" class="site-link me-3">
                                        &rsaquo;
                                    </a>
                                    <p class="mb-0 lh-sm">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam ullamco.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- / full-promo -->

                <!-- full-promo -->
                <div class="module">
                    <div class="full-promo rect-outer">
                        <img src="<?php echo get_template_directory_uri() . '/public/img/modules/full-promo/full-promo-7.png'; ?>" alt="" class="img-fluid mb-5 mb-md-0" srcset="<?php echo get_template_directory_uri() . '/public/img/modules/full-promo/full-promo-7.png'; ?> 1366w, <?php echo get_template_directory_uri() . '/public/img/modules/full-promo/full-promo-7-md.png'; ?> 834w, <?php echo get_template_directory_uri() . '/public/img/modules/full-promo/full-promo-7-sm.png'; ?> 393w">
                        <div class="full-promo-content rect-inner d-flex flex-column justify-content-center align-items-center">
                            <h2 class="lh-1 text-center text-white px-5">
                                An editorial statement about our product and impact it’s having in the world. Lorem ipsum sit dolor amet.
                            </h2>
                        </div>
                    </div>
                </div>
                <!-- / full-promo -->

                <!-- product-block -->
                <div class="module">
                    <div class="product-block">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-xxl-6">
                                    <div class="image-carousel">
                                        <figure class="figure mb-0">
                                            <img src="<?php echo get_template_directory_uri() . '/public/img/modules/half-promo/half-promo-11.png'; ?>" alt="" class="figure-img img-fluid mb-0">
                                        </figure>
                                        <figure class="figure mb-0 d-none">
                                            <img src="<?php echo get_template_directory_uri() . '/public/img/modules/half-promo/half-promo-11.png'; ?>" alt="" class="figure-img img-fluid mb-0">
                                        </figure>
                                        <figure class="figure mb-0 d-none">
                                            <img src="<?php echo get_template_directory_uri() . '/public/img/modules/half-promo/half-promo-11.png'; ?>" alt="" class="figure-img img-fluid mb-0">
                                        </figure>
                                    </div>
                                    <div class="pager d-none">
                                        <a class="prev" href="#" role="button">&lsaquo;</a>
                                        <a class="next" href="#" role="button">&rsaquo;</a>
                                    </div>
                                </div>
                                <div class="col-xxl-6 align-self-center">

                                    <!-- Nav tabs -->
                                    <ul class="nav nav-underline nav-fill border-bottom border-black" id="product-tabs" role="tablist">
                                        <li class="nav-item" role="presentation">
                                            <button class="nav-link active display-3" id="description-tab" data-bs-toggle="tab" data-bs-target="#description" type="button" role="tab" aria-controls="description" aria-selected="true">Description</button>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <button class="nav-link display-3" id="ingredients-tab" data-bs-toggle="tab" data-bs-target="#ingredients" type="button" role="tab" aria-controls="ingredients" aria-selected="false">Ingredients</button>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <button class="nav-link display-3" id="how-to-use-tab" data-bs-toggle="tab" data-bs-target="#how-to-use" type="button" role="tab" aria-controls="how-to-use" aria-selected="false">How To Use</button>
                                        </li>
                                    </ul>

                                    <!-- Tab panes -->
                                    <div class="tab-content padded">
                                        <div class="tab-pane active" id="description" role="tabpanel" aria-labelledby="description-tab" tabindex="0">
                                            <p class="display-3 fw-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                                            <p class="display-3 fw-normal">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                        </div>
                                        <div class="tab-pane" id="ingredients" role="tabpanel" aria-labelledby="ingredients-tab" tabindex="0">
                                            <p class="display-3 fw-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                                            <p class="display-3 fw-normal">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                        </div>
                                        <div class="tab-pane" id="how-to-use" role="tabpanel" aria-labelledby="how-to-use-tab" tabindex="0">
                                            <p class="display-3 fw-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                                            <p class="display-3 fw-normal">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                        </div>
                                        <a class="btn btn-dark btn-lg">Go To Shop</a>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- / product-block -->

                <!-- video-block -->
                <div class="module video-block padded">
                    <div class="container-fluid ps-xxl-0">
                        <div class="row align-items-end">
                            <div class="col-xxl-9 mb-4 mb-xxl-0">
                                <div class="ratio ratio-16x9">
                                    <iframe src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" title="YouTube video" allowfullscreen></iframe>
                                </div>
                            </div>
                            <div class="col-xxl-3">
                                <h6 class="display-3 mb-3">How It Works</h6>
                                <p class="mb-0 lh-sm display-4 fw-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- / video-block -->

                <!-- half-promos -->
                <div class="module">
                    <div class="row g-0">
                        <div class="col-xxl-6 bg-nearly-white half-promo rect-outer">
                            <img src="<?php echo get_template_directory_uri() . '/public/img/modules/half-promo/half-promo-11.png'; ?>" alt="" class="img-fluid mb-5 mb-md-0" srcset="<?php echo get_template_directory_uri() . '/public/img/modules/half-promo/half-promo-11.png'; ?> 960w, <?php echo get_template_directory_uri() . '/public/img/modules/half-promo/half-promo-11-md.png'; ?> 834w, <?php echo get_template_directory_uri() . '/public/img/modules/half-promo/half-promo-11-sm.png'; ?> 393w">
                            <div class="half-promo-content rect-inner d-flex flex-column justify-content-end">
                                <div class="half-promo-content-inner no-vignette">
                                    <h6 class="display-1 mb-3">
                                        CYACÉLLE<sup>&#174;</sup>
                                    </h6>
                                    <div class="d-flex flex-nowrap align-items-center">
                                        <a href="#" class="site-link me-3">
                                            &rsaquo;
                                        </a>
                                        <p class="mb-0 lh-sm">
                                            Go To Shop
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xxl-6 half-promo rect-outer">
                            <img src="<?php echo get_template_directory_uri() . '/public/img/modules/half-promo/half-promo-12.png'; ?>" alt="" class="img-fluid mb-5 mb-md-0" srcset="<?php echo get_template_directory_uri() . '/public/img/modules/half-promo/half-promo-12.png'; ?> 960w, <?php echo get_template_directory_uri() . '/public/img/modules/half-promo/half-promo-12-md.png'; ?> 834w, <?php echo get_template_directory_uri() . '/public/img/modules/half-promo/half-promo-12-sm.png'; ?> 393w">
                            <div class="half-promo-content rect-inner d-flex flex-column justify-content-end">
                                <div class="half-promo-content-inner no-vignette">
                                    <h6 class="display-1 mb-3">
                                        CYACÉLLE Radient<sup>&#174;</sup>
                                    </h6>
                                    <div class="d-flex flex-nowrap align-items-center">
                                        <a href="#" class="site-link me-3">
                                            &rsaquo;
                                        </a>
                                        <p class="mb-0 lh-sm">
                                            Go To Shop
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- / half-promo -->

                <!-- full-promo -->
                <div class="module">
                    <div class="full-promo rect-outer">
                        <img src="<?php echo get_template_directory_uri() . '/public/img/modules/hero/hero-home.png'; ?>" alt="" class="img-fluid" srcset="<?php echo get_template_directory_uri() . '/public/img/modules/hero/hero-home.png'; ?> 1366w, <?php echo get_template_directory_uri() . '/public/img/modules/hero/hero-home-md.png'; ?> 834w, <?php echo get_template_directory_uri() . '/public/img/modules/hero/hero-home-sm.png'; ?> 393w">
                        <div class="full-promo-content rect-inner d-flex flex-column justify-content-end">
                            <div class="full-promo-content-inner">
                                <h6 class="display-1 text-white mb-3">
                                    Polychromatic Photoprotection
                                </h6>
                                <div class="d-flex flex-nowrap align-items-center full-promo-text">
                                    <a href="#" class="site-link me-3 text-white border-white">
                                        &rsaquo;
                                    </a>
                                    <p class="mb-0 lh-sm text-white">
                                        PIONEERING SUNCARE Lorem ipsum dolor sit amet, consectetur adipiscing elit, do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam ullamco.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- / full-promo -->

                <!-- accordiom-block -->
                <div class="module padded-extra">
                    <div class="container-fluid pseudo-border-top padded-top">
                        <div class="row">
                            <div class="col-xxl-4 copy-block">
                                <h6 class="display-1 lh-1 mb-4 mb-xxl-0">
                                    FAQs
                                </h6>
                            </div>
                            <div class="col-xxl-8 accordiom-block">
                                <div id="accordion" class="accordion">
                                    <div class="accordion-row border-bottom border-black">
                                        <div class="accordion-header" id="heading-1">
                                            <h5 class="accordion-header-title mb-0 display-3">
                                                <a aria-controls="collapse-1" aria-expanded="true" data-parent="#accordion" data-bs-toggle="collapse" data-bs-target="#collapse-1" href="#collapse-1" class="text-decoration-none display-3 py-3">
                                                    Accordian Section Title
                                                </a>
                                            </h5>
                                        </div>
                                        <div id="collapse-1" class="collapse show" aria-labelledby="heading-1" data-parent="#accordion">
                                            <div class="accordion-body px-0 pt-0 pb-5">
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="accordion-row border-bottom border-black">
                                        <div class="accordion-header" id="heading-2">
                                            <h5 class="accordion-header-title mb-0 display-3">
                                                <a aria-controls="collapse-2" aria-expanded="false" data-parent="#accordion" data-bs-toggle="collapse" data-bs-target="#collapse-2" href="#collapse-2" class="collapsed text-decoration-none py-3">
                                                    Accordian Section Title
                                                </a>
                                            </h5>
                                        </div>
                                        <div id="collapse-2" class="collapse" aria-labelledby="heading-2" data-parent="#accordion">
                                            <div class="accordion-body px-0 pt-0 pb-5">
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="accordion-row border-bottom border-black">
                                        <div class="accordion-header" id="heading-3">
                                            <h5 class="accordion-header-title mb-0 display-3">
                                                <a aria-controls="collapse-3" aria-expanded="false" data-parent="#accordion" data-bs-toggle="collapse" data-bs-target="#collapse-3" href="#collapse-3" class="collapsed text-decoration-none py-3">
                                                    Accordian Section Title
                                                </a>
                                            </h5>
                                        </div>
                                        <div id="collapse-3" class="collapse" aria-labelledby="heading-3" data-parent="#accordion">
                                            <div class="accordion-body px-0 pt-0 pb-5">
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="accordion-row border-bottom border-black">
                                        <div class="accordion-header" id="heading-4">
                                            <h5 class="accordion-header-title mb-0 display-3">
                                                <a aria-controls="collapse-4" aria-expanded="false" data-parent="#accordion" data-bs-toggle="collapse" data-bs-target="#collapse-4" href="#collapse-4" class="collapsed text-decoration-none py-3">
                                                    Accordian Section Title
                                                </a>
                                            </h5>
                                        </div>
                                        <div id="collapse-4" class="collapse" aria-labelledby="heading-4" data-parent="#accordion">
                                            <div class="accordion-body px-0 pt-0 pb-5">
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="accordion-row border-bottom border-black">
                                        <div class="accordion-header" id="heading-5">
                                            <h5 class="accordion-header-title mb-0 display-3">
                                                <a aria-controls="collapse-5" aria-expanded="false" data-parent="#accordion" data-bs-toggle="collapse" data-bs-target="#collapse-5" href="#collapse-5" class="collapsed text-decoration-none py-3">
                                                    Accordian Section Title
                                                </a>
                                            </h5>
                                        </div>
                                        <div id="collapse-5" class="collapse" aria-labelledby="heading-5" data-parent="#accordion">
                                            <div class="accordion-body px-0 pt-0 pb-5">
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- / accordiom-block -->

                <!-- half-promos -->
                <div class="module">
                    <div class="row g-0">
                        <div class="col-xxl-6 bg-nearly-white half-promo rect-outer">
                            <img src="<?php echo get_template_directory_uri() . '/public/img/modules/half-promo/half-promo-9.png'; ?>" alt="" class="img-fluid" srcset="<?php echo get_template_directory_uri() . '/public/img/modules/half-promo/half-promo-9.png'; ?> 960w, <?php echo get_template_directory_uri() . '/public/img/modules/half-promo/half-promo-9-md.png'; ?> 834w, <?php echo get_template_directory_uri() . '/public/img/modules/half-promo/half-promo-9-sm.png'; ?> 393w">
                            <div class="half-promo-content rect-inner d-flex flex-column justify-content-end">
                                <div class="half-promo-content-inner">
                                    <h6 class="display-1 text-white mb-3">
                                        DNA Repair
                                    </h6>
                                    <div class="d-flex flex-nowrap align-items-center">
                                        <a href="#" class="site-link border-white text-white me-3">
                                            &rsaquo;
                                        </a>
                                        <p class="mb-0 lh-sm text-white">
                                            NEW GEN GENERATIVE Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. Lorem ipsum dolor.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xxl-6 half-promo rect-outer">
                            <img src="<?php echo get_template_directory_uri() . '/public/img/modules/half-promo/half-promo-10.png'; ?>" alt="" class="img-fluid" srcset="<?php echo get_template_directory_uri() . '/public/img/modules/half-promo/half-promo-10.png'; ?> 960w, <?php echo get_template_directory_uri() . '/public/img/modules/half-promo/half-promo-10-md.png'; ?> 834w, <?php echo get_template_directory_uri() . '/public/img/modules/half-promo/half-promo-10-sm.png'; ?> 393w">
                            <div class="half-promo-content rect-inner d-flex flex-column justify-content-end">
                                <div class="half-promo-content-inner">
                                    <h6 class="display-1 text-white mb-3">
                                        Risk Free Bronzing
                                    </h6>
                                    <div class="d-flex flex-nowrap align-items-center">
                                        <a href="#" class="site-link border-white text-white me-3">
                                            &rsaquo;
                                        </a>
                                        <p class="mb-0 lh-sm text-white">
                                            PIONEERING TAN TECHNOLOGY Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. Lorem ipsum dolor.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- / half-promos -->

            </article>

            <?php endwhile; endif; ?>

        </main>
        <!-- / main -->

<?php get_footer();

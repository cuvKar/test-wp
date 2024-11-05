<?php
/**
 * Template Name: Landing
 * Description: A Page Template for the "Landing" section of the site.
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
                                <li class="breadcrumb-item active" aria-current="page">PHARMSEUTICALS</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <!-- / post-data -->

                <!-- full-promo -->
                <div class="module">
                    <div class="full-promo rect-outer">
                        <img src="<?php echo get_template_directory_uri() . '/public/img/modules/hero/hero-landing.png'; ?>" alt="" class="img-fluid mb-5 mb-md-0" srcset="<?php echo get_template_directory_uri() . '/public/img/modules/hero/hero-landing.png'; ?> 1366w, <?php echo get_template_directory_uri() . '/public/img/modules/hero/hero-landing-md.png'; ?> 834w, <?php echo get_template_directory_uri() . '/public/img/modules/hero/hero-landing-sm.png'; ?> 393w">
                        <div class="full-promo-content rect-inner d-flex flex-column justify-content-end">
                            <div class="full-promo-content-inner">
                                <h1 class="mb-3 lh-1">
                                    Pharmaceuticals
                                </h1>
                                <div class="d-flex flex-nowrap align-items-center full-promo-text">
                                    <a href="#" class="site-link me-3">
                                        &rsaquo;
                                    </a>
                                    <p class="mb-0 lh-sm">
                                        SECTION TITLE Lorem ipsum dolor sit amet, consectetur adipiscing elit, do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam ullamco.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- / full-promo -->

                <!-- copy-block -->
                <div class="module padded-extra">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-xxl-6 copy-block">
                                <h6 class="display-1 lh-1 mb-4 mb-xxl-0">About Pharmaceuticals</h6>
                            </div>
                            <div class="col-xxl-6 copy-block display-4 fw-normal">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                                <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequ</p>
                                <p class="mb-0">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- / copy-block -->

                <!-- full-promo -->
                <div class="module">
                    <div class="full-promo rect-outer">
                       <img src="<?php echo get_template_directory_uri() . '/public/img/modules/full-promo/full-promo-3.png'; ?>" alt="" class="img-fluid">
                        <div class="full-promo-content rect-inner d-flex flex-column justify-content-end">
                            <div class="full-promo-content-inner">
                                <h6 class="display-1 mb-3">
                                    The Science
                                </h6>
                                <div class="d-flex flex-nowrap align-items-center ps-xxl-5 ms-xxl-4 full-promo-text">
                                    <a href="#" class="site-link me-3">
                                        &rsaquo;
                                    </a>
                                    <p class="mb-0 lh-sm">
                                        SECTION TITLE Lorem ipsum dolor sit amet, consectetur adipiscing elit, do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam ullamco.
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
                       <img src="<?php echo get_template_directory_uri() . '/public/img/modules/full-promo/full-promo-4.png'; ?>" alt="" class="img-fluid">
                        <div class="full-promo-content rect-inner d-flex flex-column justify-content-end">
                            <div class="full-promo-content-inner">
                                <h6 class="display-1 mb-3">
                                    Disease Entities
                                </h6>
                                <div class="d-flex flex-nowrap align-items-center ps-xxl-5 ms-xxl-4 full-promo-text">
                                    <a href="#" class="site-link me-3">
                                        &rsaquo;
                                    </a>
                                    <p class="mb-0 lh-sm">
                                        SECTION TITLE Lorem ipsum dolor sit amet, consectetur adipiscing elit, do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam ullamco.
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
                       <img src="<?php echo get_template_directory_uri() . '/public/img/modules/full-promo/full-promo-5.png'; ?>" alt="" class="img-fluid">
                        <div class="full-promo-content rect-inner d-flex flex-column justify-content-end">
                            <div class="full-promo-content-inner">
                                <h6 class="display-1 mb-3">
                                    Products
                                </h6>
                                <div class="d-flex flex-nowrap align-items-center ps-xxl-5 ms-xxl-4 full-promo-text">
                                    <a href="#" class="site-link me-3">
                                        &rsaquo;
                                    </a>
                                    <p class="mb-0 lh-sm">
                                        SECTION TITLE Lorem ipsum dolor sit amet, consectetur adipiscing elit, do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam ullamco.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- / full-promo -->

                <!-- copy-block -->
                <div class="module padded-extra">
                    <div class="container-fluid pseudo-border-top padded-top">
                        <div class="row">
                            <div class="col-xxl-4 copy-block">
                                <h6 class="display-1 lh-1 mb-5 mb-xxl-0">Tech Notes</h6>
                            </div>
                            <div class="col-xxl-8 copy-block display-4 fw-normal">
                                <div class="d-flex flex-nowrap justify-content-between align-items-center border-bottom border-black pb-3 mb-3">
                                    <p class="mb-0">SCIENTIFIC COMMUNIQUÉ I – Engine, Ignition, and Fuel: Light and Skin Interaction</p>
                                    <a href="#" class="site-link-sm ms-3">+</a>
                                </div>
                                <div class="d-flex flex-nowrap justify-content-between align-items-center border-bottom border-black pb-3 mb-3">
                                    <p class="mb-0">SCIENTIFIC COMMUNIQUÉ I – Engine, Ignition, and Fuel: Light and Skin Interaction</p>
                                    <a href="#" class="site-link-sm ms-3">+</a>
                                </div>
                                <div class="d-flex flex-nowrap justify-content-between align-items-center border-bottom border-black pb-3 mb-3">
                                    <p class="mb-0">SCIENTIFIC COMMUNIQUÉ I – Engine, Ignition, and Fuel: Light and Skin Interaction</p>
                                    <a href="#" class="site-link-sm ms-3">+</a>
                                </div>
                                <div class="d-flex flex-nowrap justify-content-between align-items-center border-bottom border-black pb-3 mb-3">
                                    <p class="mb-0">SCIENTIFIC COMMUNIQUÉ I – Engine, Ignition, and Fuel: Light and Skin Interaction</p>
                                    <a href="#" class="site-link-sm ms-3">+</a>
                                </div>
                                <div class="d-flex flex-nowrap justify-content-between align-items-center border-bottom border-black pb-3">
                                    <p class="mb-0">SCIENTIFIC COMMUNIQUÉ I – Engine, Ignition, and Fuel: Light and Skin Interaction</p>
                                    <a href="#" class="site-link-sm ms-3">+</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- / copy-block -->

                <!-- copy-block -->
                <div class="module padded-extra bg-white">
                    <div class="container-fluid pseudo-border-top padded-top">
                        <div class="row">
                            <div class="col-xxl-4 copy-block">
                                <h6 class="display-1 lh-1 mb-5 mb-xxl-0">Published research</h6>
                            </div>
                            <div class="col-xxl-8 copy-block display-4 fw-normal">
                                <div class="d-flex flex-nowrap justify-content-between align-items-start border-bottom border-black pb-3 mb-3">
                                    <p class="mb-0">Sancar, F. First Treatment for Rare Photosensitivity. Jama. 2019;322(19):1854-1854.</p>
                                    <a href="#" class="site-link-sm ms-3">&rsaquo;</a>
                                </div>
                                <div class="d-flex flex-nowrap justify-content-between align-items-start border-bottom border-black pb-3 mb-3">
                                    <p class="mb-0">McNeil, M. M., Nahhas, A. F., Braunberger, T. L., Hamzavi, I. H. Afamelanotide in the Treatment of Dermatologic Disease. Skin Ther Lett. 2018;23:6-10.</p>
                                    <a href="#" class="site-link-sm ms-3">&rsaquo;</a>
                                </div>
                                <div class="d-flex flex-nowrap justify-content-between align-items-start border-bottom border-black pb-3 mb-3">
                                    <p class="mb-0">Rodrigues, M., Ezzedine, K., Hamzavi, I., Pandya, A. G., Harris, J. E., Vitiligo Working Group. Current and emerging treatments for vitiligo. Journal of the American Academy of Dermatology. 2017;77(1):17-29.</p>
                                    <a href="#" class="site-link-sm ms-3">&rsaquo;</a>
                                </div>
                                <div class="d-flex flex-nowrap justify-content-between align-items-start border-bottom border-black pb-3 mb-3">
                                    <p class="mb-0">Minder, El, Barman-Aksoezen, J, Schneider-Yin, X. Pharmacokinetics and pharmacodynamics of afamelanotide and its clinical use in treating dermatologic disorders. Clinical Pharmacokinetics. 2017;56(8):815-823.</p>
                                    <a href="#" class="site-link-sm ms-3">&rsaquo;</a>
                                </div>
                                <div class="d-flex flex-nowrap justify-content-between align-items-start border-bottom border-black pb-3">
                                    <p class="mb-0">Lane, AM, McKay, JT, Bonkovsky, HL. Advances in the management of erythropoietic protoporphyria–role of afamelanotide. The application of clinical genetics. 2016;9:179.</p>
                                    <a href="#" class="site-link-sm ms-3">&rsaquo;</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- / copy-block -->

                <!-- copy-block -->
                <div class="module padded-extra">
                    <div class="container-fluid pseudo-border-top pt-4">
                        <div class="row">
                            <div class="col-xxl-4 copy-block">
                                <h6 class="display-1 lh-1 mb-5 mb-xxl-0">Technology updates</h6>
                            </div>
                            <div class="col-xxl-8 copy-block display-4 fw-normal">
                                <div class="d-flex flex-nowrap justify-content-between align-items-center border-bottom border-black pb-3 mb-3">
                                    <p class="mb-0">Original Thoughts on UV and Pigmentation</p>
                                    <a href="#" class="site-link-sm ms-3">+</a>
                                </div>
                                <div class="d-flex flex-nowrap justify-content-between align-items-center border-bottom border-black pb-3 mb-3">
                                    <p class="mb-0">Afamelanotide as an Adjunct to Phototherapy</p>
                                    <a href="#" class="site-link-sm ms-3">+</a>
                                </div>
                                <div class="d-flex flex-nowrap justify-content-between align-items-center border-bottom border-black pb-3">
                                    <p class="mb-0">Stem Cells and Repigmentation in Vitiligo</p>
                                    <a href="#" class="site-link-sm ms-3">+</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- / copy-block -->

                <!-- pipeline-block -->
                <div class="module pipeline-block padded-extra bg-white">
                    <div class="container-fluid">
                        <h6 class="display-1 lh-1">Pipeline</h6>
                    </div>
                </div>
                <!-- / pipeline-block -->

                <!-- link-carousel -->
                <div class="module padded-extra">
                    <div class="link-carousel">
                        <div class="container-fluid">
                            <h6 class="display-1 mb-5 lh-1">Link Carousel Title</h6>
                            <div class="row carousel">
                                <div class="col-md-6 col-xxl-4">
                                    <div class="link-carousel-card h-100">
                                        <figure class="figure">
                                            <img src="<?php echo get_template_directory_uri() . '/public/img/modules/link-carousel/link-carousel-1.png'; ?>" alt="" class="figure-img img-fluid">
                                        </figure>
                                        <div class="d-flex flex-nowrap align-items-start">
                                            <a href="#" class="site-link me-3">
                                                +
                                            </a>
                                            <div class="link-carousel-content">
                                                <h6 class="display-3 mb-3 lh-1">
                                                    Product Name
                                                </h6>
                                                <p class="display-4 mb-0 lh-sm fw-normal">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-xxl-4">
                                    <div class="link-carousel-card h-100">
                                        <figure class="figure">
                                            <img src="<?php echo get_template_directory_uri() . '/public/img/modules/link-carousel/link-carousel-1.png'; ?>" alt="" class="figure-img img-fluid">
                                        </figure>
                                        <div class="d-flex flex-nowrap align-items-start">
                                            <a href="#" class="site-link me-3">
                                                +
                                            </a>
                                            <div class="link-carousel-content">
                                                <h6 class="display-3 mb-3 lh-1">
                                                    Product Name
                                                </h6>
                                                <p class="display-4 mb-0 lh-sm fw-normal">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-xxl-4">
                                    <div class="link-carousel-card h-100">
                                        <figure class="figure">
                                            <img src="<?php echo get_template_directory_uri() . '/public/img/modules/link-carousel/link-carousel-1.png'; ?>" alt="" class="figure-img img-fluid">
                                        </figure>
                                        <div class="d-flex flex-nowrap align-items-start">
                                            <a href="#" class="site-link me-3">
                                                +
                                            </a>
                                            <div class="link-carousel-content">
                                                <h6 class="display-3 mb-3 lh-1">
                                                    Product Name
                                                </h6>
                                                <p class="display-4 mb-0 lh-sm fw-normal">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-xxl-4">
                                    <div class="link-carousel-card h-100">
                                        <figure class="figure">
                                            <img src="<?php echo get_template_directory_uri() . '/public/img/modules/link-carousel/link-carousel-1.png'; ?>" alt="" class="figure-img img-fluid">
                                        </figure>
                                        <div class="d-flex flex-nowrap align-items-start">
                                            <a href="#" class="site-link me-3">
                                                +
                                            </a>
                                            <div class="link-carousel-content">
                                                <h6 class="display-3 mb-2 lh-1">
                                                    Product Name
                                                </h6>
                                                <p class="display-4 mb-0 lh-sm fw-normal">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-xxl-4">
                                    <div class="link-carousel-card h-100">
                                        <figure class="figure">
                                            <img src="<?php echo get_template_directory_uri() . '/public/img/modules/link-carousel/link-carousel-1.png'; ?>" alt="" class="figure-img img-fluid">
                                        </figure>
                                        <div class="d-flex flex-nowrap align-items-start">
                                            <a href="#" class="site-link me-3">
                                                +
                                            </a>
                                            <div class="link-carousel-content">
                                                <h6 class="display-3 mb-2 lh-1">
                                                    Product Name
                                                </h6>
                                                <p class="display-4 mb-0 lh-sm fw-normal">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="pager">
                                <a class="prev" href="#" role="button">&lsaquo;</a>
                                <a class="next" href="#" role="button">&rsaquo;</a>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- / link-carousel -->

                <!-- text-carousel -->
                <div class="module padded-extra bg-taupe">
                    <div class="text-carousel">
                        <div class="container-fluid">
                            <h6 class="display-1 mb-5 lh-1">Text Carousel Title</h6>
                            <div class="row carousel">
                                <div class="col-md-6 col-xxl-4">
                                    <div class="text-carousel-card bg-black h-100 d-flex flex-column justify-content-between">
                                        <span class="display-1 text-white d-block">1.</span>
                                        <div class="text-carousel-card-text">
                                            <h6 class="display-3 mb-2 text-white">
                                                Optional title white
                                            </h6>
                                            <p class="mb-0 lh-sm display-4 fw-normal text-white">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-xxl-4">
                                    <div class="text-carousel-card bg-white h-100 d-flex flex-column justify-content-between">
                                        <span class="display-1 d-block">2.</span>
                                        <div class="text-carousel-card-text">
                                            <h6 class="display-3 mb-2">
                                                Optional title black
                                            </h6>
                                            <p class="mb-0 lh-sm display-4 fw-normal">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-xxl-4">
                                    <div class="text-carousel-card bg-white h-100 d-flex flex-column justify-content-between">
                                        <span class="display-1 d-block">3.</span>
                                        <div class="text-carousel-card-text">
                                            <h6 class="display-3 mb-2">
                                                Optional title black
                                            </h6>
                                            <p class="mb-0 lh-sm display-4 fw-normal">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-xxl-4">
                                    <div class="text-carousel-card bg-white h-100 d-flex flex-column justify-content-between">
                                        <span class="display-1 d-block">4.</span>
                                        <div class="text-carousel-card-text">
                                            <h6 class="display-3 mb-2">
                                                Optional title black
                                            </h6>
                                            <p class="mb-0 lh-sm display-4 fw-normal">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-xxl-4">
                                    <div class="text-carousel-card bg-white h-100 d-flex flex-column justify-content-between">
                                        <span class="display-1 d-block">5.</span>
                                        <div class="text-carousel-card-text">
                                            <h6 class="display-3 mb-2">
                                                Optional title black
                                            </h6>
                                            <p class="mb-0 lh-sm display-4 fw-normal">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-xxl-4">
                                    <div class="text-carousel-card bg-white h-100 d-flex flex-column justify-content-between">
                                        <span class="display-1 d-block">6.</span>
                                        <div class="text-carousel-card-text">
                                            <h6 class="display-3 mb-2">
                                                Optional title black
                                            </h6>
                                            <p class="mb-0 lh-sm display-4 fw-normal">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="pager">
                                <a class="prev" href="#" role="button">&lsaquo;</a>
                                <a class="next" href="#" role="button">&rsaquo;</a>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- / text-carousel -->

                <!-- news-feed -->
                <div class="module padded-extra bg-white">
                    <div class="news-feed">
                        <div class="container-fluid">
                            <h6 class="display-1 mb-5 lh-1">Pharma News</h6>
                            <div class="row">
                                <div class="col-md-4 border-end border-black">
                                    <article class="post border-top border-bottom border-black padded-limited">
                                        <h4 class="post-title lh-sm display-2">
                                            CLINUVEL delivering on a long-term strategy with increase in annual revenues, profit
                                        </h4>
                                        <div class="post-content d-flex flex-nowrap align-items-center">
                                            <a href="#" class="site-link me-3">
                                                +
                                            </a>
                                            <div class="post-meta">
                                                <ul class="list-inline mb-0">
                                                    <li class="list-inline-item text-uppercase fw-semibold">Financial</li>
                                                    <li class="list-inline-item text-uppercase fw-semibold">Regulatory</li>
                                                </ul>
                                                <p class="mb-0">
                                                    29.09.2023
                                                </p>
                                            </div>
                                        </div>
                                    </article>
                                </div>
                                <div class="col-md-4 border-end border-black">
                                    <article class="post border-top border-bottom border-black padded-limited">
                                        <h4 class="post-title lh-sm display-2">
                                            CLINUVEL delivering on a long-term strategy with increase in annual revenues, profit
                                        </h4>
                                        <div class="post-content d-flex flex-nowrap align-items-center">
                                            <a href="#" class="site-link me-3">
                                                +
                                            </a>
                                            <div class="post-meta">
                                                <ul class="list-inline mb-0">
                                                    <li class="list-inline-item text-uppercase fw-semibold">Financial</li>
                                                    <li class="list-inline-item text-uppercase fw-semibold">Regulatory</li>
                                                </ul>
                                                <p class="mb-0">
                                                    29.09.2023
                                                </p>
                                            </div>
                                        </div>
                                    </article>
                                </div>
                                <div class="col-md-4">
                                    <article class="post border-top border-bottom border-black padded-limited">
                                        <h4 class="post-title lh-sm display-2">
                                            CLINUVEL delivering on a long-term strategy with increase in annual revenues, profit
                                        </h4>
                                        <div class="post-content d-flex flex-nowrap align-items-center">
                                            <a href="#" class="site-link me-3">
                                                +
                                            </a>
                                            <div class="post-meta">
                                                <ul class="list-inline mb-0">
                                                    <li class="list-inline-item text-uppercase fw-semibold">Financial</li>
                                                    <li class="list-inline-item text-uppercase fw-semibold">Regulatory</li>
                                                </ul>
                                                <p class="mb-0">
                                                    29.09.2023
                                                </p>
                                            </div>
                                        </div>
                                    </article>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- / news-feed -->

                <!-- half-promos -->
                <div class="module">
                    <div class="row g-0">
                        <div class="col-xxl-6 bg-nearly-white half-promo rect-outer">
                            <img src="<?php echo get_template_directory_uri() . '/public/img/modules/half-promo/half-promo-8.png'; ?>" alt="" class="img-fluid">
                            <div class="half-promo-content rect-inner d-flex flex-column justify-content-end">
                                <div class="half-promo-content-inner">
                                    <h6 class="display-1 text-white mb-3">
                                        Pharmaceuticals
                                    </h6>
                                    <div class="d-flex flex-nowrap align-items-center">
                                        <a href="#" class="site-link border-white text-white me-3">
                                            &rsaquo;
                                        </a>
                                        <p class="mb-0 lh-sm text-white">
                                            PHOTOMEDICINE TECHNOLOGY  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. Lorem ipsum dolor.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xxl-6 half-promo rect-outer">
                            <img src="<?php echo get_template_directory_uri() . '/public/img/modules/half-promo/half-promo-2.png'; ?>" alt="" class="img-fluid">
                            <div class="half-promo-content rect-inner d-flex flex-column justify-content-end">
                                <div class="half-promo-content-inner">
                                    <h6 class="display-1 text-white mb-3">
                                        PhotoCosmetics
                                    </h6>
                                    <div class="d-flex flex-nowrap align-items-center">
                                        <a href="#" class="site-link border-white text-white me-3">
                                            &rsaquo;
                                        </a>
                                        <p class="mb-0 lh-sm text-white">
                                            PIONEERING SKINCARE  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. Lorem ipsum dolor.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- / half-promo -->

            </article>

            <?php endwhile; endif; ?>

        </main>
        <!-- / main -->

<?php get_footer();

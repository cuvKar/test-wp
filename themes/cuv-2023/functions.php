<?php
/**
 * Functions
 *
 * Core functions file defining this themes structure
 * and requiring all files, templates and classes.
 *
 * @package     WordPress
 * @subpackage  cuvtwentythree
 * @author      Clinuvel <www.clinuvel.co.uk>
 */

// ---------------------------------------------------------------------

/**
 * Helpers
 */
require get_template_directory() . '/includes/functions/helpers.php';

// ---------------------------------------------------------------------

/**
 * Conditionals
 */
require get_template_directory() . '/includes/functions/conditionals.php';

// ---------------------------------------------------------------------

/**
 * Laravel Mix Helper
 */
require get_template_directory() . '/includes/functions/mix.php';

// ---------------------------------------------------------------------

/**
 * Setup
 */
require get_template_directory() . '/includes/functions/setup.php';

// ---------------------------------------------------------------------

/**
 * Widgets
 */
require get_template_directory() . '/includes/functions/widgets.php';

// ---------------------------------------------------------------------

/**
 * Walkers
 */
require get_template_directory() . '/includes/walkers/walker-mega-menu.php';

// ---------------------------------------------------------------------

/**
 * Enqueues
 */
require get_template_directory() . '/includes/functions/enqueues.php';

// ---------------------------------------------------------------------

/**
 * Attributes
 */
require get_template_directory() . '/includes/functions/attributes.php';

// ---------------------------------------------------------------------

/**
 * Breadcrumbs
 */
require get_template_directory() . '/includes/functions/breadcrumbs.php';

// ---------------------------------------------------------------------

/**
 * Pagination
 */
require get_template_directory() . '/includes/functions/pagination.php';

// ---------------------------------------------------------------------

/**
 * ACF
 */
require get_template_directory() . '/includes/acf/blocks.php';

// ---------------------------------------------------------------------

/**
 * Template
 */
require get_template_directory() . '/includes/functions/template.php';

// ---------------------------------------------------------------------

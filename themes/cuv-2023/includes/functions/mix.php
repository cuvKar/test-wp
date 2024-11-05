<?php
/**
 * Laravel Mix Helper Functions
 *
 * @package     WordPress
 * @subpackage  cuvtwentythree
 * @author      Clinuvel <www.clinuvel.co.uk>
 */

defined('ABSPATH') || exit;


if (! function_exists('mix')) {
    
    /**
     * Get the path to a versioned Mix file.
     *
     * @param  string  $path
     * @param  string  $manifest_directory
     * @return string
     *
     * @throws \Exception
     */
    function mix($path, $manifest_directory = '') {

        static $manifest;

        $public_folder = '/public';
        $root_path     = get_template_directory();
        $public_path   = $root_path . $public_folder;

        if ($manifest_directory && ! startsWith($manifest_directory, '/')) {
            $manifest_directory = "/{$manifest_directory}";
        }

        if (! $manifest) {
            if (! file_exists($manifest_path = ($root_path . $manifest_directory . '/mix-manifest.json') )) {
                throw new Exception('The Mix manifest does not exist.');
            }
            $manifest = json_decode(file_get_contents($manifest_path), true);
        }

        if (! startsWith($path, '/')) {
            $path = "/{$path}";
        }

        //$path = $public_folder . $path;

        if (! array_key_exists($path, $manifest)) {
            throw new Exception(
                "Unable to locate Mix file: {$path}. Please check your ".
                'webpack.mix.js output paths and try again.'
            );
        }

        return file_exists($public_path . ($manifest_directory . '/hot')) 
        ? "http://localhost:8080{$manifest[$path]}" 
        : get_template_directory_uri() . $manifest_directory . $manifest[$path];
    }
}

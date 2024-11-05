<?php
/**
 * Helper Functions
 *
 * @package     WordPress
 * @subpackage  cuvtwentythree
 * @author      Clinuvel <www.clinuvel.co.uk>
 */

// ---------------------------------------------------------------------

/**
 * Gets/returns the value of a specific key of the POST super-global.
 * When using just $key parameter it will return the raw and untouched
 * $_POST['x'], when using with $clean set to true then it will return
 * a trimmed and stripped $_POST['x']
 *
 * @param  mixed $key key
 * @param  bool  $clean marker for optional cleaning of the var
 * @return mixed the key's value or nothing
 */
if (! function_exists('_postVar')) {
    
    function _postVar($key, $clean = false) {
        if (isset($_POST[$key])) {
            // we use the Ternary Operator here which saves the if/else block
            // @see http://davidwalsh.name/php-shorthand-if-else-ternary-operators
            return ($clean) ? trim(strip_tags($_POST[$key])) : $_POST[$key];
        }
    }
}
        
// --------------------------------------------------------------------

/**
 * Gets/returns the value of a specific key of the GET super-global
 *
 * @param  mixed $key key
 * @return mixed the key's value or nothing
 */
if (! function_exists('_getVar')) {
    
    function _getVar($key) {
        if (isset($_GET[$key])) {
            return $_GET[$key];
        }
    }
}

// ---------------------------------------------------------------------

/**
 * Truncate a string by a number of characters
 *
 * @param  string  $str
 * @param  int     $num_chars
 * @return string
 */
if (! function_exists('truncate')) {
    
    function truncate($string, $num_chars) {
        if (strlen($string) <= $num_chars) {
            return $string;
        } else {
            return substr($string, 0, $num_chars - 1) . '&hellip;';
        }
        return str_replace('-', ' ', $string);
    }
}
    
// ---------------------------------------------------------------------
    
/**
 * Creates a friendly URL slug from a string
 *
 * @param  string $str
 * @return string
 */
if (! function_exists('slugify')) {
    
    function slugify($str) {
        $str = preg_replace ('/[^\p{L}\p{N}\&\ ]/u', '', $str);
        $str = strtolower(str_replace(' ', '-', trim($str)));
        $str = preg_replace ('/-+/', '-', $str);
        return $str;
    }
}

// --------------------------------------------------------------------

/**
 * Reverses the slugify function
 *
 * @param   string  $str
 * @return  string
 */
if (! function_exists('unslugify')) {
    
    function unslugify($str, $separator = '-') {
        $str = str_replace($separator, ' ', $str);
        return ucwords($str);
    }
}

// --------------------------------------------------------------------

/**
 * Determine if a given string starts with a given substring.
 *
 * @param  string  $haystack
 * @param  string|string[]  $needles
 * @return bool
 */
if (! function_exists('startsWith')) {
    
    function startsWith($haystack, $needles) {
        foreach ((array) $needles as $needle) {
            if ((string) $needle !== '' && strncmp($haystack, $needle, strlen($needle)) === 0) {
                return true;
            }
        }
        return false;
    }
}

// --------------------------------------------------------------------

/**
 * Checkbox sanitization function
 *
 * @param   string  $input
 * @return  bool
 */
if (! function_exists('asr_sanitize_checkbox')) {
        
    function asr_sanitize_checkbox($input, $expected_value = 'on', $return_bool = false) {
         
        // returns true if checkbox is checked
        $return_true = $return_bool ? true : $expected_value;
        return ((isset($input) && $expected_value == $input) ? $return_true : false);
    }
}

// --------------------------------------------------------------------

/**
 * Checkbox sanitization function
 *
 * @param   string  $input
 * @return  bool
 */
if (! function_exists('asr_sanitize_select')) {
        
    function asr_sanitize_select($input, $choices = array()) {
         
        // input must be a slug: lowercase alphanumeric 
        // characters, dashes and underscores only
        $input = sanitize_key($input);

        // get the list of possible select options 
        $choices = $setting->manager->get_control( $setting->id )->choices;
                          
        //return input if valid or return default option
        return ( array_key_exists( $input, $choices ) ? $input : $setting->default );   
    }
}

// --------------------------------------------------------------------

/**
 * Split an array into a given number of chunks
 *
 * @param  array     $array
 * @param  integer   $chunks
 * @return array
 */
if (! function_exists('array_split')) {
    
    function array_split($array, $chunks = 2) {
        if ($chunks < 2)
            return array($array);
        $counted = ceil(count($array) / $chunks); 
        $a = array_slice($array, 0, $counted); 
        $b = array_split(array_slice($array, $counted), $chunks - 1); 
        return array_merge(array($a), $b);
    }
}

// ---------------------------------------------------------------------

/**
 * Flatten a multi-dimensional array into a single level.
 *
 * @param  array $array Value stored in DB.
 * @return array 
 */
if (! function_exists('array_flatten')) {

    function array_flatten($array) {
        $return = array();
        array_walk_recursive($array, function ($x) use (&$return) {
            $return[] = $x;
        });
        return $return;
    }
}

// ---------------------------------------------------------------------

/**
 * Pre print_r()
 *
 * Echo a formatted human readable output of print_r()
 * that is wrapped in pre tags
 *
 * @param  mixed $var     The var / expression to be printed
 * @param  bool  $return  Use the captured output of print_r()
 * @return void 
 */
if (! function_exists('pre_print_r')) {
    
    function pre_print_r($var, $return = false) {
        if ($return) {
            echo '<pre>' . htmlentities(print_r($var, true)) . '</pre>';
        } else {
            echo '<pre>' . htmlentities(print_r($var)) . '</pre>';
        }
    }
}

// ---------------------------------------------------------------------

/**
 * Truncates text starting from the end.
 *
 * Cuts a string to the length of $length and replaces the first characters
 * with the ellipsis if the text is longer than length.
 *
 * ### Options:
 *
 * - `ellipsis` Will be used as beginning and prepended to the trimmed string
 * - `exact` If false, $text will not be cut mid-word
 *
 * @param string $text String to truncate.
 * @param int $length Length of returned string, including ellipsis.
 * @param array $options An array of options.
 * @return string Trimmed string.
 */
if (! function_exists('tail')) {

    function tail(string $text, int $length = 100, array $options = []): string {
        $default = [
            'ellipsis' => '... ', 'exact' => true,
        ];
        $options += $default;
        $ellipsis = $options['ellipsis'];

        if (mb_strlen($text) <= $length) {
            return $text;
        }

        $truncate = mb_substr($text, mb_strlen($text) - $length + mb_strlen($ellipsis));
        if (!$options['exact']) {
            $spacepos = mb_strpos($truncate, ' ');
            $truncate = $spacepos === false ? '' : trim(mb_substr($truncate, $spacepos));
        }

        return $ellipsis . $truncate;
    }
}

// ---------------------------------------------------------------------

/**
 * Truncates text.
 *
 * Cuts a string to the length of $length and replaces the last characters
 * with the ellipsis if the text is longer than length.
 *
 * ### Options:
 *
 * - `ellipsis` Will be used as ending and appended to the trimmed string
 * - `exact` If false, $text will not be cut mid-word
 * - `html` If true, HTML tags would be handled correctly
 * - `trimWidth` If true, $text will be truncated with the width
 *
 * @param  string  $text     String to truncate.
 * @param  int     $length   Length of returned string, including ellipsis.
 * @param  array   $options  An array of HTML attributes and options.
 * 
 * @return string  Trimmed string.
 * @link https://book.cakephp.org/4/en/core-libraries/text.html#truncating-text
 */
if (! function_exists('truncate')) {

    function truncate(string $text, int $length = 100, array $options = []): string {
        $default = [
            'ellipsis' => ' ...', 'exact' => true, 'html' => false, 'trimWidth' => false,
        ];
        if (! empty($options['html']) && strtolower((string)mb_internal_encoding()) === 'utf-8') {
            $default['ellipsis'] = "\xe2\x80\xa6";
        }
        $options += $default;

        $prefix = '';
        $suffix = $options['ellipsis'];

        if ($options['html']) {
            $_defaultHtmlNoCount = [
                'style',
                'script',
            ];
            $ellipsisLength = _strlen(strip_tags($options['ellipsis']), $options);

            $truncateLength = 0;
            $totalLength = 0;
            $openTags = [];
            $truncate = '';

            preg_match_all('/(<\/?([\w+]+)[^>]*>)?([^<>]*)/', $text, $tags, PREG_SET_ORDER);
            foreach ($tags as $tag) {
                $contentLength = 0;
                if (! in_array($tag[2], $_defaultHtmlNoCount, true)) {
                    $contentLength = _strlen($tag[3], $options);
                }

                if ($truncate === '') {
                    // phpcs:ignore Generic.Files.LineLength
                    if (! preg_match('/img|br|input|hr|area|base|basefont|col|frame|isindex|link|meta|param/i', $tag[2])) {
                        if (preg_match('/<[\w]+[^>]*>/', $tag[0])) {
                            array_unshift($openTags, $tag[2]);
                        } elseif (preg_match('/<\/([\w]+)[^>]*>/', $tag[0], $closeTag)) {
                            $pos = array_search($closeTag[1], $openTags, true);
                            if ($pos !== false) {
                                array_splice($openTags, $pos, 1);
                            }
                        }
                    }

                    $prefix .= $tag[1];

                    if ($totalLength + $contentLength + $ellipsisLength > $length) {
                        $truncate = $tag[3];
                        $truncateLength = $length - $totalLength;
                    } else {
                        $prefix .= $tag[3];
                    }
                }

                $totalLength += $contentLength;
                if ($totalLength > $length) {
                    break;
                }
            }

            if ($totalLength <= $length) {
                return $text;
            }

            $text = $truncate;
            $length = $truncateLength;

            foreach ($openTags as $tag) {
                $suffix .= '</' . $tag . '>';
            }
        } else {
            if (_strlen($text, $options) <= $length) {
                return $text;
            }
            $ellipsisLength = _strlen($options['ellipsis'], $options);
        }

        $result = _substr($text, 0, $length - $ellipsisLength, $options);

        if (! $options['exact']) {
            if (_substr($text, $length - $ellipsisLength, 1, $options) !== ' ') {
                $result = _removeLastWord($result);
            }

            // If result is empty, then we don't need to count ellipsis in the cut.
            if (! strlen($result)) {
                $result = _substr($text, 0, $length, $options);
            }
        }

        return $prefix . $result . $suffix;
    }
}

// ---------------------------------------------------------------------

/**
 * Get string length.
 *
 * ### Options:
 *
 * - `html` If true, HTML entities will be handled as decoded characters.
 * - `trimWidth` If true, the width will return.
 *
 * @param string $text The string being checked for length
 * @param array $options An array of options.
 * @return int
 */
if (! function_exists('_strlen')) {

    function _strlen(string $text, array $options): int {
        if (empty($options['trimWidth'])) {
            $strlen = 'mb_strlen';
        } else {
            $strlen = 'mb_strwidth';
        }

        if (empty($options['html'])) {
            return $strlen($text);
        }

        $pattern = '/&[0-9a-z]{2,8};|&#[0-9]{1,7};|&#x[0-9a-f]{1,6};/i';
        $replace = preg_replace_callback(
            $pattern,
            function ($match) use ($strlen) {
                $utf8 = html_entity_decode($match[0], ENT_HTML5 | ENT_QUOTES, 'UTF-8');

                return str_repeat(' ', $strlen($utf8, 'UTF-8'));
            },
            $text
        );

        return $strlen($replace);
    }
}

// ---------------------------------------------------------------------

/**
 * Return part of a string.
 *
 * ### Options:
 *
 * - `html` If true, HTML entities will be handled as decoded characters.
 * - `trimWidth` If true, will be truncated with specified width.
 *
 * @param string $text The input string.
 * @param int $start The position to begin extracting.
 * @param int|null $length The desired length.
 * @param array $options An array of options.
 * @return string
 */
if (! function_exists('_substr')) {

    function _substr(string $text, int $start, ?int $length, array $options): string {
        if (empty($options['trimWidth'])) {
            $substr = 'mb_substr';
        } else {
            $substr = 'mb_strimwidth';
        }

        $maxPosition = _strlen($text, ['trimWidth' => false] + $options);
        if ($start < 0) {
            $start += $maxPosition;
            if ($start < 0) {
                $start = 0;
            }
        }
        if ($start >= $maxPosition) {
            return '';
        }

        if ($length === null) {
            $length = _strlen($text, $options);
        }

        if ($length < 0) {
            $text = _substr($text, $start, null, $options);
            $start = 0;
            $length += _strlen($text, $options);
        }

        if ($length <= 0) {
            return '';
        }

        if (empty($options['html'])) {
            return (string)$substr($text, $start, $length);
        }

        $totalOffset = 0;
        $totalLength = 0;
        $result = '';

        $pattern = '/(&[0-9a-z]{2,8};|&#[0-9]{1,7};|&#x[0-9a-f]{1,6};)/i';
        $parts = preg_split($pattern, $text, -1, PREG_SPLIT_DELIM_CAPTURE | PREG_SPLIT_NO_EMPTY);
        foreach ($parts as $part) {
            $offset = 0;

            if ($totalOffset < $start) {
                $len = _strlen($part, ['trimWidth' => false] + $options);
                if ($totalOffset + $len <= $start) {
                    $totalOffset += $len;
                    continue;
                }

                $offset = $start - $totalOffset;
                $totalOffset = $start;
            }

            $len = _strlen($part, $options);
            if ($offset !== 0 || $totalLength + $len > $length) {
                if (
                    strpos($part, '&') === 0
                    && preg_match($pattern, $part)
                    && $part !== html_entity_decode($part, ENT_HTML5 | ENT_QUOTES, 'UTF-8')
                ) {
                    // Entities cannot be passed substr.
                    continue;
                }

                $part = $substr($part, $offset, $length - $totalLength);
                $len = _strlen($part, $options);
            }

            $result .= $part;
            $totalLength += $len;
            if ($totalLength >= $length) {
                break;
            }
        }

        return $result;
    }
}

// ---------------------------------------------------------------------

/**
 * Removes the last word from the input text.
 *
 * @param string $text The input text
 * @return string
 */
if (! function_exists('_removeLastWord')) {
    
    function _removeLastWord(string $text): string {
        $spacepos = mb_strrpos($text, ' ');

        if ($spacepos !== false) {
            $lastWord = mb_substr($text, $spacepos);

            // Some languages are written without word separation.
            // We recognize a string as a word if it doesn't contain any full-width characters.
            if (mb_strwidth($lastWord) === mb_strlen($lastWord)) {
                $text = mb_substr($text, 0, $spacepos);
            }

            return $text;
        }

        return '';
    }
}

// ---------------------------------------------------------------------

/**
 * Removes the last word from the input text.
 *
 * @param string $text The input text
 * @return string
 */
function _get_countries() {
    return array("Afghanistan", "Aland Islands", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Barbuda", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Trty.", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Caicos Islands", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, Democratic Republic of the", "Cook Islands", "Costa Rica", "Cote d'Ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "French Southern Territories", "Futuna Islands", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard", "Herzegovina", "Holy See", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran (Islamic Republic of)", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Jan Mayen Islands", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea", "Korea (Democratic)", "Kuwait", "Kyrgyzstan", "Lao", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macao", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "McDonald Islands", "Mexico", "Micronesia", "Miquelon", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "Nevis", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Palestinian Territory, Occupied", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Principe", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Barthelemy", "Saint Helena", "Saint Kitts", "Saint Lucia", "Saint Martin (French part)", "Saint Pierre", "Saint Vincent", "Samoa", "San Marino", "Sao Tome", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia", "South Sandwich Islands", "Spain", "Sri Lanka", "Sudan", "Suriname", "Svalbard", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "The Grenadines", "Timor-Leste", "Tobago", "Togo", "Tokelau", "Tonga", "Trinidad", "Tunisia", "Turkey", "Turkmenistan", "Turks Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "US Minor Outlying Islands", "Uzbekistan", "Vanuatu", "Vatican City State", "Venezuela", "Vietnam", "Virgin Islands (British)", "Virgin Islands (US)", "Wallis", "Western Sahara", "Yemen", "Zambia", "Zimbabwe");
}

// ---------------------------------------------------------------------

/**
 * Debug PHP to the console
 *
 * @param array $data
 * @return string
 */
function debug_to_console($data) {
	$output = $data;
	if (is_array($output))
		$output = implode(',', $output);

	echo "<script>console.log('Debug Objects: " . $output . "' );</script>";
}

// --------------------------------------------------------------------

/**
 * var_dump to the console
 *
 * @param string $output
 * @param boolean $with_script_tags
 * @return string
 */
function console_log($output, $with_script_tags = true)
{
    $js_code = 'console.log(' . json_encode($output, JSON_HEX_TAG) . ');';
    if ($with_script_tags)
    {
        $js_code = '<script>' . $js_code . '</script>';
    }
    echo $js_code;
}

// ---------------------------------------------------------------------

/**
 * WPCF7 Select Placeholder
 * 
 * In Contact Form 7, replace the default <select> placeholder with our own.
 * Link: https://wordpress.org/support/topic/contact-form-7-dropdown-place-holder/#post-17160031
 *
 * @param string $html
 * @return void
 */
function cuv_wpcf7_select_placeholder( $html ) {
	$text_replacement = 'Please select';
	$html = str_replace('&#8212;Please choose an option&#8212;', $text_replacement, $html );
	return $html;
}
add_filter( 'wpcf7_form_elements', 'cuv_wpcf7_select_placeholder' );
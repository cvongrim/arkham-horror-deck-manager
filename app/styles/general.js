/* global module */
/**
 * General Stylesheet
 *
 * This contains all of the global styles
 */

'use strict';

import COLORS from './colors';

const generalSpacing = 10;

module.exports = {
    'generalSpacing': generalSpacing,
    'container': {
        flex: 1,
        padding: generalSpacing,
    },
    'cardContainer': {
        backgroundColor: COLORS.white,
        flex: 1,
        padding: generalSpacing,
        marginBottom: generalSpacing,
    },
};

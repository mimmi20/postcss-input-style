/**
 * Check if selector in array contains any of our psuedo elements
 * @param  {string} selector string to check for elements
 * @return {boolean}         whether it contains pseudo

 */
function containsPseudo(selector) {
  return selector.match(/::track|::thumb/);
}

/**
 * Check if selector in array is free from our psuedo elements
 * @param  {string} selector string to check for elements
 * @return {boolean}         whether it is free from pseudo
 */
function doesntContainPseudo(selector) {
  return selector.match(/^((?!(::thumb|::track)).)*$/);
}

/**
 * Extra processing for new range track rules
 * @param  {Object} rule CSS rule to process
 * @return void
 */
function processTracks(rule) {
  if (rule.selector.indexOf('::-webkit-slider-runnable-track') > -1) {
    rule.prepend({ prop: '-webkit-appearance', value: 'none' });
  }

  if (rule.selector.indexOf('::-moz-range-track') > -1) {
    rule.prepend({ prop: '-moz-appearance', value: 'none' });
  }
}

/**
 * Extra processing for new range thumb rules
 * @param  {Object} rule CSS rule to process
 * @return void
 */
function processThumbs(rule) {
  if (rule.selector.indexOf('::-webkit-slider-thumb') > -1) {
    rule.prepend({ prop: '-webkit-appearance', value: 'none' });
  }

  if (rule.selector.indexOf('::-moz-range-thumb') > -1) {
    rule.prepend({ prop: '-moz-appearance', value: 'none' });
  }
}

/**
 * Expand and process CSS rules
 * @param  {Object} rule CSS rule to transform
 * @return void
 */
function ruleHandler(rule) {
  const SELECTORS = {
    rangeTrack: '::track',
    rangeThumb: '::thumb',
  };

  const PSEUDOS = {
    rangeTrack: ['::-webkit-slider-runnable-track', '::-moz-range-track', '::-ms-track'],
    rangeThumb: ['::-webkit-slider-thumb', '::-moz-range-thumb', '::-ms-thumb'],
  };

  // Loop over our selectors
  for (const [select, selector] of Object.entries(SELECTORS)) {
    if (!rule.selector.includes(selector)) {
      continue;
    }

    if (Object.prototype.hasOwnProperty.call(PSEUDOS, select)) {
      for (const pseudo of PSEUDOS[select]) {
        const newRule = rule.cloneBefore();

        newRule.selector = newRule.selectors
          .filter(containsPseudo)
          .map((pseudoSelector) => pseudoSelector.replace(selector, pseudo))
          .join(',\n');

        // Do extra processing on the new rules
        processTracks(newRule);
        processThumbs(newRule);
      }
    }

    const webkitRule = rule.cloneBefore();
    webkitRule.selector = 'input[type="range"]';
    webkitRule.removeAll().append({ prop: '-webkit-appearance', value: 'none' });

    const mozRule = rule.cloneBefore();
    mozRule.selector = 'input[type="range"]::-moz-focus-outer';
    mozRule.removeAll().append({ prop: 'border', value: '0' });

    // If the rule only contained our elements remove it, else clean it
    if (rule.selectors.every(containsPseudo)) {
      rule.remove();
    } else {
      rule.selector = rule.selectors.filter(doesntContainPseudo).join(',\n');
    }
  }
}

const plugin = () => {
  return {
    postcssPlugin: 'postcss-input-style',
    Rule(rule) {
      if (!containsPseudo(rule.selector)) {
        return;
      }

      ruleHandler(rule);
    },
  };
};

plugin.postcss = true;

export default plugin;

'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

function fileExists(file) {
  return fs.existsSync(path.join(root, file));
}

assert(fileExists('README.md'), 'README.md should explain the project for visitors and contributors');
assert(fileExists('assets/og-image.svg'), 'assets/og-image.svg should provide a social sharing preview image');

const readme = read('README.md');
assert(readme.includes('中文排版问题小测验'), 'README should include the project name');
assert(readme.includes('W3C《中文排版需求》'), 'README should credit W3C clreq');
assert(readme.includes('贡献题目'), 'README should explain how to contribute questions');

const html = read('index.html');
assert(html.includes('property="og:image" content="assets/og-image.svg"'), 'index.html should define an OG image');
assert(html.includes('name="twitter:card" content="summary_large_image"'), 'Twitter card should use a large preview image');
assert(html.includes('id="share-button"'), 'result page should include a native share button');
assert(html.includes('id="contribute-link"'), 'result page should link to contribution flow');
assert(html.includes('https://github.com/xfq/clreq-quiz'), 'page should link to the project repository');
assert(html.includes('id="language-switcher"'), 'page should include a language switcher');
assert(html.includes('data-language="zh-Hans"'), 'language switcher should include Simplified Chinese');
assert(html.includes('data-language="zh-Hant"'), 'language switcher should include Traditional Chinese');

const script = read('script.js');
assert(script.includes('function getShareData'), 'script should centralize share data generation');
assert(script.includes('navigator.share'), 'script should use the Web Share API when available');
assert(script.includes('中文排版守门人'), 'result profiles should include a share-worthy top title');
assert(script.includes("'zh-Hant'"), 'script should define a Traditional Chinese locale');
assert(script.includes('中文排版問題小測驗'), 'Traditional Chinese locale should include the localized project title');
assert(script.includes('貢獻題目'), 'Traditional Chinese locale should include localized contribution copy');
assert(script.includes('查看原始碼'), 'Traditional Chinese locale should use natural Traditional Chinese source-code wording');
assert(script.includes('localStorage'), 'language preference should be persisted when available');

const og = read('assets/og-image.svg');
assert(og.includes('width="1200"'), 'OG SVG should be 1200px wide');
assert(og.includes('height="630"'), 'OG SVG should be 630px tall');
assert(!og.includes('>clreq<'), 'OG SVG should not show the clreq seal');
assert(!og.includes('>……<'), 'OG SVG should not show decorative ellipsis');
assert(!og.includes('>。</text>'), 'OG SVG should not show decorative full stop');

console.log('Static project checks passed.');

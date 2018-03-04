'use strict'
const arrify      = require('arrify');
const pAny        = require('p-any');
const pify        = require('pify');
const pTimeout    = require('p-timeout');
const rp          = require('request-promise');
const cheerio     = require('cheerio');
const ghostDetect = require('ghost-detect');

const clean = version => version.replace('Ghost','').trim();

function getVersion (target) {
  return ghostDetect(target).then(ghost => {
    if (!ghost) {
      return 'Target doesn\'t seem to be using Ghost'
    } else {
      return rp(target)
        .then(function (htmlString) {
          const $ = cheerio.load(htmlString);
          var ghost_version = $('meta[name="generator"]').attr('content');
          return clean(ghost_version);
        })
        .catch(function(err) {
          return 'Something went wrong: ' + err;
        })
    }
  })
}

module.exports = (dests, opts) => {
  opts = opts || {};
  opts.timeout = typeof opts.timeout === 'number' ? opts.timeout : 5000;

  const p = pAny(arrify(dests).map(getVersion));
  return pTimeout(p, opts.timeout).catch((err) => 'Something went wrong: ' + err);
};
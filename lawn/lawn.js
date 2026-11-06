// Your lawn this month: a general calendar for cool-season lawns in south-central Pennsylvania.
// Vanilla JS, no network, no storage. The month picked lives only in the address (#month=apr), so a link carries it.
// The words are general on purpose: no products, no rates, no promises. Edit them here; the page needs no build.
(function () {
  'use strict';

  var MONTHS = [
    { k: 'jan', name: 'January', when: 'Deep winter',
      grass: ['The lawn is dormant. Let it rest.',
        'Keep feet and tyres off frozen or frosty grass; it breaks easily and the marks show in spring.',
        'Go easy with ice melt along walks and the drive; salt-burned strips at the lawn’s edge are common.'],
      yard: ['A good month to have the mower blade sharpened and the mower looked over before spring.',
        'Keep firewood stacked off the ground and a little away from the house.'],
      chips: ['Snow removal', 'Firewood'],
      look: { sky: '#dbe4ee', sun: .45, hill: '#a3ab93', crowns: 0, g1: '#a8a77e', g2: '#b8b68f', shrubs: '#5b6b3a', flowers: 0, leaves: 0, wood: 1, snow: 1, clouds: .95 } },
    { k: 'feb', name: 'February', when: 'Late winter',
      grass: ['Still dormant. Stay off it while it is frozen or soggy.',
        'On a mild, dry day, pick up the sticks and debris that came down over winter.',
        'Notice where water sits after a thaw: low spots are worth remembering in spring.'],
      yard: ['Plan beds and plantings for spring while there is time.'],
      chips: ['Snow removal', 'Firewood'],
      look: { sky: '#dde6ef', sun: .55, hill: '#a3ab93', crowns: 0, g1: '#a2a678', g2: '#b4b78b', shrubs: '#5b6b3a', flowers: 0, leaves: 0, wood: 1, snow: .85, clouds: .9 } },
    { k: 'mar', name: 'March', when: 'Early spring',
      grass: ['The grass greens up as the soil warms, often later in the month.',
        'Wait until the ground is firm before raking or walking on it much; wet spring soil packs down.',
        'Lightly rake matted or flattened patches so air can get in.',
        'If you use a crabgrass preventer, it usually goes down around when the forsythia blooms, often late March into April here.'],
      yard: ['Clear leaves and winter debris out of the beds, and edge them before fresh mulch goes down.'],
      chips: ['Mulch beds', 'Landscaping'],
      look: { sky: '#d3ebf6', sun: .8, hill: '#8fae6c', crowns: .45, crownFill: '#9ac25e', g1: '#86a856', g2: '#9cbc68', shrubs: '#4d6b22', flowers: 0, leaves: 0, wood: 0, snow: 0, clouds: .9 } },
    { k: 'apr', name: 'April', when: 'Spring',
      grass: ['Mowing season starts. Never cut more than a third of the blade at once.',
        'Keep the mower high, around three inches or more: taller grass shades out weeds.',
        'Leave the clippings on the lawn. They break down quickly and feed it.'],
      yard: ['Fresh mulch, about two to three inches deep, pulled back from tree trunks and stems rather than piled against them.'],
      chips: ['Mowing', 'Mulch beds', 'Landscaping'],
      look: { sky: '#cdeefb', sun: 1, hill: '#7fac4f', crowns: 1, crownFill: '#6fa83a', g1: '#5f9e2d', g2: '#79b843', shrubs: '#3f6212', flowers: 1, leaves: 0, wood: 0, snow: 0, clouds: .9 } },
    { k: 'may', name: 'May', when: 'Late spring',
      grass: ['The fastest growth of the year: mowing every week is common, sometimes more.',
        'Keep the blade sharp; a dull blade tears the grass and leaves brown, ragged tips.',
        'Mow when the grass is dry.'],
      yard: ['Planting season for most shrubs and flowers. Water new plantings while they settle in.'],
      chips: ['Mowing', 'Mulch beds', 'Landscaping'],
      look: { sky: '#c4ecfb', sun: 1, hill: '#6fa045', crowns: 1, crownFill: '#4d7c0f', g1: '#4d8f1f', g2: '#68a92f', shrubs: '#3f6212', flowers: 1, leaves: 0, wood: 0, snow: 0, clouds: .8 } },
    { k: 'jun', name: 'June', when: 'Early summer',
      grass: ['Raise the mower a notch as the heat arrives, to around three and a half to four inches.',
        'If you water, water deeply and less often: about an inch a week, rain included, early in the morning.',
        'Growth slows in the heat, so mowing can too.'],
      yard: ['Keep an eye on new plantings in dry weeks; mulch helps beds hold moisture.'],
      chips: ['Mowing', 'Landscaping'],
      look: { sky: '#bfe6fb', sun: 1, hill: '#669a3e', crowns: 1, crownFill: '#3f6212', g1: '#3f7f17', g2: '#58992a', shrubs: '#365314', flowers: .7, leaves: 0, wood: 0, snow: 0, clouds: .6 } },
    { k: 'jul', name: 'July', when: 'High summer',
      grass: ['Cool-season grass slows right down in the heat. In a dry spell it may turn tan and go dormant; it usually greens up again when the rain and cooler nights come back.',
        'Keep traffic off a stressed, browning lawn.',
        'Seeding and feeding wait for late summer and fall.'],
      yard: ['Water beds and new plantings during dry spells, early in the day.'],
      chips: ['Mowing'],
      look: { sky: '#c9e4f2', sun: 1, hill: '#83954a', crowns: 1, crownFill: '#3f6212', g1: '#6f8f2e', g2: '#88a443', shrubs: '#365314', flowers: .4, leaves: 0, wood: 0, snow: 0, clouds: .35 } },
    { k: 'aug', name: 'August', when: 'Late summer',
      grass: ['Keep mowing high through the heat.',
        'Brown patches that stay brown after a good rain are worth a closer look.',
        'Late August opens the best window of the year for seeding cool-season grass here; it runs into September.'],
      yard: ['A good time to plan any fall landscaping.'],
      chips: ['Mowing', 'Landscaping'],
      look: { sky: '#c8e3f3', sun: 1, hill: '#869a4c', crowns: 1, crownFill: '#3f6212', g1: '#7a9235', g2: '#91a84a', shrubs: '#365314', flowers: .3, leaves: 0, wood: 0, snow: 0, clouds: .45 } },
    { k: 'sep', name: 'September', when: 'The lawn’s best month',
      grass: ['Warm soil and cooler nights: the best time of year to seed, overseed or core-aerate a cool-season lawn.',
        'Many lawns here get their main feeding in the fall, if they are fed at all.',
        'Keep new seed moist until it is up and growing.'],
      yard: ['Fall is a good season for planting trees and shrubs, too.'],
      chips: ['Mowing', 'Landscaping'],
      look: { sky: '#c9e9f7', sun: .95, hill: '#71a046', crowns: 1, crownFill: '#4d7c0f', g1: '#4f8a22', g2: '#67a334', shrubs: '#3f6212', flowers: .5, leaves: 0, wood: 0, snow: 0, clouds: .7 } },
    { k: 'oct', name: 'October', when: 'Fall',
      grass: ['Keep mowing for as long as the grass is growing.',
        'Don’t let fallen leaves smother the lawn: mow over them to chop them fine, or rake them off.',
        'A thick mat of leaves left all winter often means bare spots in spring.'],
      yard: ['Firewood season. Seasoned, dry wood burns cleaner and hotter than green wood.'],
      chips: ['Mowing', 'Firewood'],
      look: { sky: '#d8e9f1', sun: .85, hill: '#8f9c55', crowns: 1, crownFill: '#d97706', g1: '#5a8a2a', g2: '#72a03b', shrubs: '#4d5f1f', flowers: 0, leaves: 1, wood: 1, snow: 0, clouds: .8 } },
    { k: 'nov', name: 'November', when: 'Late fall',
      grass: ['Growth slows to a stop; the last mow of the year usually comes this month.',
        'Get the last of the leaves off before the snow.'],
      yard: ['Clean the mower before it is put away for winter.',
        'Stack firewood off the ground and under cover.'],
      chips: ['Firewood'],
      look: { sky: '#dfe6ea', sun: .6, hill: '#97a173', crowns: .55, crownFill: '#9a3412', g1: '#6f8a3c', g2: '#839c4c', shrubs: '#4d5f1f', flowers: 0, leaves: .8, wood: 1, snow: 0, clouds: .95 } },
    { k: 'dec', name: 'December', when: 'Winter',
      grass: ['Dormant again. Stay off it when it is frozen.',
        'Mark the edges of the drive and walks before the first big snow, so shovels and plows stay off the grass.',
        'Use ice melt sparingly near the lawn and the beds.'],
      yard: ['Keep firewood dry and close enough to the door to reach easily in the snow.'],
      chips: ['Snow removal', 'Firewood'],
      look: { sky: '#e2e8f0', sun: .45, hill: '#a3ab93', crowns: 0, g1: '#a8a77e', g2: '#b8b68f', shrubs: '#5b6b3a', flowers: 0, leaves: 0, wood: 1, snow: 1, clouds: .95 } }
  ];

  var $ = function (id) { return document.getElementById(id); };
  var bar = $('months');
  if (!bar) return;
  var icons = {};
  var tpl = $('chip-icons');
  if (tpl && tpl.content) {
    Array.prototype.forEach.call(tpl.content.querySelectorAll('[data-s]'), function (n) { icons[n.getAttribute('data-s')] = n.innerHTML; });
  }
  var now = new Date().getMonth();

  function fill(id, attr, value) { var n = $(id); if (n) n.setAttribute(attr, value); }
  function list(id, items) {
    var ul = $(id);
    ul.textContent = '';
    items.forEach(function (t) { var li = document.createElement('li'); li.textContent = t; ul.appendChild(li); });
  }

  function show(i, writeAddress) {
    var m = MONTHS[i], L = m.look;
    $('m-name').textContent = m.name;
    $('m-when').textContent = m.when + (i === now ? ' · this month' : '');
    list('m-grass', m.grass);
    list('m-yard', m.yard);
    var chips = $('m-chips');
    chips.textContent = '';
    m.chips.forEach(function (c) {
      var li = document.createElement('li');
      li.innerHTML = icons[c] || '';
      li.appendChild(document.createTextNode(c));
      chips.appendChild(li);
    });
    fill('sc-sky', 'fill', L.sky);
    fill('sc-sun', 'opacity', L.sun);
    fill('sc-hill', 'fill', L.hill);
    fill('sc-crowns', 'opacity', L.crowns);
    if (L.crownFill) fill('sc-crowns', 'fill', L.crownFill);
    fill('sc-g1', 'fill', L.g1);
    fill('sc-g2', 'fill', L.g2);
    fill('sc-shrubs', 'fill', L.shrubs);
    fill('sc-flowers', 'opacity', L.flowers);
    fill('sc-leaves', 'opacity', L.leaves);
    fill('sc-wood', 'opacity', L.wood);
    fill('sc-snow', 'opacity', L.snow);
    fill('sc-clouds', 'opacity', L.clouds);
    Array.prototype.forEach.call(bar.querySelectorAll('button'), function (b, j) { b.setAttribute('aria-pressed', j === i ? 'true' : 'false'); });
    if (writeAddress && window.history && history.replaceState) {
      try { history.replaceState(null, '', '#month=' + m.k); } catch (e) { /* a sandboxed preview: the card still changes */ }
    }
  }

  MONTHS.forEach(function (m, i) {
    var b = document.createElement('button');
    b.type = 'button';
    b.textContent = m.name.slice(0, 3);
    b.setAttribute('aria-label', m.name + (i === now ? ', this month' : ''));
    if (i === now) b.className = 'now';
    b.addEventListener('click', function () { show(i, true); });
    bar.appendChild(b);
  });

  function fromAddress() {
    var h = /month=([a-z]{3})/.exec(location.hash);
    if (h) for (var i = 0; i < MONTHS.length; i++) if (MONTHS[i].k === h[1]) return i;
    return now;
  }
  bar.addEventListener('keydown', function (e) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    var bs = bar.querySelectorAll('button'), at = Array.prototype.indexOf.call(bs, document.activeElement);
    if (at < 0) return;
    var to = (at + (e.key === 'ArrowRight' ? 1 : 11)) % 12;
    bs[to].focus();
    show(to, true);
    e.preventDefault();
  });
  show(fromAddress(), false);
  window.addEventListener('hashchange', function () { show(fromAddress(), false); });
})();

import solenoidBlogMd from '../content/Blogs/solenoid-blog.md?raw';
import solenoidTwoWayVsThreeWayImg from '../assets/images/Blogs/EMP/Solenoid/2way_vs_3_way.png';
import solenoidCoverImg from '../assets/images/Blogs/EMP/Solenoid/Cover_picture.png';
import solenoidEnergizedImg from '../assets/images/Blogs/EMP/Solenoid/Energized_Deenergized.png';

/**
 * The Workshop Dispatch — Vagif's review journal.
 *
 * Each entry is one numbered Dispatch with a verdict, structured for both
 * the index card and the full article page.
 *
 * verdict: 'WORTH_IT' | 'OVERRATED' | 'DEPENDS' | 'SKIP' | 'SLEEPER'
 * type:    'HOT_TAKE' | 'DEEP_DIVE' | 'TEARDOWN'
 */

export const VERDICTS = {
  WORTH_IT: { label: 'Worth It', tone: 'ink' },
  OVERRATED: { label: 'Overrated', tone: 'bronze' },
  DEPENDS: { label: 'Depends', tone: 'graphite' },
  SKIP: { label: 'Skip', tone: 'muted' },
  SLEEPER: { label: 'Sleeper', tone: 'ink' },
};

export const TYPES = {
  HOT_TAKE: 'Hot Take',
  DEEP_DIVE: 'Deep Dive',
  TEARDOWN: 'Teardown',
};

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderInlineMarkdown(value) {
  return escapeHtml(value)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');
}

const solenoidBlogImages = {
  '2way_vs_3_way.png': solenoidTwoWayVsThreeWayImg,
  'Cover_picture.png': solenoidCoverImg,
  'Energized_Deenergized.png': solenoidEnergizedImg,
};

function markdownToHtml(markdown, images = {}) {
  const blocks = markdown.trim().split(/\n{2,}/);
  let imageIndex = 0;

  return blocks
    .map((block) => {
      const lines = block.split('\n');
      const imageMatch = block.match(/^!\[(.+?)\]\((.+?)\)$/);

      if (imageMatch) {
        const [, alt, filename] = imageMatch;
        const src = images[filename];

        if (!src) {
          return '';
        }

        const side = imageIndex % 2 === 0 ? 'right' : 'left';
        imageIndex += 1;

        return `
          <figure class="dispatch-article-image dispatch-article-image--${side}">
            <img src="${src}" alt="${escapeHtml(alt)}" loading="lazy" />
          </figure>
        `;
      }

      if (lines.every((line) => line.startsWith('- '))) {
        const items = lines
          .map((line) => `<li>${renderInlineMarkdown(line.slice(2))}</li>`)
          .join('');
        return `<ul>${items}</ul>`;
      }

      const text = lines.join(' ');

      if (text.startsWith('# ')) {
        return `<h3>${renderInlineMarkdown(text.slice(2))}</h3>`;
      }

      if (text.startsWith('## ')) {
        return `<h4>${renderInlineMarkdown(text.slice(3))}</h4>`;
      }

      return `<p>${renderInlineMarkdown(text)}</p>`;
    })
    .join('\n');
}

export const posts = [
  {
    id: 'dispatch-005',
    slug: 'solenoid-valves-decoded',
    number: 5,
    date: '2026-05-27',
    subject: 'Espresso machine solenoid valves',
    title: 'The Gatekeeper of Pressure: Understanding Solenoid Valves',
    hook: 'A practical guide to the small electromagnetic valve controlling pressure, flow, and clean shot shutdowns.',
    verdict: 'WORTH_IT',
    type: 'DEEP_DIVE',
    category: 'Engineering',
    readMinutes: 9,
    claim:
      'A solenoid valve is the electrically controlled gatekeeper that routes water, releases pressure, and keeps espresso machine hydraulics predictable.',
    receipt: [
      'The valve works through a coil, spring-loaded plunger, and valve body.',
      'Normally Closed valves are the espresso machine standard because water only moves when commanded.',
      '3-way valves vent puck pressure through the exhaust path to prevent portafilter sneeze.',
      'Most failures trace back to coil faults, scale, debris, or coffee oils in the exhaust path.',
    ],
    bottomLine:
      'Treat solenoids as serviceable precision parts: test the coil, descale the valve body, feed the machine good water, and backflush 3-way valves regularly.',
    body: markdownToHtml(solenoidBlogMd, solenoidBlogImages),
    featured: true,
  },
  {
    id: 'dispatch-004',
    slug: 'self-calibrating-grinders',
    number: 4,
    date: '2026-05-12',
    subject: 'Self-calibrating grinders',
    title: 'The self-calibrating grinder is a marketing word, not an engineering one.',
    hook: 'Three units, six months, and a load cell that drifts faster than the burrs.',
    verdict: 'OVERRATED',
    type: 'DEEP_DIVE',
    category: 'Grinders',
    readMinutes: 7,
    claim:
      'The new wave of "self-calibrating" grinders promises that the machine compensates for burr wear, bean density, and humidity in real time — so the barista never has to adjust grind again.',
    receipt: [
      'Three units serviced between Nov 2025 and May 2026.',
      'All three drifted 0.4–0.7 setting points within the first 90 days.',
      'Load cells were within spec, but the firmware corrected based on dose weight, not output flow.',
      'Two of three needed the same manual recalibration any conventional grinder would.',
    ],
    bottomLine:
      'A good barista, a scale, and a stopwatch beats this firmware every time. Save the money for better burrs.',
    body: `
      <p>The pitch is hard to argue with. A grinder that watches itself. No more chasing grind size every morning, no more re-zeroing after a humid weekend, no more wondering whether the burrs are tired. The machine handles it. You pull shots.</p>

      <figure class="my-10 mx-auto max-w-[800px] panel">
        <img 
       
          alt="Close-up of a high-end coffee grinder burr set being inspected with a loupe, showing signs of wear." 
          class="w-full h-auto block"
        />
        <figcaption class="px-6 py-4 border-t border-rule bg-page/50 font-mono text-[11px] uppercase tracking-wider text-muted">
          Fig 1.1 — Wear patterns after three months of "self-calibration." The asymmetric burr wear is a direct result of the firmware's feedback loop.
        </figcaption>
      </figure>

      <p>I wanted to believe it. I service grinders for a living, and the number one cause of a bad shot in the wild is not a bad bean or a bad barista — it is a grind setting that drifted while nobody was looking. If a manufacturer could actually solve that, it would be the most important thing to happen to espresso in a decade.</p>

      <p>So when three of these units landed on my bench last winter, I treated them like a real experiment. Three households, three different beans, six months of weekly logs. Dose weight, output weight, time to first drop, total extraction time. I wanted to know whether the firmware was doing what the marketing said it was doing.</p>

      <p>It was not.</p>

      <h3>What &ldquo;self-calibrating&rdquo; actually means</h3>

      <p>Once you read the firmware spec, the trick becomes obvious. These grinders are not measuring the puck. They are not even measuring the grounds. They are measuring <em>dose weight against grind time</em>, and assuming a linear relationship between the two. Faster grinding means coarser particles, so the machine nudges the burr gap to keep the grind-time-per-gram constant.</p>

      <p>That is a fine proxy until it isn&rsquo;t. Burrs do not wear linearly. A worn burr produces more fines at the same gap setting, which extracts faster, which the firmware reads as &ldquo;too coarse,&rdquo; which prompts it to tighten the gap further — accelerating the wear. By month three, two of the three units were grinding finer than the user had ever asked for, and the shots were tasting like burnt paper.</p>

      <p>The owners did not notice until the bitterness got loud enough to complain about. That is the part that bothers me most. The whole point of the feature was to remove the need for the barista to pay attention. So when it failed, nobody was paying attention.</p>

      <h3>The receipts</h3>

      <p>All three units drifted in the same direction — finer — at roughly the same rate. About 0.4 to 0.7 setting points across the first ninety days, depending on the bean. The load cells were within spec. The motors were healthy. The firmware was simply solving the wrong problem with confidence.</p>

      <p>When I pulled the burrs and inspected them under a loupe, two of the three sets showed asymmetric wear consistent with what you get from excessive close-gap operation. The firmware had been compensating for its own compensation. A feedback loop with no ground truth becomes a downward spiral, and that is exactly what I was looking at.</p>

      <p>For comparison, I had a fourth household running a basic flat-burr grinder on the same beans, with the owner checking the recipe once a week with a scale and a stopwatch. No drift. None. The &ldquo;dumb&rdquo; setup outperformed the smart one because there was a human in the loop who knew what a good shot tasted like.</p>

      <h3>The case for staying in the loop</h3>

      <p>I keep coming back to the same setup for home espresso. A flat conical with quality burrs, a thirty-dollar scale, and the discipline to check the recipe once a week. It is not glamorous and it does not have an app. But it gives you the one thing the &ldquo;smart&rdquo; grinder cannot — a feedback loop where <em>you</em> see what the shot is doing, and <em>you</em> decide whether the variable that changed was the bean, the humidity, or the burrs.</p>

      <p>When a self-calibrating grinder drifts, you have to debug both the coffee and the firmware. That is a worse problem than the one it was sold to solve. The feature is not making espresso easier. It is making the failure mode harder to diagnose.</p>

      <p>Maybe a future generation will measure the actual grounds — particle size distribution, fines ratio, something with a real signal. Until then, the word &ldquo;self-calibrating&rdquo; on a grinder is marketing, not engineering. Save the money. Spend it on better burrs and a louder timer.</p>
    `,
    featured: false,
  },
  {
    id: 'dispatch-003',
    slug: 'pressure-profiling-is-a-distraction',
    number: 3,
    date: '2026-04-22',
    subject: 'Pressure profiling on prosumer machines',
    title: 'Pressure profiling is the wrong feature to chase under $3,000.',
    hook: 'Most of the variance you taste comes from temperature stability you do not have.',
    verdict: 'OVERRATED',
    type: 'HOT_TAKE',
    category: 'Espresso',
    readMinutes: 4,
    claim:
      'Pressure profiling is sold as the killer feature of modern home espresso — paddles, gear pumps, app-driven curves.',
    receipt: [
      'Group temperature swings of 3–6°C are common on machines that advertise pressure profiling.',
      'In blind A/B tastings, temp stability beat profile shape 8 times out of 10.',
      'Most users never change the default profile after the first month.',
    ],
    bottomLine:
      'Buy temperature stability first. Profiling is a feature for people who have already solved every other variable — and most of us have not.',
    body: '',
    featured: false,
  },
  {
    id: 'dispatch-002',
    slug: 'water-is-the-cheapest-upgrade',
    number: 2,
    date: '2026-03-30',
    subject: 'Remineralized water for home espresso',
    title: 'Water is the cheapest upgrade nobody buys.',
    hook: 'A $40 mineral kit outperformed a $1,200 grinder swap in the same kitchen.',
    verdict: 'WORTH_IT',
    type: 'DEEP_DIVE',
    category: 'Water',
    readMinutes: 8,
    claim:
      'Specialty water is treated as an enthusiast detail — the last 1% for people chasing competition shots.',
    receipt: [
      'Same beans, same machine, same barista — only the water changed.',
      'Extraction yield moved 1.8 percentage points on average.',
      'Scale buildup on the heat exchanger dropped to near-zero over 90 days.',
      'Cost per liter: about 6 cents.',
    ],
    bottomLine:
      'If you have not fixed your water, every other upgrade is leaving money on the counter.',
    body: '',
    featured: false,
  },
  {
    id: 'dispatch-001',
    slug: 'why-i-stopped-trusting-pressure-gauges',
    number: 1,
    date: '2026-03-04',
    subject: 'Analog pressure gauges below 6 bar',
    title: 'Why I stopped trusting pressure gauges below 6 bar.',
    hook: 'The needle says nine. The puck says otherwise. Here is what is happening inside.',
    verdict: 'DEPENDS',
    type: 'HOT_TAKE',
    category: 'Diagnostics',
    readMinutes: 5,
    claim:
      'The pressure gauge on the front of the machine is supposed to be the ground truth for what is happening at the puck.',
    receipt: [
      'Gauges are mounted upstream of the group — they read pump pressure, not brew pressure.',
      'Restriction at the puck shifts the real number by 1–2 bar.',
      'On three of four machines tested, the front gauge was 1.5 bar higher than a portafilter-mounted reference.',
    ],
    bottomLine:
      'The gauge is a useful diagnostic, not a verdict. Treat it like a smoke alarm: it tells you something changed, not what is true.',
    body: '',
    featured: false,
  },
];

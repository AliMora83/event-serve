# Events Serve — Brand Voice Guidelines

Generated 8 Oct 2026 from two FINAL client documents:
- `Events Serve website.docx` (About, Vision, Mission, Approach, Expertise, Services, Why Events Serve, CTA)
- `SPONSORSHIPS AND PARTNERSHIPS TAB.docx`

**Rule zero: client copy is verbatim.** Everything in those two documents ships exactly as written. These guidelines govern only the copy *we* write around it: hero lines, headings the docs don't supply, meta titles and descriptions, button labels, alt text, form microcopy, and error states. If a guideline here conflicts with doc text, the doc wins.

---

## 1. Voice in one line

**A confident, warm events partner who puts the client first and lets the experience speak.** Professional enough for a government department, warm enough for a gala dinner.

Confidence: **High**. Both documents use the same voice consistently.

## 2. We are / We are not

| We are | We are not |
|---|---|
| **Confident.** "We bring ideas to life." | **Boastful.** No "best", "No. 1", "world-class", or unverifiable superlatives. |
| **Client-first.** "You are at the centre of everything we do." Second person is everywhere. | **Self-absorbed.** We don't lead with our own history or headcount. |
| **Experience-led.** The outcome is a moment people remember. | **Logistics-led.** We don't list equipment or specs unless a service needs them. |
| **Warm and professional.** Fit for corporate, public sector and private clients alike. | **Casual or slangy.** No exclamation marks, emoji or "awesome". |
| **Concrete where it counts.** "Hyundai South Africa as official vehicle sponsor of the 18th South African Sport Awards." | **Vague in the proof.** Claims need a name, a number or an event behind them. |
| **Rhythmic.** Short punchy closers after explanatory paragraphs. | **Breathless.** Not every sentence is a slogan. |

## 3. Signature devices

Use these sparingly in new copy. They're what makes the docs sound like Events Serve.

1. **The triad closer.** Three short parallel sentences.
   - "Your vision. Our expertise. One exceptional experience."
   - "Your brand. Our platform. A shared experience."
   - "Celebrate achievement. Recognise excellence. Create unforgettable moments."
   - At most one per page in new copy, or it becomes a tic.
2. **The "not just X — Y" turn.**
   - "We don't just manage events — we manage the experience."
   - "…don't simply fill your feed — they give your audience a reason to engage."
3. **The kicker line.** A bolded short sentence that opens or closes a block: "Because the details make the difference." Each service and pillar has one, and the design system renders it (see `DESIGN-SYSTEM.md`).
4. **Lists of event types or capabilities in a single sentence.** "Corporate event, conference, awards ceremony, gala dinner, concert, festival…"

## 4. Vocabulary

**Lean on:** experience(s), memorable, remember, seamless, end-to-end, from concept to execution, bring to life, partner / partnership, audience, details, creativity, professional.

**Avoid in new copy:**
- "special events": a consumer/wedding register the docs never use.
- "unforgettable" outside the one awards line where the doc already uses it.
- "solutions" as a standalone noun. The doc uses it, but don't add more.
- "cutting-edge", "world-class", "passionate team".
- "since 2020", "founded".

**Proper names:**
- **Events Serve**: two words, always. In running text and UI.
- **Events Serve (Pty) Ltd**: with a space before "Ltd". Only in legal and footer contexts, and wherever the doc's About paragraph uses it.
- **South African Sport Awards**: "Sport", singular, as in the partnerships doc's Hyundai line.

## 5. Mechanics

| Item | Rule | Source |
|---|---|---|
| Spelling | UK/SA English: organise, recognise, centre, optimisation, décor | Both docs |
| Headings | Sentence case on the site ("Our approach", "Why Events Serve?"). The docs' ALL CAPS is formatting, not text: render the doc's words in sentence case and don't force uppercase with CSS. | Site convention |
| Oxford comma | The docs mix both. For new copy: **no Oxford comma**, the majority usage. Never edit doc text to match. | Website doc majority |
| Dashes | Spaced em dash ( — ) for the "not just X — Y" turn | Website doc |
| Experience claim | "15 years of industry experience" refers to the **team's** experience, not company age. Stat tile shows "15+". Never pair it with a founding year. | Ali, 8 Oct 2026 |
| Numbers | Numerals for stats ("150+ events"); words for one to nine in prose | Convention |
| Exclamation marks | None | Both docs |

## 6. Tone by context

| Context | Tone | Length | Example / rule |
|---|---|---|---|
| Hero (h1) | Bold, short, declarative | ≤ 8 words | Prefer a doc line: "Your vision. Our expertise. One exceptional experience." |
| Section headings we write | Plain and descriptive | 2–5 words | "What we offer", "Where we work" |
| Service and expertise copy | Verbatim doc | n/a | Don't touch it |
| CTAs and buttons | Inviting, first person plural or imperative | 2–4 words | "Start a conversation", "Explore partnerships", "See what we do". Not "Submit", "Click here" or "Learn more". |
| Meta descriptions | Factual, names services; says "across South Africa", never a city list | 140–160 chars | Lead with what Events Serve does, then where |
| Alt text | Literal and specific: event name + what's visible | ≤ 125 chars | "Stage set for the Presidential Gala dinner". Never "image of", never PLACEHOLDER in production. |
| Form microcopy and errors | Calm, helpful, no blame | One sentence | "We couldn't send your message. Email us at info@eventsserve.co.za instead." |
| Footer and legal | Neutral, complete | n/a | "Events Serve (Pty) Ltd · Reg. 2016/524802/07" |

## 7. Existing site copy: voice check

| Copy | Location | Verdict |
|---|---|---|
| "Creating unforgettable moments for your special events" | `site.tagline` (hero h1) and Marquee | **Replace.** "Special events" is off-register for a corporate and public-sector client base, and it's the first line people read. Use "Your vision. Our expertise. One exceptional experience." (verbatim doc) for the h1. Use "Let's create something memorable" (verbatim doc) for the Marquee, or drop the Marquee. |
| "Impact — Making a difference through every event…" | `/about` | **Drop.** It isn't in the final doc, and its NGO register ("create lasting change") clashes. Vision and Mission now carry that ground. |
| "Start a conversation" | Buttons | **Keep.** On voice. |
| "Tell us the date, the room and the audience, and we will tell you what it takes to deliver it." | `/services` CTA | **Replace** with the doc's "Let's create something memorable" block, which is final copy for exactly this job. |
| `/services` lede ("production, broadcast, accreditation…") | `/services` | **Replace** with the doc's Our Expertise intro paragraph. The services it names no longer exist. |
| Meta on `/`, `/about`, `/services` | `<BaseLayout>` props | **Rewrite.** They name broadcast and activations, and `/about` says "Founded in 2020". See §8. |
| Partnerships page body | `/partnerships` | **Drift from final doc.** The code has a trimmed intro (two paragraphs instead of three), reworded sentences ("Whether you're sponsoring…" vs the doc's "Whether you are looking to sponsor…"), and the closing line "Partner with Events Serve and let's turn opportunities into experiences people remember." is missing. The doc is final, so restore it verbatim. |

## 8. Proposed meta (new copy, written to these guidelines)

- **Home** title: "Events Serve | Event management and production across South Africa"
  - Description: "Full-service events and media company delivering conferences, corporate events, awards, gala dinners and festivals across South Africa."
- **About** title: "About Events Serve | 15 years of industry experience"
  - Description: "Events Serve is a full-service events and media company creating memorable experiences that connect people, brands and audiences across South Africa."
- **Services** title: "Services | Event management, production and marketing — Events Serve"
  - Description: "Event management and production, content creation, technical production, digital marketing, design, social media and PR, from concept to execution."

## 9. Open questions

1. **Hero h1.** Use "Your vision. Our expertise. One exceptional experience." (recommended) or "Let's create something memorable"? The first is the stronger positioning line.
2. **Impact section.** Drop it (recommended), or keep it as non-doc copy?
3. **"Why Events Serve?"** The doc has a question mark. Keep it verbatim (recommended), even though other headings have none.

## Confidence

| Section | Confidence | Why |
|---|---|---|
| Voice, We are / We are not | High | Consistent across both docs |
| Signature devices | High | Repeated four or more times |
| Mechanics | Medium | The Oxford comma is inconsistent in source |
| Tone matrix: microcopy, alt text | Medium | Inferred, since the docs carry no UI copy |

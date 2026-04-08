# Prompt 02 — Marketing Team: 7 Heru Voice Agent Gap Analysis VRDs

**Team:** Marketing (Don Cornelius lead, Barbara Proctor brand, Eunice Johnson scripts)
**Reports to:** Mary (Product Owner)
**Priority:** P1 — Defines where voice agents live across all Herus
**Output:** 7 VRD files in `docs/vrds/` of each Heru project

---

## Your Mission

Write a Voice Requirements Document (VRD) for each of the 7 active Herus. Each VRD defines WHERE voice agents help users in that product, WHAT the voice agent's personality is, and HOW the voice agent upsells users to Clara Agents.

**Remember: every voice agent is always trying to upsell the user to get their own Clara agent.** That is the business model. The site agent is the top of the funnel. Clara Agents is the subscription.

---

## VRD Template (use this structure for all 7)

```markdown
# VRD — [Heru Name] Voice Agent
**Version:** 1.0
**Date:** 2026-04-08
**Authors:** Don Cornelius, Barbara Proctor, Eunice Johnson (Marketing Team)
**Reviewed by:** Mary (Product Owner)

## Product Summary
[1-2 sentences: what does this Heru do for users]

## Voice Agent Identity
- **Name:** [agent name for this Heru]
- **Personality:** [3 adjectives]
- **Voice tone:** [how they speak]
- **Cultural reference:** [who this voice channels]

## Voice Moments — Where Voice Helps
[3-5 specific moments in the user journey where voice makes the experience better]
For each moment:
- **Trigger:** [what the user is doing]
- **Voice action:** [what the agent says/does]
- **Value delivered:** [why this is better than no voice]

## Upsell Script — Clara Agents
[The script the voice agent uses to introduce Clara Agents when the moment is right.
Should feel organic, not salesy. 2-3 sentences max.]

## Pronunciation Guide
- [Product name]: [phonetic]
- [Key features]: [phonetic]
- Any proper nouns, brand names, or cultural references

## 20 Cached Phrases (Pre-generate these for fast TTS)
[List 20 phrases this agent will say frequently — these get pre-generated at deploy time]

## Launch Condition
[What needs to be true before this voice agent goes live]
```

---

## The 7 VRDs — Write Each One

### 1. World Cup Ready (WCR)
**Project path:** `/Volumes/X10-Pro/Native-Projects/clients/world-cup-ready/`
**Output:** `docs/vrds/wcr-voice-agent.md`

Context: WCR is a world-class sports hospitality platform. Users book premium experiences — VIP suites, stadium tours, hospitality packages, travel. Mo wants to host World Cup 2026 experiences in the US, Mexico, and Canada.

Voice moments to cover:
- User browsing available packages (agent guides with energy)
- Checkout hesitation (agent encourages, answers questions)
- Post-booking confirmation (agent builds excitement)
- Travel logistics question (agent provides real-time help)

Upsell angle: "Imagine having a personal sports concierge that knows your preferences, your budget, your travel style — every single World Cup. That's your Clara agent."

---

### 2. QuikCarRental (QCR)
**Project path:** `/Volumes/X10-Pro/Native-Projects/Quik-Nation/quikcarrental/`
**Output:** `docs/vrds/qcr-voice-agent.md`

Context: QCR is a peer-to-peer car rental marketplace. Renters find vehicles. Owners list their cars. Think Turo.

Voice moments:
- Renter searching for a car (agent helps filter by date, location, type)
- Owner setting up their listing (agent walks through the process)
- Renter picking up the car (agent provides instructions, contact info)
- Dispute/question during rental (agent mediates)

Upsell: "Your Clara agent can automatically search for the best cars in any city, compare prices, and book for you — without you lifting a finger. Every trip."

---

### 3. FMO (Financial Management Office)
**Project path:** `/Volumes/X10-Pro/Native-Projects/clients/fmo/`
**Output:** `docs/vrds/fmo-voice-agent.md`

Context: FMO is a financial services platform for insurance agents (Cali West + Ed Moore). Life insurance, Medicare, ACA marketplace. Users are professional insurance agents managing books of business.

Voice moments:
- Agent reviewing a client's coverage gap (voice summarizes)
- Submitting a new application (agent guides form completion)
- Commission tracking question (agent reports earnings)
- Renewal reminder workflow (agent prompts action)

Upsell: "Your Clara agent can monitor every client's renewal date, alert you 90 days out, draft the renewal pitch, and even pre-fill the application — all while you focus on the sale."

---

### 4. Site 962 (S962)
**Project path:** `/Volumes/X10-Pro/Native-Projects/Quik-Nation/site962/`
**Output:** `docs/vrds/s962-voice-agent.md`

Context: Site962 is a nightlife/events platform. Users discover events, buy tickets, and experience Atlanta's entertainment scene.

Voice moments:
- User discovering events ("What's happening this weekend?")
- Ticket purchase flow (agent handles the transaction by voice)
- Day-of event prep (agent sends directions, parking, dress code)
- Post-event ("How was it? Here's what's happening next Friday")

Upsell: "Your Clara agent knows your taste in music, your group size, your budget — and every Thursday it tells you exactly what you should do this weekend. Before you even ask."

Cultural note: S962 is nightlife. Don Cornelius should lead this VRD — it's his world. Soul Train energy.

---

### 5. TrackIt
**Project path:** `/Volumes/X10-Pro/Native-Projects/clients/trackit/`
**Output:** `docs/vrds/trackit-voice-agent.md`

Context: TrackIt is a project management tool built for contractors and field teams. Andrew (client) uses it for construction project tracking.

Voice moments:
- Contractor doing a site walkthrough (voice-first task creation: "Mark this as complete")
- Daily standup (agent summarizes what's done, what's blocked)
- Client update request (agent drafts a progress report by voice)
- Budget overrun alert (agent flags and asks for decision)

Upsell: "Your Clara agent tracks every project, every crew, every deadline — and gives you a 30-second briefing every morning before you hit the job site."

---

### 6. PGCMC (Professional Golf Club Management Company)
**Project path:** `/Volumes/X10-Pro/Native-Projects/clients/new-pgcmc-website-and-app/`
**Output:** `docs/vrds/pgcmc-voice-agent.md`

Context: PGCMC is a golf club management platform — tee time booking, membership, pro shop, course management.

Voice moments:
- Member booking a tee time ("Book me Saturday morning, 4 players")
- Pro shop inquiry ("Do you have TaylorMade irons in stock?")
- Course condition update ("What are conditions like this morning?")
- Membership renewal ("When does my membership expire?")

Upsell: "Your Clara agent knows your handicap, your regular foursome, your preferred tee times — and books everything for you every week. It's like having a personal caddie for your schedule."

Golf voice should be refined, calm, country club appropriate. Moss Kendrix leads this one — B2B + partnership angle for the club management side.

---

### 7. Kings Luxury Services (KLS)
**Project path:** `/Volumes/X10-Pro/Native-Projects/clients/kingluxuryservices-v2/`
**Output:** `docs/vrds/kls-voice-agent.md`

Context: KLS is a luxury service business — premium experiences, high-net-worth clients. V2 is being rebuilt from scratch on the Auset platform.

Voice moments:
- Client inquiring about services ("What's included in the platinum package?")
- Booking a service ("Schedule a driver for Friday at 7pm")
- Service update ("Your driver is 5 minutes away")
- Concierge escalation ("Connect me with your team")

Upsell: "Your Clara agent is the digital extension of our concierge team — available 24/7 to anticipate your needs, make reservations, and handle every detail before you ask."

Voice for KLS should be ultra-refined. Virgil Abloh's energy — luxury is a feeling, not just a service. Romare Bearden for visual references in the prompts.

---

## Output Instructions

For each VRD:
1. Create the file at the path specified above
2. Follow the VRD template structure exactly
3. Make the 20 cached phrases SPECIFIC to that Heru — not generic AI phrases
4. The upsell script should feel like it comes from the brand voice of THAT Heru, not Clara

After writing all 7, create a summary report at:
`/Volumes/X10-Pro/Native-Projects/Quik-Nation/quiknation-marketing/docs/vrds/VRD-INDEX.md`

Format:
```markdown
# Voice Requirements Document Index
| Heru | File | Status | Voice Agent Name | Launch Condition |
|------|------|--------|-----------------|-----------------|
...
```

---

## Cultural Standards (Non-Negotiable)

- **Don Cornelius** leads WCR and S962 — high energy, music culture, "and you can bet your last money, it's gonna be a stone gas"
- **Barbara Proctor** leads FMO and KLS — brand ethics, dignity, earned trust
- **Eunice Johnson** leads QCR and PGCMC — aspirational lifestyle, luxury accessible to all
- **Moss Kendrix** advises on B2B angles (TrackIt, PGCMC) — partnership-first language
- Every VRD should feel like it was written by someone who LOVES that product, not someone filling in a template

## After completing, post to live feed:
```
echo "$(date '+%H:%M:%S') | quiknation-marketing | VRDs COMPLETE | 7 Heru VRDs written | WCR, QCR, FMO, S962, TrackIt, PGCMC, KLS | Ready for Mary review" >> ~/auset-brain/Swarms/live-feed.md
```

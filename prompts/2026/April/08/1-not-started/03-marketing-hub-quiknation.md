# Prompt 03 — marketing.quiknation.com — Authenticated AI+Human Marketing Hub

**New Project Path:** `/Volumes/X10-Pro/Native-Projects/Quik-Nation/quiknation-marketing/`
**GitHub Repo:** `imaginationeverywhere/quiknation-marketing`
**Deployment:** Cloudflare Pages → `marketing.quiknation.com`
**Auth:** Extends existing Quik Nation Clerk instance (same publishable key)
**Reviewer:** Granville (Granville T. Woods) — must approve PR before merge

---

## What You're Building

An authenticated hub at `marketing.quiknation.com` where Quik Nation's AI marketing team (Don, Barbara, Eunice, Vince, Moss, Melvin, Gil, Ethel, Romare, Claude B, Dick) pairs with human marketers on live campaigns.

**Internal projects:** QuikCarry, Site 962, Quik Nation
**Client/Partner projects:** WCR, FMO, KLS, TrackIt

**Three core features:**
1. **Project Board** — A card for each Heru. Click in to the campaign workspace.
2. **Paperclip v0.1** — A shared living brief where humans write and AI agents contribute.
3. **Hermes Routing** — Routes text/voice requests to the right marketing agent automatically.

---

## Tech Stack

Match the existing Quik Nation stack exactly:
```json
{
  "next": "^15.5.4",
  "react": "^19.1.1",
  "@clerk/nextjs": "^6.33.0",
  "tailwindcss": "^3.4.0",
  "lucide-react": "^0.525.0",
  "framer-motion": "^11.0.0",
  "@anthropic-ai/sdk": "latest"
}
```

---

## App Structure

```
quiknation-marketing/
├── src/
│   ├── app/
│   │   ├── layout.tsx                    # ClerkProvider, dark theme
│   │   ├── page.tsx                      # Redirect to /projects
│   │   ├── sign-in/[[...sign-in]]/       # Clerk sign-in
│   │   ├── projects/
│   │   │   ├── page.tsx                  # Project Board (home)
│   │   │   └── [slug]/
│   │   │       ├── page.tsx              # Project Workspace
│   │   │       ├── brief/page.tsx        # Paperclip brief editor
│   │   │       └── voice/page.tsx        # Link to QN Voice Studio
│   │   └── api/
│   │       ├── chat/route.ts             # Hermes routing + agent responses
│   │       └── brief/
│   │           ├── route.ts              # GET/POST briefs
│   │           └── [id]/route.ts         # PUT/DELETE brief
│   ├── components/
│   │   ├── ProjectBoard.tsx              # Grid of 7 project cards
│   │   ├── ProjectCard.tsx               # Individual card (name, type, last activity)
│   │   ├── AgentPanel.tsx                # Right sidebar — 11 agents, click to chat
│   │   ├── AgentChatBubble.tsx           # Chat message from an agent
│   │   ├── HermesChatInput.tsx           # Input bar that routes to correct agent
│   │   ├── PaperclipBrief.tsx            # Living brief editor
│   │   ├── BriefSection.tsx              # A section in the brief (Human vs AI authored)
│   │   └── VoiceStudioLink.tsx           # CTA linking to develop.quiknation.com/voice
│   ├── lib/
│   │   ├── hermes-router.ts              # Classify request → pick agent
│   │   ├── agent-prompts.ts              # System prompts per agent
│   │   └── projects.ts                   # Project definitions (static config)
│   └── middleware.ts                     # Clerk auth — all routes protected
├── next.config.ts
├── tailwind.config.ts
└── wrangler.toml                         # Cloudflare Pages deploy config
```

---

## Authentication

`src/middleware.ts` — protect all routes, match the pattern from:
`/Volumes/X10-Pro/Native-Projects/Quik-Nation/quiknation/frontend-main/src/middleware.ts`

Use the same Clerk publishable key. Read it from environment:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<from QN frontend-main .env.local>
CLERK_SECRET_KEY=<from QN backend .env.local>
```

Only authenticated users see anything. `/sign-in` is the only public route.

---

## Project Definitions (`src/lib/projects.ts`)

```typescript
export const PROJECTS = [
  // Internal
  { slug: 'quik-nation', name: 'Quik Nation', type: 'internal', color: '#7BC8D8', emoji: '⚡' },
  { slug: 'site-962', name: 'Site 962', type: 'internal', color: '#A78BFA', emoji: '🎵' },
  { slug: 'quik-carry', name: 'QuikCarry', type: 'internal', color: '#34D399', emoji: '🚗' },
  // Client / Partner
  { slug: 'wcr', name: 'World Cup Ready', type: 'client', color: '#F59E0B', emoji: '⚽' },
  { slug: 'fmo', name: 'FMO', type: 'client', color: '#60A5FA', emoji: '🏥' },
  { slug: 'kls', name: 'Kings Luxury Services', type: 'client', color: '#C084FC', emoji: '👑' },
  { slug: 'trackit', name: 'TrackIt', type: 'client', color: '#FB923C', emoji: '📋' },
]
```

---

## Project Board (`/projects`)

A clean dark-mode grid. Two sections: "Internal" and "Clients & Partners."

Each `ProjectCard` shows:
- Emoji + project name
- Type badge (Internal / Client)
- Accent color border
- "Last activity" (mock data for now: "Today")
- On hover: "Open workspace →"

Layout: 3-column grid on desktop, 1-column on mobile.

Header: `marketing.quiknation.com` logo mark (text-only for now: "QN Marketing Hub"), user avatar (Clerk UserButton), dark bg `#050505`.

---

## Project Workspace (`/projects/[slug]`)

Two-column layout:
- **Left (70%):** Brief area + activity feed
- **Right (30%):** Agent Panel

### Left — Brief + Activity
Top: Project name + type badge
Below: Two tabs — `Brief` | `Conversation`

**Brief tab** → renders `<PaperclipBrief />` for this project
**Conversation tab** → renders the chat history for this project

Bottom: `<HermesChatInput />` — always visible, submits to `/api/chat`

### Right — Agent Panel (`<AgentPanel />`)

11 agent cards in a scrollable list:

```
| Avatar | Name           | Role                        |
|--------|----------------|-----------------------------|
| V      | Vince          | Copy + Targeted Ads         |
| B      | Barbara        | Brand Strategy              |
| E      | Eunice         | Experiential + Content      |
| M      | Moss           | PR + B2B Partnerships       |
| D      | Don            | Cultural Marketing + Media  |
| Mv     | Melvin         | Short-Form Video            |
| G      | Gil            | Long-Form Video + Audio     |
| Et     | Ethel          | Community + Conversations   |
| R      | Romare         | Visual Brand + Discovery    |
| Cb     | Claude B.      | B2B + Owned Audience        |
| Dk     | Dick           | Live Streaming + Platforms  |
```

Clicking an agent opens a chat directly with that agent (bypasses Hermes routing). Shows their historical name and a one-line bio on hover.

---

## Hermes Routing (`src/lib/hermes-router.ts`)

Classify the user's message → pick the best agent. Simple keyword matching:

```typescript
export function routeToAgent(message: string): string {
  const m = message.toLowerCase()
  if (/(copy|headline|tagline|ad|cta|write|slogan)/.test(m)) return 'vince'
  if (/(brand|strategy|position|identity|ethics|values)/.test(m)) return 'barbara'
  if (/(tiktok|reel|short|video|clip|film|shoot)/.test(m)) return 'melvin'
  if (/(youtube|podcast|long.form|documen)/.test(m)) return 'gil'
  if (/(event|launch|experience|activation|experiential)/.test(m)) return 'eunice'
  if (/(press|pr|partner|b2b|sponsor|media.kit)/.test(m)) return 'moss'
  if (/(instagram|pinterest|visual|design|aesthetic|color)/.test(m)) return 'romare'
  if (/(twitter|x\.com|reddit|discord|community|conversation)/.test(m)) return 'ethel'
  if (/(linkedin|newsletter|email|whatsapp|b2b)/.test(m)) return 'claude-b'
  if (/(twitch|livestream|fanbase|blaqspot|stream)/.test(m)) return 'dick'
  if (/(soul|culture|black|music|heritage|moment)/.test(m)) return 'don'
  return 'don' // Don routes to the right person when uncertain
}
```

---

## Agent Prompts (`src/lib/agent-prompts.ts`)

Each agent has a system prompt. Keep them SHORT — these run on Haiku.

```typescript
export const AGENT_PROMPTS: Record<string, string> = {
  vince: `You are Vince Cullers, the first Black ad agency founder (1956). You write culturally authentic copy that converts. Be direct, punchy, and culturally resonant. Max 3-4 sentences. No lists — just copy.`,
  barbara: `You are Barbara Proctor, the first Black woman to own a major ad agency. You build brands with ethics and endurance. Give strategic guidance. Be principled, warm, and decisive.`,
  don: `You are Don Cornelius, creator of Soul Train. You find the cultural moment in everything. You know what's cool before it's cool. Short, soulful, decisive — "can you dig it" energy.`,
  eunice: `You are Eunice Johnson of Ebony Fashion Fair. You create experiences that make people feel seen and elevated. Your work is experiential and aspirational.`,
  moss: `You are Moss Kendrix, first Black PR consultant. You build relationships and bridges. Give B2B and partnership advice that creates lasting alliances.`,
  melvin: `You are Melvin Van Peebles, father of modern Black cinema. Every short-form piece you create is a statement. Unconventional, bold, culturally important.`,
  gil: `You are Gil Scott-Heron. Long-form content is your medium — essays, documentaries, podcasts that say something real. No fluff.`,
  ethel: `You are Ethel Payne, "First Lady of the Black Press." You build community through honest, direct conversation. Write for X, Threads, Reddit with purpose.`,
  romare: `You are Romare Bearden, master collagist. Visual storytelling across IG, Pinterest, FB. Think in layers, color, and cultural references.`,
  'claude-b': `You are Claude Barnett, founder of the Associated Negro Press. You build owned audiences and B2B relationships through newsletters, LinkedIn, and direct channels.`,
  dick: `You are Dick Gregory, comedian and activist. Your live streams and platform content are raw, honest, and make people think AND laugh.`,
}
```

---

## API Route — Chat (`/api/chat`)

```typescript
// POST /api/chat
// Body: { message: string, projectSlug: string, agentId?: string }
// Returns: { agent: string, agentName: string, response: string }

import Anthropic from '@anthropic-ai/sdk'
import { auth } from '@clerk/nextjs/server'
import { routeToAgent } from '@/lib/hermes-router'
import { AGENT_PROMPTS } from '@/lib/agent-prompts'

export async function POST(req: Request) {
  const { userId } = await auth()
  if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { message, projectSlug, agentId } = await req.json()
  const agent = agentId || routeToAgent(message)

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

  // Add project context to every request
  const projectContext = `You are helping with the ${projectSlug} project on the Quik Nation Marketing Hub.`

  const msg = await anthropic.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 300,
    system: `${AGENT_PROMPTS[agent]}\n\nContext: ${projectContext}`,
    messages: [{ role: 'user', content: message }],
  })

  return Response.json({
    agent,
    agentName: AGENT_DISPLAY_NAMES[agent],
    response: msg.content[0].type === 'text' ? msg.content[0].text : '',
  })
}
```

Get `ANTHROPIC_API_KEY` from SSM: `/quik-nation/shared/ANTHROPIC_API_KEY`

---

## Paperclip v0.1 (`<PaperclipBrief />`)

A structured document with four sections:
1. **Campaign Brief** — What are we trying to achieve?
2. **Target Audience** — Who are we talking to?
3. **Key Messages** — What do we need them to feel/know/do?
4. **AI Contributions** — What the agents have suggested (read-only, timestamped)

Each section is a `<textarea>` that saves on blur. The "AI Contributions" section auto-populates when an agent responds to a brief-related query.

**Storage for v0.1:** `localStorage` keyed by `marketing-brief-{projectSlug}`. No backend needed for v0.1. Backend persistence is Phase 2.

When an agent response contains a suggestion or creative direction, a "Save to Brief" button appears under it. Click → appends to the AI Contributions section with agent name + timestamp.

---

## Voice Studio Link

In every project workspace, include a prominent card:

```
🎙️ Voice Studio
Talk to the marketing team by voice.
→ Open Voice Studio (opens develop.quiknation.com/voice in new tab)
```

This is how Mo talks to the team by voice. The voice interface is already being built as Prompt 01.

---

## Design System

Match the Clara voice interface aesthetic:
- Background: `#050505`
- Surface: `#0F0F0F`
- Card: `#151515`
- Border: `#1A1A1A`
- Primary text: `#FFFFFF`
- Secondary text: `#888888`
- Accent (Clara blue): `#7BC8D8`

Fonts: System sans-serif. No custom fonts for v0.1.

Internal project cards: accent border in their project color.
Client cards: gold/amber border (`#F59E0B`) to distinguish client work.

---

## Cloudflare Pages Deploy (`wrangler.toml`)

```toml
name = "quiknation-marketing"
compatibility_date = "2025-01-01"

[env.production]
route = "marketing.quiknation.com/*"

[build]
command = "pnpm build"
cwd = "."
watch_dir = "src"

[site]
bucket = "./.next/static"
```

The actual CF Pages setup is done via the Cloudflare dashboard (same as TrackIt, PGCMC, KLS). Just get the build working and we'll wire CF Pages in the dashboard.

Build command: `next build`
Output directory: `.next`
Node version: 20

---

## Environment Variables Needed

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=   # copy from quiknation frontend-main
CLERK_SECRET_KEY=                    # copy from quiknation backend
ANTHROPIC_API_KEY=                   # from SSM /quik-nation/shared/ANTHROPIC_API_KEY
NEXT_PUBLIC_VOICE_SERVER_URL=https://info-24346--clara-voice-server-voiceserver-fastapi-app.modal.run
NEXT_PUBLIC_QN_VOICE_URL=https://develop.quiknation.com/voice
```

---

## Acceptance Criteria

- [ ] App runs at localhost:3001 (dev) and builds without errors
- [ ] `/` → redirects to `/projects` if authenticated, sign-in if not
- [ ] Project Board shows 7 projects in two sections (Internal / Clients)
- [ ] Clicking a project opens its workspace
- [ ] Agent Panel shows all 11 agents
- [ ] Typing in the chat input and pressing Enter → Hermes routes to correct agent
- [ ] Agent responds in character (using their system prompt)
- [ ] "Save to Brief" button appears on agent responses
- [ ] Brief persists in localStorage per project
- [ ] Voice Studio link present in every workspace
- [ ] All routes Clerk-protected
- [ ] Design matches `#050505` dark theme
- [ ] `pnpm build` succeeds with 0 errors

---

## DO NOT

- Do not install Prisma, Supabase, or any database ORM — localStorage for v0.1
- Do not add analytics, error tracking, or feature flags — YAGNI
- Do not recreate a Notion clone — 4 sections per brief is sufficient
- Do not add mobile hamburger menus — desktop-first for now
- Do not use the existing quiknation project — this is a NEW standalone app

---

## After completing, create a PR to `develop` branch of `imaginationeverywhere/quiknation-marketing`.

PR title: `feat: marketing.quiknation.com v0.1 — AI+human marketing hub`

**Member/Social Intelligence Layer — Features for V1**

# **Member Intelligence Layer**

# **1\. Member Profiles & Directory**

* **Structured profiles —** Name, role, firm, location, LinkedIn. Investment preferences (sectors, stage, check size, geography). Expertise tags — functional, operational, industry. Prior employers. Optional portfolio visibility.

* **Member-controlled privacy —** Each member decides what's visible to other members vs. staff only. Some fields (check size, portfolio) should be opt-in.

* **Directory with filter/search —** Faceted search across all profile fields. Members can find each other by expertise, sector, geography, etc.

* **Network agent (natural language queries) —** Conversational search layer over the directory: "Who knows someone at \[company\]?" / "Who's invested in \[sector\] recently?" / "Who has operating experience in \[domain\]?" / "Who's in NYC next week?" Returns ranked members with a reason for each match.

# **2\. Connecting Members to Deals & Founders**

* **Portfolio view —** A unified view of portfolio companies across the network. Drill into a company to see which members are invested, who's on the board, who the investor contacts are — the starting point for follow-on support, customer intros, and founder outreach.

* **Deal-to-member routing —** Every deal that clears Jamie's screening pipeline runs through a matching engine that surfaces it to the 3–5 members with the best expertise, network, or investment-pattern fit. Replaces the static tech-group distribution model. Matched deals show up in each member's newsfeed.

* **Founder ask routing —** Portfolio founders can submit asks — customer intros, hiring, follow-on capital — and get routed to the right members through the same matching engine. This is the "magic happens" piece.

* **Network graph —** Under-the-hood graph of member ↔ company and member ↔ member connections (employment history, portfolio investments, board seats, co-investments). Powers two-hop intro paths. Doesn't need a flashy visualization in V1 — just has to work.

# **Social Intelligence Layer**

# **3\. Activity Newsfeed**

The landing surface when a member logs in. Automatically pulls updates from across the platform so members see what's happening in the network at a glance — nothing to browse for, no manual curation.

* **Deal activity —** New deals cleared for member review, deals closing soon, recently funded rounds, follow-on activity on existing portfolio companies.

* **Portfolio company updates —** Exits, major raises, new hires, product launches, customer wins — anything surfaced from founder updates or tracked via Carta.

* **Upcoming events —** Member meetings, summits, sector-team sessions, dinners, travel meetups. Members can RSVP directly from the feed.

* **Member milestones —** New members joining, new board seats taken, notable investments made.

* **Support exchange activity —** Open member requests needing responses, and recent fulfillments — both to surface opportunities to help and to make successful connections visible.

* **Personalization —** Feed ranking weighted toward members' sectors, geography, and portfolio companies — not a pure chronological firehose.

# **4\. Member-to-Member Connections**

* **Support exchange —** Members post structured requests — intros, SMEs, service providers, portfolio support. Requests auto-route to members whose profile matches, and also surface in the newsfeed. Responses tracked so we can see what's getting answered.

* **Travel / geography —** Members can flag when they'll be in another city. Powers "who should I meet when I'm in town" queries and surfaces as meetup opportunities in the feed.

* **Contribution signal —** Lightweight way to mark a member as helpful after they step up — a thank-you or acknowledgment. Rolls up quietly for staff view of engagement. No public star rankings.


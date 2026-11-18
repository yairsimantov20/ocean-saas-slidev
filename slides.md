---
theme: ./themes/port
title: Ocean SaaS operator
info: |
  R&D bi-weekly, 10 minutes. Yair Siman Tov.
  How we swapped Argo CD for our own Kubernetes operator under the Ocean SaaS integrations.
author: Yair Siman Tov
colorSchema: light
fonts:
  sans: DM Sans
  mono: Fira Code
  weights: '400,500,600,700'
  provider: none
highlighter: shiki
transition: page-fade
exportFilename: ocean-saas-operator
aspectRatio: 16/9
canvasWidth: 980
defaults:
  layout: stage
layout: cover
footer: light
---

<Sunset />

<Enter :delay="0">

# Ocean SaaS operator

</Enter>

<Enter :delay="0.15">
<Subtitle>How we fired Argo from SaaS integrations</Subtitle>
</Enter>

<Space size="large" />

<Enter :delay="0.3">
<CoverMotif />
</Enter>

<Space size="large" />

<Enter :delay="0.5">
<CoverMeta name="Yair Siman Tov" role="DevOps / Platform" event="R&D bi-weekly · Nov 2026" thanks="Omri Barouch and Hadar Vaknin" />
</Enter>

<!--
Hi, I'm Yair from DevOps / Platform, and this is the story of how we fired Argo from SaaS integrations, in ten minutes. Same integration pods, same customers, nobody had to do anything on their side; we just swapped the thing that tells those pods what to do. Why we did it, the bet we took, what it got us, and the day it bit us. Because yes, there's one of those. And before anything else, thanks to Omri Barouch and Hadar Vaknin, who built and shipped this with me.
-->

---
kicker: 02 · why argo had to go
---

# Argo was doing its best. Its best was <Hl tone="argo">100% CPU</Hl>.

<Stage cols="1fr 1fr 14rem" rows="1fr auto" gap="1rem">
  <Panel label="connect" tone="argo">
    <Stage cols="1.2fr 1fr" gap="1rem">
      <Col justify="center" gap="1.4rem">
        <StatCard value="22.6" unit="min" label="patch p95" tone="argo" flat />
        <StatCard value="4.3" unit="min" label="create p95" flat size="sm" />
      </Col>
      <PairBars :a="5704" a-label="argo apps" :b="3499" b-label="EU integrations" gap-label="zombies" />
    </Stage>
  </Panel>
  <Panel label="platform" tone="argo">
    <Col justify="center" gap="0.9rem">
      <Gauge :value="100" label="argo app-controller cpu" />
      <SinglePod caption="1 pod for all 5,704 apps" />
    </Col>
  </Panel>
  <MemeSlot name="slide-2" caption="“This is fine” dog. Dog = argo app-controller, fire = 100% CPU" />
  <Strip gap="0.5rem">
    <Chip tone="warn">multiple major outages</Chip>
    <Chip tone="argo">chart upgrade ≈ <b class="num">6</b> h on EU</Chip>
    <Chip><b class="num">1</b> change = <b class="num">4</b> repos</Chip>
    <Chip>Argo errors in integration status</Chip>
    <Chip>can't be tested locally</Chip>
  </Strip>
</Stage>

<!--
So why touch something that works? Because it kind of didn't, and two teams felt it from different sides.

On our side, Connect: per the design doc baseline, create p95 was 4.3 minutes, and patch p95 was 22.6 minutes. For a config change. Argo sync errors leaked into the integration status customers saw. And Argo was holding 5,704 apps for 3,499 actual EU integrations, so, lots of zombies. And you couldn't test it in a local environment at all.

On the Platform side, the Argo app-controller was pinned at 100% CPU in March. All 5,704 apps went through a single app-controller pod. We couldn't scale it out to more pods, only give it more resources: we scaled it from 6 to 10 cores and it still spiked. EventBus pods got evicted.

And the P1s: in September 2025 a PATCH with empty Helm params reset config for every SaaS integration, with a multi-day restore. In April the NATS EventBus got wiped and the status pipeline went down. In June an Argo RBAC change took Ocean SaaS CRUD down system-wide. On top of that, one integration change could touch 4 repos owned by 3 teams. And shipping a new integration chart version was slow: at the August kickoff Matan Geva listed that the reconcile of a new Helm chart version takes hours, because Argo was busy with incoming traffic. In EU, a chart upgrade rollout took around 6 hours (my own number from running it). In the October 7 incident some integrations never got the chart update at all, and orphaned ones couldn't be reached by a rollout. Matan Heled said it in March: Argo is hitting bottlenecks, and it's not the first time.

If someone asks how long we ran this on Argo: I don't have a clean start date in the design doc or the October report. We know it began as gitops and later moved to the Argo API, and it was already the system by the November 2024 plan. That's an open check.

(Meme: This is fine.)

-->

---
kicker: 03 · the bet
class: fill-meme
---

<Stage cols="1.3fr 1fr" gap="1.6rem">
  <Col justify="center" gap="1.6rem">
    <h1>Shard Argo, or write our own? We picked <Hl>the scary one</Hl>.</h1>
    <VTimeline :items="[
      { date: 'Nov 2024', label: 'Ocean SaaS 2.0 plan', blame: 'writing an ocean k8s controller might be a nice idea', tone: 'neutral' },
      { date: 'May 31, 2026', label: 'Shard Argo vs a purpose-built controller', tone: 'argo' },
      { date: 'Jun 1 → Aug 3, 2026', label: 'Proposal → kickoff', tone: 'op' },
    ]" />
  </Col>
  <MemeReveal name="slide-3" caption="Boardroom suggestion: “write our own operator” → out the window → “…maybe we should do it”" />
</Stage>

<!--
Funny thing: this idea wasn't new. Back in November 2024, a Notion plan for Ocean SaaS 2.0 ended with the line "writing an ocean k8s controller might be a nice idea." In February 2025 we benchmarked Argo setups, App-of-Apps, flat apps and plain Helm, but every option stayed close to Argo.

Fast forward to the end of May this year. Platform suggested sharding Argo for Q3, which is a totally reasonable fix. I pushed for a purpose-built controller instead, and wrote the proposal on June 1.

My argument: sharding fixes the controller CPU ceiling. But look at what actually paged us. Config stored as Helm params, the Events and NATS status pipeline, and an RBAC override. Sharding doesn't touch any of those.

The pushback was real, and fair. It's a big time investment, it needs solid Go, and the rollout and long-term maintenance looked scary. The plan was one senior Go engineer for about 15 weeks. We decided to go for it, and kicked off on August 3.

(Meme: Two buttons.)

Note: the May 31 discussion and the pushback come from a private group DM. Paraphrase only, no names, no quotes.
-->

---
kicker: 04 · the idea
---

# Argo's integration jobs, now <Hl>one operator</Hl>.

<Stage>
  <IdeaFlow />
</Stage>

<!--
So the idea, simply. Everything Argo was doing for a single integration — creating the app, syncing the chart, reconciling drift, deleting and cleaning up, reporting status, rolling chart bumps — all of that now lives in one operator. integ-service writes an OceanIntegration CR, that's the desired state, one per integration. The operator watches it and reconciles until the cluster matches: observe, diff, apply. Same integration pods. We just put those jobs in one place. Org infrastructure, Layer A, is still on Argo.
-->

---
kicker: 05 · what we built
---

# Same pods, new brain: <Hl tone="argo">10 hops</Hl> → <Hl>5</Hl>

<Stage rows="1fr auto" gap="0.9rem">
  <HopDiagram />
  <Strip gap="0.5rem">
    <Chip tone="op" mono>OceanIntegration CR</Chip>
    <Chip tone="op">Go controller, sharded</Chip>
    <Chip tone="op">status straight to Kafka</Chip>
    <Chip tone="ghost">no EventSource · NATS · Sensor</Chip>
  </Strip>
</Stage>

<!--
Here's the whole idea in one picture. Before: integ-service called the Argo REST API, which created an Argo Application. A single controller pod reconciled on a 30-second loop and repo-server rendered the chart. Then status went through Argo notifications, an EventSource, NATS and a Sensor before it finally reached Kafka. Ten hops.

After: integ-service calls the operator's HTTP API, which writes an OceanIntegration custom resource. The reconciler watches it, applies the chart with server-side apply, and produces status straight to Kafka. Five hops. Config is a validated CR spec instead of Helm params, so the empty-PATCH disaster can't happen again. It's sharded across StatefulSet pods, so there's no single-controller ceiling. And the integration pods didn't change; only the control plane did.
-->

---
kicker: 06 · how it shipped
---

# Swapped under <Hl>5,373</Hl> live integrations

<Stage rows="auto 1fr" gap="2rem">
  <TimelineStrip :items="[
    { date: 'Aug 3', label: 'Kickoff', tone: 'op' },
    { date: 'Aug 24', label: 'Merged to main', tone: 'op' },
    { date: 'Sep 2', label: 'Live in prod', mono: 'first install: 16s', tone: 'op' },
    { date: 'Oct 26', label: 'Full compatibility with the old system features', tone: 'op' },
    { date: 'Oct 28', label: 'Bulk cutover done', tone: 'op', big: true },
  ]" />
  <Stage cols="1.35fr 1fr 1fr 1.3fr 11rem" rows="14rem" gap="0.9rem" align="stretch">
    <StatCard value="4,400" label="EU migrated" tone="op" size="lg" />
    <StatCard value="973" label="US migrated" tone="op" size="lg" />
    <StatCard value="0" label="downtime" tone="op" size="lg" />
    <StatCard value="2 × ~12" label="engineers × weeks" sub="plan was 1 × 15" />
    <MemeSlot name="slide-5" height="14rem" caption="Changing a tire while driving, or “Trade offer: 5,704 Argo apps for one CRD”" />
  </Stage>
</Stage>

<!--
Omri and I built it. We kicked off August 3 and merged to main August 24. It went live in prod on September 2 with nothing migrated, and the first Jira install took 16 seconds. Then one org, then Porternal, and full compatibility with the old system's features on October 26. Hadar led the bulk cutover, and by October 28 we had 4,400 EU and 973 US integrations moved, with zero downtime. About 12 weeks with two people, against a plan of one engineer for 15.

(Meme: Tire change / trade offer.)
-->

---
kicker: 07 · results · EU prod
---

# The numbers went <Hl>brrr</Hl>

<Stage cols="1.55fr 1fr" rows="1fr auto" gap="1rem 1.6rem">
  <Col justify="center">
    <BarRace :rows="[
      { label: 'Update', note: 'avg', before: 19, after: 2, unit: 's' },
      { label: 'Helm apply', note: 'avg', before: 5.4, after: 0.9, unit: 's' },
    ]" />
  </Col>
  <Col gap="0.6rem" justify="center">
    <StatCard value="≈21s" label="create → running" sub="tuned Argo: 45–70s" tone="op" size="sm" />
    <StatCard value="≈1.2s" label="delete" sub="Argo: 10–25s" tone="op" size="sm" />
    <StatCard value="100%" label="apply success" sub="last 3 days of the report" tone="op" size="sm" />
  </Col>
  <Strip cols="1fr 1fr 1fr 1fr 1fr 10.5rem" gap="0.65rem" align="stretch">
    <StatCard value="6.2 → 2.2" label="argo controller vCPU" size="sm" />
    <StatCard value="≈0.15" label="operator vCPU" sub="five EU shards" tone="op" size="sm" />
    <StatCard value="10 → 5" label="control-plane hops" tone="op" size="sm" />
    <StatCard value="16s" label="first install" sub="Sep 2, in prod" tone="op" size="sm" />
    <StatCard value="0" label="downtime" sub="cutover" tone="op" size="sm" />
    <MemeSlot name="slide-6" height="100%" compact caption="“Stonks” guy: small stonks" />
  </Strip>
</Stage>

<!--
OK, the fun part. All of this is EU prod, from the report I posted on October 29.

Update went from about 19 seconds on average to about 2. The Helm apply step itself went from about 5.4 seconds to 0.9 on average. Create to Running is about 21 seconds; with a tuned Argo that was 45 to 70 seconds, and 4 to 5 minutes when Argo was overloaded. Delete went from 10 to 25 seconds down to about 1.2. Apply success over the last three days of the report was 100%.

For Platform: the Argo app-controller dropped from about 6.2 vCPU to about 2.2, because the integration apps left it. The operator itself is about 0.15 vCPU for five EU shards. The path from a change to a running workload went from ten hops to five. The first Jira install in prod, on September 2, took 16 seconds. And the bulk cutover itself had zero downtime. 16 seconds and zero downtime are also on the shipping slide; they're here because they're results, not just dates.

If someone asks about money: it's small so far. The real savings come later, from right-sizing the Argo that's left and removing Argo Events and Workflows.

When Matan Geva saw these numbers he wrote "I expected diffs in performance, but this is insane."
-->

---
kicker: 08 · what owning it costs
---

# With great power comes great <Hl tone="warn">on-call</Hl>

<Stage cols="1.3fr 1fr" gap="1.8rem">
  <Col gap="1.4rem" justify="center">
    <Panel tone="warn" pad="1.1rem 1.3rem 0.9rem">
      <IncidentBar date="Nov 10" title="Fleet-wide reconcile + Helm package race condition" start="11:11" end="14:11" from="10:21" to="15:01" duration="CRUD down · EU + US" end-mark="concurrency → 1" zone="israel time · permanent fix in prod" />
    </Panel>
    <Group title="what we gave up" row gap="0.45rem">
      <Chip tone="argo">Argo UI · Support's view</Chip>
      <Chip tone="argo">generic open source, internals not ours</Chip>
      <Chip tone="argo">the blast radius is ours now</Chip>
    </Group>
  </Col>
  <MemeSlot name="slide-7" caption="Anakin and Padmé: “We own the control plane now.” / “…so it won't break, right?” / … / “Right?”" />
</Stage>

<!--
Now the part where we own it. On November 10 we did the first chart version bump since the cutover. The operator reconciled every integration at once and hit a race in the Go Helm package's dependency rendering. Create, update and delete were unavailable in EU and US from about 11:11 to 14:11.

The mitigation was dropping worker concurrency to 1. The permanent fix is now in prod. Haim asked the right question in the incident channel: why didn't testing catch this? We're still working on that answer.

(Meme: Anakin and Padmé.)

The bigger lesson is that a chart bump is now one step that touches the whole fleet, so that blast radius is ours to manage.

Other things we gave up compared with Argo: the Argo UI, and with it a view Support relied on. They asked where to see integration resources now.

And with Argo we never had to manage what was going on under the hood. It was generic open source, so the internals weren't our problem. Now they are.

And on-call and upgrades are on us, which is exactly the maintenance worry raised back in June. I'd still make this trade, but it is a trade.

If someone wants the other side of the scorecard: we gained a tool built for a multi-tenant lifecycle instead of service GitOps, CRD validation that blocks the empty-PATCH outage class, and a delete that actually removes everything, so no zombie apps.

-->

---
kicker: 09 · questions
---

<Stage rows="auto 1fr" gap="1.4rem">
  <Display>Questions<Hl>?</Hl></Display>
  <Col justify="center" gap="1.8rem">
    <Group title="built and shipped by" row gap="0.5rem">
      <Chip tone="op">Omri Barouch</Chip>
      <Chip tone="op">Hadar Vaknin</Chip>
      <Chip tone="op">Yair Siman Tov</Chip>
      <Chip tone="op">Matan Geva</Chip>
      <Chip tone="op">Matan Heled</Chip>
    </Group>
    <QuoteStrip by="Mor Paz" where="#appreciation">This started as a POC for a problem we have been facing for a long time, and eventually we decided to go for it, and the team delivered in spectacular fashion!</QuoteStrip>
  </Col>
</Stage>

<!--
Built and shipped by Omri Barouch, Hadar Vaknin, me, Matan Geva and Matan Heled. Mor's #appreciation post is public, so it's fine on the slide.

Happy to take questions.
-->

---
kicker: fin
---

# Thanks for listening

<ThanksPhoto class="body" src="/memes/thanks-dog.jpg" alt="A golden retriever in a blue donut cone" />

<!--
That's the talk. This is my dog, currently in a cone. Happy to linger on any last questions.
-->

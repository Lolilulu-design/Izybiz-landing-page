---
title: "Fintech technical due diligence: what the code reveals"
description: "Fintech technical due diligence: what code maturity, missing integrations, and vendor lock-in reveal before an acquisition. Learn the 8-point TDD checklist."
pubDate: 2021-07-10
lang: "en"
translationKey: "2021-07-10"
---

The demo works. The interface is clean. The founders can walk you through their dashboard in two minutes flat. The backend runs. Transactions go through.

And yet the technology isn't ready for commercial deployment.

That's exactly the situation fintech technical due diligence exists for. Not to confirm that something works in a demo — but to answer a different question: can this technology function **at scale, in a regulated environment, with a real user base, in an infrastructure-constrained market?**

This question arises particularly in the fintech sector in Sub-Saharan Africa, where several regional operators are considering acquiring or integrating existing neobanking platforms rather than building from scratch. I conducted this type of evaluation on a neobanking platform from a European vendor on behalf of a potential regional acquirer. Here's what the TDD revealed — and what it teaches about the method.

---

## What "50% complete" actually means

Any product maturity assessment starts with a component-by-component analysis. On the platform evaluated, completion rates by module were approximately: backend at 74%, iOS app at 48%, Android app at 39%, POS system at 68%, back-office at 42%.

Skimming those numbers, it looks like a platform roughly halfway through. Read them operationally, and it's a platform where the components most critical to the end user are the least advanced.

The mobile app is the primary touchpoint with end customers in a market where over 80% of financial transactions happen on mobile. An Android app at 39% completion is not an app you can deploy in six months. It's an app whose functional scope is less than half implemented.

The lesson: average completion rates hide critical asymmetries. A solid backend with incomplete interfaces is technically coherent but commercially stalled. [This type of component-by-component maturity analysis is standard in our performance management assignments](https://izybiz.fr/pilotage-performance) ahead of any acquisition or integration decision.

---

## Missing integrations: the blind spot in every assessment

The second problem with the evaluated platform was even more structural: three critical integrations were absent.

The first: integration with the local interbank settlement system. Without it, the platform cannot process transfers to other banks. It can handle transactions in a closed loop — not in the real financial ecosystem.

The second: SWIFT integration for international payments. A direct strategic constraint for any deployment targeting merchants with suppliers outside the country.

The third: integration with a card processor for debit card issuance. No cards issued means no access to merchant payment terminals, no interoperability with local Visa/Mastercard networks.

These three integrations are not desirable features. They are legal and operational prerequisites for any neobank activity. Their absence means the demo platform is an internal payment system, not a deployable neobank.

**What you measure in a TDD isn't the features delivered. It's the distance between the current state and the commercially deployable state. Those two metrics can be very different.**

> **Evaluating a fintech acquisition or integrating a digital asset into your offering?** A rigorous technical due diligence takes 4 to 6 weeks and can save years of delay. [Let's discuss your situation](https://izybiz.fr/contact).

---

## Code quality: what can and can't be fixed

Technical due diligence also analyses the intrinsic quality of the code, independent of functional scope. This dimension is often underestimated by non-technical acquirers.

On the evaluated platform, the picture was mixed. The Java backend and Android modules showed solid architecture, consistent patterns, and satisfactory test coverage. This was code written by engineers who knew what they were doing.

The iOS app was less coherent. Less unified architecture, lower test coverage, visible technical debt across several modules. Not code to rewrite from scratch — but code that would require significant refactoring investment before it could evolve at pace.

This asymmetry is typical of projects where teams aren't equally sized per platform, or where iOS was developed later under schedule pressure. The problem with iOS technical debt in an accelerated launch context: every feature added on a fragile base increases regression risk and slows delivery.

The lesson: code quality is an economic variable. It determines the cost and speed of future development. Excellent code at 50% completion is worth more than mediocre code at 80%.

---

## Vendor lock-in risk in African infrastructure

The platform used an architecture tightly coupled to AWS, with managed services integrated into the application logic itself — not just the infrastructure layer.

In a European deployment context with stable cloud infrastructure, that's an acceptable technology choice. In an African context — where connectivity can be constrained, where AWS costs in dollars weigh differently in a local-currency business model, and where some regulators impose data residency requirements — this is a strategic risk.

Strong coupling to a cloud provider means that migrating to a hybrid architecture or local infrastructure requires a partial rewrite, not just a configuration change. The cost of that risk isn't visible in a demo. It's visible in AWS contracts, service configurations, and API call patterns in the code.

The platform also used a private blockchain based on MultiChain technology for its transaction and digital asset registry. That's a technically defensible architecture decision. But it requires the acquirer to understand the governance implications: who controls the nodes? What's the continuity plan if the original vendor disappears? How does this registry interface with local regulatory systems?

These questions come up after the demo. They never come up during it.

---

## What the roadmap (or its absence) says about product governance

During the assignment, a request was made early on: the product roadmap for the next 12 months. It was never provided.

This isn't anecdotal. A platform without a roadmap is a platform without a steering mechanism. It can mean several things: a product team that reacts to requests without long-term vision, a commercial smoke screen on the vendor's part, or an organisation where technology and business don't speak the same language.

In all three cases, it's an operational risk signal for the acquirer. What you're buying isn't just the current code — it's the team's capacity to continue evolving that code according to a coherent plan.

The absence of a roadmap in a due diligence context indicates either that the roadmap doesn't exist, or that the vendor doesn't want to share it. In both cases, the acquirer must take a conservative assumption on the remaining gap to close.

---

## What technical due diligence reveals: build, buy, or partner?

Every technical due diligence must lead to a decision. In this case, three options were on the table.

**Acquire and complete**: Continue development with the existing teams, targeting a commercial launch. The technical estimate was 12 additional months and 6 additional developers to close the functional gap and fill the missing integrations. Total cost exceeds what the original pricing model anticipated.

**Build from scratch**: Start on a greenfield platform, potentially using API banking components available on the market (players like [Mambu](https://www.mambu.com) or local BaaS providers). Minimum 18 to 24 months — but with a functional scope and architecture adapted from day one to the target market.

**Partner with an existing operator**: In some African markets, deploying a neobanking wallet is faster through a partnership with an existing mobile money operator than by building independent infrastructure. This is a trade-off between control and speed. It's the kind of decision we help structure through our [fintech platform evaluation assignments](https://izybiz.fr/management-de-transition).

| Option | Estimated timeline | Control | Initial cost |
|---|---|---|---|
| Acquire and complete | 12+ months | Full | High |
| Build from scratch | 18–24 months | Full | Very high |
| Partner with operator | 3–6 months | Partial | Moderate |

The TDD doesn't prescribe which option to choose. It gives the decision-maker the data to choose with open eyes.

---

## The 8 checkpoints of a rigorous fintech TDD

A well-conducted fintech technical due diligence systematically covers eight dimensions. Here they are in order of impact on the acquisition decision.

1. **Completion rate by component** — not a global rate, but component by component (backend, iOS mobile, Android mobile, POS, back-office, partner API). The asymmetry between components is often more revealing than the average.

2. **Regulatory integrations present and missing** — which connections exist with the local banking system, card networks, regional interbank systems? This is the list of legal prerequisites for the activity, not optional features.

3. **Code quality and architecture** — code review by module, test coverage, technical debt, pattern consistency. To be done by engineers, not generalist consultants.

4. **Dependencies and vendor lock-in** — cloud providers, proprietary libraries, third-party services without alternatives, licence constraints. A product tightly coupled to AWS has different value in a market with mature cloud infrastructure versus a market with constrained connectivity.

5. **Security and GDPR/local regulatory compliance** — personal data management, encryption, audit logs, compliance with local data residency requirements.

6. **Product governance** — roadmap available and realistic, documented release process, prioritised backlog, incident management practices. The absence of these elements predicts future delivery problems as reliably as any bug.

7. **Architecture scalability** — can the system handle 10x current load? What are the identified bottlenecks? What infrastructure investments are required to scale?

8. **Team and retention** — who are the critical code contributors? What is their contractual situation? Software whose two key developers won't be around six months post-acquisition is high-risk software.

This checklist isn't exhaustive. It covers the questions that change an acquisition decision. It's the type of due diligence we structure in our [technology asset evaluation assignments](https://izybiz.fr/management-de-transition), ahead of the most consequential decisions.

---

## What fintech TDD consistently reveals

Three findings recur across fintech platform technical due diligences:

**The completion-to-deployability gap is always wider than stated.** Founders honestly assess their completion rate against their spec. They assess less honestly the distance between the spec and commercial deployability — particularly on regulatory integrations and local infrastructure constraints.

**Teams building for a European market are not building for Africa.** That's not a flaw — it's reality. Infrastructure constraints, local regulation, local-currency business models, mobile-first user distributions with different user profiles: all of this requires adjustments that neither the code nor the team has anticipated.

**Product governance is readable in documentation quality.** No roadmap, incomplete technical docs, no regression tests: these are product governance indicators, not just technical gaps. They predict the ability to deliver reliably over time.

Fintech technical due diligence isn't an academic exercise. It's an investment decision. And like any investment decision, it's worth what it actually measures.

**Managing a technology acquisition or fintech platform evaluation? [Get in touch](https://izybiz.fr/contact) to structure the approach.**

---

*This analysis is based on the experience of conducting a full technical due diligence on a neobanking platform as part of an acquisition process for a regional operator. Completion data and estimates have been made generic. Reference sources: [GSMA Mobile Money Report](https://www.gsma.com/solutions-and-impact/connectivity-for-good/mobile-for-development/gsma_resources/state-of-the-industry-report-on-mobile-money/), [World Bank Global Findex Database](https://www.worldbank.org/en/programs/globalfindex), [BCEAO](https://www.bceao.int).*

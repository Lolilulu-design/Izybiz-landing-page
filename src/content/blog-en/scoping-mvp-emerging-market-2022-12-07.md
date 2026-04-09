---
title: "Scoping an MVP in emerging markets: what we'd do differently"
description: "Scoping an MVP in an emerging market is harder than it looks: scope traps, external dependencies, and the metrics that matter. Learn how to get it right."
pubDate: 2022-12-07
lang: "en"
translationKey: "2022-12-07"
---

There's a line you hear often in product launch projects: "We'll figure it out in production." It's usually the line that precedes six months of delays and a doubled budget.

Scoping an MVP — a minimum viable product — sounds simple in theory. You define the minimal scope to test your central hypothesis. You ship fast. You learn. You adjust.

In practice, on a super-app project in an emerging market, "scoping the MVP" is one of the hardest decisions in the entire project. Because the market is less predictable. Because partnerships constrain the scope. Because the regulatory and technical dependencies chain together in ways nobody fully anticipates.

Here's what I'd have done differently when scoping an MVP for a social and financial platform in West Africa, with eighteen months of execution behind me. This type of [digital transformation interim management assignment](https://izybiz.fr/management-de-transition) is where the most durable product lessons come from. The full context of this programme is described in the article on [launching a super app in West Africa](/en/blog/launching-super-app-west-africa).

---

## The "full features" MVP trap

The first problem with our MVP scope was that it wasn't really an MVP.

On paper, the list of "minimum" features included: an integrated mobile payment service, a messaging layer, an e-commerce catalogue, a microcredit module, a merchant interface, a delivery interface, and a multi-channel notification system (push, SMS, USSD).

That's what you call an "MVP" when you've over-presented the project to investors before deciding what was actually testable first.

The real MVP question isn't "what features are needed to launch?" It's: **what is the central hypothesis of the project, and what is the minimal scope to validate or invalidate it?**

In our case, the central hypothesis was: "A telecom operator's users will adopt a mobile payment and messaging service if access to the app is zero-rated." Everything else — the e-commerce modules, the delivery interface — was secondary to that hypothesis.

Had we framed the question that way from the start, the MVP would have looked radically different: functional mobile payment service, basic messaging, simplified e-commerce catalogue, no microcredit module. Deliverable in 3 months, not 9.

---

## What "external dependencies" actually means

The second problem was underestimating the weight of external dependencies on scope definition.

An MVP for a wallet-enabled marketplace in West Africa doesn't just depend on your development team. It depends on at least four external actors whose timelines are not under your control.

**The telecom operator.** Zero-rating — free access to the app without consuming the user's data allowance — is one of the model's major competitive advantages. But activating it requires the operator to complete the technical integration on their end. In our case, that took more than twice the time estimated at the start of the project.

**The partner bank.** A wallet requires Central Bank approval. Approval requires a partnership with a local bank. The local bank imposes its own KYC timelines, its own merchant validation processes, and its own documentation requirements. These timelines are incompressible.

**The merchants.** You don't launch a marketplace without merchants. Recruiting, training, and onboarding an initial merchant base — even a small one — takes field time that no product planning document models.

**The delivery partners.** If the model includes delivery, logistics partners have their own integration constraints: tracking, delivery confirmation, return management.

The lesson: MVP scope must be defined not by what you want to test, but by what you can deliver given real dependencies. Any feature that depends on an external actor with uncertain timelines must either be removed from the MVP or treated as a documented critical risk.

---

## Scope creep — and why it's often your own fault

There's a form of scope creep that gets less attention: the kind you create yourself.

In a super-app project, the product serves several stakeholders simultaneously — the telecom operator who wants to differentiate its offering, the merchants who want a simple back-office, the customers who want a smooth experience, the delivery providers who want an order management tool. Each stakeholder has legitimate needs. And each one tends to believe their needs are in the MVP scope.

The temptation, when you're CEO and want to maintain partner confidence, is to say yes to each request. "We can integrate that." "We'll add it before launch." "It won't take long to build."

These phrases kill projects. Not all at once. Through accumulation.

What works: **a signed scope document** with an explicit list of what's in the MVP and what's in the backlog. Not a shared Google Doc in read-only mode. A document each partner has formally validated. That formality creates a reference point when requests come in — and they always do.

> **Scoping an MVP right now and feeling the scope drift?** An outside perspective on the initial framing can prevent months of delay. [Let's talk](https://izybiz.fr/contact).

---

## Product prioritization in emerging markets: what's different

On a mature market, product prioritization follows established frameworks — MoSCoW, RICE, Kano. You assess user value, development effort, and make trade-offs.

In an emerging market, there's a fourth dimension these frameworks don't account for: **infrastructure constraints**. Some features can't be delivered not because they're complex to build, but because the local infrastructure can't support them.

A few concrete examples from our project:

- **Push notifications** assume users have a smartphone with a stable connection. On a user base where a significant portion uses feature phones, SMS remains the only reliable channel. Building a rich push notification system first means optimizing for the minority segment.

- **Photo catalogues** assume enough data bandwidth to load quality images. On unstable 2G or 3G connections, a text-first catalogue often outperforms a visual one.

- **In-app payments** assume end-to-end functional mobile money integration. While waiting for that integration, a cash-on-delivery mechanism can let you test the ordering model without being blocked on the payment layer.

The right prioritization principle in emerging markets: **start with what works on the most constrained infrastructure**, and progressively unlock richer features as infrastructure improves and the user base becomes better understood.

---

## What to measure from day one — and what we should have measured

We had defined launch KPIs. Number of registered users, active merchants, transaction volume. Classic metrics.

What we should have measured from day one: **the behaviours that validate or invalidate the central hypothesis**.

If the hypothesis is "users adopt a mobile money and messaging platform when access is zero-rated," the metrics that matter are:
- App open rate (proxy for the zero-rating advantage)
- Mobile payment activation rate (adoption of the product's core)
- Messaging frequency (test of the alternative to dominant apps)
- Messaging → financial transaction conversion rate (validation of the integrated logic)

These metrics are different from transaction volume or registered user count. They measure the behaviour the model is trying to create — not the volume it generates once established.

An MVP without instrumentation that measures the central hypothesis isn't an MVP. It's a launch.

---

## The team structure that enables fast learning

An MVP only has value if the organisation can extract learning from it and act fast.

In our organisation, the learning-decision-execution loop was too long. Field data reached the product teams in Europe with a multi-day lag. Product adjustment decisions went through a validation process involving several stakeholders. Sprint cycles were two weeks.

What an MVP team in an emerging market needs to be able to do:
- **Collect field feedback the same day** — not via a centralised dashboard, but through direct conversations between product owners and local teams.
- **Decide on an adjustment within 48 hours** — not waiting for the next sprint planning session.
- **Ship a critical fix within a week** — not a two-week standard cycle.

This requires a tight team with clear roles, a product owner with the authority to decide without systematic escalation, and a development team that can prioritise corrections without breaking its base rhythm. This is precisely the configuration that a [scale-up and industrialisation assignment](https://izybiz.fr/scale-up-industrialisation) enables: clear processes, an autonomous team, leadership that can decide fast.

| What we did | What we'd do again |
|---|---|
| "Complete" MVP scope | Scope limited to the central hypothesis |
| Undocumented external dependencies | Dependencies tracked as critical risks |
| Volume KPIs | Behavioural KPIs tied to the hypothesis |
| Two-week feedback cycle | Daily field feedback loop |
| Informal partner validation | Formally signed scope document |

---

## What an MVP actually reveals

A well-scoped MVP doesn't reveal whether your product is good. It reveals whether your hypothesis about the user is correct.

That's an important distinction. A product can be technically excellent and fail because the original hypothesis was wrong. A product can be technically imperfect and succeed because it solves exactly the right problem.

In emerging markets, hypotheses are harder to validate upfront because market data is scarcer, user behaviours are less documented, and infrastructure constraints are less predictable. That's precisely why the MVP must be minimal — so the cost of a wrong hypothesis is as low as possible.

The good news: emerging markets are more forgiving of imperfect products than mature markets, provided you're present, listening, and iterating fast. Technology doesn't make the difference. Learning velocity does.

This logic applies beyond emerging markets. Any environment under construction — a sector in transformation, an organisation adopting a new operating model, a B2B market without established reference points — demands the same posture: clear hypothesis, minimal scope, fast learning loop.

**Launching a digital product in an emerging or complex market and need an operational framework? [Get in touch](https://izybiz.fr/contact).**

---

*Account based on the scoping and management of an MVP for a social and financial platform for a regional operator in West Africa.*

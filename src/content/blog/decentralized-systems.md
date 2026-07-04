---
title: "Decentralized Systems and Individual Agency"
description: "Centralized platforms extract value and erode agency. Here's why I believe open, decentralized systems are both a technical and moral imperative — and what that means for how I build software."
pubDate: 2026-02-20
tags: ["Open Source"]
readingTime: 6
featured: false
---

## The Problem with Platforms

Every platform starts with a promise: we'll handle the hard parts so you can focus on what matters. And for a while, they deliver on that promise.

Then the economics kick in.

Once a platform achieves sufficient lock-in, the calculus shifts. Monetization intensifies. APIs get restricted. Data portability disappears. The user — who once benefited — becomes the product, or at minimum the captive.

This isn't a conspiracy. It's the structural logic of centralized systems. When one entity controls the infrastructure and the data, they will eventually optimize for themselves.

## What Decentralization Actually Means

Decentralization isn't anarchy. It's not about removing coordination — it's about removing *concentrated control*.

A decentralized system distributes three things:

1. **Data ownership** — users control their data, not platforms
2. **Computation** — no single party controls execution
3. **Governance** — rules evolve through consensus, not executive fiat

Open source is the most practical expression of this. When the code is public and forkable, no company can unilaterally remove your ability to run it. The governance model shifts from "trust the vendor" to "verify the code."

## Why This Shapes How I Build

I try to apply these principles concretely:

**Prefer open standards over proprietary protocols.** REST over vendor-specific APIs. OpenID Connect over platform-specific auth. Standard container images over locked runtime environments.

**Expose data in portable formats.** If your users can't export their data in a format they can take elsewhere, you've built a trap, not a tool.

**Write software that works offline or self-hosted.** Depending on a single provider's uptime — or continued goodwill — is a fragility you're choosing.

## The Practical Trade-offs

I'm not naive about the trade-offs. Self-hosted systems require operational overhead. Open protocols move slower than proprietary ones. Decentralization has real costs.

But those costs are often one-time. The costs of centralization — vendor lock-in, data loss, platform shutdowns — compound over time and strike at the worst moments.

## Conclusion

The software I find most worth building is software that empowers users to act independently of any single provider — including me.

That's not altruism. It's an engineering principle: systems that maximize individual agency are more resilient, more composable, and more honest about what they are.

Build things that outlast your company.

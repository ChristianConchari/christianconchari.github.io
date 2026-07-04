---
title: "Why I'm Learning Rust: A Software Architect's Perspective"
description: "After years of Python and TypeScript, I finally took the plunge into Rust. Here's what I've learned about memory safety, performance, and why it's changed how I think about systems design."
pubDate: 2026-03-28
tags: ["Rust"]
readingTime: 5
featured: false
---

## Introduction

I've spent the last several years writing Python for machine learning pipelines and TypeScript for full-stack applications. Both are expressive, productive languages with mature ecosystems. So why, at this point in my career, am I adding Rust to the mix?

The honest answer: because my production systems forced me to.

## The Problem with "Good Enough"

When you're deploying ML models at scale, latency is money. A Python FastAPI endpoint that takes 40ms to serve a prediction might seem acceptable in staging. In production, behind a load balancer serving thousands of concurrent requests, that 40ms compounds into real user pain — and real infrastructure cost.

I tried the usual paths: async everywhere, uvicorn workers, Redis caching. They helped. But I kept hitting a ceiling that was fundamentally about the runtime, not the code.

## What Rust Actually Teaches You

The ownership model isn't just a memory management strategy — it's a way of thinking about data flow. When the compiler forces you to reason about who *owns* a piece of data and who merely *borrows* it, you start writing code that's clearer about its intent.

```rust
fn process_tensor(data: &[f32]) -> f32 {
    data.iter().sum::<f32>() / data.len() as f32
}
```

That `&[f32]` — a borrowed slice — tells you everything: this function reads data, doesn't own it, can't free it. No documentation needed.

Compare that to Python, where a function signature like `def process(data)` says nothing about ownership, mutability, or lifetime.

## 2. The Performance Dividend

Rewriting a hot-path image preprocessing step from Python (with NumPy) to Rust dropped latency from ~18ms to ~1.2ms on the same hardware. That's not a micro-optimization — that's a different category of system.

The Rust version didn't require any clever algorithmic changes. Just removing interpreter overhead and GC pauses was enough.

## 3. Fearless Concurrency

Rust's type system makes data races a compile-time error. When I'm parallelizing across CPU cores with `rayon`, I know at compile time that my code is thread-safe. That confidence is worth a lot when you're debugging production incidents at 2am.

## Where I'm Applying It

I'm not rewriting everything in Rust — that's a trap. Instead, I'm being surgical:

- **Model inference hot paths** — where Python overhead is measurable
- **Data ingestion workers** — high-throughput pipelines where GC pauses hurt
- **CLI tooling** — where fast startup and single-binary deployment are valuable

The FastAPI + Python layer stays for orchestration, auth, and business logic where developer velocity matters more than nanoseconds.

## Conclusion

Learning Rust hasn't made me a better Rust programmer as much as it's made me a better systems thinker. The discipline it imposes — about ownership, lifetimes, and explicit error handling — bleeds back into how I write Python and TypeScript. That's the real return on the investment.

If you're an architect who thinks performance is "someone else's problem," I'd challenge you to profile one of your hot paths. You might be surprised what you find.

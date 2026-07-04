---
title: "GraphQL vs REST: When to Choose What"
description: "Both GraphQL and REST are good APIs. The question is which one fits your problem. After building both at scale, here's the framework I use to decide."
pubDate: 2026-01-15
tags: ["Architecture"]
readingTime: 7
featured: false
---

## Introduction

The GraphQL vs REST debate tends to generate more heat than light. Advocates on both sides talk past each other because they're usually solving different problems.

After building REST APIs that accumulated hundreds of endpoints and GraphQL schemas that became impossible to reason about, I've landed on a more nuanced position: the choice is almost never about the technology. It's about the shape of your data access patterns.

## When REST Wins

REST shines when your resource model is stable and your clients have predictable, well-defined access patterns.

**Public APIs** are the clearest case. If you're exposing an API to third-party developers, REST's predictability is a feature. Developers can reason about it without tooling. It caches naturally. It's easy to version. The Stripe API and GitHub API are REST for good reason.

**Simple CRUD services** benefit from REST's natural mapping to HTTP verbs. When your operations map cleanly to GET/POST/PUT/DELETE, fighting that convention is waste.

**High-throughput services** where caching matters: HTTP-level caching for GET requests is trivial with REST and complex with GraphQL. If you're serving millions of similar read requests, that matters.

## When GraphQL Wins

GraphQL earns its complexity when your clients have *heterogeneous data needs* served by the same underlying data graph.

**Product UIs with multiple views** are the classic case. Your feed page, profile page, and notification dropdown all need different slices of the same data. With REST, you either build bespoke endpoints for each view (tight coupling) or over-fetch generic endpoints (bandwidth waste). GraphQL lets clients declare exactly what they need.

**Federated data across services** is where GraphQL federation (Apollo or Hive) genuinely shines. Rather than having a BFF (Backend for Frontend) that aggregates multiple service calls, you compose a unified schema that clients query as if it were one service.

```graphql
query FeedPage {
  viewer {
    name
    avatar
    feed(first: 20) {
      edges {
        node {
          title
          author { name }
          publishedAt
        }
      }
    }
  }
}
```

**Rapid product iteration** where the frontend team can't wait for new API endpoints. With GraphQL, frontend engineers can compose new queries from existing schema types without backend changes — as long as the data is in the graph.

## The Hidden Costs of GraphQL

GraphQL's flexibility is real. So is its complexity:

- **N+1 query problems** will bite you in production if you don't implement DataLoader batching from the start
- **Schema governance** becomes critical at scale — without it, schemas drift into unmaintainable complexity
- **Authorization at the field level** is harder to reason about than resource-level REST auth
- **Caching** requires careful design (persisted queries, CDN integration)

None of these are dealbreakers, but they're costs you're choosing. Make sure the benefits are proportional.

## My Decision Framework

1. **Who are the clients?** Third-party developers → REST. Internal product teams → GraphQL is worth evaluating.
2. **How heterogeneous are data needs?** Uniform → REST. Diverse → GraphQL.
3. **What's your team's operational maturity?** Low → start with REST. High → GraphQL's complexity is manageable.
4. **Do you need caching at the network layer?** Yes → REST. No → GraphQL is fine.

## Conclusion

GraphQL isn't REST's replacement — it's a different tool solving a different problem. The teams that struggle with GraphQL are usually teams that adopted it because it was modern, not because it fit their access patterns.

Understand your data shape first. Then pick the API style that maps to it cleanly.

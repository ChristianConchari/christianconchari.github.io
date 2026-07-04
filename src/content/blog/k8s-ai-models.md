---
title: "K8s Patterns for Deploying AI Models at Scale"
description: "Deploying ML models in Kubernetes requires more than wrapping them in a container. Here are the patterns I use for reliable, cost-efficient model serving in production."
pubDate: 2026-03-10
tags: ["DevOps", "Machine Learning"]
readingTime: 11
featured: false
---

## Introduction

Getting an ML model to 95% accuracy in a Jupyter notebook is the easy part. Getting it to serve predictions reliably at 10,000 requests per minute — with graceful degradation, autoscaling, and zero-downtime deploys — is where the real engineering lives.

I've spent the past two years building and operating ML serving infrastructure on GKE. These are the patterns that have held up in production.

## 1. Separate Serving from Training Infrastructure

Your training cluster and serving cluster have different requirements. Training jobs are bursty, GPU-hungry, and fault-tolerant. Serving workloads are latency-sensitive, need consistent resources, and must handle traffic spikes gracefully.

Run them in separate node pools. Your training jobs can tolerate preemptible nodes (saving 60-80% on cost). Your serving pods should never land on preemptible nodes.

```yaml
nodeSelector:
  cloud.google.com/gke-nodepool: ml-serving-pool
tolerations:
  - key: "ml-serving"
    operator: "Equal"
    value: "true"
    effect: "NoSchedule"
```

## 2. Use Vertical Pod Autoscaler for Right-Sizing

It's tempting to over-provision CPU and memory to avoid OOM kills. But over-provisioned pods waste money and reduce scheduling density. VPA watches actual usage and recommends (or applies) better resource requests over time.

Start with VPA in `Recommend` mode. Let it observe your workload for a week. Then review the recommendations before switching to `Auto`.

## 3. Model Versioning with Blue/Green Deployments

Never update a model in-place. Instead, deploy the new version alongside the old one and shift traffic gradually using a weighted Service or an ingress controller with traffic splitting.

The pattern:
- Deploy `model-v2` as a new Deployment with 0% traffic
- Run shadow traffic against it (duplicate live requests, discard responses)
- Compare latency and accuracy metrics for 24-48 hours
- Shift 10% → 50% → 100%, watching error rates at each step

This catches the subtle bugs — tokenizer mismatches, preprocessing drift — that unit tests miss.

## 4. GPU Sharing with MIG and Time-Slicing

A single A100 running one small model is expensive waste. NVIDIA's Multi-Instance GPU (MIG) partitions a physical GPU into isolated slices. For models that don't saturate a full GPU, MIG lets you run 3-7 models on one card.

For even smaller models, Kubernetes device plugin time-slicing works well — multiple pods share a single GPU in time-sliced fashion.

## 5. Horizontal Pod Autoscaler with Custom Metrics

CPU-based HPA doesn't work well for ML serving. Your pods might be idle (waiting for GPU) while CPU is low, then suddenly saturated. Use custom metrics instead:

- **Request queue depth** from Prometheus
- **GPU utilization** via DCGM exporter
- **P99 latency** from your service mesh

```yaml
metrics:
  - type: External
    external:
      metric:
        name: gpu_utilization_average
        selector:
          matchLabels:
            deployment: model-serving
      target:
        type: AverageValue
        averageValue: "70"
```

## Conclusion

The gap between "it works locally" and "it runs reliably in production" is where infrastructure patterns live. Start with clean separation of concerns, invest in observability from day one, and treat every model deploy as a traffic experiment.

The overhead pays for itself the first time you avoid a midnight incident.

---
title: "Computer Vision in Embedded Systems"
description: "Running neural networks on microcontrollers and edge devices sounds exotic. After two years building embedded CV systems, here's what actually works — and what the benchmarks won't tell you."
pubDate: 2025-12-05
tags: ["Machine Learning"]
readingTime: 9
featured: false
---

## Introduction

Training a ResNet-50 that achieves 94% accuracy on your dataset is satisfying. Deploying it on a device with 512KB of RAM and no internet connection is where the real engineering starts.

I spent two years building computer vision systems for edge devices — everything from defect detection on manufacturing lines to wildlife monitoring cameras running on solar power. Here's what I learned.

## The Constraint Stack

Before writing a single line of model code, map your constraints:

- **Memory** — Flash (model storage) vs RAM (runtime working memory). These are separate budgets.
- **Compute** — FLOPs per second. Does the device have a DSP or NPU? Huge difference.
- **Power** — milliwatts matter if the device is battery or solar-powered.
- **Latency** — what's acceptable? Real-time (< 100ms)? Near-real-time (< 1s)? Batch?
- **Connectivity** — can the device call home, or must it operate fully offline?

Knowing these numbers before you start model selection saves weeks of dead ends.

## Model Architecture Choices

For embedded CV, forget ResNet, EfficientNet, or anything designed for server-class hardware. Your friends are:

**MobileNetV3** — designed explicitly for mobile/edge. The inverted residuals and squeeze-excitation blocks give you a strong accuracy-to-FLOP ratio.

**YOLO-Nano / NanoDet** — if you need object detection, these are orders of magnitude lighter than YOLOv8 with surprisingly competitive accuracy on narrow domains.

**Custom CNN backbones** — sometimes none of the off-the-shelf architectures fit. Don't be afraid to design a 4-layer CNN that's architecturally boring but fits in 80KB.

## Quantization: The Real Unlock

Moving from 32-bit float (FP32) to 8-bit integer (INT8) quantization is typically the highest-leverage optimization:

- **4x reduction** in model size
- **2-4x speedup** on hardware with integer acceleration
- Accuracy loss is usually < 1% with proper post-training quantization

TensorFlow Lite and ONNX Runtime both have solid quantization pipelines. The key is representative calibration data — use a dataset that covers the full distribution your model will see in production, not just the training set.

```python
converter = tf.lite.TFLiteConverter.from_saved_model(saved_model_dir)
converter.optimizations = [tf.lite.Optimize.DEFAULT]
converter.representative_dataset = representative_data_gen
converter.target_spec.supported_ops = [tf.lite.OpsSet.TFLITE_BUILTINS_INT8]
tflite_model = converter.convert()
```

## The Preprocessing Problem

Embedded systems often lack hardware JPEG decoders and fast image resize operations. Your 224×224 input image might be coming off a raw sensor at 1280×960.

Profile your preprocessing pipeline. I've seen cases where preprocessing took 3x longer than inference. Solutions:

- Resize at capture time using the camera's built-in downsampling
- Use integer-only preprocessing (avoid float operations pre-inference)
- Cache preprocessing results when input doesn't change frame-to-frame

## Deployment and Monitoring

Running blind is the biggest embedded CV failure mode. Even on disconnected devices:

- Log inference metadata (confidence, class distribution, latency) to onboard flash
- Sync logs opportunistically when connectivity is available
- Track data drift over time — environmental changes (lighting, seasons, wear) will degrade your model

The wildlife cameras I deployed showed 15% accuracy degradation over 6 months due to lens fouling and changing vegetation. Without monitoring, we'd never have caught it.

## Conclusion

Embedded CV is one of the most satisfying engineering domains precisely because the constraints are real and unforgiving. You can't throw compute at problems. You have to understand your model deeply, measure everything, and make deliberate trade-offs.

The reward is a system that works anywhere — no cloud dependency, no latency from the network, no single point of failure. That's a different kind of reliability than you get from server-side systems, and in many applications, it's the right kind.

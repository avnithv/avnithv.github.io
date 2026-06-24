---
title: Mitigating Medical Data Bias with GANs
year: "2025"
summary: Using generative models to build more representative training data across patient groups
link: /projects/gansbias/Mitigating_Bias_Science_Fair_Report.pdf
tags: ["Generative models", "Data augmentation"]
---

## Overview

Machine learning is increasingly used in medicine to analyze images and diagnose disease, but models inherit the implicit bias in their training data - many medical datasets badly underrepresent certain ethnicities, genders, and age groups, which can lead to misdiagnoses for those patients. In this project, we asked whether synthetic data can close that gap. We split three public medical datasets (Breast Cancer, Stroke, and Patient Survival) into demographic groups, used Conditional Tabular GANs (CTGANs) to generate additional samples for underrepresented groups, and compared a Random Forest Classifier trained on the original versus the augmented data using accuracy and recall.

## Approach

Standard GANs were built for images and text, which makes them awkward for the tabular records that most medical data takes; CTGANs are a 2019 architecture specialized for tabular data. The imbalance these datasets carry is stark: in the Breast Cancer data, the White ethnicity group alone makes up more than 80% of the samples, with similar skews across gender and age in the others. Beyond comparing each model on its own group, we also tested it on data from other groups, and checked significance with two-sample ANOVA tests at α = 0.05.

## Results

The more imbalanced a dataset was, the larger the improvement from augmentation — while majority groups saw little or no change, consistent with the idea that synthetic data helps most exactly where real data is scarce. ANOVA confirmed several of these effects were statistically significant. The work shows CTGAN augmentation is possible way to make medical ML more equitable, with the main limits being data volume and the compute that GANs demand. Presented at the school science fair with Gabriel Xu (TJHSST).

## Materials

- [Science fair research report (PDF)](/projects/gansbias/Mitigating_Bias_Science_Fair_Report.pdf) - full methods, figures, and ANOVA results.
- Datasets: [Breast Cancer ↗](https://www.kaggle.com/datasets/reihanenamdari/breast-cancer), [Stroke Prediction ↗](https://www.kaggle.com/datasets/fedesoriano/stroke-prediction-dataset), [Patient Survival ↗](https://www.kaggle.com/datasets/mitishaagarwal/patient) (Kaggle).
- CTGAN: [Xu et al., Modeling Tabular Data using Conditional GAN (NeurIPS 2019) ↗](https://proceedings.neurips.cc/paper_files/paper/2019/hash/254ed7d2de3b23ab10936522dd547b78-Abstract.html).
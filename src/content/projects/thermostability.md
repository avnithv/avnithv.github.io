---
title: Predicting Enzyme Thermostability with ML
year: "2023"
summary: Benchmarking ML models to predict the change in enzyme thermostability from a single point mutation 
link: https://github.com/avnithv/enzyme-thermostability-project
tags: []
---

Enzymes are efficient catalysts for biological reactions and can potentially be
designed to speed up industrial processes, but physically testing new protein
designs is slow, so an efficient way to predict stability is valuable. This
project asks which machine learning model best predicts the change in enzyme
thermostability after a single point mutation in the amino-acid sequence. I trained and compared several models on the
[Novozymes Enzyme Stability Prediction](https://www.kaggle.com/competitions/novozymes-enzyme-stability-prediction/data)
Kaggle dataset. XGBoost gave the best performance, with an R² of 0.593. Built Dec 2022 - Feb 2023 with guidance from Jacklyn Luu.

## Materials

- [Research paper (PDF)](/projects/thermostability/research-paper.pdf) - methods and results write-up.
- [Notebook (.ipynb)](/projects/thermostability/enzyme-thermostability.ipynb) - full data pipeline and model training.
- [Source on GitHub ↗](https://github.com/avnithv/enzyme-thermostability-project)

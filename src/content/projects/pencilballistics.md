---
title: "An Analysis of the Ballistics of Graphite and Mechanical Pencils"
year: "2022"
summary: "A scientifically rigorous statistics study answering an important question: which pencil type flies farther when launched?"
link: /projects/pencilballistics/report.pdf
tags: ["Statistics", "Experimental design", "Data analysis"]
---

Pencils are useful for writing, erasing, and drawing. They are
also cheap, light, and aerodynamic projectiles, and it is not uncommon for
people to launch one off a desk or any flat surface with a flick of the
hand. As a pencil-launching enthusiast (at the time of this study), I set out to settle the
matter scientifically: do graphite pencils or mechanical pencils fly farther?

## The experiment

I ran a proper randomized, controlled experiment for my freshman year Research Statistics
course:

- Independent variable: 60 pencils (30 graphite, 30 mechanical) launched in a
  randomized order generated in R.
- Response variable: distance flown, in inches, from launch point to pencil tip.
- Method: a purpose-built Pencil-Launching Apparatus (books, a roller, and a tape
  measure secured under the table) to deliver a repeatable launch with a fixed
  2.5 in. of pencil suspended over the edge.

## Results

Graphite pencils won, and not by a little:

| | Graphite | Mechanical |
|---|---|---|
| Mean distance | 33.06 in | 26.27 in |
| Std. deviation | 10.40 in | 8.31 in |
| Sample size | 30 | 30 |

A two-sample t-test gave t = 2.79, p = 0.0036, well below α = 0.05, so the
difference is statistically significant. Mechanical pencils flew about 13%
shorter on average, likely because their eraser end makes the weight
distribution less uniform, increasing air resistance.

## Declaration of interests

This study was partially motivated by the fact that I was running low on
mechanical pencils. However, this motivation and my preference for mechanical
pencils did not influence the results of this study.

## Read the full report

[full report (PDF) →](/projects/pencilballistics/report.pdf)
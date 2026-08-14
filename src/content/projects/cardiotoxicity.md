---
title: Understanding Mechanisms Behind Cardiotoxicity
year: "2026"
summary: "Identifying genes driving cardiotoxicity and ICI myocarditis using computational models and multi-omics data"
tags: ["Network analysis", "Game theory", "Multi-omics integration"]
---

Cardiotoxicity is a negative side effect of kinase inhibitors (KIs) and other cancer treatments, and arises when drugs inadvertently affect healthy cardiac cells while targeting cancer cells. A particularly severe form is immune checkpoint inhibitor (ICI) myocarditis, where therapies that unleash the immune system against tumors also drive it to attack the heart, causing inflammation that is rare but frequently fatal. In order to mitigate risk and determine safer treatments for each patient, there is a need to understand the gene interactions and pathways that lead to cardiotoxicity. My research approaches this from two angles: one models KI cardiotoxicity as a gene coexpression network solved with game theory, and the other integrates several single-cell and cytometry datasets to find immune signaling patterns behind ICI myocarditis.
 
> An AHA Scientific Sessions abstract is under submission and a manuscript is awaiting publication for the multi-omics (MOFA) work. I'll add more details about my research after publication.
 
## Gene graphs and game theory for KI cardiotoxicity
 
I analyzed gene expression data from human cardiac cells treated with KIs and used [knowledge graphs ↗](https://doi.org/10.1186/s12859-023-05451-5) and game theory strategies to determine gene expression patterns. The novel piece is framing gene expression as a game: each gene is a player choosing a strategy (upregulated or downregulated), and the stable configuration of the whole network is found using a Nash equilibrium.
 
- **Data.** [GEO dataset GSE146096 ↗](https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE146096), gene expression from 4 human heart cell lines treated with 22 FDA-approved KIs, covering 11,386 genes across 2–4 trials, with measures like logFC, logCPM, and p-values.
- **Preprocessing (Python).** I merged the different trials into one comprehensive dataset, kept only the genes present in every trial, and took the average normalized expression per gene per KI. Separate control and treatment datasets were built so their gene expressions could be compared.
- **Network construction (R).** I filtered to the 2,000 highest-variance genes, ran PCA to see similarities between KIs, and used the [BioNERO ↗](https://doi.org/10.1007/s10142-021-00821-9) gene coexpression network inference (exp2gcn, signed-hybrid, Pearson) to compute coexpression coefficients, log-transformed to reduce skewness. KEGG pathways for each gene came from the [DAVID ↗](https://doi.org/10.1093/nar/gkac194) tool.
- **Graph analysis (Python, iGraph).** Genes are nodes, edges are weighted by coexpression. I computed betweenness centrality to highlight important genes, graph entropy over the whole graph, community structure, and K-means clusters of similar genes, comparing treated against control.
- **Game-theoretic model.** I defined a novel payoff score to measure the stability of an expression configuration: for each pair of genes with the same expression level, their coexpression coefficient is added; for each KEGG pathway, the absolute difference between its upregulated and downregulated genes is added. Using this score, I applied the Nash equilibrium (each gene is visited in random order and flipped if it increases the payoff) to predict the gene configurations that would maximize expression stability, then read off the most central upregulated genes and pathways.
This revealed major KI clusters with similar cellular effects and significant differences in the important pathways across treated and control graphs, paving the way for developing strategies to reduce risks associated with cancer treatments.
 
### Technologies and skills
 
- **Tools.** Python (pandas, NumPy, iGraph), R (BioNERO), DAVID, KEGG, GEO.
- **Methods.** Gene coexpression network inference, PCA, betweenness centrality, graph entropy, community detection, K-means clustering.
- **Skills.** Translating a biological problem into a game-theoretic model, designing a custom Nash-equilibrium payoff function, and reasoning about networks of thousands of genes.
 
## Multi-omics factor analysis of ICI myocarditis
 
The second part asks which immune signaling patterns distinguish patients who develop myocarditis on ICIs, and how CHIP (clonal hematopoiesis of indeterminate potential) modulates that response. The methodological focus is integrating very different data modalities into a single latent-variable model.
 
- **Data integration.** Four datasets across two cohorts and two technologies: three single-cell RNA-seq datasets (Yale pre-ICI, Yale post-ICI, and an external Stanford cohort), all profiling the same targeted panel of 55 cytokine genes, plus one Stanford [CyTOF ↗](https://en.wikipedia.org/wiki/Mass_cytometry) dataset of channel intensities.
- **Cytometry preprocessing (R).** Arcsine transformation and bead normalization with the CATALYST package, followed by live-cell gating via the gate_flowclust_2d algorithm in [openCyto ↗](https://doi.org/10.1371/journal.pcbi.1003806).
- **Factor model.** I used [MOFA+ ↗](https://doi.org/10.1186/s13059-020-02015-1) to extract latent factors from the 4 datasets, essentially a Bayesian generalization of sparse PCA to multi-modal, multi-group data. A spike-and-slab prior and group-wise ARD priors for automatic relevance determination keep the feature weights sparse. After inspecting several trial runs I used K=15 latent factors, implemented with mofapy2 in Python; all models converged within ~50 iterations.
- **Stratified design.** Samples were grouped by CHIP status, myocarditis status, and steroid status. For each model I extracted the top 20 cytokines explaining the majority of the variance and ran KEGG pathway enrichment with [Enrichr ↗](https://doi.org/10.1002/cpz1.90), then validated the Yale findings against the independent Stanford cohort.
 
### Technologies and skills
 
- **Tools.** Python (mofapy2), R (CATALYST, openCyto), MOFA+, Enrichr.
- **Methods.** Bayesian multi-omics factor analysis, single-cell RNA-seq and CyTOF preprocessing, live-cell gating, KEGG pathway enrichment.
- **Skills.** Integrating heterogeneous assays across cohorts into one latent-variable model, designing a stratified analysis, and validating findings against an independent external cohort.
 
## Significance
 
Both projects identify specific genes and pathways linked to cardiotoxicity and ICI myocarditis, which provide candidate targets for therapies that can mitigate these effects for cancer patients. The central genes and pathways from the graph and game-theory model are potential biomarkers for monitoring cardiotoxicity. Additionally, the cytokines from the multi-omics model provide insight into why some patients, especially some CHIP patients, develop ICI myocarditis while others don't.
 
## Acknowledgments
 
Conducted in [Dr. Jennifer Kwan's lab ↗](https://medicine.yale.edu/profile/jennifer-kwan/) at Yale, with mentorship from Dr. Alokkumar Jha. The KI cardiac transcriptomic data originates from [van Hasselt et al., 2020 ↗](https://doi.org/10.1038/s41467-020-18396-7).
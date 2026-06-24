---
title: GlioGrade
year: "2025"
summary: An ML tool that diagnoses gliomas from MRI images, used by neuropathologists at three clinics
link: https://gliograde.org/
tags: ["Medical imaging", "3D CNNs", "Full-stack development"]
---

[GlioGrade ↗](https://gliograde.org/) is an ML tool that diagnoses gliomas from MRI images, used by neuropathologists at three clinics. The motivation came from the fact that gliomas are one of the most aggressive brain cancers, with 5-year mortality rates above 90%, which makes accurate early detection essential. That led to the idea of an ML-based tool for detecting and diagnosing gliomas to assist doctors.
 
Current biopsy procedures are highly risky and invasive, and getting results back from a pathologist's lab may take several weeks. This project aims to minimize that risk by non-invasively obtaining the same results as a pathologist using MRI data, as well as speeding the overall process up. The tool gives neurologists and neurosurgeons a preliminary understanding of the patient through a non-invasive means while they wait on the results of the pathologist.

<iframe
  src="https://www.youtube-nocookie.com/embed/rxM5NN8b4VM"
  title="GlioGrade demo walkthrough"
  loading="lazy"
  allow="encrypted-media; picture-in-picture; web-share"
  allowfullscreen
  style="width:100%; aspect-ratio:16/9; border:0; border-radius:6px; margin:0.5rem 0 1.5rem;"
></iframe>

## Background
 
The correct classification of brain tumors is crucial for a timely diagnosis and effective treatment planning. Classification involves characterizing a tumor into a type and a grade. Tumor types are based on histological findings, molecular underpinnings, and genetic changes, while tumor grades are assigned based on their natural history (under the WHO 2021 classification, using within-type grading).
 
For adult diffuse gliomas, MRI signatures differ meaningfully across types and grades. For instance, gadolinium enhancement is uncommon in CNS WHO grade 2 IDH-mutant astrocytomas but is present at increasing frequency in grade 3 and grade 4 tumors, and a pattern of rim enhancement around central necrosis is most common in grade 4 tumors. These are exactly the distinctions a model has to learn from imaging alone, and the lack of abundant, well-labeled MRI data is the central obstacle to pushing this kind of tool further.
 

## Technical details
 
I worked on a team of three. My role was building the ML pipeline and the web tool, while my two partners focused on data acquisition and reaching out to doctors and clinics. The input for my pipeline was 3D MRI scans labeled with either glioma diagnoses or healthy controls. These 3D images were chosen because they carry the most information and they're what clinicians actually work with.
 

- Preprocessing. I preprocessed and normalized the scans: stripping the skull from the MRI image, correcting for artifacts and rotation, and mitigating class imbalances through sampling and weighting. The most challenging part was combining many different preprocessing steps, as MRI scans have a lot of variations that needed to be normalized in different ways.
- Model architecture. I designed the model architecture to be a 3D CNN in PyTorch and experimented with the parameters until the final models reached 93% diagnostic accuracy.
- Cross-dataset validation. I trained on the [UCSF-PDGM dataset ↗](https://www.cancerimagingarchive.net/collection/ucsf-pdgm/) and tested on the [Erasmus Glioma Database (EGD) ↗](https://doi.org/10.1016/j.dib.2021.107191). The datasets had different preprocessing steps, so our model was shown to be more versatile.
- Web app. Next, I built the web app. I chose to make it run locally to protect patient privacy. However, this meant I also had to prioritize making installation as easy as possible for doctors who don't have as much technical experience. I designed the interface to be intuitive and minimize the number of clicks needed in the workflow. The [demo video ↗](https://www.youtube.com/watch?v=rxM5NN8b4VM) walks through the final tool.

The tool was successful with neuropathologists at three clinics, which was only possible because of the iterative feedback I received from these doctors. I met weekly with them to discuss their pain points and implement features to make the tool more accessible and secure until they were satisfied with using the tool regularly with their patients.
 
## Sourcing data
 
During development, I realized that we would need access to the Erasmus Glioma Database in order to improve our model. I reached out to the scientists who collected and stored this database to get access to the MRI images and diagnoses. I also wanted to ask about the preprocessing steps that they took in order to normalize the images, which I would have to replicate within GlioGrade in order to match the training data. The researchers responded within a week and graciously provided the dataset, and they also clarified their preprocessing steps.
 
## Mentorship
 
We reached out to neuropathologists from many clinics and research institutions, both through emails and by calling them. Dr. Kimmo Hatanpaa from UT Southwestern Medical Center was interested in our project and offered to guide us. Dr. Hatanpaa was very helpful not only in giving us tips on how to implement GlioGrade to make it most applicable for neuropathologists, but also connected us with some of his colleagues. By corresponding with the doctors and ML experts that Dr. Hatanpaa connected us with, we received important feedback including which datasets to use and how to remove noise in the data.
 
## Datasets and links
 
- [gliograde.org ↗](https://gliograde.org) — the project site
- [Demo video ↗](https://www.youtube.com/watch?v=rxM5NN8b4VM) — walkthrough of the tool
- [UCSF-PDGM ↗](https://www.cancerimagingarchive.net/collection/ucsf-pdgm/) — adult diffuse glioma MRI dataset (training)
- [Erasmus Glioma Database ↗](https://doi.org/10.1016/j.dib.2021.107191) — glioma MRI dataset (cross-dataset testing)
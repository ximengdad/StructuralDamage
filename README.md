# Structural Damage Classification with Neural Network

This repository contains a Neural Network designed for multiclass semantic segmentation, capable of identifying structural damage in buildings and predicting 16 distinct classes. The model aids in disaster response and infrastructure assessment by generating precise segmentation masks to highlight and classify various types of damage.

## Features
- **Multiclass Semantic Segmentation:** Predicts 16 distinct damage classes to provide detailed insights into structural conditions.
- **Segmentation Masks:** Generates masks that localize and categorize damage, enhancing the accuracy of assessments.
- **Advanced Neural Architecture:** Utilizes state-of-the-art deep learning techniques for precise damage detection.

## Technologies Used
- **Programming Language:** Python
- **Deep Learning Framework:** PyTorch
- **Libraries:**
  - NumPy
  - Pandas
  - Matplotlib
  - OpenCV
  - PIL (Pillow)
  - PyTorch (torch, torchvision)
  - PyTorch Lightning
  - Segmentation Models PyTorch (smp)

## Neural Network Details
- **Architecture:** The network leverages advanced segmentation models from the `segmentation_models_pytorch` library.
- **Pretrained Encoders:** Incorporates pretrained encoders for improved feature extraction and segmentation accuracy.
- **Framework:** PyTorch Lightning for modularity and ease of experimentation.
- **Output Classes:** Predicts 16 distinct damage classes, allowing detailed categorization of structural damage.

## Applications
- **Disaster Response:** Provides actionable insights for search and rescue teams.
- **Structural Assessment:** Aids engineers in evaluating building safety and planning repairs.
- **Infrastructure Management:** Supports long-term monitoring and maintenance of critical structures.

## Dataset
The model is designed to work with annotated datasets containing images of structural damage and corresponding segmentation masks. The dataset should include 16 damage categories for optimal performance.

## Results
The neural network outputs segmentation masks that localize and classify structural damage across 16 predefined categories. Sample predictions include:
- Input image of a damaged structure.
- Generated segmentation mask with color-coded classes.
- Metrics such as IoU (Intersection over Union) and accuracy for performance evaluation.

## Collaborators and Special Thanks
- **Collaborators:**
  - [Mauricio Tumalan](https://github.com/mtumalan)
  - [Carlos Fragoso](https://github.com/carlosfragoso21)

- **Special Thanks:**
  - Octavio Navarro for guidance and expertise.
  - The open-source community for the tools and libraries that made this project possible.

---

Feel free to explore, adapt, and extend this project to suit your needs.
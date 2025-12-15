# 💧 Water Tank Problem – Trapped Rain Water Visualizer

🌐 **Try it Live:**  https://preethi0103.github.io/WATER-TANK-VISUALIZER/

This project is a **frontend web application** that solves and visualizes the classic
**Trapping Rain Water Problem** using **Vanilla JavaScript, HTML, CSS, and SVG**.

The application allows users to input block heights and visually demonstrates
how water is trapped between the blocks, along with the total units of water stored.

---

## 🔍 Problem Statement

Given an array of non-negative integers where each integer represents the height
of a block, compute how many units of water can be stored between the blocks
after rainfall.

**Example:**
Input: [0,4,0,0,0,6,0,6,4,0]
Output: 18 Units

---

## 🎯 Objective

The objective of this project is to:
- Accurately compute the units of water stored between blocks
- Visually represent the problem using a frontend-only approach
- Use **SVG-based diagrams** to clearly explain the solution
- Build an interactive web application using **Vanilla JavaScript**

---

## 🖥️ Application Overview

The application is divided into two main visual sections:

### 🏗️ Block Setup & Water Trapped (Input Visualization)
- Displays the blocks based on user input
- Shows how water gets trapped between the blocks
- Helps users visually understand the problem

### 🌊 Water Stored (Output Visualization)
- Displays only the trapped water
- Focuses on the final computed result
- Removes block visuals to avoid distractions

The total units of water stored are displayed clearly below the visualizations.

---

## 🧠 Solution Approach

The solution follows an optimized approach with linear time complexity:

1. Compute the maximum block height to the **left** of each index
2. Compute the maximum block height to the **right** of each index
3. Calculate water stored at each index using: min(leftMax, rightMax) − blockHeight
4. Sum the values to get the total units of trapped water

This ensures efficient performance even for larger inputs.

---

## ✨ Features

- Interactive input for block heights
- SVG-based visual representation
- Separate input and output visualizations
- Dynamic calculation of water units
- Responsive scaling for large values
- Clean and interview-ready UI

---

## 🛠️ Technologies Used

- **HTML5** – Structure
- **CSS3** – Styling and layout
- **Vanilla JavaScript** – Logic and interactivity
- **SVG** – Visualization
- **GitHub Pages** – Deployment

---

## 📂 Project Structure

```
water-tank-visualizer/
├── index.html   # Main application layout
├── style.css    # Styling and UI design
├── script.js    # Core logic and visualization
└── README.md    # Project documentation
```
---

## 👩‍💻 Author

**Preethi S**

---

## 📌 Notes

- This is a **frontend-only solution**
- No external libraries or frameworks are used
- Focuses on both **algorithm correctness** and **visual clarity**

---

## ✅ Conclusion

This project demonstrates the ability to:
- Solve a classic algorithmic problem efficiently
- Translate logic into intuitive visualizations
- Build clean frontend applications using core web technologies
- Present solutions in a professional and interview-friendly manner





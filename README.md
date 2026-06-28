# LabSphere - CBSE Virtual Science Laboratory

LabSphere is a premium, highly interactive virtual science laboratory application tailored for Indian CBSE (Class 10 to 12) students. It allows students to perform practical experiments exactly like they would in a real-world physical laboratory—by connecting wires, dripping chemical solutions, calibrating microscopes, and tracing debugger outputs.

---

## ⚡ Key Features

1. **Dashboard Analytics**: Streak counter, experience points (XP), recent activity logs, and a subject-wise progress dial.
2. **CBSE Practical Syllabus Coverage**:
   - **Physics (Class 10/12)**: *Ohm's Law Verification* with interactive circuit setups, ammeters/voltmeters, rheostat sliders, and linear graph plots.
   - **Chemistry (Class 11/12)**: *Acid-Base Titration* with burette drip control rates, phenolphthalein indicator additions, dynamic pH-based color transitions, and pH curve plots.
   - **Biology (Class 10/11)**: *Compound Microscope Viewer* featuring X/Y specimen adjustment mounts, coarse/fine focus blur alignments, magnifications (10x/40x), and focused organelle label hotspots.
   - **Computer Science (Class 11/12)**: *Bubble Sort Execution Tracer* with code editors, variable watches, memory blocks animation, and control flowchart highlight trackers.
3. **Structured Observation System**: Automatic entry logs from simulations, calculations notepad, and conclusions journal input panels.
4. **CBSE Lab Report Print Generator**: Custom print stylesheet that transforms journal observations into an academic paper report (exportable as PDF).
5. **MCQ & Assertion-Reason Quizzes**: Instant verification scoring with detailed explanations.
6. **Milestone Achievements**: Unlocking badge trophies ('First Step', 'Quiz Master', 'Dedicated Learner', and 'Polymath').

--- 

## Live Demo 
(https://gokul-555180.github.io/LabSphere---Virtual-Science-Lab/)

---

## 🛠️ Tech Stack

- **Framework**: Vite + React 19 (TypeScript)
- **Styling**: Tailwind CSS v4 + Glassmorphism custom components
- **Icons**: Lucide React
- **Animations**: CSS Transitions, Keyframe Animations, Canvas Confetti triggers

---

## 🚀 Getting Started

### 1. Clone or Open the Workspace
Ensure you are in the project folder:
```bash
C:\Users\gokul\OneDrive\เอกสาร\Virtaul Science Lab
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production
```bash
npm run build
```

---

## 💎 Design Philosophy & Style Guide

- **Typography**: `Plus Jakarta Sans` for headers, `JetBrains Mono` for debugger states and observation tables.
- **Glassmorphism**: Elegant translucent panels (`glass-panel` and `glass-card`) blending with a dark slate background (`#0b0f19`).
- **Color Palette**: Tailored accents (indigo, blue, emerald, violet, and fuchsia) indicating subjects, difficulties, and instrument states.
- **CBSE Standard Journal**: Formatted with serif margins, supervisor sign-offs, and student rolls for academic compatibility.

---

## 📅 Roadmap & Architecture Scale-up

1. **Multi-file CS Editor**: Support Java, SQL Queries, and HTML/CSS preview sandboxes.
2. **Three.js WebGL rendering**: Enable full 3D rotatable apparatus (burettes, lenses, prisms) using React Three Fiber.
3. **Teacher Portal**: Add classroom assignments, student progress tracking lists, and digital laboratory scheduling.
4. **Auth & Backend integration**: Connect PostgreSQL database and Express REST APIs with Clerk/Firebase Authentication.

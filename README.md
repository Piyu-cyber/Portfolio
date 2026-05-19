# 📋 Recruiter & Hiring Manager Fast-Pass Guide // Piyush Prashant

Welcome! This repository hosts the interactive portfolio dashboard for **Piyush Prashant**, a Systems-focused AI/ML Engineer. This guide is optimized to help you evaluate his technical depth, publication record, and production execution in **under 30 seconds**.

---

## ⚡ TL;DR: Candidate Snapshot

* **Target Roles:** AI Engineer, ML Engineer, Applied AI, Backend AI Infrastructure, Quant / ML Developer.
* **Graduation:** May 2028 (B.Tech in Data Science & Artificial Intelligence, IIIT Dharwad).
* **Core Competency:** Low-latency deep learning inference (C++), production RAG pipelines (pgvector + semantic caching), and robust meta-classifier ensembling.
* **Academic Output:** Peer-reviewed paper accepted and published in **ACL SemEval-2026**.
* **Direct Links:** 
  * 📄 **[Download Verified Resume (DOCX)](https://github.com/Piyu-cyber/Portfolio/raw/main/public/Piyush_Prashant_Resume_Final.docx)**
  * 🌐 **[View Live Interactive Dashboard](https://github.com/Piyu-cyber/Portfolio)** (Or run locally using instructions below)
  * ✉️ **[Email Piyush](mailto:prashantpiyush35@gmail.com)** | 📞 **[Call / WhatsApp](tel:+918210326084)**

---

## 🔍 Why Hire Piyush? (The 3-Point Audit)

### 1. Peer-Reviewed Research Credentials (ACL SemEval-2026)
* **What he solved:** Robust multilingual polarization detection across 22 diverse language datasets.
* **Execution:** Built a dual-encoder stacking ensemble utilizing XLM-RoBERTa-large + mDeBERTa-v3 with 4-bit QLoRA fine-tuning and Shannon entropy-based routing.
* **Performance:** Achieved a macro-F1 score of **0.797**, outperforming zero-shot Llama-3-8B-Instruct by **+26.3 percentage points**.

### 2. High-Performance C++ Inference (Sub-Millisecond HFT)
* **What he solved:** Eliminating Python interpreter/GIL execution bottlenecks for tick-level limit order book (LOB) prediction.
* **Execution:** Compiled model inference graphs directly in C++ using ONNX Runtime (CUDA Execution Provider), featuring lock-free sliding-window buffer slicing.
* **Performance:** Reduced inference latency per step to **2.78ms** (a **1.75x speedup** over PyTorch/Python setups) while maintaining an 84.3% mid-price accuracy rate.

### 3. Production Cost & Query Optimization (DataChat RAG)
* **What he solved:** High token consumption and execution latency (4s+) in relational schemas.
* **Execution:** Implemented Supabase pgvector cosine-distance schema retrieval and an intelligent semantic vector cache.
* **Performance:** Cut LLM API costs by **~60%** and reduced query response times from 4.0s to **1.5s**.

---

## 🛠️ Tech Stack & ATS Keywords

| Category | Technologies |
| :--- | :--- |
| **Deep Learning & Inference** | PyTorch, ONNX Runtime (C++ EP), LibTorch, TensorRT, HuggingFace, QLoRA |
| **Vector Databases & Caching** | Supabase pgvector, ChromaDB, Redis, pgvector semantic caching |
| **Infrastructure & Systems** | Docker, CMake, Git, Linux / Bash, C++ STL, CUDA 12.x |
| **Languages** | Python, C++ (17/20), SQL (PostgreSQL), Cypher (Neo4j), TypeScript |

---

## 🚀 Running the Interactive Portfolio Dashboard Locally

You can explore his interactive simulations (including the live CUDA/RAG terminal, database rack stack, and F1 language matrices) locally on your system:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Piyu-cyber/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open **[http://localhost:3000](http://localhost:3000)** in your browser.

4. **Verify optimized production build:**
   ```bash
   npm run build
   ```

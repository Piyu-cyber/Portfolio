# Piyush Prashant // AI & ML Systems Engineer Portfolio

A premium, recruiter-focused developer portfolio designed to showcase production-grade AI systems, low-latency deep learning pipelines, and research credentials.

The site is built with a **professional matte black/graphite terminal aesthetic** modeled after modern infrastructure platforms (OpenAI, Anthropic, Stripe, Vercel).

---

## ⚡ Core Features & Interactive Simulations

### 1. **Live GPU Cluster Node Terminal**
- Interactive CUDA/RAG simulation terminal dashboard showing hardware statuses (fluctuating GPU load, VRAM allocations).
- Run simulated pipeline scripts:
  - `DATACHAT_RAG`: Semantic cache hits/misses, Supabase pgvector retrieval, and Groq compilation.
  - `ONNX_HFT`: ONNX runtime CUDA execution, sliding order book ticks, and C++ vs Python speedup analysis.
  - `HIFUN_ROUTER`: Tabular feature extraction routing query requests to SQL/Neo4j endpoints along with live SHAP explainability weights.

### 2. **Recruiter Snapshot Metrics**
- Interactive key performance indicator cards targeting production parameters:
  - **4.5M+** order book snapshots processed (FI-2010 benchmark).
  - **22** languages evaluated (ACL SemEval-2026 Task 9).
  - **97.3%** classification accuracy on relational vs graph query routing.
  - **60%** cost reduction in commercial LLM tokens using semantic pgvector caches.

### 3. **ACL SemEval-2026 Research Dashboard**
- Spotlights the peer-reviewed paper: *"Robust Multilingual Polarization Detection via Dual-Encoder Fusion and Expert Ensembling"*.
- Highlights include a comparative macro-F1 benchmark chart (outperforming baseline zero-shot Llama-3-8B) and an interactive 22-language evaluation matrix.

### 4. **Server Rack Stack**
- Represents engineering capabilities as physical blades in an interactive server cabinet:
  - **Inference Blade:** ONNX Runtime, PyTorch, LibTorch, TensorRT.
  - **Vector/Cache Blade:** pgvector (Supabase), Redis, ChromaDB, Pinecone.
  - **Infra/Systems Blade:** Docker, CMake, Linux, C++ (STL), Git.
  - **Languages Blade:** C++, Python, TypeScript, SQL, Cypher.

### 5. **Recruiter ATS Mode**
- A toggle button on the Navbar instantly reorganizes the landing page layout, displaying an ATS-ready profile summary, quick-copy contact panels, and a direct download button for the verified resume (`Piyush_Prashant_Resume_Final.docx`).

---

## 🛠️ Technology Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** TailwindCSS (curated slate/graphite theme with glassmorphism effects)
- **Animations:** Framer Motion (micro-animations, layout fades, and dynamic hover feedback)
- **Data Visualizations:** Recharts (responsive vector latency comparisons)
- **Icons:** Lucide React & inline custom SVGs (for brand logo stability)

---

## 🚀 Running Locally

1. **Clone and navigate to the project directory:**
   ```bash
   cd "c:\Users\palak\OneDrive\Desktop\resume"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your web browser.

4. **Verify production compilation:**
   ```bash
   npm run build
   ```

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Piyush Prashant | AI/ML Systems Engineer & NLP Researcher",
  description: "B.Tech Data Science & AI student at IIIT Dharwad, ACL SemEval-2026 author. Specialized in low-latency C++ inference engines, vector database pgvector RAG systems, and XGBoost query routing pipelines.",
  keywords: "AI Engineer, ML Engineer, RAG Engineer, Applied AI, LLM Infrastructure, NLP Research, Quant ML, Deep Learning Engineer, Agentic AI, Piyush Prashant, IIIT Dharwad, SemEval-2026, ONNX C++",
  authors: [{ name: "Piyush Prashant" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

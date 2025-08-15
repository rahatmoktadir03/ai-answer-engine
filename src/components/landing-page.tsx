"use client";

import { motion } from "framer-motion";
import { Search, Globe, Brain, Zap, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button, FeatureCard, GradientText } from "./ui";

export default function LandingPage() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Intelligence",
      description:
        "Advanced language models that understand context and provide accurate, detailed answers.",
      gradient: "from-violet-500 via-purple-500 to-violet-600",
    },
    {
      icon: Globe,
      title: "Web Content Scraping",
      description:
        "Automatically extracts and analyzes content from multiple websites to provide comprehensive answers.",
      gradient: "from-cyan-500 via-blue-500 to-indigo-500",
    },
    {
      icon: Shield,
      title: "Source Citations",
      description:
        "Every answer comes with properly cited sources to ensure transparency and reliability.",
      gradient: "from-pink-400 via-pink-500 to-yellow-400",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Get answers in seconds with our optimized processing pipeline and intelligent caching.",
      gradient: "from-violet-400 via-purple-500 to-pink-500",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Provide URLs",
      description:
        "Input the websites you want to analyze as sources for your question.",
    },
    {
      number: "02",
      title: "Ask Your Question",
      description:
        "Type in your question - our AI will understand the context and intent.",
    },
    {
      number: "03",
      title: "Get Cited Answers",
      description:
        "Receive comprehensive answers with source citations and references.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:50px_50px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex justify-center mb-8">
              <div className="p-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
                <Search className="w-12 h-12 text-white" />
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <GradientText gradient="from-violet-400 via-pink-400 to-yellow-400">
                Insight
              </GradientText>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Get intelligent, source-cited answers to your questions by
              analyzing content from multiple websites. No more hallucinations,
              just facts with references.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                href="/chat"
                size="lg"
                variant="violet"
                className="flex items-center gap-2"
              >
                Start Asking Questions
                <ArrowRight className="w-5 h-5" />
              </Button>

              <Button variant="bubblegum" size="lg">
                Watch Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose Our AI Engine?
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Built with cutting-edge technology to deliver accurate, fast, and
              reliable answers with complete transparency.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <FeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  gradient={feature.gradient}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900/50 to-black/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Three simple steps to get comprehensive, cited answers to your
              questions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-2xl font-bold shadow-2xl group-hover:scale-110 transition-transform duration-300">
                    {step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 opacity-30" />
                  )}
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-white">
                  {step.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of researchers, students, and professionals who
              comprehensive research. Whether for academic work or business
              decisions, trust our Insight platform for accurate, cited
              information.
            </p>
            <Button
              href="/chat"
              size="lg"
              className="flex items-center gap-2 mx-auto"
            >
              Try It Now - It&apos;s Free
              <ArrowRight className="w-6 h-6" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Search className="w-8 h-8 text-blue-400" />
                <span className="text-2xl font-bold">Insight</span>
                <span className="text-gray-400">by AI Research</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                The most advanced AI-powered research assistant that provides
                accurate, source-cited answers to your questions.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-white">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    href="/chat"
                    className="hover:text-white transition-colors"
                  >
                    Chat Interface
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    API Access
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Insight. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

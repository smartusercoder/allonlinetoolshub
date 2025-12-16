import { Link } from "react-router-dom";
import { Shield, Zap, Bookmark, ChevronRight, ArrowLeft, CheckCircle } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { toolsData } from "@/data/toolsData";

export default function AboutUs() {
  const totalTools = toolsData.filter(t => t.implemented).length;

  return (
    <>
      <SEO
        title="About - All Online Tools Hub | Free Privacy-Focused Online Tools"
        description={`Learn about All Online Tools Hub - your trusted source for ${totalTools}+ free online tools. We provide privacy-focused, browser-based utilities for professionals, developers, and everyday users.`}
        keywords={["about us", "online tools", "free tools", "privacy tools", "browser tools"]}
        canonical="https://allonlinetoolshub.com/about"
      />

      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        {/* Header - WebUtils Style */}
        <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14">
              <div className="flex items-center gap-4">
                <Link to="/" className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-sm">
                    <span className="text-white font-bold text-sm">A</span>
                  </div>
                  <span className="font-semibold text-slate-900 dark:text-white hidden sm:block">
                    All Online Tools Hub
                  </span>
                </Link>
              </div>

              <div className="flex items-center gap-2">
                <Link to="/">
                  <Button variant="outline" size="sm" className="gap-2 border-slate-200 dark:border-slate-700">
                    <ArrowLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Home</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Page Header */}
        <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mb-6">
              <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Home
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-slate-900 dark:text-white font-medium">About</span>
            </nav>

            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              About All Online Tools Hub
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Privacy-first web utilities for developers, designers, and creators. 
              All processing happens locally in your browser.
            </p>
          </div>
        </div>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Mission Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Our Mission</h2>
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                At All Online Tools Hub, our mission is simple: provide everyone with access to professional-quality 
                online tools without compromising privacy, speed, or accessibility. We believe powerful tools shouldn't 
                require expensive software subscriptions, complex installations, or surrendering your personal data.
              </p>
              <p className="text-slate-600 dark:text-slate-400">
                We've built a comprehensive suite of {totalTools}+ online tools that run entirely in your browser, 
                ensuring your files and data never leave your device. Whether you're a developer, designer, writer, 
                student, or professional, our tools help you work smarter and faster.
              </p>
            </div>
          </section>

          {/* Features Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">What Makes Us Different</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Privacy First</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  All processing happens in your browser. Your files never leave your device.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Lightning Fast</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Instant results with no server round-trips. Optimized for performance.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-4">
                  <Bookmark className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Always Free</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  No signup required. All {totalTools}+ tools are completely free to use.
                </p>
              </div>
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Why Choose Our Tools?</h2>
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600 dark:text-slate-400">
                    <strong className="text-slate-900 dark:text-white">100% Free</strong> - No hidden costs, no premium tiers, no subscriptions
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600 dark:text-slate-400">
                    <strong className="text-slate-900 dark:text-white">No Registration</strong> - Start using any tool immediately, no account required
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600 dark:text-slate-400">
                    <strong className="text-slate-900 dark:text-white">Privacy Guaranteed</strong> - Your data stays on your device, we never see it
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600 dark:text-slate-400">
                    <strong className="text-slate-900 dark:text-white">Fast & Reliable</strong> - Browser-based processing for instant results
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600 dark:text-slate-400">
                    <strong className="text-slate-900 dark:text-white">Comprehensive Collection</strong> - {totalTools}+ tools for every need
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8 border border-blue-200 dark:border-blue-800">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Ready to Get Started?</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Browse our collection of {totalTools}+ free online tools
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/sitemap">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">
                    Browse All Tools
                  </Button>
                </Link>
                <Link to="/">
                  <Button variant="outline" className="border-slate-300 dark:border-slate-600 px-6">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </main>

        {/* Footer - WebUtils Style */}
        <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-600 dark:text-slate-400">
              <p>© {new Date().getFullYear()} All Online Tools Hub</p>
              <div className="flex items-center gap-6">
                <Link to="/privacy-policy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy</Link>
                <Link to="/terms-of-service" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms</Link>
                <Link to="/sitemap" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Sitemap</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

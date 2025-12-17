import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function TermsOfService() {
  return (
    <>
      <Helmet>
        <title>Terms of Service - All Online Tools Hub | User Agreement</title>
        <meta name="description" content="Read the Terms of Service for All Online Tools Hub. Understand your rights and responsibilities when using our free online tools platform." />
        <meta name="keywords" content="terms of service, user agreement, terms and conditions, usage policy" />
        <link rel="canonical" href="https://allonlinetoolshub.com/terms-of-service" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
        <header className="border-b bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6">
            <Link to="/" className="inline-block">
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                All Online Tools Hub
              </h1>
            </Link>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12">
          <article className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
            <p className="text-muted-foreground mb-8">Last Updated: December 2024</p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing and using All Online Tools Hub, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services. These terms apply to all users, visitors, and anyone who accesses our tools.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Description of Service</h2>
              <p className="text-muted-foreground mb-4">
                All Online Tools Hub provides free, browser-based online tools for various purposes including but not limited to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                <li>Image processing and editing tools</li>
                <li>PDF manipulation and conversion tools</li>
                <li>Text editing and analysis tools</li>
                <li>Code formatting and development utilities</li>
                <li>File conversion and generation tools</li>
                <li>SEO and web development tools</li>
                <li>Mathematical calculators and converters</li>
              </ul>
              <p className="text-muted-foreground">
                All tools run entirely in your browser using client-side processing. We do not collect, store, or process your files on our servers.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">User Responsibilities</h2>
              <p className="text-muted-foreground mb-4">
                When using our services, you agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Use the tools only for lawful purposes and in accordance with these terms</li>
                <li>Not use our services to process illegal, harmful, or offensive content</li>
                <li>Not attempt to reverse engineer, decompile, or extract source code from our tools</li>
                <li>Not use automated systems or bots to access our services excessively</li>
                <li>Not attempt to interfere with or disrupt our services or servers</li>
                <li>Not violate any applicable local, state, national, or international law</li>
                <li>Respect intellectual property rights of others when processing content</li>
                <li>Take responsibility for verifying outputs before using them in critical applications</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Acceptable Use Policy</h2>
              <p className="text-muted-foreground mb-4">
                You may NOT use our tools to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Process copyrighted material without proper authorization</li>
                <li>Create, distribute, or process illegal content</li>
                <li>Generate spam, phishing content, or malicious code</li>
                <li>Violate privacy rights or process others' personal data without consent</li>
                <li>Harass, abuse, or harm others</li>
                <li>Impersonate any person or entity</li>
                <li>Spread misinformation or engage in fraudulent activities</li>
                <li>Overload our services or attempt denial-of-service attacks</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Free Service</h2>
              <p className="text-muted-foreground">
                All tools on All Online Tools Hub are provided completely free of charge. We do not require payment, registration, or subscription. However, we reserve the right to introduce paid features or premium versions in the future, with clear notice to users.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">No Warranty</h2>
              <p className="text-muted-foreground mb-4">
                Our services are provided "as is" and "as available" without any warranty of any kind, either express or implied, including but not limited to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Warranties of merchantability or fitness for a particular purpose</li>
                <li>Warranties of accuracy, reliability, or error-free operation</li>
                <li>Warranties of uninterrupted or secure access</li>
                <li>Warranties that tools will meet your specific requirements</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
              <p className="text-muted-foreground mb-4">
                To the maximum extent permitted by applicable law:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>We shall not be liable for any indirect, incidental, special, consequential, or punitive damages</li>
                <li>This includes damages for loss of profits, data, use, goodwill, or other intangible losses</li>
                <li>We are not liable for any damages resulting from your use or inability to use our services</li>
                <li>Our total liability for all claims shall not exceed the amount you paid us (which is $0)</li>
                <li>These limitations apply even if we have been advised of the possibility of such damages</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Data and Privacy</h2>
              <p className="text-muted-foreground mb-4">
                Your privacy is important to us:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>All file processing occurs locally in your browser</li>
                <li>We do not upload, store, or have access to your files</li>
                <li>Your files and data remain on your device at all times</li>
                <li>For more details, please review our Privacy Policy</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Intellectual Property</h2>
              <p className="text-muted-foreground mb-4">
                The All Online Tools Hub website, including its design, code, text, graphics, and tools, is protected by intellectual property laws:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>You may use the tools for personal and commercial purposes</li>
                <li>You may not copy, reproduce, or create derivative works of our platform</li>
                <li>You retain all rights to files you process using our tools</li>
                <li>We do not claim ownership of any content you create or process</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Service Modifications</h2>
              <p className="text-muted-foreground mb-4">
                We reserve the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Modify, suspend, or discontinue any tool or feature at any time</li>
                <li>Update these Terms of Service with or without notice</li>
                <li>Refuse service to anyone for any reason at any time</li>
                <li>Set usage limits or restrictions on certain tools</li>
                <li>Change the availability or features of our services</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Continued use of our services after changes constitutes acceptance of the modified terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Third-Party Links and Services</h2>
              <p className="text-muted-foreground">
                Our website may contain links to third-party websites or services. We are not responsible for the content, accuracy, or practices of third-party sites. Your use of third-party websites is at your own risk and subject to their terms and policies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Indemnification</h2>
              <p className="text-muted-foreground">
                You agree to indemnify, defend, and hold harmless All Online Tools Hub, its operators, and affiliates from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from your use of our services, violation of these terms, or violation of any rights of another party.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Termination</h2>
              <p className="text-muted-foreground">
                We may terminate or suspend your access to our services immediately, without prior notice, for any reason, including but not limited to breach of these Terms. Upon termination, your right to use our services will immediately cease.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Governing Law</h2>
              <p className="text-muted-foreground">
                These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law provisions. You agree to submit to the jurisdiction of the courts for resolution of any disputes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Severability</h2>
              <p className="text-muted-foreground">
                If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Entire Agreement</h2>
              <p className="text-muted-foreground">
                These Terms of Service, together with our Privacy Policy and Disclaimer, constitute the entire agreement between you and All Online Tools Hub regarding the use of our services.
              </p>
            </section>

            <section className="p-6 bg-primary/5 rounded-xl border border-primary/10">
              <h2 className="text-2xl font-bold mb-4">Contact</h2>
              <p className="text-muted-foreground">
                If you have any questions about these Terms of Service, please return to our home page. By using All Online Tools Hub, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
              </p>
            </section>
          </article>
        </main>

        <footer className="border-t bg-card/30 backdrop-blur-sm mt-12">
          <div className="container mx-auto px-4 py-6 text-center">
            <p className="text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary">Home</Link>
              {" • "}
              <Link to="/about" className="hover:text-primary">About Us</Link>
              {" • "}
              <Link to="/privacy-policy" className="hover:text-primary">Privacy Policy</Link>
              {" • "}
              <Link to="/disclaimer" className="hover:text-primary">Disclaimer</Link>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

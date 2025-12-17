import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function Disclaimer() {
  return (
    <>
      <Helmet>
        <title>Disclaimer - All Online Tools Hub | Terms and Conditions</title>
        <meta name="description" content="Read the disclaimer for All Online Tools Hub. Understand the terms, limitations, and important information about using our free online tools." />
        <meta name="keywords" content="disclaimer, terms, conditions, liability, online tools" />
        <link rel="canonical" href="https://allonlinetoolshub.com/disclaimer" />
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Disclaimer</h1>
            <p className="text-muted-foreground mb-8">Last Updated: December 2024</p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">General Information</h2>
              <p className="text-muted-foreground">
                The information and tools provided on All Online Tools Hub are for general informational and utility purposes only. While we strive to ensure accuracy and reliability, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the website or the tools provided.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Use at Your Own Risk</h2>
              <p className="text-muted-foreground mb-4">
                Your use of our tools and services is entirely at your own risk. We recommend:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Always keep backup copies of important files before processing</li>
                <li>Verify the output of any tool before using it in production or critical situations</li>
                <li>Test tools with non-critical data first to ensure they meet your needs</li>
                <li>Not relying solely on our tools for professional, legal, or financial decisions</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">No Professional Advice</h2>
              <p className="text-muted-foreground mb-4">
                The tools and information provided on this website do not constitute professional advice. Specifically:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li><strong>Legal:</strong> Our tools should not be used as a substitute for professional legal advice</li>
                <li><strong>Financial:</strong> Calculators and financial tools are for estimation purposes only</li>
                <li><strong>Medical:</strong> Health-related calculators are informational and not medical advice</li>
                <li><strong>Technical:</strong> Code and developer tools should be reviewed before production use</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Always consult with qualified professionals for specific advice related to your situation.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Accuracy and Reliability</h2>
              <p className="text-muted-foreground mb-4">
                While we make every effort to ensure our tools work correctly:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Tools are provided "as is" without warranty of any kind</li>
                <li>We cannot guarantee 100% accuracy for all inputs and scenarios</li>
                <li>Different browsers or devices may produce varying results</li>
                <li>Complex files or edge cases may not process correctly</li>
                <li>We continuously improve tools but cannot guarantee they're bug-free</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Data Processing</h2>
              <p className="text-muted-foreground mb-4">
                All tools run locally in your browser:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>We are not responsible for data processed through our tools</li>
                <li>You retain full ownership and responsibility for your files and data</li>
                <li>Ensure you have the right to process and modify any files you use</li>
                <li>We recommend not processing sensitive or confidential data without proper precautions</li>
                <li>Downloaded or processed files should be scanned for safety before use</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">External Links</h2>
              <p className="text-muted-foreground">
                Our website may contain links to external websites for reference or additional functionality. We have no control over the content, privacy policies, or practices of third-party sites. We are not responsible for any damages or losses caused by visiting external websites. We recommend reviewing the terms and policies of any third-party sites you visit.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
              <p className="text-muted-foreground mb-4">
                To the fullest extent permitted by law:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>We shall not be liable for any direct, indirect, incidental, consequential, or special damages</li>
                <li>This includes but is not limited to loss of data, loss of profits, or business interruption</li>
                <li>We are not liable for damages arising from the use or inability to use our tools</li>
                <li>We are not responsible for errors, omissions, or inaccuracies in tool outputs</li>
                <li>Our total liability shall not exceed the amount you paid to use our services (which is zero, as our services are free)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Browser Compatibility</h2>
              <p className="text-muted-foreground">
                Our tools are designed to work with modern web browsers. We cannot guarantee compatibility with all browsers, especially outdated versions. For the best experience, we recommend using the latest version of Chrome, Firefox, Safari, or Edge.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Service Availability</h2>
              <p className="text-muted-foreground mb-4">
                We strive to maintain continuous availability of our services, but:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>We do not guarantee uninterrupted access to the website or tools</li>
                <li>Maintenance, updates, or technical issues may cause temporary downtime</li>
                <li>We reserve the right to modify, suspend, or discontinue any tool without notice</li>
                <li>We are not liable for any losses resulting from service interruptions</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Intellectual Property</h2>
              <p className="text-muted-foreground">
                All content on this website, including but not limited to text, graphics, logos, and software, is the property of All Online Tools Hub or its content suppliers. The tools themselves are provided free for use, but the underlying code and design remain our intellectual property.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Changes to This Disclaimer</h2>
              <p className="text-muted-foreground">
                We reserve the right to modify this disclaimer at any time. Changes will be posted on this page with an updated date. Continued use of our services after changes constitutes acceptance of the revised disclaimer.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Governing Law</h2>
              <p className="text-muted-foreground">
                This disclaimer shall be governed by and construed in accordance with applicable laws. Any disputes arising from the use of our services shall be subject to the exclusive jurisdiction of the appropriate courts.
              </p>
            </section>

            <section className="p-6 bg-primary/5 rounded-xl border border-primary/10">
              <h2 className="text-2xl font-bold mb-4">Contact</h2>
              <p className="text-muted-foreground">
                If you have questions about this disclaimer, please return to our home page. By using All Online Tools Hub, you acknowledge that you have read, understood, and agree to this disclaimer.
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
              <Link to="/terms-of-service" className="hover:text-primary">Terms of Service</Link>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

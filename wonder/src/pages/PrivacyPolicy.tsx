import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - All Online Tools Hub | Your Data Stays Private</title>
        <meta name="description" content="Read our privacy policy. All Online Tools Hub processes all data locally in your browser. We don't collect, store, or share your personal information or files." />
        <meta name="keywords" content="privacy policy, data privacy, browser-based tools, no tracking, privacy-focused" />
        <link rel="canonical" href="https://allonlinetoolshub.com/privacy-policy" />
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground mb-8">Last Updated: December 2024</p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Our Privacy Commitment</h2>
              <p className="text-muted-foreground">
                At All Online Tools Hub, your privacy is our top priority. We've built our platform with privacy-first principles, ensuring that your data remains yours and yours alone.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">How Our Tools Work</h2>
              <p className="text-muted-foreground mb-4">
                All tools on our platform run entirely in your web browser using client-side JavaScript. This means:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                <li>Your files are processed locally on your device</li>
                <li>Nothing is uploaded to our servers</li>
                <li>We cannot access, view, or store your files</li>
                <li>Your data never leaves your device</li>
                <li>All processing happens in real-time in your browser</li>
              </ul>
              <p className="text-muted-foreground">
                This browser-based approach ensures complete privacy and security for all your files and data.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Information We Do NOT Collect</h2>
              <p className="text-muted-foreground mb-4">
                We do not collect, store, or process:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Files you upload or process using our tools</li>
                <li>Personal information such as names, email addresses, or phone numbers</li>
                <li>User accounts or login credentials (we don't have user accounts)</li>
                <li>Payment information (all tools are free)</li>
                <li>Location data or device information</li>
                <li>Browsing history or search queries</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Analytics and Cookies</h2>
              <p className="text-muted-foreground mb-4">
                We may use basic analytics tools to understand how our platform is used, which helps us improve our services. This may include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                <li>Aggregate usage statistics (e.g., number of visitors, popular tools)</li>
                <li>General geographic information (country/region level only)</li>
                <li>Browser type and device category</li>
                <li>Pages visited and time spent on the site</li>
              </ul>
              <p className="text-muted-foreground mb-4">
                We use cookies only for essential functionality and analytics. We do not use cookies for tracking or advertising purposes.
              </p>
              <p className="text-muted-foreground">
                You can disable cookies in your browser settings at any time. Most of our tools will continue to work without cookies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Third-Party Services</h2>
              <p className="text-muted-foreground mb-4">
                Our website may use third-party services for:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                <li>Website hosting and content delivery</li>
                <li>Anonymous usage analytics</li>
                <li>Performance monitoring</li>
              </ul>
              <p className="text-muted-foreground">
                These services may collect limited technical information but do not have access to your files or personal data processed through our tools.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Data Security</h2>
              <p className="text-muted-foreground mb-4">
                Since all processing happens locally in your browser:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Your data is protected by your browser's security features</li>
                <li>Files are processed in temporary memory and cleared when you close the tool</li>
                <li>No data is transmitted to external servers</li>
                <li>HTTPS encryption protects your connection to our website</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Children's Privacy</h2>
              <p className="text-muted-foreground">
                Our services are available to users of all ages. Since we don't collect personal information, there is no special consideration needed for children's privacy. Parents and guardians can rest assured that no personal data is collected from users of any age.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
              <p className="text-muted-foreground">
                We may update this privacy policy from time to time to reflect changes in our practices or for legal reasons. We will post any changes on this page with an updated "Last Updated" date. We encourage you to review this policy periodically.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
              <p className="text-muted-foreground mb-4">
                Since we don't collect or store personal data:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>There is no personal data to request, access, or delete</li>
                <li>You maintain complete control over your files at all times</li>
                <li>You can use our tools without providing any personal information</li>
                <li>You can stop using our services at any time without any consequences</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <p className="text-muted-foreground">
                If you have questions about this privacy policy or our privacy practices, please visit our contact page or return to the home page to explore our tools.
              </p>
            </section>

            <section className="p-6 bg-primary/5 rounded-xl border border-primary/10">
              <h2 className="text-2xl font-bold mb-4">Summary</h2>
              <p className="text-muted-foreground">
                <strong>In short:</strong> We respect your privacy completely. All tools run in your browser, we don't collect your files or personal information, and your data never leaves your device. Use our tools with complete confidence and peace of mind.
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
              <Link to="/disclaimer" className="hover:text-primary">Disclaimer</Link>
              {" • "}
              <Link to="/terms-of-service" className="hover:text-primary">Terms of Service</Link>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

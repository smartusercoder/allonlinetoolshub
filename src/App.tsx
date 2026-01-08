const categories = [
  { title: 'PDF', description: 'Merge, split, compress, and convert documents.', count: '120+ tools' },
  { title: 'Images', description: 'Resize, crop, compress, and enhance visuals.', count: '180+ tools' },
  { title: 'Video', description: 'Trim, convert, and optimize clips in seconds.', count: '60+ tools' },
  { title: 'Audio', description: 'Extract, compress, and format sound files.', count: '45+ tools' },
  { title: 'Text', description: 'Clean, format, and transform content.', count: '90+ tools' },
  { title: 'Developer', description: 'Encode, decode, and test quickly.', count: '110+ tools' },
  { title: 'Design', description: 'Color, typography, and layout helpers.', count: '70+ tools' },
  { title: 'Utilities', description: 'Daily helpers for productivity tasks.', count: '150+ tools' },
]

const featuredTools = [
  {
    title: 'PDF to Word',
    description: 'Turn PDFs into fully editable documents with layout preserved.',
    badge: 'Popular',
  },
  {
    title: 'Image Compressor',
    description: 'Shrink images while keeping crisp quality for web use.',
    badge: 'Editor pick',
  },
  {
    title: 'Background Remover',
    description: 'Remove backgrounds in one click for product shots.',
    badge: 'New',
  },
  {
    title: 'Video Trimmer',
    description: 'Cut and export clips without watermarks.',
    badge: 'Trending',
  },
  {
    title: 'Text Summarizer',
    description: 'Summarize long articles and reports instantly.',
    badge: 'AI',
  },
  {
    title: 'QR Generator',
    description: 'Create QR codes for URLs, WiFi, and contact cards.',
    badge: 'Free',
  },
]

const stats = [
  { label: 'Tools available', value: '1,500+' },
  { label: 'Monthly users', value: '3.2M' },
  { label: 'Average rating', value: '4.9/5' },
  { label: 'Countries served', value: '180+' },
]

const highlights = [
  {
    title: 'Instant, in-browser processing',
    description: 'Most tools run fully in your browser so your files stay private.',
  },
  {
    title: 'Zero setup',
    description: 'No downloads or installs—open a tool and start working.',
  },
  {
    title: 'Designed for speed',
    description: 'Clean layouts with a focused workflow to finish tasks fast.',
  },
]

const workflows = [
  {
    step: '1',
    title: 'Choose a tool',
    description: 'Browse categories or search for exactly what you need.',
  },
  {
    step: '2',
    title: 'Drop your file',
    description: 'Upload a file or paste content directly into the tool.',
  },
  {
    step: '3',
    title: 'Download instantly',
    description: 'Get results immediately with no account required.',
  },
]

export const App = () => {
  return (
    <div className="page">
      <header className="topbar">
        <div className="logo">All Online Tools Hub</div>
        <nav className="nav-links">
          <a href="#tools">Tools</a>
          <a href="#categories">Categories</a>
          <a href="#how">How it works</a>
          <a href="#pricing">Pricing</a>
        </nav>
        <div className="topbar-actions">
          <button className="ghost-button">Log in</button>
          <button className="primary-button">Get started</button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <div className="hero-pill">1500+ free tools • No signup needed</div>
            <h1>Everything you need to work with files, fast.</h1>
            <p>
              A clean, privacy-first toolbox for creators, teams, and everyday tasks. Convert PDFs, polish
              images, trim videos, and automate text work in seconds.
            </p>
            <div className="hero-actions">
              <button className="primary-button">Explore all tools</button>
              <button className="outline-button">Upload a file</button>
            </div>
            <div className="hero-stats">
              {stats.map((item) => (
                <div key={item.label} className="stat-card">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-panel">
            <div className="search-card">
              <div className="search-label">Find the right tool</div>
              <div className="search-input">
                <span>🔍</span>
                <input placeholder="Search tools like PDF to Word, compress image…" />
              </div>
              <div className="quick-tags">
                {['PDF', 'Images', 'Video', 'AI', 'Convert', 'Compress'].map((tag) => (
                  <button key={tag} className="tag">{tag}</button>
                ))}
              </div>
              <div className="search-footer">
                <span>Trusted by 3M+ people monthly</span>
                <button className="link-button">See most popular →</button>
              </div>
            </div>
            <div className="hero-grid">
              {featuredTools.slice(0, 3).map((tool) => (
                <div key={tool.title} className="mini-card">
                  <div className="mini-card-head">
                    <span>{tool.title}</span>
                    <span className="badge">{tool.badge}</span>
                  </div>
                  <p>{tool.description}</p>
                  <button className="ghost-button">Open tool</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="categories" className="section">
          <div className="section-header">
            <h2>Browse by category</h2>
            <p>Everything you need organized into clear, focused collections.</p>
          </div>
          <div className="category-grid">
            {categories.map((category) => (
              <article key={category.title} className="category-card">
                <h3>{category.title}</h3>
                <p>{category.description}</p>
                <span>{category.count}</span>
              </article>
            ))}
          </div>
        </section>

        <section id="tools" className="section section-alt">
          <div className="section-header">
            <h2>Featured tools</h2>
            <p>Discover the tools teams use every day to ship faster.</p>
          </div>
          <div className="tool-grid">
            {featuredTools.map((tool) => (
              <article key={tool.title} className="tool-card">
                <div className="tool-card-header">
                  <h3>{tool.title}</h3>
                  <span className="badge">{tool.badge}</span>
                </div>
                <p>{tool.description}</p>
                <button className="primary-button">Try now</button>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="how">
          <div className="section-header">
            <h2>Simple workflow</h2>
            <p>Finish tasks in minutes with a clear step-by-step flow.</p>
          </div>
          <div className="workflow">
            {workflows.map((item) => (
              <div key={item.title} className="workflow-card">
                <div className="workflow-step">{item.step}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section section-dark" id="pricing">
          <div className="pricing-content">
            <div>
              <h2>Free for individuals. Powerful for teams.</h2>
              <p>
                Start with everything you need at no cost. Upgrade when you need shared workspaces,
                automation, and advanced export options.
              </p>
              <div className="pricing-actions">
                <button className="primary-button">Start free</button>
                <button className="outline-button">Compare plans</button>
              </div>
            </div>
            <div className="pricing-grid">
              {highlights.map((item) => (
                <div key={item.title} className="pricing-card">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div>
          <div className="logo">All Online Tools Hub</div>
          <p>Modern, privacy-first tools for creators and teams.</p>
        </div>
        <div className="footer-links">
          <div>
            <h4>Product</h4>
            <a href="#tools">Tool directory</a>
            <a href="#categories">Categories</a>
            <a href="#pricing">Pricing</a>
          </div>
          <div>
            <h4>Company</h4>
            <a href="/">About</a>
            <a href="/">Careers</a>
            <a href="/">Contact</a>
          </div>
          <div>
            <h4>Resources</h4>
            <a href="/">Support</a>
            <a href="/">Community</a>
            <a href="/">Status</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

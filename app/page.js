import Link from 'next/link';
import AosInitializer from '@/components/AosInitializer';
import TerminalPuzzle from '@/components/TerminalPuzzle';

export default function Home() {
  return (
    <>
      <AosInitializer />
      
      {/* HERO SECTION */}
      <section className="hero" id="home">
        <div className="hero-content" data-aos="fade-in" data-aos-delay="200">
          <h1>Decode Anime. <span>Master Real Life.</span></h1>
          <p>Anipreneur decodes characters and concepts from your favorite anime to give you actionable strategies for self-improvement, learning, and psychology.</p>
          <a href="#about" className="btn">Learn More <i className="fas fa-arrow-down"></i></a>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="container">
        <h2 data-aos="fade-up">What to <span>Expect</span></h2>
        <div className="about-content">
            <ul className="features-list">
                <li data-aos="fade-up" data-aos-delay="100"><i className="fas fa-user-ninja"></i><div><h3>In-depth Character Breakdowns</h3><p>Explore the mindset, skills, and strategies of characters like Ayanokoji, Lelouch, and Light Yagami.</p></div></li>
                <li data-aos="fade-up" data-aos-delay="200"><i className="fas fa-brain"></i><div><h3>Anime Concept Analysis</h3><p>We analyze key anime concepts and show you how they apply to self-improvement, learning, and psychology.</p></div></li>
                <li data-aos="fade-up" data-aos-delay="300"><i className="fas fa-gamepad"></i><div><h3>Actionable Life Guides</h3><p>Get practical, step-by-step guides inspired by anime to help you level up your own life.</p></div></li>
            </ul>
        </div>
      </section>

      {/* PR STUNT / TERMINAL PUZZLE SECTION */}
      <section id="pr-stunt" className="container">
          <TerminalPuzzle />
      </section>

      {/* FEATURED VIDEOS SECTION */}
      <section id="videos" className="container">
          <h2 data-aos="fade-up">Featured <span>Videos</span></h2>
          <div className="video-grid">
              <div className="video-card" data-aos="fade-up" data-aos-delay="100"><div className="video-thumbnail"><iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe></div><div className="video-info"><h3>The Ayanokoji Mindset: A Deep Dive</h3><p>Unpacking the cold, calculated, and effective strategies of the Classroom of the Elite's protagonist.</p></div></div>
              <div className="video-card" data-aos="fade-up" data-aos-delay="200"><div className="video-thumbnail"><iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe></div><div className="video-info"><h3>Leveling Up: How Isekai Teaches Real-World Skills</h3><p>Beyond the tropes, what can we learn from isekai protagonists about rapid skill acquisition and adaptation?</p></div></div>
              <div className="video-card" data-aos="fade-up" data-aos-delay="300"><div className="video-thumbnail"><iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe></div><div className="video-info"><h3>The Psychology of Shonen: Beyond 'Friendship Power'</h3><p>A look into the psychological principles of resilience, grit, and motivation that power our favorite heroes.</p></div></div>
          </div>
      </section>

      {/* BLOG/INSIGHTS TEASER */}
      <section id="blog" className="container">
          <h2 data-aos="fade-up">Insights & <span>Strategies</span></h2>
          <div className="blog-grid">
              <div className="blog-card" data-aos="fade-up" data-aos-delay="100"><h3>The Art of Manipulation vs. Influence</h3><p>A comparative analysis of Lelouch vi Britannia and Naruto Uzumaki's methods of leadership.</p><Link href="/blog/the-art-of-manipulation-vs-influence" className="read-more">Read More →</Link></div>
              <div className="blog-card" data-aos="fade-up" data-aos-delay="200"><h3>Applying 'The Flow State' like a Sports Anime Pro</h3><p>How to enter a state of peak performance by learning from characters in Haikyuu!! and Kuroko's Basketball.</p><Link href="/blog/the-art-of-manipulation-vs-influence" className="read-more">Read More →</Link></div>
              <div className="blog-card" data-aos="fade-up" data-aos-delay="300"><h3>Building Your Own 'Nakama': The Science of Strong Bonds</h3><p>Lessons from the Straw Hat Pirates on building a loyal and effective team in your personal and professional life.</p><Link href="/blog/the-art-of-manipulation-vs-influence" className="read-more">Read More →</Link></div>
          </div>
      </section>

      {/* FINAL CTA */}
      <section className="container">
          <div className="cta-section" data-aos="zoom-in">
              <h2>Ready to Master the Game?</h2>
              <p>Subscribe for regular insights and join a community dedicated to turning anime wisdom into real-life success. Your journey starts now.</p>
              <a href="https://www.youtube.com/@Anipreneur" target="_blank" className="btn">Subscribe on YouTube <i className="fab fa-youtube"></i></a>
          </div>
      </section>
    </>
  );
}
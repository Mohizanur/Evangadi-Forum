import "./About.css";

function About() {
  return (
    <div className="about-container">
      <div className="about-content">
        <h2>About Evangadi Networks</h2>
        <div className="about-section">
          <h3>Our Mission</h3>
          <p>
            Evangadi Networks is dedicated to creating a collaborative learning
            environment where students can help each other grow through
            knowledge sharing and mutual support.
          </p>
        </div>

        <div className="about-section">
          <h3>What We Do</h3>
          <p>We provide a platform where:</p>
          <ul>
            <li>Students can ask and answer questions</li>
            <li>Share programming knowledge and experiences</li>
            <li>Build a supportive tech community</li>
            <li>Network with fellow developers</li>
          </ul>
        </div>

        <div className="about-section">
          <h3>Join Our Community</h3>
          <p>
            Be part of our growing network of developers and tech enthusiasts.
            Share your knowledge, learn from others, and grow together.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;

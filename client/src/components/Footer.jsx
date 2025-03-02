import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Useful Link</h3>
          <ul>
            <li>
              <a href="https://www.evangadi.com/explained/">How it works</a>
            </li>
            <li>
              <a href="https://www.evangadi.com/legal/terms/">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="https://www.evangadi.com/legal/privacy/">
                Privacy policy
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact Info</h3>
          <ul>
            <li>Evangadi Networks</li>
            <li>support@evangadi.com</li>
            <li>+1-202-386-2702</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Social Links</h3>
          <div className="social-links">
            <a href="https://www.facebook.com/evangaditech">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://www.instagram.com/evangaditech">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.youtube.com/c/evangaditech">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

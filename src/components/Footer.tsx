import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-brand">
            <a href="#" className="logo">
              <h1>MovieRatings</h1>
            </a>
            <p className="footer-text">
              Urna ratione ante harum provident, eleifend, vulputate molestiae
              proin fringilla, praesentium magna conubia at perferendis,
              pretium, aenean aut ultrices.
            </p>
          </div>
          <div className="footer-contact">
            <h4 className="contact-title">Contact Us</h4>
            <p className="contact-text">Feel free to contact and reach us !!</p>
            <ul className="list-icons-items">
              <li className="contact-item">
                <i className="fa fa-phone"></i>
                <a href="tel:+01123456790" className="contact-link">
                  +01 (123) 4567 90
                </a>
              </li>
              <li className="contact-item">
                <i className="fa fa-envelope"></i>
                <a href="mailto:info.tourly.com" className="contact-link">
                  info.movieratings.com
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-form">
            <p className="form-text">
              Subscribe our newsletter for more updates & news !!
            </p>
            <form action="" className="form-wrapper">
              <input
                type="email"
                name="email"
                className="input-field"
                placeholder="Enter Your Email"
                required
              />
              <button type="submit" className="submit-button-footer">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
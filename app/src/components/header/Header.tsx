import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

export default () => {
  return (
    <header className="header">
      <div>
        <ul className="social-icons align-right">
          <li className="facebook">
            <a
              href="https://www.facebook.com/victoriachristadelphians/"
              title="Like me on Facebook"
            >
              <i className="fab fa-facebook-f"></i>
              <span className="assistive-text">Like me on Facebook</span>
            </a>
          </li>
          <li className="youtube">
            <a
              href="https://youtube.com/channel/UCGtl-CSoulrUZteWdfZ00Nw"
              title="Subscribe to me on YouTube"
            >
              <i className="fab fa-youtube"></i>
              <span className="assistive-text">Subscribe to me on YouTube</span>
            </a>
          </li>
          <li>
            <Link to="/admin/media">a</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

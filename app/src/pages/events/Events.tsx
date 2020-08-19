import React from "react";
import "./Events.css";
import { Link } from "react-router-dom";

export default () => {
  return (
    <div>
      <h1>Events</h1>
      <p>
        Currently we are conducting some weekly events online with{" "}
        <a href="https://zoom.us" target="_blank" rel="noopener noreferrer">
          Zoom
        </a>{" "}
        – video/audio conferencing software.
      </p>

      <p>
        <span className="bold">Mac/Windows/Linux</span>: To install on your
        computer, visit the Zoom{" "}
        <a
          href="https://zoom.us/download"
          target="_blank"
          rel="noopener noreferrer"
        >
          download page
        </a>{" "}
        and download the “Zoom Client for Meetings.”
      </p>

      <p>
        <span className="bold">iOS/Android</span>: To install on your
        phone/tablet, visit the App Store (iOS) or the Google Play Store
        (Android) and install the “Zoom Cloud Meetings” app.
      </p>

      <p className="italics">
        You do not need to sign up for an account, just open the app, and enter
        the Meeting ID to join the meeting.
      </p>

      <h2>Virtual Events Currently Offered</h2>
      <h3>Memorial Service</h3>

      <p>
        We currently offer a virtual memorial service via Zoom on Sundays at
        11AM Pacific Time (10AM July-August) to our members, members of other
        Christadelphian churches and interested non-members (please{" "}
        <Link to="/contact">contact us</Link> to say hello and for the Zoom
        meeting ID). Please note the following order of service:
      </p>

      <ul>
        <li>Welcome</li>
        <li>Hymn</li>
        <li>Prayer</li>
        <li>Announcements</li>
        <li>2 scripture readings</li>
        <li>Exhortation</li>
        <li>
          Bread and Wine
          <br />
          <span className="small-note">
            Please Note: The bread and wine is intended for members of our
            church only. Feel free to reach out and discuss this with us!
          </span>
        </li>
        <li>Hymn</li>
        <li>Closing Prayer</li>
      </ul>

      <p>
        Note to our members: We are able to accept donations electronically, or
        by mail. <Link to="/donate">See details</Link>.
      </p>

      <p>
        Missed the memorial service? Video recordings are{" "}
        <Link to="/audio">uploaded weekly</Link>.
      </p>
    </div>
  );
};

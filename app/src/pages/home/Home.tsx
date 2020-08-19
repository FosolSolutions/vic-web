import React from "react";
import "./Home.css";

export default () => {
  return (
    <div>
      <img
        alt="Bible"
        src={
          process.env.PUBLIC_URL +
          "/images/arto-marttinen-small-cropped-text-1-1024x334.jpg"
        }
      />
      <div className="text">
        <p>
          We hold to beliefs which reflect the simple teaching of Jesus Christ
          and his Apostles. Our rule of life is to follow in the footsteps of
          Jesus and his disciples.
        </p>
        <p>
          Our hopes are centred upon the return of Jesus, when he will bring
          everlasting life to the faithful and set up on earth the long-promised
          Kingdom of God, which will be the restored Kingdom of Israel under
          divine leadership.
        </p>
        <p className="red bold">
          Unfortunately due to the COVID-19 pandemic and the related provincial
          restrictions on public gatherings and social distancing measures, our
          regular public gatherings are suspended until further notice.
        </p>
        <p className="bold">
          We will continue to offer a memorial service Sundays at 11AM Pacific
          Time (10AM July-August), provided primarily online, and hope to add
          further events soon. Please see our Events page for more information.
        </p>
      </div>
      <div className="map">
        <iframe
          title="Directions"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d42323.18268968333!2d-123.344714!3d48.471898!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x548f73db12906889%3A0x15d13f16bb60f696!2s1396%20McKenzie%20Ave%2C%20Victoria%2C%20BC%20V8P%202M3%2C%20Canada!5e0!3m2!1sen!2sus!4v1597861745461!5m2!1sen!2sus"
          width="400"
          height="300"
          style={{ border: 0 }}
          aria-hidden="false"
        ></iframe>
      </div>
    </div>
  );
};

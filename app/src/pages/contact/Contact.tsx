import React from "react";

export default () => {
  return (
    <div>
      <div>
        <div>
          <span className="bold">Please contact us if you:</span>
          <ul>
            <li>Wish to register for one of our online meetings or seminars</li>
            <li>Need a bible</li>
            <li>Would like free bible literature</li>
          </ul>
        </div>
        <div>
          <label>Name</label>
          <span className="red">*</span>
          <div>
            <input name="firstName"></input>
          </div>
          <div>
            <input name="lastName"></input>
          </div>
        </div>
        <div>
          <label>Email</label>
          <span className="red">*</span>
          <input name="email"></input>
        </div>
        <div>
          <label>Subject</label>
          <span className="red">*</span>
          <input name="subject"></input>
        </div>
        <div>
          <label>Message</label>
          <span className="red">*</span>
          <textarea name="message"></textarea>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </div>
      <div>
        <aside id="text-3" className="widget widget_text">
          <h3 className="widget-title">The Victoria Christadelphians</h3>
          <div className="textwidget">
            <p>
              <strong>OUR ADDRESS:</strong>
              <br />
              1396 McKenzie Avenue
              <br />
              Victoria BC, Canada, V8P 2M3
            </p>
            <p>
              <strong>OUR PHONE:</strong>
              <br />
              250.477.2112
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

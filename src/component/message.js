import React from 'react';
import '../App.css';

const Message = () => {
  return (
    <section id="about" className="message-section">
      <div className="message-inner">
        <p className="message-eyebrow">Designed By</p>
        <h2 className="message-heading">Alexa Wynn</h2>
        <p className="message-body">
          Introducing Alexandra Sticklen, the visionary force behind Alexa Wynn Pty Ltd and the enchanting Destiny Chic brand.
          With a fervent dedication to crafting the finest formal and wedding gowns, Alexandra is on a mission to celebrate the
          inherent beauty of women in all their diverse shapes and sizes through her fashion-forward designs.
        </p>
        <p className="message-body">
          Her aspiration? To weave magic into each creation, offering wearers a once-in-a-lifetime gown that encapsulates the
          essence of their most important moments, be it a formal affair, wedding celebration, milestone birthday, engagement
          soirée, or glamorous beauty pageant.
        </p>
        <a href="#alexa-story" className="message-link">Read More of Alexa&apos;s Story</a>
      </div>
    </section>
  );
};

export default Message;

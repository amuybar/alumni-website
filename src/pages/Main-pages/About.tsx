import React from 'react';
import '../../styles/About.css'


const About= () => {
  return (
    <div className="about-page">
      <h1>About STAMSS Alumni and Sacco Website</h1>
      <p>
        Welcome to the official website of the STAMSS Alumni and Sacco. This platform is designed to connect and engage alumni, promote camaraderie, and support the continued growth and development of our alma mater.
      </p>

      <h2>A Brief History</h2>
      <p>
        STAMSS, established in 2002, is a renowned secondary school located in the heart of Mlimani. With a rich history of academic excellence and extracurricular achievements, STAMSS has produced countless successful individuals who have gone on to make significant contributions in various fields.
      </p>

      <h2>The Website</h2>
      <p>
        This website serves as a hub for all alumni-related activities and information. It offers a variety of features, including:
      </p>
      <ol>
        <li>
          <strong><a href='/directory'>Alumni Directory</a></strong>: A comprehensive database of alumni, allowing you to reconnect with old classmates and expand your professional network.
        </li>
        <li>
          <strong><a href='/news'>News and Updates</a></strong>: Stay informed about the latest news from STAMSS, including upcoming events, school achievements, and alumni success stories.
        </li>
        <li>
          <strong><a href='/sacco'>Sacco Services</a></strong>: Access various financial services offered by the Sacco, designed to support alumni and their families.
        </li>
        <li>
          <strong><a href='/forum'>Discussion Forums</a></strong>: Engage in meaningful conversations with fellow alumni, share experiences, and exchange ideas.
        </li>
      </ol>

      <h2>Frequently Asked Questions (FAQs)</h2>
      <h3>Q: Who can join the STAMSS Alumni and Sacco?</h3>
      <p>
        A: All former students of STAMSS are eligible to join the <a href='/profile'>Alumni</a> and Sacco.
        While every Willing member can join the <a href='/sacco'>sacco</a>.
      </p>
      <h3>Q: How do I register on the website?</h3>
      <p>
        A: Click on '<a href='/profile'>Create a Website Account</a>' on the homepage and follow the instructions. You'll be able to manage your notification subscriptions and save form progress.
      </p>
      <h3>Q: What benefits do I get from joining the Sacco?</h3>
      <p>
        A: The Sacco offers a variety of financial services, including <a>loans</a> and <a href='/sacco'>savings plans</a>, designed to support alumni and their families.
      </p>
    </div>
  );
};

export default About;
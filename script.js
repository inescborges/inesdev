const card = document.querySelector(".card-inner");
const content = document.getElementById("card-expand");
const tabs = document.querySelectorAll(".tabs button");

const projects = {
  p1: `
    <div class="content-inner">
      <h2>Interactive 3D Apartment</h2>
      <hr />

      <div class="project-layout">
        
        <div class="project-media">
          <div class="video-wrapper">
    
            <div class="video-loader">
              <div class="spinner"></div>
            </div>

            <video 
              id="house-video"
              autoplay 
              muted 
              loop 
              playsinline 
              preload="auto"
            >
              <source src="assets/house-tour-demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

          </div>
        </div>

        <div class="project-text">
          <p>
            This project started as a personal exploration inspired by buying my own apartment.
            It came as an opportunity to finally put my hands on Three.js, R3F and Blender.
          </p>

          <p>
            The focus was on gaining practical experience by building a real, navigable 3D space in the browser,
            exploring interaction, performance, and playful spatial design.
          </p>

          <p>
            The space mixes everyday domestic elements with playful and slightly uncanny interactions.
          </p>

          <p>
            The project is available as a 
            <a href="https://house.inesdev.space" target="_blank" rel="noopener noreferrer">
              live interactive experience</a>, 
            with the source code on 
            <a href="https://github.com/inescborges/house-tour" target="_blank" rel="noopener noreferrer">
              GitHub</a>.
          </p>
          <p>Stack: Three.js + R3F + Blender</p>
        </div>

      </div>
    </div>

  `,

  p2: async () => {
    const res = await fetch("partials/barter-app.html");
    const html = await res.text();

    content.innerHTML = `
      <div class="content-inner">
        <h2>Barter App — Concept Project</h2>
        <hr />
        <p>(<strong>Barter</strong> <em>n.</em> The exchange of goods or services without the use of money.)</p>
        <p>
          A mobile app concept where users list what they can offer and what they need.
          The system suggests fair matches and lets people connect directly to arrange exchanges.        </p>
        <p>
           This is a personal idea I’ve had for a long time and would like to start developing in my spare time.
        </p>
        <p>
          The goal is to promote conscious consumption, community exchange, and reduced reliance on money.
        </p>
        ${html}
      </div>
    `;
  },

  p3: `
    <div class="content-inner">
      <h2>About me</h2>
      <hr />
      <p>Hi Hello! Happy to have you around here.</p>
      <p>My name is Inês, a Lisbon-based web developer passionate about the space where technology meets design. I care about thoughtful interfaces, clean systems, and products that feel considered.</p>
      <p>I also love creating silly little things that serve no purpose other than lifting the mood of everyday life.</p>
      <ul class="contact-list">
      <li>
        <a href="https://www.linkedin.com/in/inescborges/" target="_blank" rel="noopener">
          LinkedIn
        </a>
      </li>
      <li>
        <a href="/assets/ines-borges-cv.pdf" target="_blank">
          Download CV
        </a>
      </li>
      <li>
        <a href="mailto:inescandeiasb@gmail.com">
          inescandeiasb@gmail.com
        </a>
      </li>
    </ul>
    </div>
  `,
};

tabs.forEach((tab) => {
  tab.addEventListener("click", async () => {
    const key = tab.dataset.tab;
    const isActive = tab.classList.contains("active");

    // reset tabs
    tabs.forEach((t) => t.classList.remove("active"));

    // close
    if (isActive) {
      card.classList.remove("is-open");
      content.innerHTML = "";
      return;
    }

    // open
    tab.classList.add("active");

    const project = projects[key];
    if (typeof project === "function") {
      await project();
    } else {
      content.innerHTML = project;
    }

    card.classList.add("is-open");

    const video = document.getElementById("house-video");
    if (video) {
      const wrapper = video.closest(".video-wrapper");

      video.addEventListener(
        "canplaythrough",
        () => {
          wrapper.classList.add("is-ready");
        },
        { once: true },
      );
    }
  });
});

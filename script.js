const birthdayDetails = {
  name: "Chandrika Kondamudi",
  sender: "Craig Marowa",
  memories: [
    {
      title: "Your kind of magic",
      text: "You have a way of making ordinary conversations feel like the best part of the day."
    },
    {
      title: "The good laughs",
      text: "Somehow, even from miles away, you still know how to make me laugh."
    },
    {
      title: "Simply being you",
      text: "Your warmth, your humor, and the way you show up for people matter more than you know."
    }
  ],
  reminders: [
    "You make the world feel a little kinder just by being in it.",
    "You deserve the same joy you so easily bring to other people.",
    "Distance doesn't make a good friendship any less real.",
    "Your laugh is an excellent reason to call someone today."
  ],
  closingMessage:
    "I'm really glad we became friends. My best wishes for a year filled with new things to look forward to, plenty of reasons to laugh, and people who remind you how appreciated you are.",
  signoff: "Happy birthday — with love,"
};

const heroName = document.querySelector("#hero-name");
const memoryGrid = document.querySelector("#memory-grid");
const reminderText = document.querySelector("#reminder-text");
const closingMessage = document.querySelector("#closing-message");
const signoff = document.querySelector("#signoff");
const scrapbook = document.querySelector("#scrapbook");
const closing = document.querySelector("#closing");
const birthdayMusic = document.querySelector("#birthday-music");
const musicToggle = document.querySelector("#music-toggle");
const musicLabel = document.querySelector("#music-label");
const musicIcon = document.querySelector("#music-icon");
const musicStatus = document.querySelector("#music-status");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (prefersReducedMotion.matches) {
  birthdayMusic.removeAttribute("autoplay");
  birthdayMusic.pause();
}

const ambientGlitter = document.querySelector("#ambient-glitter");
const glitterColors = ["#e7b66e", "#eaa8a0", "#dcd2ec", "#cbd9cb"];
const balloonLayer = document.querySelector("#balloon-pop-layer");
const balloonWishToast = document.querySelector("#balloon-wish-toast");
const birthdayWishes = [
  "Best wishes for a year full of laughter and lovely surprises!",
  "May today bring you all the happiness you deserve!",
  "Here's to bright days, big smiles, and wonderful new memories!",
  "Wishing you a birthday as lovely and special as you are!",
  "May this next year be your happiest one yet!"
];
const balloonColors = ["#eaa8a0", "#d4a7c8", "#e7bd76", "#a9c3b0", "#9cb9d0"];
let balloonWishIndex = 0;
let balloonToastTimer;

const balloonPositions = [
  { side: "left", top: "35%", size: "54px" },
  { side: "right", top: "27%", size: "48px" },
  { side: "left", top: "70%", size: "46px" },
  { side: "right", top: "61%", size: "56px" },
  { side: "right", top: "84%", size: "42px" }
];

balloonPositions.forEach((position, index) => {
  const balloon = document.createElement("button");
  balloon.className = "pop-balloon";
  balloon.type = "button";
  balloon.setAttribute("aria-label", "Pop a birthday balloon");
  balloon.style.setProperty(`--${position.side}`, index % 2 === 0 ? "2%" : "3%");
  balloon.style.setProperty("--top", position.top);
  balloon.style.setProperty("--size", position.size);
  balloon.style.setProperty("--balloon-color", balloonColors[index % balloonColors.length]);
  balloon.style.setProperty("--float-delay", `${index * -0.8}s`);
  balloon.innerHTML = '<span aria-hidden="true">✦</span>';

  balloon.addEventListener("click", () => {
    if (balloon.classList.contains("is-popped")) {
      return;
    }

    balloon.classList.add("is-popped");
    balloon.setAttribute("aria-label", "Balloon popped. Pop it again!");
    balloonWishToast.textContent = birthdayWishes[balloonWishIndex % birthdayWishes.length];
    balloonWishToast.dataset.visible = "true";
    balloonWishIndex += 1;

    window.clearTimeout(balloonToastTimer);
    balloonToastTimer = window.setTimeout(() => {
      delete balloonWishToast.dataset.visible;
    }, 3200);

    window.setTimeout(() => {
      balloon.classList.remove("is-popped");
      balloon.setAttribute("aria-label", "Pop a birthday balloon");
    }, 900);
  });

  balloonLayer.append(balloon);
});

for (let index = 0; index < 24; index += 1) {
  const particle = document.createElement("span");
  particle.className = "ambient-glitter-piece";
  particle.textContent = index % 3 === 0 ? "✦" : "·";
  particle.style.setProperty("--left", `${(index * 47 + 5) % 100}%`);
  particle.style.setProperty("--size", `${7 + (index % 3) * 3}px`);
  particle.style.setProperty("--duration", `${9 + (index % 6) * 2}s`);
  particle.style.setProperty("--delay", `${(index % 8) * -1.8}s`);
  particle.style.setProperty("--drift", `${(index % 2 ? 1 : -1) * (12 + index % 28)}px`);
  particle.style.setProperty("--glitter-color", glitterColors[index % glitterColors.length]);
  ambientGlitter.append(particle);
}

heroName.textContent = birthdayDetails.name;
closingMessage.textContent = birthdayDetails.closingMessage;
signoff.textContent = `${birthdayDetails.signoff} ${birthdayDetails.sender}`;

musicToggle.addEventListener("click", async () => {
  if (!birthdayMusic.muted && !birthdayMusic.paused) {
    birthdayMusic.muted = true;
    musicToggle.setAttribute("aria-pressed", "false");
    musicLabel.textContent = "Play birthday music";
    musicIcon.textContent = "▶";
    musicStatus.textContent = "The birthday video continues silently.";
    return;
  }

  musicStatus.textContent = "Loading birthday music...";

  try {
    birthdayMusic.muted = false;
    await birthdayMusic.play();
    musicToggle.setAttribute("aria-pressed", "true");
    musicLabel.textContent = "Pause birthday music";
    musicIcon.textContent = "Ⅱ";
    musicStatus.textContent = "Birthday music is playing.";
  } catch (error) {
    birthdayMusic.muted = true;
    musicToggle.setAttribute("aria-pressed", "false");
    musicLabel.textContent = "Play birthday music";
    musicIcon.textContent = "▶";
    musicStatus.textContent = "Birthday music couldn't be played. Check the MP4 file and try again.";
    console.error("Unable to play the birthday soundtrack.", error);
  }
});

birthdayMusic.addEventListener("playing", () => {
  if (!birthdayMusic.muted) {
    musicToggle.setAttribute("aria-pressed", "true");
    musicLabel.textContent = "Pause birthday music";
    musicIcon.textContent = "Ⅱ";
    musicStatus.textContent = "Birthday music is playing.";
  }
});

birthdayMusic.addEventListener("pause", () => {
  musicToggle.setAttribute("aria-pressed", "false");
  musicLabel.textContent = "Play birthday music";
  musicIcon.textContent = "▶";
  if (!birthdayMusic.ended && !birthdayMusic.muted) {
    musicStatus.textContent = "Birthday music is paused.";
  }
});

birthdayMusic.addEventListener("ended", () => {
  birthdayMusic.muted = true;
  musicToggle.setAttribute("aria-pressed", "false");
  musicLabel.textContent = "Play birthday music";
  musicIcon.textContent = "▶";
  musicStatus.textContent = "Birthday music has finished.";
});

birthdayMusic.addEventListener("error", () => {
  birthdayMusic.muted = true;
  musicToggle.setAttribute("aria-pressed", "false");
  musicLabel.textContent = "Play birthday music";
  musicIcon.textContent = "▶";
  musicStatus.textContent = "The birthday video couldn't be loaded. Check the MP4 file and try again.";
});

for (const [index, memory] of birthdayDetails.memories.entries()) {
  const card = document.createElement("article");
  card.className = "memory-card";

  const number = document.createElement("span");
  number.className = "memory-number";
  number.textContent = `0${index + 1} / A GOOD THING`;

  const title = document.createElement("h3");
  title.className = "memory-title";
  title.textContent = memory.title;

  const copy = document.createElement("p");
  copy.className = "memory-copy";
  copy.textContent = memory.text;

  card.append(number, title, copy);
  memoryGrid.append(card);
}

let reminderIndex = 0;

document.querySelector("#reminder-button").addEventListener("click", () => {
  reminderIndex = (reminderIndex + 1) % birthdayDetails.reminders.length;
  reminderText.textContent = birthdayDetails.reminders[reminderIndex];
});

document.querySelector("#start-button").addEventListener("click", () => {
  scrapbook.classList.remove("section-hidden");
  closing.classList.remove("section-hidden");
  scrapbook.classList.add("section-visible");
  closing.classList.add("section-visible");
  scrapbook.focus({ preventScroll: true });
  scrapbook.scrollIntoView({ behavior: "smooth", block: "start" });
});

const imageViewer = document.querySelector("#image-viewer");
const viewerImage = document.querySelector("#viewer-image");
const viewerCaption = document.querySelector("#viewer-caption");
const viewerCelebration = document.querySelector("#viewer-celebration");
const viewerClose = document.querySelector("#viewer-close");
const celebrationColors = ["#eaa8a0", "#f6d5bd", "#dcd2ec", "#cbd9cb", "#e7bd76"];

function addViewerCelebration() {
  const fragment = document.createDocumentFragment();

  for (let index = 0; index < 12; index += 1) {
    const balloon = document.createElement("span");
    balloon.className = "viewer-balloon";
    balloon.style.setProperty("--left", `${(index * 37 + 4) % 100}%`);
    balloon.style.setProperty("--size", `${24 + (index % 4) * 8}px`);
    balloon.style.setProperty("--duration", `${8 + (index % 5) * 1.5}s`);
    balloon.style.setProperty("--delay", `${(index % 6) * -1.6}s`);
    balloon.style.setProperty("--sway", `${(index % 2 ? 1 : -1) * (25 + index * 3)}px`);
    balloon.style.setProperty("--balloon-color", celebrationColors[index % celebrationColors.length]);
    fragment.append(balloon);
  }

  for (let index = 0; index < 32; index += 1) {
    const glitter = document.createElement("span");
    glitter.className = "viewer-glitter";
    glitter.textContent = index % 3 === 0 ? "✦" : "·";
    glitter.style.setProperty("--left", `${(index * 61 + 7) % 100}%`);
    glitter.style.setProperty("--top", `${(index * 43 + 8) % 92}%`);
    glitter.style.setProperty("--size", `${10 + (index % 4) * 5}px`);
    glitter.style.setProperty("--duration", `${1.2 + (index % 4) * 0.45}s`);
    glitter.style.setProperty("--delay", `${(index % 7) * -0.35}s`);
    glitter.style.setProperty("--glitter-color", celebrationColors[index % celebrationColors.length]);
    fragment.append(glitter);
  }

  viewerCelebration.replaceChildren(fragment);
}

document.querySelectorAll(".moodboard-open").forEach((button) => {
  button.addEventListener("click", () => {
    const image = button.querySelector("img");
    const caption = button.closest("figure").querySelector("figcaption");
    viewerImage.src = image.currentSrc || image.src;
    viewerImage.alt = image.alt;
    viewerCaption.textContent = caption.textContent;
    addViewerCelebration();
    imageViewer.showModal();
    viewerClose.focus();
  });
});

viewerClose.addEventListener("click", () => imageViewer.close());
imageViewer.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    event.preventDefault();
    imageViewer.close();
  }
});
imageViewer.addEventListener("click", (event) => {
  if (event.target === imageViewer) {
    imageViewer.close();
  }
});
imageViewer.addEventListener("close", () => {
  viewerCelebration.replaceChildren();
  viewerImage.removeAttribute("src");
});

document.querySelector("#celebrate-button").addEventListener("click", () => {
  const layer = document.querySelector("#confetti-layer");
  const colors = ["#eaa8a0", "#f6d5bd", "#dcd2ec", "#cbd9cb", "#d8a66b"];
  const fragment = document.createDocumentFragment();

  for (let index = 0; index < 90; index += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.backgroundColor = colors[index % colors.length];
    piece.style.animationDelay = `${Math.random() * 0.8}s`;
    piece.style.setProperty("--drift", `${Math.random() * 180 - 90}px`);
    fragment.append(piece);
    window.setTimeout(() => piece.remove(), 3800);
  }

  layer.replaceChildren(fragment);
});

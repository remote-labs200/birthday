const birthdayDetails = {
  name: "Chandrika Kondamudi",
  sender: "Your Name",
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
    "I'm really glad we became friends. I hope the year ahead brings you new things to look forward to, plenty of reasons to laugh, and people who remind you how appreciated you are.",
  signoff: "Happy birthday — with love,"
};

const heroName = document.querySelector("#hero-name");
const memoryGrid = document.querySelector("#memory-grid");
const reminderText = document.querySelector("#reminder-text");
const closingMessage = document.querySelector("#closing-message");
const signoff = document.querySelector("#signoff");
const scrapbook = document.querySelector("#scrapbook");
const closing = document.querySelector("#closing");

const ambientGlitter = document.querySelector("#ambient-glitter");
const glitterColors = ["#e7b66e", "#eaa8a0", "#dcd2ec", "#cbd9cb"];

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

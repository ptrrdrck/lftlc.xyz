/* © 2023 Peter Rodrick <pete@lftlc.xyz> */

const selectors = {
  season: document.getElementById("season-selector"),
  time: document.getElementById("time-selector"),
  origin: document.getElementById("origin-selector"),
  location: document.getElementById("location-selector"),
  surf: document.getElementById("surf-selector"),
  patients: document.getElementById("patients-selector"),
  age: document.getElementById("age-selector"),
  sex: document.getElementById("sex-selector"),
  nature: document.getElementById("nature-selector"),
};

const selectButtons = {
  season: document.getElementById("season-select-button"),
  time: document.getElementById("time-select-button"),
  origin: document.getElementById("origin-select-button"),
  location: document.getElementById("location-select-button"),
  surf: document.getElementById("surf-select-button"),
  patients: document.getElementById("patients-select-button"),
  age: document.getElementById("age-select-button"),
  sex: document.getElementById("sex-select-button"),
  nature: document.getElementById("nature-select-button"),
};

const options = {
  season: [
    { name: "Random" },
    { name: "Winter", weight: 25 },
    { name: "Spring", weight: 25 },
    { name: "Summer", weight: 25 },
    { name: "Fall", weight: 25 },
  ],
  time: [
    { name: "Random" },
    { name: "Morning", weight: 25 },
    { name: "Afternoon", weight: 50 },
    { name: "Evening", weight: 25 },
  ],
  origin: [
    { name: "Random" },
    { name: "Observed", weight: 40 },
    { name: "Reported", weight: 50 },
    { name: "911 Call", weight: 10 },
  ],
  location: [
    { name: "Random" },
    { name: "Beach", weight: 35 },
    { name: "Water", weight: 30 },
    { name: "Jetty", weight: 30 },
    { name: "Boardwalk", weight: 5 },
  ],
  surf: [
    { name: "Random" },
    { name: "1-2 ft", weight: 27 },
    { name: "3-5 ft", weight: 55 },
    { name: "6-9 ft", weight: 15 },
    { name: "10-14 ft", weight: 2 },
    { name: "15 ft +", weight: 1 },
  ],
  patients: [
    { name: "Random" },
    { name: "1", weight: 93 },
    { name: "2", weight: 4 },
    { name: "3", weight: 1 },
    { name: "4", weight: 1 },
    { name: "5", weight: 1 },
  ],
  age: [
    { name: "Random" },
    { name: "0-9", weight: 5, min: 0, max: 9 },
    { name: "10-19", weight: 25, min: 10, max: 19 },
    { name: "20-29", weight: 25, min: 20, max: 29 },
    { name: "30-49", weight: 25, min: 30, max: 49 },
    { name: "50+", weight: 20, min: 50, max: 79 },
  ],
  sex: [
    { name: "Random" },
    { name: "Male", weight: 50 },
    { name: "Female", weight: 50 },
  ],
  nature: [
    { name: "Random" },
    { name: "Medical", weight: 50 },
    { name: "Trauma", weight: 50 },
  ],
};

const createOptionElement = (option) => {
  const element = document.createElement("option");
  element.textContent = option.name;
  return element;
};

const createTextElement = (tag, text, className, id) => {
  const element = document.createElement(tag);
  if (text) element.textContent = text;
  if (className) element.classList.add(className);
  if (id) element.id = id;
  return element;
};

const createDivElement = (id, className) => {
  const div = document.createElement("div");
  if (id) div.setAttribute("id", id);
  if (className) div.classList.add(className);
  return div;
};

const loadOptions = (selector, variable) => {
  variable.forEach((item) => {
    const option = createOptionElement(item);
    selector.appendChild(option);
  });
};

const getSelectedOption = (selector) => {
  return selector.options[selector.selectedIndex].text;
};

const handleSelectorChange = (selector, selectButton) => {
  const selectedOption = getSelectedOption(selector);
  selectButton.classList.toggle(
    "changed-select-button",
    selectedOption !== "Random"
  );
};

const getOptionIndex = (selector, optionName) => {
  const options = Array.from(selector.options);
  return options.findIndex((opt) => opt.label == optionName);
};

loadOptions(selectors.season, options.season);
selectors.season.addEventListener("change", () => {
  handleSelectorChange(selectors.season, selectButtons.season);
});

loadOptions(selectors.time, options.time);
selectors.time.addEventListener("change", () => {
  handleSelectorChange(selectors.time, selectButtons.time);
});

loadOptions(selectors.origin, options.origin);
selectors.origin.addEventListener("change", () => {
  handleSelectorChange(selectors.origin, selectButtons.origin);
});

loadOptions(selectors.location, options.location);
selectors.location.addEventListener("change", () => {
  handleSelectorChange(selectors.location, selectButtons.location);
  const selectedLocation = getSelectedOption(selectors.location);
  document
    .getElementById("surf")
    .classList.toggle(
      "hide",
      !(selectedLocation === "Water" || selectedLocation === "Jetty")
    );
});

loadOptions(selectors.surf, options.surf);
selectors.surf.addEventListener("change", () => {
  handleSelectorChange(selectors.surf, selectButtons.surf);
});

loadOptions(selectors.patients, options.patients);
selectors.patients.addEventListener("change", () => {
  handleSelectorChange(selectors.patients, selectButtons.patients);
});

loadOptions(selectors.age, options.age);
selectors.age.addEventListener("change", () => {
  handleSelectorChange(selectors.age, selectButtons.age);
});

loadOptions(selectors.sex, options.sex);
selectors.sex.addEventListener("change", () => {
  handleSelectorChange(selectors.sex, selectButtons.sex);
});

loadOptions(selectors.nature, options.nature);
selectors.nature.addEventListener("change", () => {
  handleSelectorChange(selectors.nature, selectButtons.nature);
});

const buildSceneButton = document.getElementById("build-scene-button");

buildSceneButton.addEventListener("click", () => {
  buildScene();
  let selectedPatients = getSelectedOption(selectors.patients);
  selectedPatients =
    selectedPatients === "Random"
      ? getRandomOption(options.patients)
      : selectedPatients;
  buildPatients(selectedPatients);
});

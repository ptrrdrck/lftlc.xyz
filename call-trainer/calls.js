/* © 2023 Peter Rodrick <pete@lftlc.xyz> */

const medicalChiefComplaints = [
  {
    complaint: "Drowning",
    nature: "Respiratory",
    responsiveness: "Unresponsive",
    airway: "Obstructed/Compromised",
    breathing: "Absent",
    circulation: "Pulse absent",
    bloodPressure: "Low",
    pulse: "None",
    generalImpression:
      "The patient is unresponsive, not breathing, and has no pulse.",
  },
  {
    complaint: "Heat Exhaustion",
    nature: "Systemic",
    responsiveness: "Alert",
    airway: "Clear/Open",
    breathing: "Normal",
    circulation: "Pulse present",
    bloodPressure: "Normal",
    pulse: "Normal",
    generalImpression:
      "The patient is responsive but fatigued, with signs of profuse sweating and weakness. Cooling measures and hydration are necessary to address the heat-related distress.",
  },
  {
    complaint: "Allergic reaction",
    nature: "Allergic/Immunologic",
    responsiveness: "Alert",
    airway: "Obstructed/Compromised",
    breathing: "Normal",
    circulation: "Pulse present",
    bloodPressure: "Normal",
    pulse: "Normal",
    generalImpression:
      "Patient appears alert, but there is a potential for compromised airway due to an allergic reaction. Close monitoring and intervention are needed.",
  },
  {
    complaint: "Seizure",
    nature: "Neurological",
    responsiveness: "Verbal",
    airway: "Obstructed/Compromised",
    breathing: "Labored",
    circulation: "Pulse present",
    bloodPressure: "Elevated",
    pulse: "Elevated",
    generalImpression:
      "Patient is experiencing a seizure with elevated vital signs. Immediate attention is necessary to manage the seizure and assess the underlying cause.",
  },
];

const traumaChiefComplaints = [
  {
    complaint: "Blunt trauma",
    mechanism: "Surfing accident",
    responsiveness: "Pressure",
    airway: "Clear/Open",
    breathing: "Labored",
    circulation: "Pulse present",
    bloodPressure: "Elevated",
    pulse: "Elevated",
    generalImpression:
      "The patient is in pain with potential blunt trauma from a surfing accident. Assessment for fractures and internal injuries is needed, along with immobilization.",
  },
  {
    complaint: "Blunt trauma",
    mechanism: "Beach volleyball",
    responsiveness: "Alert",
    airway: "Clear/Open",
    breathing: "Normal",
    circulation: "Pulse present",
    bloodPressure: "Normal",
    pulse: "Normal",
    generalImpression:
      "The patient is in pain with a possible musculoskeletal injury from beach volleyball. Assessment for fractures or sprains and appropriate pain management are necessary.",
  },
  {
    complaint: "Penetrating trauma",
    mechanism: "Boating accident",
    responsiveness: "Pressure",
    airway: "Obstructed/ Compromised",
    breathing: "Labored",
    circulation: "Pulse present",
    bloodPressure: "Elevated",
    pulse: "Elevated",
    generalImpression:
      "The patient appears to be in pain with potential trauma from a boating accident. Rapid assessment for injuries, control of bleeding, and prompt transport are vital.",
  },
];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomEvenInt(min, max) {
  const range = Math.floor((max - min) / 2) + 1;
  return min + 2 * Math.floor(Math.random() * range);
}

const getRandomChiefComplaint = (chiefComplaints) => {
  const randomIndex = Math.floor(Math.random() * chiefComplaints.length);
  return chiefComplaints[randomIndex];
};

const getChiefComplaint = (selectedNature) => {
  let chiefComplaintData;

  if (selectedNature === "Medical") {
    chiefComplaintData = getRandomChiefComplaint(medicalChiefComplaints);
  } else if (selectedNature === "Trauma") {
    chiefComplaintData = getRandomChiefComplaint(traumaChiefComplaints);
  }

  return {
    chiefComplaintData: chiefComplaintData,
    chiefComplaint: chiefComplaintData.complaint,
    natureMechanismText:
      selectedNature === "Medical"
        ? `Nature of Illness`
        : `Mechanism of Injury`,
    natureMechanismValue:
      selectedNature === "Medical"
        ? `${chiefComplaintData.nature}`
        : `${chiefComplaintData.mechanism}`,
    responsiveness: chiefComplaintData.responsiveness,
    airway: chiefComplaintData.airway,
    breathing: chiefComplaintData.breathing,
    circulation: chiefComplaintData.circulation,
    bloodPressure: chiefComplaintData.bloodPressure,
    pulse: chiefComplaintData.pulse,
    generalImpression: chiefComplaintData.generalImpression,
  };
};

const getRandomOption = (arr) => {
  const options = arr.slice(1);
  const weights = [options[0].weight];

  for (let i = 1; i < options.length; i++) {
    weights[i] = options[i].weight + weights[i - 1];
  }

  const random = Math.random() * weights[weights.length - 1];

  for (let i = 0; i < weights.length; i++) {
    if (weights[i] > random) {
      return options[i].name;
    }
  }
};

const getRandomAge = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomValue = Math.floor(Math.random() * (max - min + 1)) + min;

  if (randomValue === 0) {
    const months = Math.floor(Math.random() * 11) + 1;
    return months ? (months === 1 ? "1 month" : `${months} months`) : months;
  }

  return randomValue;
};

function getRandomTime(selectedTime) {
  const timeRanges = {
    Morning: { start: 6, end: 12 },
    Afternoon: { start: 12, end: 16 },
    Evening: { start: 16, end: 21 },
  };

  const { start, end } = timeRanges[selectedTime];
  const randomHour = Math.floor(Math.random() * (end - start) + start);
  const randomMinutes = Math.floor(Math.random() * 60);
  const formattedTime = `${String(randomHour).padStart(2, "0")}:${String(
    randomMinutes
  ).padStart(2, "0")}`;

  return formattedTime;
}

function getRandomDate(selectedSeason) {
  const seasonMonths = {
    Winter: { start: 11, end: 2 },
    Spring: { start: 3, end: 5 },
    Summer: { start: 6, end: 8 },
    Fall: { start: 9, end: 10 },
  };

  const { start, end } = seasonMonths[selectedSeason];

  let randomMonth;
  if (selectedSeason === "Winter") {
    const winterMonths = [11, 12, 1, 2];
    randomMonth = winterMonths[Math.floor(Math.random() * winterMonths.length)];
  } else {
    randomMonth = getRandomInt(start, end);
  }

  const daysInMonth = new Date(2022, randomMonth, 0).getDate();
  const randomDay = Math.floor(Math.random() * daysInMonth) + 1;

  return `${randomMonth}-${randomDay}`;
}

function startTimer(initialTime = { minutes: 0, seconds: 0 }, patientNumber) {
  let seconds = initialTime.seconds;
  let minutes = initialTime.minutes;
  const timerElement = document.getElementById(`timer-${patientNumber}`);

  function updateTimer() {
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    timerElement.textContent = `${formattedMinutes}:${formattedSeconds}`;
  }

  return setInterval(updateTimer, 1000);
}

function createActionItem(text) {
  const actionItem = createDivElement(null, "action-item");
  const actionIcon = createDivElement("action-icon", "icon");
  actionItem.appendChild(actionIcon);
  const actionSVG = `<svg 
 xmlns="http://www.w3.org/2000/svg"
 xmlns:xlink="http://www.w3.org/1999/xlink"
 width="32px" height="32px">
<path fill-rule="evenodd"  fill="rgb(247, 150, 31)"
 d="M27.385,8.708 L19.834,16.259 L19.834,31.131 L18.525,31.131 L13.693,31.131 L12.384,31.131 L12.384,16.259 L4.833,8.708 L0.605,12.836 L0.605,0.150 L13.492,0.150 L9.263,4.379 L16.109,11.225 L22.955,4.379 L18.727,0.150 L31.614,0.150 L31.614,12.836 L27.385,8.708 Z"/>
</svg>`;
  actionIcon.outerHTML += actionSVG;
  const actionText = createTextElement("span", text, "action-text");
  actionItem.appendChild(actionText);
  return actionItem;
}

function getRandomBloodPressure(bloodPressureValue) {
  const lowRange = {
    systolic: { low: 40, high: 88 },
    diastolic: { low: 10, high: 58 },
    name: "Low",
  };
  const normalRange = {
    systolic: { low: 90, high: 118 },
    diastolic: { low: 60, high: 78 },
    name: "Normal",
  };
  const elevatedRange = {
    systolic: { low: 120, high: 128 },
    diastolic: { low: 60, high: 78 },
    name: "Elevated",
  };
  const highRange = {
    systolic: { low: 130, high: 180 },
    diastolic: { low: 80, high: 120 },
    name: "High",
  };

  let selectedRange;

  switch (bloodPressureValue) {
    case "Low":
      selectedRange = lowRange;
      break;
    case "Normal":
      selectedRange = normalRange;
      break;
    case "Elevated":
      selectedRange = elevatedRange;
      break;
    case "High":
      selectedRange = highRange;
      break;
    default:
      throw new Error("Invalid blood pressure value");
  }

  const randomSystolic = getRandomEvenInt(
    Math.max(selectedRange.systolic.low, selectedRange.diastolic.low + 2),
    selectedRange.systolic.high + 1
  );
  const randomDiastolic = getRandomEvenInt(
    selectedRange.diastolic.low,
    Math.min(selectedRange.diastolic.high, randomSystolic - 1) + 1
  );

  return {
    systolic: randomSystolic,
    diastolic: randomDiastolic,
    range: selectedRange.name,
  };
}

function getRandomPulse(pulseValue) {
  const zeroRange = { low: 0, high: 0, name: "None" };
  const lowRange = { low: 40, high: 60, name: "Low" };
  const normalRange = { low: 60, high: 100, name: "Normal" };
  const elevatedRange = { low: 100, high: 120, name: "Elevated" };
  const highRange = { low: 120, high: 160, name: "High" };

  let selectedRange;

  switch (pulseValue) {
    case "None":
      selectedRange = zeroRange;
      break;
    case "Low":
      selectedRange = lowRange;
      break;
    case "Normal":
      selectedRange = normalRange;
      break;
    case "Elevated":
      selectedRange = elevatedRange;
      break;
    case "High":
      selectedRange = highRange;
      break;
    default:
      throw new Error("Invalid pulse value");
  }

  const randomPulse = getRandomEvenInt(
    selectedRange.low,
    selectedRange.high + 1
  );

  return {
    pulse: randomPulse,
    range: selectedRange.name,
  };
}

function getRandomLOC(responsiveness) {
  const orientedToItems = ["Person", "Place", "Time", "Event"];

  let locScore;
  if (responsiveness === "Alert") {
    locScore = Math.floor(Math.random() * 4) + 1;
  } else {
    locScore = 0;
  }

  const selectedItems = orientedToItems.slice(0, locScore);
  const notOrientedToItems = orientedToItems.slice(locScore);

  return {
    score: locScore,
    oriented: selectedItems.join(", "),
    notOriented: notOrientedToItems.join(", "),
  };
}

function getRandomGCS(chiefComplaint) {
  const eyeResponseValues = [
    { score: 1, meaning: "Your eyes don't open for any reason." },
    {
      score: 2,
      meaning: "Your eyes only open in response to feeling pressure.",
    },
    {
      score: 3,
      meaning:
        "You only open your eyes when someone tells you to do so. Your eyes stay closed otherwise.",
    },
    {
      score: 4,
      meaning: "You can open your eyes and keep them open on your own.",
    },
  ];

  const verbalResponseValues = [
    { score: 1, meaning: "You can't speak or make sounds." },
    { score: 2, meaning: "You can't talk and can only make sounds or noises." },
    {
      score: 3,
      meaning:
        "You can talk and others can understand words you say, but your responses to questions don't make sense.",
    },
    {
      score: 4,
      meaning:
        "You're confused. You can answer questions, but your answers show you're not fully aware of what's happening.",
    },
    {
      score: 5,
      meaning:
        "You're oriented. You can correctly answer questions about who you are, where you're at, the day or year, etc.",
    },
  ];

  const motorResponseValues = [
    { score: 1, meaning: "You don't move in response to pressure." },
    {
      score: 2,
      meaning: "You extend muscles (stretch outward) in response to pressure.",
    },
    {
      score: 3,
      meaning: "You flex muscles (pull inward) in response to pressure.",
    },
    {
      score: 4,
      meaning: "You only move away from something pressing on you as a reflex.",
    },
    {
      score: 5,
      meaning:
        "You intentionally move away from something that presses on you.",
    },
    {
      score: 6,
      meaning: "You follow instructions on how and when to move.",
    },
  ];

  const gcsMapping = {
    "Chest pain": { eye: 4, verbal: 5, motor: 6 },
    "Shortness of breath": { eye: 3, verbal: 4, motor: 5 },
    "Abdominal pain": { eye: 2, verbal: 3, motor: 4 },
    Headache: { eye: 4, verbal: 4, motor: 6 },
    Dizziness: { eye: 3, verbal: 3, motor: 5 },
    Nausea: { eye: 2, verbal: 3, motor: 4 },
    Vomiting: { eye: 2, verbal: 2, motor: 4 },
    "Allergic reaction": { eye: 4, verbal: 5, motor: 6 },
    Seizure: { eye: 1, verbal: 2, motor: 3 },
    Fever: { eye: 4, verbal: 5, motor: 6 },
    "Cardiac arrest": { eye: 1, verbal: 1, motor: 1 },
    //
    "Motor vehicle accident": { eye: 3, verbal: 3, motor: 5 },
    "Fall from height": { eye: 2, verbal: 2, motor: 4 },
    "Bicycle accident": { eye: 2, verbal: 2, motor: 4 },
    Assault: { eye: 3, verbal: 3, motor: 5 },
    "Sports injury": { eye: 4, verbal: 4, motor: 6 },
    Burn: { eye: 2, verbal: 2, motor: 4 },
    "Penetrating trauma": { eye: 2, verbal: 2, motor: 4 },
    "Animal bite": { eye: 2, verbal: 2, motor: 4 },
    "Electrical injury": { eye: 2, verbal: 2, motor: 4 },
    "Crush injury": { eye: 2, verbal: 2, motor: 4 },
  };

  const expectedGCS = gcsMapping[chiefComplaint] || {
    eye: 4,
    verbal: 5,
    motor: 6,
  };

  const randomEyeResponse = getRandomInt(
    expectedGCS.eye - 1,
    expectedGCS.eye + 1
  );
  const randomVerbalResponse = getRandomInt(
    expectedGCS.verbal - 1,
    expectedGCS.verbal + 1
  );
  const randomMotorResponse = getRandomInt(
    expectedGCS.motor - 1,
    expectedGCS.motor + 1
  );

  const finalEyeResponse = Math.min(Math.max(randomEyeResponse, 1), 4);
  const finalVerbalResponse = Math.min(Math.max(randomVerbalResponse, 1), 5);
  const finalMotorResponse = Math.min(Math.max(randomMotorResponse, 1), 6);

  const totalGCS = finalEyeResponse + finalVerbalResponse + finalMotorResponse;

  return {
    eyeResponse: {
      score: finalEyeResponse,
      meaning: eyeResponseValues.find((v) => v.score === finalEyeResponse)
        .meaning,
    },
    verbalResponse: {
      score: finalVerbalResponse,
      meaning: verbalResponseValues.find((v) => v.score === finalVerbalResponse)
        .meaning,
    },
    motorResponse: {
      score: finalMotorResponse,
      meaning: motorResponseValues.find((v) => v.score === finalMotorResponse)
        .meaning,
    },
    totalGCS: totalGCS,
  };
}

const setDivContent = (buttonDiv, targetDiv, newDiv) => {
  buttonDiv.addEventListener("touchstart", (event) => {
    event.preventDefault();
    targetDiv.replaceWith(newDiv);
  });

  buttonDiv.addEventListener("touchend", (event) => {
    event.preventDefault();
    newDiv.replaceWith(targetDiv);
  });

  buttonDiv.addEventListener("touchcancel", (event) => {
    event.preventDefault();
    newDiv.replaceWith(targetDiv);
  });

  buttonDiv.addEventListener("mousedown", () => {
    targetDiv.replaceWith(newDiv);
  });

  buttonDiv.addEventListener("mouseup", () => {
    newDiv.replaceWith(targetDiv);
  });

  buttonDiv.addEventListener("mouseout", () => {
    newDiv.replaceWith(targetDiv);
  });
};

/*
const safety = ["yes", "no"];

const hazard = ["none", "yes-combative", "yes-fire"];

const mechanism = {
  beach,
};

const buildTraumaAssessment = (location, patients, age, sex) => {};

const trauma = {
  single: {
    observed: {
      beach: [
        {
          id: 1,
          safe: "Yes",
          hazard: "None",
          treatmentConsent: "Verbal",
          mechanism: "Running",
          additionalEMS: "Yes",
          cSpine: "No",
          generalImpression: "Seated, holding leg, wincing",
          avpu: "Alert",
          loc: "4",
          alteredMentalStatus: "No",
          chiefComplaint: "Ankle pain",
          airway: "Open",
          airwayCompromise: "None",
          ventilationRate: "Normal",
          ventilationQuality: "Normal",
          supplementalOxygen: "No",
          supplementalOxygenRoute: "N/A",
          supplementalOxygenRate: "N/A",
          pulse: "Yes",
          skinColor: "Pink",
          skinTemperature: "Warm",
          skinCondition: "Moist",
          majorBleed: "None",
          majorBleedLocation: "None",
          shock: "No",
          gcs: "14",
          treatTransport: "Transport",
          vitalPulse: "96",
          vitalRespiration: "18",
          vitalBP: "130/P",
          painOnset: "Sudden",
          painBetter: "Nothing",
          painWorse: "Movement",
          painQuality: "Sharp",
          painRadiation: "Localized",
          painSeverity: "10",
          painTime: "10 minutes",
          historyObtainable: "Yes",
          historySigns: "Ankle deformity",
          historySymptoms: "Light-headedness",
          historyAllergies: "None",
          historyMedications: "None",
          historyPertinent: "None",
          historyLastIntake: "Water, Bagel",
          historyEvents: "Tripped while running",
          secondaryObtainable: "Yes",
          secondaryHeadScalpEars: "Normal",
          secondaryHeadEyes: "PERL @ 4mm",
          secondaryHeadMouthNoseFace: "Normal",
          secondaryNeckTrachea: "Normal",
          secondaryNeckJugularVeins: "Normal",
          secondaryNeckCSpine: "Normal",
          secondaryChestInspect: "Normal",
          secondaryChestAusculate: "Normal bilateral",
          secondaryAbdomenPalpate: "Normal",
          secondaryPelvis: "Normal",
          secondaryGenitaliaNeeded: "No",
          secondaryGenitalia: "Unknown",
          secondaryLowerExtremityLeft: "Ankle deformity",
          secondaryLowerExtremityLeftPMS: "Normal",
          secondaryLowerExtremityRight: "Normal",
          secondaryLowerExtremityRightPMS: "Normal",
          secondaryUpperExtremityLeft: "Elbow scrape",
          secondaryUpperExtremityLeftPMS: "Normal",
          secondaryUpperExtremityRight: "Normal",
          secondaryUpperExtremityRightPMS: "Normal",
          secondaryPosteriorThorax: "Normal",
          secondaryPosteriorLumbar: "Normal",
          secondaryPosteriorButtocks: "Normal",
          relatedProtocolName: "Trauma-Extremity",
          relatedProtocolID: "S-139",
          relatedProtocolBLSInterventions:
            "Splint neurologically stable fractures in position as presented. Traction splint PRN. Reduce grossly angulated long bone fractures with no pulse or sensation PRN BHO. Direct pressure to control external hemorrhage. Apply gauze or hemostatic dressing PRN. Tourniquet PRN. In MCI, direct pressure not required prior to tourniquet application.",
          secondaryRelatedProtocolName: "Pain Management",
          secondaryRelatedProtocolID: "S-141",
          secondaryRelatedProtocolBLSInterventions:
            "Assess level of pain. Ice, immobilize, and splint PRN. Elevation of extremity PRN.",
          reassessmentTime: "15 minutes",
          reassessmentObtainable: "No",
        },
      ],
      water: [{ name: "Random", id: 1 }],
      jetty: [{ name: "Random", id: 1 }],
      boardwalk: [{ name: "Random", id: 1 }],
    },
    repCall: {
      beach: [{ name: "Random", id: 1 }],
      water: [{ name: "Random", id: 1 }],
      jetty: [{ name: "Random", id: 1 }],
      boardwalk: [{ name: "Random", id: 1 }],
    },
  },
  multi: {
    observed: {
      beach: [{ name: "Random", id: 1 }],
      water: [{ name: "Random", id: 1 }],
      jetty: [{ name: "Random", id: 1 }],
      boardwalk: [{ name: "Random", id: 1 }],
    },
    repCall: {
      beach: [{ name: "Random", id: 1 }],
      water: [{ name: "Random", id: 1 }],
      jetty: [{ name: "Random", id: 1 }],
      boardwalk: [{ name: "Random", id: 1 }],
    },
  },
};
*/

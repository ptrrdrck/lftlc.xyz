/* © 2023 Peter Rodrick <pete@lftlc.xyz> */

const buildDateTimeContainer = () => {
  const dateTimeContainer = createDivElement("scene-date-time");

  let selectedSeason = getSelectedOption(selectors.season);
  selectedSeason =
    selectedSeason === "Random"
      ? getRandomOption(options.season)
      : selectedSeason;

  let selectedTime = getSelectedOption(selectors.time);
  selectedTime =
    selectedTime === "Random" ? getRandomOption(options.time) : selectedTime;

  const randomDate = getRandomDate(selectedSeason);
  const randomTime = getRandomTime(selectedTime);

  const dateItem = createTextElement(
    "span",
    `${randomDate}, ${randomTime}`,
    "scene-info"
  );
  dateTimeContainer.appendChild(dateItem);

  const seasonItem = createTextElement(
    "span",
    `(${selectedSeason}, ${selectedTime})`,
    "scene-desc"
  );
  dateTimeContainer.appendChild(seasonItem);

  return dateTimeContainer;
};

const buildOriginContainer = () => {
  const originContainer = createDivElement("scene-origin");

  let selectedOrigin = getSelectedOption(selectors.origin);
  selectedOrigin =
    selectedOrigin === "Random"
      ? getRandomOption(options.origin)
      : selectedOrigin;
  const originItem = createTextElement("span", selectedOrigin, "scene-info");
  originContainer.appendChild(originItem);

  const originDesc = createTextElement("span", "(Origin)", "scene-desc");
  originContainer.appendChild(originDesc);

  return originContainer;
};

const buildLocationContainer = () => {
  const locationContainer = createDivElement("scene-location");

  let selectedLocation = getSelectedOption(selectors.location);
  selectedLocation =
    selectedLocation === "Random"
      ? getRandomOption(options.location)
      : selectedLocation;
  const locationItem = createTextElement(
    "span",
    selectedLocation,
    "scene-info"
  );
  locationContainer.appendChild(locationItem);

  if (selectedLocation === "Water" || selectedLocation === "Jetty") {
    let selectedSurf = getSelectedOption(selectors.surf);
    selectedSurf =
      selectedSurf === "Random" ? getRandomOption(options.surf) : selectedSurf;
    const surfItem = createTextElement(
      "span",
      `(Wave Height: ${selectedSurf})`,
      "scene-desc"
    );
    locationContainer.appendChild(surfItem);
  } else {
    const locationDesc = createTextElement("span", "(Location)", "scene-desc");
    locationContainer.appendChild(locationDesc);
  }

  return locationContainer;
};

const builtScenePlaceholder = document.getElementById(
  "built-scene-placeholder"
);

const buildScene = () => {
  const builtScene = document.getElementById("built-scene");
  if (builtScene) {
    builtScene.remove();
  }

  const root = createDivElement("built-scene");
  builtScenePlaceholder.appendChild(root);

  const dateTimeContainer = buildDateTimeContainer();
  root.appendChild(dateTimeContainer);

  const originContainer = buildOriginContainer();
  root.appendChild(originContainer);

  const locationContainer = buildLocationContainer();
  root.appendChild(locationContainer);
};

const builtPatientsPlaceholder = document.getElementById(
  "built-patients-placeholder"
);

const buildPatients = (number) => {
  const patientsContainer = document.getElementById("patients-container");

  if (patientsContainer) {
    patientsContainer.remove();
  }

  const root = createDivElement("patients-container");
  builtPatientsPlaceholder.appendChild(root);

  for (let i = 0; i < number; i++) {
    let selectedAge = getSelectedOption(selectors.age);
    let selectedSex = getSelectedOption(selectors.sex);
    let selectedNature = getSelectedOption(selectors.nature);
    let patientCount = number;

    selectedAge =
      selectedAge === "Random" ? getRandomOption(options.age) : selectedAge;

    selectedSex =
      selectedSex === "Random" ? getRandomOption(options.sex) : selectedSex;

    selectedNature =
      selectedNature === "Random"
        ? getRandomOption(options.nature)
        : selectedNature;

    let callData = getChiefComplaint(selectedNature);

    buildPatientElements(
      i + 1,
      selectedAge,
      selectedSex,
      selectedNature,
      patientCount,
      callData
    );
  }
};

const buildPatientElements = (
  patientNumber,
  selectedAge,
  selectedSex,
  selectedNature,
  patientCount,
  callData
) => {
  const root = document.getElementById("patients-container");

  const patientTitle = buildPatientTitle(
    patientNumber,
    selectedAge,
    selectedSex,
    selectedNature
  );
  root.appendChild(patientTitle);

  const patient = createDivElement(`patient-${patientNumber}`, "patient");
  root.appendChild(patient);

  const patientTitleDOM = document.getElementById(
    `patient-${patientNumber}-title`
  );
  patientTitleDOM.addEventListener("click", () => {
    patient.classList.toggle("active");
  });

  const patientBody = createDivElement(null, "patient-body");
  patient.appendChild(patientBody);

  const patientStepOne = createDivElement(null, "patient-step");
  const patientStepOneText = createTextElement("span", "Scene Size Up");
  patientStepOne.appendChild(patientStepOneText);
  patientBody.appendChild(patientStepOne);

  const patientSizeUp = buildSizeUp(patientCount, callData);
  patientBody.appendChild(patientSizeUp);

  const patientStepTwo = createDivElement(null, "patient-step");
  const patientStepTwoText = createTextElement(
    "span",
    "Primary Survey/Resuscitation"
  );
  patientStepTwo.appendChild(patientStepTwoText);
  patientBody.appendChild(patientStepTwo);

  const patientPrimarySurvey = buildPrimarySurvey(callData);
  patientBody.appendChild(patientPrimarySurvey);

  const patientStepThree = createDivElement(null, "patient-step");
  const patientStepThreeText = createTextElement("span", "History Taking");
  patientStepThree.appendChild(patientStepThreeText);
  patientBody.appendChild(patientStepThree);

  const patientHistoryTaking = buildHistoryTaking(callData);
  patientBody.appendChild(patientHistoryTaking);

  const patientStepFour = createDivElement(null, "patient-step");
  const patientStepFourText = createTextElement("span", "Secondary Assessment");
  patientStepFour.appendChild(patientStepFourText);
  patientBody.appendChild(patientStepFour);

  const patientSecondaryAssessment = buildSecondaryAssessment(callData);
  patientBody.appendChild(patientSecondaryAssessment);
};

const buildPatientTitle = (
  patientNumber,
  selectedAge,
  selectedSex,
  selectedNature
) => {
  const patientTitle = createDivElement(
    `patient-${patientNumber}-title`,
    "patient-title"
  );

  const patientTitleInfo = createDivElement(null, "patient-title-info");

  const patientNumberText = createTextElement(
    "span",
    `Patient ${patientNumber}`,
    "patient-number"
  );
  patientTitleInfo.appendChild(patientNumberText);

  const patientHeader = createDivElement(null, "patient-header");

  const optionIndex = getOptionIndex(selectors.age, selectedAge);
  const randomAge = getRandomAge(
    options.age[optionIndex].min,
    options.age[optionIndex].max
  );
  const ageItem = createTextElement("span", randomAge, "age");
  patientHeader.appendChild(ageItem);

  const sexItem = createTextElement("span", selectedSex, "sex");
  patientHeader.appendChild(sexItem);

  const natureItem = createTextElement("span", `(${selectedNature})`, "nature");
  patientHeader.appendChild(natureItem);
  patientTitleInfo.appendChild(patientHeader);
  patientTitle.appendChild(patientTitleInfo);

  const patientTitleTools = createDivElement(null, "patient-title-info");

  const callTimer = createDivElement(null, "call-timer");
  const elapsedTime = createTextElement(
    "span",
    "00:00",
    "timer",
    `timer-${patientNumber}`
  );
  callTimer.appendChild(elapsedTime);
  patientTitleTools.appendChild(callTimer);
  patientTitle.appendChild(patientTitleTools);

  let timerInterval;
  let timerTime = { minutes: 0, seconds: 0 };

  patientTitle.addEventListener("click", () => {
    patientTitle.classList.toggle("active");
    ageItem.classList.toggle("active");
    callTimer.classList.toggle("active");

    if (patientTitle.classList.contains("active")) {
      timerInterval = startTimer(timerTime, patientNumber);
    } else {
      clearInterval(timerInterval);

      timerTime = {
        minutes: parseInt(elapsedTime.textContent.slice(0, 2)),
        seconds: parseInt(elapsedTime.textContent.slice(3)),
      };
    }
  });

  return patientTitle;
};

const buildSizeUp = (patientCount, callData) => {
  const sizeUpGroup = createDivElement("size-up-group", "patient-card-group");

  const sizeUpAssess = createDivElement(null, "patient-card");
  sizeUpGroup.appendChild(sizeUpAssess);

  const sizeUpAssessTitle = createDivElement(null, "card-title");
  const sizeUpAssessTitleText = createTextElement("span", "Assess", null);
  sizeUpAssessTitle.appendChild(sizeUpAssessTitleText);
  sizeUpAssess.appendChild(sizeUpAssessTitle);

  const sizeUpAssessContent = createDivElement(
    "size-up-assess",
    "card-content"
  );

  const sizeUpAssessLines = [
    { title: "Scene Safety", value: "Safe" },
    {
      title: `${callData.natureMechanismText}`,
      value: `${callData.natureMechanismValue}`,
    },
    { title: "Number of Patients", value: `${patientCount}` },
    { title: "Additional EMS", value: "?" },
    { title: "C-Spine Stabilization", value: "?" },
  ];

  sizeUpAssessLines.forEach((line, index) => {
    const lineElement = createDivElement(null, "assessment-line");
    sizeUpAssessContent.appendChild(lineElement);

    const lineTitleElement = createTextElement("div", line.title, `line-title`);
    lineElement.appendChild(lineTitleElement);

    const lineValueElement = createTextElement("div", line.value, `line-value`);
    lineElement.appendChild(lineValueElement);
  });
  sizeUpAssess.appendChild(sizeUpAssessContent);

  const sizeUpWhat = createDivElement(null, "patient-card");
  sizeUpGroup.appendChild(sizeUpWhat);

  const sizeUpWhatTitle = createDivElement(null, "card-title");
  const sizeUpWhatTitleText = createTextElement("span", "Actions/Results");
  sizeUpWhatTitle.appendChild(sizeUpWhatTitleText);
  sizeUpWhat.appendChild(sizeUpWhatTitle);

  const sizeUpWhatContent = createDivElement("size-up-what", "card-content");
  sizeUpWhat.appendChild(sizeUpWhatContent);

  const sizeUpWhatPlaceholder = createTextElement(
    "span",
    "En route/On scene",
    "assessment-line"
  );
  sizeUpWhatContent.appendChild(sizeUpWhatPlaceholder);

  const actionItem = createActionItem("Decision");
  sizeUpWhatContent.appendChild(actionItem);

  const sizeUpWhy = createDivElement(null, "patient-card");
  sizeUpGroup.appendChild(sizeUpWhy);

  const sizeUpWhyTitle = createDivElement(null, "card-title");
  const sizeUpWhyTitleText = createTextElement("span", "Info");
  sizeUpWhyTitle.appendChild(sizeUpWhyTitleText);
  sizeUpWhy.appendChild(sizeUpWhyTitle);

  const sizeUpWhyContent = createDivElement("size-up-why", "card-content");
  sizeUpWhy.appendChild(sizeUpWhyContent);

  const sizeUpWhyPlaceholder = createTextElement(
    "span",
    "Protocols/Medical knowledge",
    "assessment-line"
  );
  sizeUpWhyContent.appendChild(sizeUpWhyPlaceholder);

  return sizeUpGroup;
};

const buildPrimarySurvey = (callData) => {
  const primaryGroup = createDivElement("primary-group", "patient-card-group");

  const primaryAssess = createDivElement(null, "patient-card");
  primaryGroup.appendChild(primaryAssess);

  const primaryAssessTitle = createDivElement(null, "card-title");
  const primaryAssessTitleText = createTextElement("span", "Assess");
  primaryAssessTitle.appendChild(primaryAssessTitleText);
  primaryAssess.appendChild(primaryAssessTitle);

  const primaryAssessContent = createDivElement(
    "primary-assess",
    "card-content"
  );

  const primaryAssessLines = [
    { title: "General Impression", value: `${callData.generalImpression}` },
    {
      title: "Responsiveness (AVPU)",
      value: `${callData.responsiveness}`,
    },
    { title: "Chief Complaint", value: `${callData.chiefComplaint}` },
    { title: "Apparent Life Threats", value: "?" },
    { title: "Airway", value: `${callData.airway}` },
    { title: "Breathing", value: `${callData.breathing}` },
    { title: "Circulation", value: `${callData.circulation}` },
    { title: "Patient Priority/Transport", value: "?" },
  ];

  primaryAssessLines.forEach((line, index) => {
    const lineElement = createDivElement(null, "assessment-line");
    primaryAssessContent.appendChild(lineElement);

    const lineTitleElement = createTextElement("div", line.title, `line-title`);
    lineElement.appendChild(lineTitleElement);

    const lineValueElement = createTextElement("div", line.value, `line-value`);
    lineElement.appendChild(lineValueElement);
  });
  primaryAssess.appendChild(primaryAssessContent);

  const primaryWhat = createDivElement(null, "patient-card");
  primaryGroup.appendChild(primaryWhat);

  const primaryWhatTitle = createDivElement(null, "card-title");
  const primaryWhatTitleText = createTextElement("span", "Actions/Results");
  primaryWhatTitle.appendChild(primaryWhatTitleText);
  primaryWhat.appendChild(primaryWhatTitle);

  const primaryWhatContent = createDivElement("primary-what", "card-content");
  primaryWhat.appendChild(primaryWhatContent);

  const locGroup = createDivElement(null, "vital");
  primaryWhatContent.appendChild(locGroup);

  const locNameValue = createDivElement(null, "vital-name-value");
  const locName = createDivElement(null);
  const locNameText = createTextElement(
    "span",
    "Level of Consciousness",
    "vital-name"
  );
  locName.appendChild(locNameText);
  locNameValue.appendChild(locName);

  const randomLOC = getRandomLOC(callData.responsiveness);

  const locValue = createDivElement(null);
  const locValueText = createTextElement(
    "span",
    `A/O x ${randomLOC.score}`,
    "vital-value"
  );
  locValue.appendChild(locValueText);
  locNameValue.appendChild(locValue);
  locGroup.appendChild(locNameValue);

  const locInfo = createDivElement(null, "vital-info");
  const locOriented = createTextElement(
    "span",
    `${randomLOC.oriented}`,
    "loc-oriented"
  );
  locInfo.appendChild(locOriented);
  const locNotOriented = createTextElement(
    "span",
    `${randomLOC.notOriented}`,
    "loc-not-oriented"
  );
  locInfo.appendChild(locNotOriented);
  locGroup.appendChild(locInfo);

  const actionItem = createActionItem("Decision");
  primaryWhatContent.appendChild(actionItem);

  const gcsGroup = createDivElement(null, "vital");
  primaryWhatContent.appendChild(gcsGroup);

  const gcsNameValue = createDivElement(null, "vital-name-value");
  const gcsName = createDivElement(null);
  const gcsNameText = createTextElement("span", "GCS", "vital-name");
  gcsName.appendChild(gcsNameText);
  gcsNameValue.appendChild(gcsName);

  const randomGCS = getRandomGCS(callData.chiefComplaint);

  const gcsValue = createDivElement(null);
  const gcsValueText = createTextElement(
    "span",
    `${randomGCS.totalGCS} (E${randomGCS.eyeResponse.score} V${randomGCS.verbalResponse.score} M${randomGCS.verbalResponse.score})`,
    "vital-value"
  );
  gcsValue.appendChild(gcsValueText);
  gcsNameValue.appendChild(gcsValue);
  gcsGroup.appendChild(gcsNameValue);

  const gcsInfo = createDivElement(null, "vital-info");
  const gcsEMeaning = createTextElement(
    "span",
    `Eyes: ${randomGCS.eyeResponse.meaning}`,
    "gcs-meaning"
  );
  gcsInfo.appendChild(gcsEMeaning);

  const gcsVMeaning = createTextElement(
    "span",
    `Verbal: ${randomGCS.verbalResponse.meaning}`,
    "gcs-meaning"
  );
  gcsInfo.appendChild(gcsVMeaning);

  const gcsMMeaning = createTextElement(
    "span",
    `Motor: ${randomGCS.motorResponse.meaning}`,
    "gcs-meaning"
  );
  gcsInfo.appendChild(gcsMMeaning);
  gcsGroup.appendChild(gcsInfo);

  const primaryWhy = createDivElement(null, "patient-card");
  primaryGroup.appendChild(primaryWhy);

  const primaryWhyTitle = createDivElement(null, "card-title");
  const primaryWhyTitleText = createTextElement("span", "Info");
  primaryWhyTitle.appendChild(primaryWhyTitleText);
  primaryWhy.appendChild(primaryWhyTitle);

  const primaryWhyContent = createDivElement("primary-why", "card-content");
  primaryWhy.appendChild(primaryWhyContent);

  const primaryWhyPlaceholder = createTextElement(
    "span",
    "Protocols/Medical knowledge",
    "assessment-line"
  );
  primaryWhyContent.appendChild(primaryWhyPlaceholder);

  return primaryGroup;
};

const buildHistoryTaking = (callData) => {
  const historyGroup = createDivElement("history-group", "patient-card-group");

  const historyAssess = createDivElement(null, "patient-card");
  historyGroup.appendChild(historyAssess);

  const historyAssessTitle = createDivElement(null, "card-title");
  const historyAssessTitleText = createTextElement("span", "Assess");
  historyAssessTitle.appendChild(historyAssessTitleText);
  historyAssess.appendChild(historyAssessTitle);

  const historyAssessContent = createDivElement(
    "history-assess",
    "card-content"
  );

  const historyAssessLines = [
    { title: "Baseline Vitals", value: "?" },
    {
      title: "Blood Pressure",
      value: "?",
    },
    { title: "Pulse", value: "?" },
    { title: "Respirations", value: "?" },
    { title: "Signs/Symptoms", value: "?" },
    { title: "Allergies", value: "?" },
    { title: "Medications", value: "?" },
    { title: "Pertinent Past History", value: "?" },
    { title: "Last Oral Intake", value: "?" },
    { title: "Events Leading Up", value: "?" },
  ];

  historyAssessLines.forEach((line, index) => {
    const lineElement = createDivElement(null, "assessment-line");
    historyAssessContent.appendChild(lineElement);

    const lineTitleElement = createTextElement("div", line.title, `line-title`);
    lineElement.appendChild(lineTitleElement);

    const lineValueElement = createTextElement("div", line.value, `line-value`);
    lineElement.appendChild(lineValueElement);
  });
  historyAssess.appendChild(historyAssessContent);

  const historyWhat = createDivElement(null, "patient-card");
  historyGroup.appendChild(historyWhat);

  const historyWhatTitle = createDivElement(null, "card-title");
  const historyWhatTitleText = createTextElement("span", "Actions/Results");
  historyWhatTitle.appendChild(historyWhatTitleText);
  historyWhat.appendChild(historyWhatTitle);

  const historyWhatContent = createDivElement("primary-what", "card-content");
  historyWhat.appendChild(historyWhatContent);

  const bpGroup = createDivElement(null, "vital");
  historyWhatContent.appendChild(bpGroup);

  const bpNameValue = createDivElement(null, "vital-name-value");
  const bpName = createDivElement(null);
  const bpNameText = createTextElement("span", "Blood Pressure", "vital-name");
  bpName.appendChild(bpNameText);
  bpNameValue.appendChild(bpName);

  const randomBP = getRandomBloodPressure(callData.bloodPressure);

  const bpValue = createDivElement(null);
  const bpValueText = createTextElement(
    "span",
    `${randomBP.systolic}/${randomBP.diastolic} mmHg`,
    "vital-value"
  );
  bpValue.appendChild(bpValueText);
  bpNameValue.appendChild(bpValue);
  bpGroup.appendChild(bpNameValue);

  const bpInfo = createDivElement(null, "vital-info");
  const bpInfoText = createTextElement("span");
  bpInfoText.innerHTML = `${randomBP.range}`;
  bpInfo.appendChild(bpInfoText);
  bpGroup.appendChild(bpInfo);

  const pulseGroup = createDivElement(null, "vital");
  historyWhatContent.appendChild(pulseGroup);

  const pulseNameValue = createDivElement(null, "vital-name-value");
  const pulseName = createDivElement(null);
  const pulseNameText = createTextElement("span", "Pulse", "vital-name");
  pulseName.appendChild(pulseNameText);
  pulseNameValue.appendChild(pulseName);

  const randomPulse = getRandomPulse(callData.pulse);

  const pulseValue = createDivElement(null);
  const pulseValueText = createTextElement(
    "span",
    `${randomPulse.pulse} bpm`,
    "vital-value"
  );
  pulseValue.appendChild(pulseValueText);
  pulseNameValue.appendChild(pulseValue);
  pulseGroup.appendChild(pulseNameValue);

  const pulseInfo = createDivElement(null, "vital-info");
  const pulseInfoText = createTextElement("span");
  pulseInfoText.innerHTML = `${randomPulse.range}`;
  pulseInfo.appendChild(pulseInfoText);
  pulseGroup.appendChild(pulseInfo);

  const historyWhy = createDivElement(null, "patient-card");
  historyGroup.appendChild(historyWhy);

  const historyWhyTitle = createDivElement(null, "card-title");
  const historyWhyTitleText = createTextElement("span", "Info");
  historyWhyTitle.appendChild(historyWhyTitleText);
  historyWhy.appendChild(historyWhyTitle);

  const historyWhyContent = createDivElement("primary-why", "card-content");
  historyWhy.appendChild(historyWhyContent);

  const historyWhyPlaceholder = createTextElement(
    "span",
    "Protocols/Medical knowledge",
    "assessment-line"
  );
  historyWhyContent.appendChild(historyWhyPlaceholder);

  return historyGroup;
};

const buildSecondaryAssessment = (callData) => {
  const secondaryGroup = createDivElement(
    "secondary-group",
    "patient-card-group"
  );

  const secondaryAssess = createDivElement(null, "patient-card");
  secondaryGroup.appendChild(secondaryAssess);

  const secondaryAssessTitle = createDivElement(null, "card-title");
  const secondaryAssessTitleText = createTextElement("span", "Assess");
  secondaryAssessTitle.appendChild(secondaryAssessTitleText);
  secondaryAssess.appendChild(secondaryAssessTitle);

  const secondaryAssessContent = createDivElement(
    "secondary-assess",
    "card-content"
  );

  const secondaryAssessLines = [
    { title: "Baseline Vitals", value: "?" },
    {
      title: "Blood Pressure",
      value: "?",
    },
    { title: "Pulse", value: "?" },
    { title: "Respirations", value: "?" },
    { title: "Signs/Symptoms", value: "?" },
    { title: "Allergies", value: "?" },
  ];

  secondaryAssessLines.forEach((line, index) => {
    const lineElement = createDivElement(null, "assessment-line");
    secondaryAssessContent.appendChild(lineElement);

    const lineTitleElement = createTextElement("div", line.title, `line-title`);
    lineElement.appendChild(lineTitleElement);

    const lineValueElement = createTextElement("div", line.value, `line-value`);
    lineElement.appendChild(lineValueElement);
  });
  secondaryAssess.appendChild(secondaryAssessContent);

  const secondaryWhat = createDivElement(null, "patient-card");
  secondaryGroup.appendChild(secondaryWhat);

  const secondaryWhatTitle = createDivElement(null, "card-title");
  const secondaryWhatTitleText = createTextElement("span", "Actions/Results");
  secondaryWhatTitle.appendChild(secondaryWhatTitleText);
  secondaryWhat.appendChild(secondaryWhatTitle);

  const secondaryWhatContent = createDivElement(
    "secondary-what",
    "card-content"
  );
  secondaryWhat.appendChild(secondaryWhatContent);

  const secondaryWhatPlaceholder = createTextElement(
    "span",
    "Secondary/Vitals",
    "assessment-line"
  );
  secondaryWhatContent.appendChild(secondaryWhatPlaceholder);

  const secondaryWhy = createDivElement(null, "patient-card");
  secondaryGroup.appendChild(secondaryWhy);

  const secondaryWhyTitle = createDivElement(null, "card-title");
  const secondaryWhyTitleText = createTextElement("span", "Info");
  secondaryWhyTitle.appendChild(secondaryWhyTitleText);
  secondaryWhy.appendChild(secondaryWhyTitle);

  const secondaryWhyContent = createDivElement("secondary-why", "card-content");
  secondaryWhy.appendChild(secondaryWhyContent);

  const secondaryWhyPlaceholder = createTextElement(
    "span",
    "Protocols/Medical knowledge",
    "assessment-line"
  );
  secondaryWhyContent.appendChild(secondaryWhyPlaceholder);

  return secondaryGroup;
};

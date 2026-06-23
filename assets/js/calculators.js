function formatNumber(value, decimals = 2) {
  return Number.isFinite(value) ? value.toFixed(decimals) : "-";
}

function readNumber(id) {
  const field = document.getElementById(id);
  return field ? Number(field.value) : NaN;
}

function setResult(id, message) {
  const target = document.getElementById(id);
  if (target) {
    target.innerHTML = message;
  }
}

function round0(num) {
  return Math.round(num);
}

const bmiForm = document.getElementById("bmiForm");
if (bmiForm) {
  bmiForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const weight = readNumber("bmiWeight");
    const heightCm = readNumber("bmiHeight");
    const heightM = heightCm / 100;
    const bmi = weight / (heightM * heightM);
    if (!Number.isFinite(bmi) || bmi <= 0) {
      setResult("bmiResult", "Please provide valid height and weight.");
      return;
    }
    let category = "Obesity";
    if (bmi < 18.5) category = "Underweight";
    else if (bmi < 25) category = "Normal weight";
    else if (bmi < 30) category = "Overweight";
    setResult(
      "bmiResult",
      `<strong>BMI: ${formatNumber(bmi, 1)}</strong><br/>Category: ${category}`
    );
  });
}

const bmrForm = document.getElementById("bmrForm");
if (bmrForm) {
  bmrForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const sex = document.getElementById("bmrSex")?.value;
    const weight = readNumber("bmrWeight");
    const height = readNumber("bmrHeight");
    const age = readNumber("bmrAge");
    if (![weight, height, age].every((n) => Number.isFinite(n) && n > 0)) {
      setResult("bmrResult", "Please fill all fields with valid values.");
      return;
    }
    const bmr =
      sex === "female"
        ? 10 * weight + 6.25 * height - 5 * age - 161
        : 10 * weight + 6.25 * height - 5 * age + 5;
    setResult(
      "bmrResult",
      `<strong>${round0(bmr)} kcal/day</strong><br/>Estimated calories your body burns at rest.`
    );
  });
}

const tdeeForm = document.getElementById("tdeeForm");
if (tdeeForm) {
  tdeeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const sex = document.getElementById("tdeeSex")?.value;
    const weight = readNumber("tdeeWeight");
    const height = readNumber("tdeeHeight");
    const age = readNumber("tdeeAge");
    const activity = Number(document.getElementById("tdeeActivity")?.value);
    if (![weight, height, age, activity].every((n) => Number.isFinite(n) && n > 0)) {
      setResult("tdeeResult", "Please fill all fields correctly.");
      return;
    }
    const bmr =
      sex === "female"
        ? 10 * weight + 6.25 * height - 5 * age - 161
        : 10 * weight + 6.25 * height - 5 * age + 5;
    const tdee = bmr * activity;
    setResult(
      "tdeeResult",
      `<strong>${round0(tdee)} kcal/day</strong><br/>Maintenance calories based on your activity level.`
    );
  });
}

const calorieForm = document.getElementById("calorieForm");
if (calorieForm) {
  calorieForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const maintenance = readNumber("calMaintenance");
    const goal = document.getElementById("calGoal")?.value || "maintain";
    const pace = Number(document.getElementById("calPace")?.value || "250");
    if (!Number.isFinite(maintenance) || maintenance <= 0) {
      setResult("calorieResult", "Enter a valid maintenance calorie value.");
      return;
    }
    let target = maintenance;
    if (goal === "lose") target = maintenance - pace;
    if (goal === "gain") target = maintenance + pace;
    const safeTarget = Math.max(1200, target);
    setResult(
      "calorieResult",
      `<strong>${round0(safeTarget)} kcal/day</strong><br/>Suggested target for your selected goal.`
    );
  });
}

const waterForm = document.getElementById("waterForm");
if (waterForm) {
  waterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const weight = readNumber("waterWeight");
    const exercise = readNumber("waterExercise");
    const climate = Number(document.getElementById("waterClimate")?.value || "1");
    if (![weight, exercise, climate].every((n) => Number.isFinite(n) && n >= 0)) {
      setResult("waterResult", "Please enter valid input values.");
      return;
    }
    const baselineMl = weight * 35;
    const workoutMl = (exercise / 30) * 350;
    const totalMl = (baselineMl + workoutMl) * climate;
    setResult(
      "waterResult",
      `<strong>${formatNumber(totalMl / 1000, 2)} liters/day</strong><br/>General hydration estimate.`
    );
  });
}

const bodyFatForm = document.getElementById("bodyFatForm");
if (bodyFatForm) {
  bodyFatForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const sex = document.getElementById("bfSex")?.value;
    const heightCm = readNumber("bfHeight");
    const neckCm = readNumber("bfNeck");
    const waistCm = readNumber("bfWaist");
    const hipCm = readNumber("bfHip");
    const cmToIn = 0.3937007874;
    const height = heightCm * cmToIn;
    const neck = neckCm * cmToIn;
    const waist = waistCm * cmToIn;
    const hip = hipCm * cmToIn;
    if (![height, neck, waist].every((n) => Number.isFinite(n) && n > 0)) {
      setResult("bodyFatResult", "Please fill required measurements.");
      return;
    }
    let bodyFat;
    if (sex === "female") {
      if (!Number.isFinite(hip) || hip <= 0) {
        setResult("bodyFatResult", "Hip circumference is required for female calculation.");
        return;
      }
      bodyFat =
        495 /
          (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.221 * Math.log10(height)) -
        450;
    } else {
      bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
    }
    if (!Number.isFinite(bodyFat)) {
      setResult("bodyFatResult", "Invalid measurements. Please review your values.");
      return;
    }
    setResult(
      "bodyFatResult",
      `<strong>${formatNumber(bodyFat, 1)}%</strong><br/>Estimated body fat based on the U.S. Navy method.`
    );
  });
}

const idealWeightForm = document.getElementById("idealWeightForm");
if (idealWeightForm) {
  idealWeightForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const sex = document.getElementById("iwSex")?.value;
    const heightCm = readNumber("iwHeight");
    if (!Number.isFinite(heightCm) || heightCm <= 0) {
      setResult("idealWeightResult", "Please enter a valid height.");
      return;
    }
    const inches = heightCm / 2.54;
    const base = sex === "female" ? 45.5 : 50;
    const ideal = base + 2.3 * Math.max(0, inches - 60);
    setResult(
      "idealWeightResult",
      `<strong>${formatNumber(ideal, 1)} kg</strong><br/>Healthy reference range: ${formatNumber(
        ideal * 0.9,
        1
      )} - ${formatNumber(ideal * 1.1, 1)} kg.`
    );
  });
}

const heartRateForm = document.getElementById("heartRateForm");
if (heartRateForm) {
  heartRateForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const age = readNumber("hrAge");
    const resting = readNumber("hrResting");
    if (![age, resting].every((n) => Number.isFinite(n) && n > 0)) {
      setResult("heartRateResult", "Please enter valid age and resting heart rate.");
      return;
    }
    const hrMax = 220 - age;
    const reserve = hrMax - resting;
    const zones = [
      [0.5, 0.6],
      [0.6, 0.7],
      [0.7, 0.8],
      [0.8, 0.9]
    ].map(([low, high], idx) => {
      const lowBpm = round0(reserve * low + resting);
      const highBpm = round0(reserve * high + resting);
      return `Zone ${idx + 1}: ${lowBpm} - ${highBpm} bpm`;
    });
    setResult("heartRateResult", `<strong>Estimated Max HR: ${hrMax} bpm</strong><br/>${zones.join("<br/>")}`);
  });
}

const dueDateForm = document.getElementById("dueDateForm");
if (dueDateForm) {
  dueDateForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const lmp = document.getElementById("ddLmp")?.value;
    if (!lmp) {
      setResult("dueDateResult", "Please select your last menstrual period date.");
      return;
    }
    const lmpDate = new Date(`${lmp}T00:00:00`);
    const dueDate = new Date(lmpDate.getTime());
    dueDate.setDate(dueDate.getDate() + 280);
    setResult(
      "dueDateResult",
      `<strong>Estimated Due Date: ${dueDate.toDateString()}</strong><br/>This is a general estimate and can vary.`
    );
  });
}

const ovulationForm = document.getElementById("ovulationForm");
if (ovulationForm) {
  ovulationForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const lmp = document.getElementById("ovuLmp")?.value;
    const cycleLength = readNumber("ovuCycle");
    if (!lmp || !Number.isFinite(cycleLength) || cycleLength < 21 || cycleLength > 45) {
      setResult("ovulationResult", "Enter a valid LMP date and cycle length (21-45 days).");
      return;
    }
    const lmpDate = new Date(`${lmp}T00:00:00`);
    const ovulationDate = new Date(lmpDate.getTime());
    ovulationDate.setDate(ovulationDate.getDate() + (cycleLength - 14));
    const fertileStart = new Date(ovulationDate.getTime());
    fertileStart.setDate(fertileStart.getDate() - 5);
    const fertileEnd = new Date(ovulationDate.getTime());
    fertileEnd.setDate(fertileEnd.getDate() + 1);
    setResult(
      "ovulationResult",
      `<strong>Estimated Ovulation: ${ovulationDate.toDateString()}</strong><br/>Fertile window: ${fertileStart.toDateString()} to ${fertileEnd.toDateString()}.`
    );
  });
}

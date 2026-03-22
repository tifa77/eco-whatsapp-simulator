const fs = require('fs');
let c = fs.readFileSync('src/ChatEngine.js', 'utf8');

const arPrompt = "\u062a\u0641\u0636\u0651\u0644\u060c \u0627\u0643\u062a\u0628 \u0627\u0633\u062a\u0634\u0627\u0631\u062a\u0643 \u0627\u0644\u0637\u0628\u064a\u0629 \u0648\u0633\u0646\u0648\u062c\u0651\u0647\u0647\u0627 \u0644\u0644\u062f\u0643\u062a\u0648\u0631 \u0627\u0644\u0645\u062e\u062a\u0635 \ud83d\udcbb";
const arOldText = "\u062a\u0641\u0636\u0644\u0648\u0627 \u0628\u0627\u062e\u062a\u064a\u0627\u0631 \u0627\u0644\u0637\u0628\u064a\u0628 \u0627\u0644\u0645\u062e\u062a\u0635 \ud83d\udc47:";
c = c.split("action: 'show_clinic_catalog', text: '" + arOldText + "'").join("action: 'wait_for_medical_consult', text: '" + arPrompt + "'");

const enPrompt = "Please write your medical consultation and we'll forward it to the specialist \ud83d\udcbb";
const enOldTexts = [
  "Choose from our cardiology specialists \ud83d\udc47:",
  "Choose from our neurology specialists \ud83d\udc47:",
  "Choose from our orthopedic specialists \ud83d\udc47:",
  "Choose from our pediatric specialists \ud83d\udc47:",
  "Choose from our dental specialists \ud83d\udc47:",
  "Choose from our eye specialists \ud83d\udc47:",
  "Choose from our general practitioners \ud83d\udc47:"
];
for (const s of enOldTexts) {
  c = c.split("action: 'show_clinic_catalog', text: '" + s + "'").join('action: \'wait_for_medical_consult\', text: "' + enPrompt + '"');
}

fs.writeFileSync('src/ChatEngine.js', c, 'utf8');
console.log('Done.');

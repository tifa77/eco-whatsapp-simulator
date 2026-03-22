const fs = require('fs');
let c = fs.readFileSync('src/ChatEngine.js', 'utf8');

// AR specialties: replace show_clinic_catalog with wait_for_medical_consult (only for specialty lines, not Book dept lines)
const arPrompt = "تفضّل، اكتب استشارتك الطبية وسنوجّهها للدكتور المختص 📋";
const arOldText = "تفضلوا باختيار الطبيب المختص 👇:";
c = c.split(`action: 'show_clinic_catalog', text: '${arOldText}'`).join(`action: 'wait_for_medical_consult', text: '${arPrompt}'`);

// EN specialties
const enPrompt = "Please write your medical consultation and we'll forward it to the specialist 📋";
const enSpecialties = [
  "Choose from our cardiology specialists 👇:",
  "Choose from our neurology specialists 👇:",
  "Choose from our orthopedic specialists 👇:",
  "Choose from our pediatric specialists 👇:",
  "Choose from our dental specialists 👇:",
  "Choose from our eye specialists 👇:",
  "Choose from our general practitioners 👇:"
];
for (const s of enSpecialties) {
  c = c.split(`action: 'show_clinic_catalog', text: '${s}'`).join(`action: 'wait_for_medical_consult', text: "${enPrompt}"`);
}

fs.writeFileSync('src/ChatEngine.js', c);
console.log('Done. Replaced specialty responses.');

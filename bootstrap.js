const fs = require("fs");
const {execSync} = require("child_process");

// Write empty placeholder files for now
const base = "C:/claude27/Flashcardv1/app";
fs.writeFileSync(base + "/faq/page.tsx", "// placeholder");
fs.writeFileSync(base + "/terms/page.tsx", "// placeholder");
fs.writeFileSync(base + "/privacy/page.tsx", "// placeholder");
fs.writeFileSync(base + "/../not-found.tsx", "// placeholder");
console.log("placeholders ok");

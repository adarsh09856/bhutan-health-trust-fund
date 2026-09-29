const fs = require('fs');

const content = fs.readFileSync('C:/Users/Adarsh/.gemini/antigravity/brain/7022292b-9176-4c86-860e-84e248ecf232/.system_generated/steps/7855/content.md', 'utf8');
const regex = /https:\/\/www\.bhtf\.bt\/wp-content\/uploads\/[^\s\"\'\)]+\.(?:jpg|jpeg|png|webp)/gi;
const matches = Array.from(new Set(content.match(regex) || []));
console.log('Total images found on bhtf.bt homepage:', matches.length);
matches.forEach((m, i) => console.log(`${i + 1}: ${m}`));

/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */

const path = require("path");
const fs = require("fs");


const moduleName = process.argv[2];
if (!moduleName) {
  console.error("❌ Please provide a module name.");
  process.exit(1);
}

const modulePath = path.join(__dirname, "..", "src", "app", "modules", moduleName);

// Module structure
const files = [
  `${moduleName}.routes.ts`,
  `${moduleName}.interface.ts`,
  `${moduleName}.validation.ts`,
  `${moduleName}.model.ts`,
  `${moduleName}.controller.ts`,
  `${moduleName}.service.ts`,
  `${moduleName}.constant.ts`
];

// Create the module folder if not exists
if (!fs.existsSync(modulePath)) {
  fs.mkdirSync(modulePath, { recursive: true });
}


// Create each file with a default template
files.forEach((file) => {
  const filePath = path.join(modulePath, file);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, `// ${file} - ${moduleName} module\n`, "utf8");
    console.log(`✅ Created: ${filePath}`);
  } else {
    console.log(`⚠️ File already exists: ${filePath}`);
  }
});

console.log(`🎉 ${moduleName} module generated successfully!`);

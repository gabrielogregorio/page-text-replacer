const fs = require("fs");

try {
  fs.rmSync("./dist", { recursive: true, force: true });
} catch (err) {
  //
}

try {
  fs.rmSync("./tsconfig.tsbuildinfo");
} catch (err) {
  //
}

const fs = require("fs");

fs.copyFileSync("./index.html", "./dist/index.html");
fs.copyFileSync("./manifest.json", "./dist/manifest.json");
fs.cpSync("./styles", "./dist/styles", { recursive: true });
fs.cpSync("./public", "./dist/public", { recursive: true });

const archiver = require("archiver");

const packageVersion = require("./package.json").version;

const output = fs.createWriteStream(`./release/${packageVersion}.zip`);
const archive = archiver("zip", {
  zlib: { level: 9 },
});

archive.on("error", function (err) {
  throw err;
});

archive.pipe(output);

archive.directory("./dist/", false);

archive.finalize();

const crypt = require("crypto");
const https = require("https");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.question("Enter the URL: ", (url) => {
  if (!url) {
    console.error("URL cannot be empty");
    rl.close();
    return;
  }
  https
    .get(url, (res) => {
      const hash = crypt.createHash("sha384");
      res.on("data", (chunk) => hash.update(chunk));
      res.on("end", () => {
        const integrity = `sha384-${hash.digest("base64")}`;
        console.log(`Integrity: ${integrity}`);
        rl.close();
      });
    })
    .on("error", (e) => {
      console.error(`Error fetching the URL: ${e.message}`);
      rl.close();
    });
});

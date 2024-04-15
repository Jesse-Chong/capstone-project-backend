const fs = require("fs");
const path = require("path");
const AdmZip = require("adm-zip");
const axios = require("axios");
const API_KEY = process.env.LOKALISE_API_KEY;
const PROJECT_ID = process.env.LOKALISE_PROJECT_ID;

// async function downloadTranslations() {
//   try {
//     const options = {
//       method: "POST",
//       url: `https://api.lokalise.com/api2/projects/${PROJECT_ID}/files/download`,
//       headers: {
//         // client expects json response from server
//         accept: "application/json",
//         // Specify that request body is JSON format
//         "content-type": "application/json",
//         // accept api token for authentification
//         "X-Api-Token": API_KEY,
//       },
//       // data is basically sending raw json data in the body in postman
//       data: {
//         // The plural_format option is used to specify the format of the plural keys in the translation files.
//         // Different libraries and frameworks have their own conventions for handling pluralization in translations,
//         // and the plural_format option allows you to specify the format that matches your project's requirements.
//         plural_format: "i18next",
//         format: "json",
//         // keep the exact filename thats on lokalise account
//         original_filenames: true,
//         // %LANG_ISO% is a placeholder
//         directory_prefix: "%LANG_ISO%",
//       },
//     };

//     const response = await axios.request(options);
//     console.log("Download response:", response.data);

//     const translationsUrl = response.data.bundle_url;
//     // find the absolute path to translations folder
//     const i18nFolder = path.resolve(__dirname, "translations");
//     const archive = path.resolve(i18nFolder, "archive.zip");
//     // By setting responseType to 'stream', it indicates that the response should be treated as a readable stream instead of being automatically parsed as JSON or text.
//     // This allows you to handle the response data as a stream and pipe it to a write stream.
//     const translationsResponse = await axios.get(translationsUrl, {
//       responseType: "stream",
//     });

//     const writer = fs.createWriteStream(archive);

//     translationsResponse.data.pipe(writer);

//     return new Promise((resolve, reject) => {
//       writer.on("finish", resolve);
//       writer.on("error", reject);
//     });
//   } catch (error) {
//     console.error("Error downloading translations:", error);
//     throw error;
//   }
// }

// async function extractTranslations() {
//   const i18nFolder = path.resolve(__dirname, "translations");
//   const archive = path.resolve(i18nFolder, "archive.zip");

//   try {
//     const zip = new AdmZip(archive);
//     zip.extractAllTo(i18nFolder, true);
//     console.log("Extracted files:", fs.readdirSync(i18nFolder));
//     const languageDirs = fs
//       .readdirSync(i18nFolder)
//       .filter((dir) => fs.statSync(path.join(i18nFolder, dir)).isDirectory());
//     languageDirs.forEach((languageDir) => {
//       const languageDirPath = path.join(i18nFolder, languageDir);
//       const jsonFiles = fs
//         .readdirSync(languageDirPath)
//         .filter((file) => file.endsWith(".json"));
//       // Rename the JSON files to the language code
//       jsonFiles.forEach((jsonFile) => {
//         const oldPath = path.join(languageDirPath, jsonFile);
//         const newPath = path.join(languageDirPath, `${languageDir}.json`);
//         fs.renameSync(oldPath, newPath);
//       });
//     });
//     console.log("Extracted files:", fs.readdirSync(i18nFolder));
//     console.log("Translation files renamed successfully");
//   } catch (error) {
//     console.error("Error extracting translations:", error);
//     throw error;
//   }
// }

async function getTranslations(req, res) {
  const lang = req.params.lang;
  try {
    // console.log("Downloading translations...");
    // await downloadTranslations();
    // console.log("Extracting translations...");
    // await extractTranslations();

    const i18nFolder = path.resolve(__dirname, "translations", lang);
    const filePath = path.join(i18nFolder, `${lang}.json`);

    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf8");
      const translations = JSON.parse(fileContent);
      res.json({ [lang]: translations });
    } else {
      console.warn(`Translation file not found for language: ${lang}`);
      res.status(404).json({ error: "Translation file not found" });
    }
  } catch (error) {
    console.error("Error fetching translations:", error);
    res.status(500).json({ error: "Failed to fetch translations" });
  }
}

module.exports = {
  getTranslations,
};

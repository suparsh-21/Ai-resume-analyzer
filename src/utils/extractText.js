const { parsePdf } = require("../services/pdfParser.service");
const { parseDocx } = require("../services/docxParser.service");

async function extractText(file) {
  if (file.mimetype === "application/pdf") {
    return await parsePdf(file.buffer);
  }

  if (
    file.mimetype ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    return await parseDocx(file.buffer);
  }

  throw new Error("Only PDF and DOCX files are supported");
}

module.exports = { extractText };

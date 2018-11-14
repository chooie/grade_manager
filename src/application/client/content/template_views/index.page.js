const preformatted = require("_preformatted");
const util = require("./util.js");

exports.page = function(options) {
  return util.makePageWithHeadAndBody({
    headElements: [
      "<!-- smoke test marker: App home page -->",
      ["title", "Home - Grade Manager"]
    ],
    bodyElements: [
      ["h1", { id: "header", class: "header" }, "Grade Manager"],
      ["div", { id: "app-container" }, ["p", { class: "text" }, "Loading..."]],
      ["script", { src: "bundle.js" }],
      [
        "script",
        preformatted`
          const client = require("./main.js");
          client.setup();
        `
      ]
    ]
  });
};

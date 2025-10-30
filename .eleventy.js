require("dotenv").config();

module.exports = function (config) {
    config.addGlobalData("env", process.env);
    config.addPassthroughCopy({ "src/assets": "assets" });

    return {
        dir: {
            input:  "src",
            output: "dist",
            includes: "_includes",
            data:     "_data",
        },
        markdownTemplateEngine: "njk",
        htmlTemplateEngine:     "njk",
    };
};

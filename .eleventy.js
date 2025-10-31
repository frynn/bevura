module.exports = function (config) {
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

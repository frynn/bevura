module.exports = function (config) {
    config.addPassthroughCopy({ "src/assets": "assets" });
    config.addPassthroughCopy({ "src/static/robots.txt": "robots.txt" });
    config.addPassthroughCopy({ "src/favicon": "favicon" });

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

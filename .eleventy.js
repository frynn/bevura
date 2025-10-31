const pluginSitemap = require("@quasibit/eleventy-plugin-sitemap");
module.exports = function (config) {
    config.addPassthroughCopy({ "src/assets": "assets" });

    config.addPlugin(pluginSitemap, {
        sitemap: {
            hostname: "https://bevura.vercel.app",
        },
    });

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

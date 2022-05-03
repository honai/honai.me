module.exports = {
  tags: ["talks"],
  layout: "layouts/Talk.jsx",
  eleventyComputed: {
    permalink: (data) => `${data.page.filePathStem}/`,
  },
};

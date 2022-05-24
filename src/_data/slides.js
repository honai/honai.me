const EleventyFetch = require("@11ty/eleventy-fetch");

/** @returns {Promise<import("../../types").Slide[]>} */
module.exports = async () => {
  const url = "https://slides.honai.me/index.json";
  /** @type {import("../../types").SlideRes[]} */
  const res = await EleventyFetch(url, { type: "json", duration: "1d" });
  return res.map((slide) => ({
    ...slide,
    pages: slide.pages.map((p) => ({
      ...p,
      imageUrl: `https://res.cloudinary.com/honai/slides/${p.image}`,
    })),
  }));
};

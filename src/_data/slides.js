const EleventyFetch = require("@11ty/eleventy-fetch");
const cloudinary = require("cloudinary").v2;

cloudinary.config({ cloud_name: "honai", secure: true });

/** @returns {Promise<import("../../types").Slide[]>} */
module.exports = async () => {
  const url = "https://slides.honai.me/index.json";
  /** @type {import("../../types").SlideRes[]} */
  const res = await EleventyFetch(url, { type: "json", duration: "1d" });
  const t = res
    .map((s) => ({
      ...s,
      pages: s.pages.map((p) => ({ ...p, image: `slides/${p.image}` })),
    }))
    .map((slide) => ({
      ...slide,
      pages: slide.pages.map((p) => ({
        ...p,
        imageUrl: cloudinary.url(p.image, {
          transformation: { crop: "limit", width: 1280 },
          fetch_format: "auto",
        }),
      })),
      thumbnail: cloudinary.url(slide.pages[0].image, {
        transformation: { crop: "limit", width: 640 },
        fetch_format: "auto",
      }),
    }));
  return t;
};

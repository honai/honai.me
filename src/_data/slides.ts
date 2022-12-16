import EleventyFetch from "@11ty/eleventy-fetch";
import { v2 as cloudinary } from "cloudinary";
import { Slide, SlideRes } from "../types.js";

cloudinary.config({ cloud_name: "honai", secure: true });

export default async (): Promise<Slide[]> => {
  const url = "https://slides.honai.me/index.json";
  const res = (await EleventyFetch(url, {
    type: "json",
    duration: "1d",
  })) as SlideRes[];
  const t = res
    .map((s) => ({
      ...s,
      pages: s.pages.map((p) => ({ ...p, image: `slides/${p.image}` })),
    }))
    .map((slide) => ({
      ...slide,
      pages: slide.pages.map((p, i) => ({
        ...p,
        imageUrl: cloudinary.url(p.image, {
          transformation: { crop: "limit", width: 1280 },
          fetch_format: "auto",
        }),
        thumbUrl: cloudinary.url(p.image, {
          transformation: { crop: "limit", width: 320 },
          fetch_format: "auto",
          quality: "auto:low",
        }),
        slideId: `slide-${(i + 1).toString(10)}`,
      })),
      thumbnail: cloudinary.url(slide.pages[0].image, {
        transformation: { crop: "limit", width: 640 },
        fetch_format: "auto",
      }),
    }));
  return t;
};

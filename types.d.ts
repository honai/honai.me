export interface EleventyPage {
  url: string;
}

/** 右上が基準点 */
interface SlidePageLink {
  x: number;
  y: number;
  width: number;
  height: number;
  url: string;
}

interface SlidePageRes {
  /** cloudinary relative url */
  image: string;
  width: number;
  height: number;
  text: string;
  links: SlidePageLink[];
}

export interface SlideRes {
  title: string;
  slug: string;
  date: string;
  /** relative url */
  pdf: string;
  pages: SlidePageRes[];
}

type SlidePage = Omit<SlidePageRes, "image"> & {
  imageUrl: string;
  thumbUrl: string;
  slideId: string;
};

export interface Slide extends SlideRes {
  pages: SlidePage[];
  thumbnail: string;
}

export interface TwitterCardPlayer {
  kind: "player";
  iframeUrl: string;
  width: number;
  height: number;
}

export interface SlideCarouselNavProps {
  prev?: string;
  next?: string;
  first: string;
  last: string;
  total: number;
  /** 0-indexed */
  current: number;
}

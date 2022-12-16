import type { ComponentChild, FunctionComponent, VNode } from "preact";

export interface FC<P = {}> extends FunctionComponent<P> {
  (props: P, context?: any): VNode<any> | null;
}

export type Children = ComponentChild;

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

export interface Slide extends Omit<SlideRes, "pages"> {
  pages: SlidePage[];
  thumbnail: string;
}

interface TwitterCardPlayer {
  kind: "player";
  iframeUrl: string;
  width: number;
  height: number;
}

interface TwitterCardLarge {
  kind: "large";
}

interface TwitterCardNormal {
  kind: "normal";
}

export type TwitterCard =
  | TwitterCardNormal
  | TwitterCardLarge
  | TwitterCardPlayer;

export interface SlideCarouselNavProps {
  prev?: string;
  next?: string;
  first: string;
  last: string;
  total: number;
  /** 0-indexed */
  current: number;
}

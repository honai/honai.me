import { ComponentChild, VNode, JSX } from "preact";

export type HTMLAttributes<T extends EventTarget> = JSX.HTMLAttributes<T>;

export type FC<P = {}> = (props: P) => VNode;

export type Children = ComponentChild;

export type ChildrenOnly<C = Children> = FC<{ children: C }>;

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

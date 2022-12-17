import mdIt from "markdown-it";

const simpleInstance = mdIt();

export const render = (md: string) => simpleInstance.render(md);

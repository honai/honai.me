<script>
  export let js = "";
  export let src = "";
  export let type = undefined;
  export let defer = false;
  export let className = "";
  if ((!!src && !!js) || (!src && !js)) {
    throw new Error("Invalid Script prop");
  }
  const attrs = [
    !!type ? `type="${type}"` : "",
    !!className ? `class="${className}"` : "",
    defer ? "defer" : "",
  ]
    .join(" ")
    .trim();
  const tag = !!js
    ? `<script ${attrs}>${js}<\/script>`
    : `<script ${attrs} src="${src}"><\/script>`;
</script>

{@html tag}

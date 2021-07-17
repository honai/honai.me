<script>
  import { onMount } from "svelte"

  /** @type {string} */
  export let html

  let postMarkdownEl

  onMount(() => {
    const replaceClass = "language-unknown"
    for (const e of postMarkdownEl.querySelectorAll(`.${replaceClass}`)) {
      e.classList.replace(replaceClass, "language-text")
    }
  })
</script>

<div bind:this={postMarkdownEl} class="post-markdown">{@html html}</div>

<style lang="scss" global>
  .post-markdown {
    > h1 {
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    }
    > h2 {
      line-height: 1.5;
      display: flex;
      align-items: center;
      margin: 3.2rem 0 2.4rem;
    }
    > h2::before {
      content: "";
      background-color: var(--color-primary);
      height: 25px;
      width: 5px;
      border-radius: 3px;
      margin-right: 15px;
    }
    > h2::after {
      content: "";
      border-bottom: 1px dashed;
      border-color: rgba(0, 0, 0, 0.2);
      flex: 1 1 auto;
      margin-left: 10px;
    }
    p {
      margin: 1.6rem 0;
    }
    ul {
      margin: 1.6rem 0;
    }
    img {
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    }
    .img-row-wrap {
      max-width: 100%;
      display: flex;
      flex-flow: row wrap;
    }
    .img-row-wrap > * {
      flex: 0 1 430px;
      margin: 5px !important;
    }
    > table {
      border-collapse: collapse;
      width: 100%;
    }
    > table th,
    > table td {
      padding: 0.8rem;
      vertical-align: top;
      border-top: 1px solid #dee2e6;
    }
    > table > thead th {
      vertical-align: bottom;
      border-bottom: 2px solid #dee2e6;
    }
    :not(pre) > code[class="language-text"] {
      background-color: #eee;
      color: unset;
    }
    > blockquote {
      margin: 0;
      padding: 0 1em;
      color: #6a737d;
      border-left: 0.25em solid #dfe2e5;
    }
  }
</style>

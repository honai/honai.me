class SearchIndex {
  data() {
    return {
      permalink: "functions/api/_index.ts",
      permalinkBypassOutputDir: true,
    };
  }

  render({ collections }) {
    const { posts } = collections;
    const postIndex = posts.map(({ data, templateContent }) => ({
      title: data.title,
      content: templateContent.replace(/<[^>]+>/gm, "").replace(/\s+/gm, " "),
    }));
    return `export default ${JSON.stringify(postIndex)}`;
  }
}

module.exports = SearchIndex;

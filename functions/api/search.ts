import blogIndex from "./_index";

type ResponsePost = { title: string; url: string };

export async function onRequest(context) {
  const request: Request = context.request;
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.toLowerCase();
  if (!query) {
    return new Response(JSON.stringify([]));
  }

  const scoredPosts = blogIndex
    .map((post) => ({ score: 0, post }))
    .map(({ score, post }) => {
      if (post.title.toLowerCase().includes(query)) {
        score += 100;
      }
      if (post.content.toLowerCase().includes(query)) {
        score += 1;
      }
      return { score, post };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ post }) => post);

  return new Response(JSON.stringify(scoredPosts), {
    headers: { "content-type": "application/json" },
  });
}

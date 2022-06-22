import blogIndex from "./_index";

export async function onRequest(context) {
  const request: Request = context.request;
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  if (!query) {
    return new Response(JSON.stringify([]));
  }
  const foundPosts: string[] = [];
  for (const post of blogIndex) {
    if (post.title.includes(query) || post.content.includes(query)) {
      foundPosts.push(post.title, 1);
    }
  }
  return new Response(JSON.stringify(foundPosts));
}

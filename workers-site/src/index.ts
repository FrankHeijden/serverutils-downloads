import { getAssetFromKV } from '@cloudflare/kv-asset-handler'
import { handleRequest } from './handler';

addEventListener('fetch', async (event) => {
  const url = new URL(event.request.url);

  let response: Promise<Response>;
  if (url.pathname.startsWith("/api")) {
    response = handleRequest(event);
  } else {
    response = handleWebRequest(event);
  }

  event.respondWith(response);
});

async function handleWebRequest(event: FetchEvent) {
  let page;
  try {
    page = await getAssetFromKV(event);
  } catch (e) {
    page = await getAssetFromKV(event, {
      mapRequestToAsset: req => new Request(`${new URL(req.url).origin}/index.html`, req),
    });
  }

  const response = new Response(page.body, page);

  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "unsafe-url");
  response.headers.set("Feature-Policy", "none");

  return response;
}

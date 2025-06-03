export default {
  async fetch(request) {
    const url = new URL(request.url);
    const pathname = url.pathname;
    const searchParams = url.searchParams;

    const backendBase = 'https://yt.hosters.club';

    // Only handle the root endpoint (/) with a url query parameter
    if (pathname === '/' && searchParams.has('url')) {
      const backendUrl = `${backendBase}/?url=${encodeURIComponent(searchParams.get('url'))}`;
      const response = await fetch(backendUrl, {
        method: request.method,
        headers: request.headers,
      });

      return new Response(await response.body, {
        status: response.status,
        headers: response.headers,
      });
    }

    // Default response for invalid requests you can change as you like 
    return new Response(
      `Welcome to Drsudo Proxy\n\nUsage:\n - /?url=...`,
      { status: 200, headers: { 'Content-Type': 'text/plain' } }
    );
  },
};

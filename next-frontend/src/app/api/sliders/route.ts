export async function GET(request) {
  const STRAPI = process.env.STRAPI_SERVER_URL || 'http://localhost:1337';

  try {
    const apiRes = await fetch(
      `${STRAPI}/api/sliders?populate=image&sort[0]=order:asc`
    );

    if (!apiRes.ok) {
      const text = await apiRes.text();
      return Response.json({ error: text }, { status: apiRes.status });
    }

    const data = await apiRes.json();

    const items = (data?.data || []).map((entry) => {
      const id = entry.id;
      const imageData = entry.image;

      let url =
        imageData?.formats?.thumbnail?.url ||
        imageData?.url ||
        null;

      const absoluteUrl = url
        ? url.startsWith('http')
          ? url
          : `${STRAPI}${url}`
        : null;

      return {
        id,
        title: entry.title || '',
        redirectUrl: entry.redirectUrl || '',
        order: entry.order || 0,
        isActive: entry.isActive !== false,
        image: absoluteUrl
      };
    });

    return Response.json({ items }, {
      status: 200,
      headers: {
        'Cache-Control': 's-maxage=60, stale-while-revalidate=120'
      }
    });
  } catch (err) {
    console.error('Slider API error:', err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
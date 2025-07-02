export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const url = searchParams.get("url");

	if (!url) return new Response("No URL", { status: 400 });

	try {
		const imageRes = await fetch(url);
		const arrayBuffer = await imageRes.arrayBuffer();

		return new Response(arrayBuffer, {
			status: 200,
			headers: {
				"Content-Type": imageRes.headers.get("content-type") || "image/jpeg",
				"Access-Control-Allow-Origin": "*",
				"Cache-Control": "public, max-age=3600",
			},
		});
	} catch (e) {
		return new Response("Error fetching image", { status: 500 });
	}
}

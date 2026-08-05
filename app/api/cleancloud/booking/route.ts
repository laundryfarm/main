const CLEAN_CLOUD_URL = "https://cleancloudapp.com/api";

async function cleanCloud(endpoint: string, payload: Record<string, unknown>) {
  const token = process.env.CLEANCLOUD_API_TOKEN;
  if (!token) throw new Error("CLEANCLOUD_NOT_CONFIGURED");
  const response = await fetch(`${CLEAN_CLOUD_URL}/${endpoint}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ api_token: token, ...payload }),
  });
  if (!response.ok) throw new Error(`CLEANCLOUD_HTTP_${response.status}`);
  return response.json();
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, string>;
    const required = ["name", "phone", "email", "address", "zip"];
    if (required.some((key) => !String(body[key] || "").trim())) {
      return Response.json({ message: "Please complete every field." }, { status: 400 });
    }
    if (!/^\d{5}$/.test(body.zip)) {
      return Response.json({ message: "Please enter a valid 5-digit ZIP code." }, { status: 400 });
    }

    if (!process.env.CLEANCLOUD_API_TOKEN) {
      return Response.json({ message: "Online scheduling is being connected. For now, call or text 323-807-4661 and we’ll schedule your pickup personally." }, { status: 503 });
    }

    const route = await cleanCloud("getRoute", { address: `${body.address}, Los Angeles, CA ${body.zip}` });
    const routeID = route.RouteID || route.routeID || route.Route || process.env.CLEANCLOUD_DEFAULT_ROUTE_ID;
    if (!routeID) return Response.json({ message: "We couldn’t confirm this route online. Call or text 323-807-4661 and we’ll check it personally." }, { status: 422 });
    const dates = await cleanCloud("getDates", { routeID });
    return Response.json({ message: "Great—we serve your route. Live pickup times are ready for the next booking step.", routeID, dates });
  } catch (error) {
    console.error("CleanCloud booking error", error instanceof Error ? error.message : "Unknown error");
    return Response.json({ message: "We couldn’t check availability right now. Call or text 323-807-4661 and we’ll help personally." }, { status: 502 });
  }
}

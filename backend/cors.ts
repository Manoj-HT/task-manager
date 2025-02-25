export const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Credentials": "true"
};

export const addCorsHeaders = (response: Response): Response => {
    const headers = new Headers(response.headers);
    Object.entries(corsHeaders).forEach(([key, value]) => headers.set(key, value));
    return new Response(response.body, { status: response.status, headers });
};

export const handleCors = (req: Request): Response => {
    if (req.method === "OPTIONS") {
        return new Response(null, { status: 204, headers: corsHeaders }); // No body, just headers
    }
    return new Response("Method Not Allowed", { status: 405 });
};
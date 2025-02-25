import { serve } from "bun"
import routes from "./routes";
import { addCorsHeaders, corsHeaders } from "./cors";

serve({
    port: 3000,
    async fetch(request, server) {
        if (request.method === "OPTIONS") {
            return new Response(null, { status: 204, headers: corsHeaders });
        }
        const api = routes.find(item => {
            const routePattern = new RegExp(`^${item.url.replace(/:\w+/g, "\\d+")}$`); // Convert :id to regex
            return routePattern.test(request.url.slice(22));
        });
        if (api) {
            const respObj = await api.fn(request, server)
            const response = addCorsHeaders(respObj)
            return response
        } else {
            return addCorsHeaders(new Response("Did not find route"))
        }
    },
    websocket: {
        open: (ws) => {
            console.log("Client connected");
        },
        message: (ws) => {
            console.log("Client sent message")
        },
        close: (ws) => {
            console.log("Client disconnected");
        },
    }
})
console.log("server running")
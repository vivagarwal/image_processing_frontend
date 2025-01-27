export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { request_id, status, data } = req.body;

        console.log("Webhook received:", request_id, status);

        if (!global.processedRequests) {
            global.processedRequests = {};
        }

        // Store received data in memory
        global.processedRequests[request_id] = { status, data: data || 'Processing failed' };

        return res.status(200).json({ message: "Webhook received successfully!" });
    }

    if (req.method === 'GET') {
        // Return stored data if available
        return res.status(200).json(global.processedRequests || {});
    }

    res.status(405).json({ error: "Method Not Allowed" });
}

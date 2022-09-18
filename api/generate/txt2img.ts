import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function (req: VercelRequest, res: VercelResponse) {
    try {
        res.setHeader('Content-Type', 'application/json');
        const prompt = req.body.prompt;
        const width = req.body.width;
        const height = req.body.height;
        const cfgScale = req.body.cfgScale;
        const steps = req.body.steps;
        const samples = req.body.samples;
        const word_phrase = req.body.word_phrase;
        const user_id_query = await prisma.users.findFirstOrThrow({
            where: { word_seed: word_phrase}
        });
        const credits = user_id_query.credits;
        if (credits == 0) { return res.status(402).json({ result: "no credits"});  }
        const connection = new WebSocket("wss://selas.dev/laion")

        connection.onmessage = function(event) {
            const data = JSON.parse(event.data)
            if ("jobId" in data) { 
                // console.log(data["jobId"]) 
            } 
            else if ("status" in data && "queue" in data && "images" in data && "nPreviousJobs" in data) {
                const status = data["status"]
                const queue = data["queue"]
                const images = data["images"]
                const nPreviousJobs = data["nPreviousJobs"]
                if (status == "pending") {
                    // console.log('status: %s - queue position: %d', status, queue)
                } else if (status == "accepted") {
                    // console.log('status: %s - generation in progress', status)
                } else if (status == "completed") {
                    // console.log('status: %s', status)
                    return res.status(200).json( { result: "success", image: images[0] } );
                    // console.log('image: %s', images[0])
                } else {
                    const result = "unknown status: " + status;
                    return res.status(503).json( { result: result } );
                }
            }
            else {
                const result = "unknown status: ";
                    return res.status(503).json( { result: result } );
                // console.log("unknown api response:", JSON.stringify(data))
            }

        }
        connection.onopen = function(event) {
            // console.log("Connected")
            const message = {prompt: prompt}
            const message_json = JSON.stringify(message)
            // console.log("Sending" + message_json)
            connection.send(message_json)
        }
      } catch (error) {
        return res.status(400).json({ result: 'error' });
      }
    
}
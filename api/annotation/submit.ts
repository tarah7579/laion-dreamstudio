import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client';
const requestIp = require('request-ip');
const prisma = new PrismaClient();
const crypto = require('crypto');
const rate_limit_seconds = 10;

export default async function (req: VercelRequest, res: VercelResponse) {
    try {
        const annotation = req.body.annotation;
        const image_id = req.body.image_id;
        const word_phrase = req.body.word_phrase;
        const user_id_query = await prisma.users.findFirstOrThrow({
            where: { word_seed: word_phrase}
        });
        const user_id = user_id_query.id;
        const current_time = new Date();
        const rate_limit_time = new Date(current_time.setSeconds(current_time.getSeconds() - rate_limit_seconds) + (current_time.getTimezoneOffset() * 60000));
        const rate_limit = await prisma.artifact_annotations.count({
            where: { user_id: user_id, created: { gte: rate_limit_time } }, 
        })
        if (rate_limit > 0) { return res.status(429).json({ result: 'rate limit' }); }

        await prisma.artifact_annotations.create({
            data: {
                md5ip: crypto.createHash('md5').update(requestIp.getClientIp(req)).digest('hex'),
                image_id: image_id,
                annotation: annotation,
                user_id: user_id
            }
        });
        await prisma.users.update({
            where: { id: user_id },
            data: { credits: { increment: 1 } }
        });
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ result: 'success'});
      } catch (error) {
        return res.status(400).json({ result: 'error' });
      }
    
}
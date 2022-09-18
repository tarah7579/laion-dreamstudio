import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function (req: VercelRequest, res: VercelResponse) {
    try {
        const word_phrase = req.body.word_phrase;
        const user_id_query = await prisma.users.findFirstOrThrow({
            where: { word_seed: word_phrase}
        });
        const credits = user_id_query.credits;
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ credits: credits});
      } catch (error) {
        return res.status(400).json({ result: 'error' });
      }
    
}
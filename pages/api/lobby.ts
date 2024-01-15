// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import path from 'node:path'
import { promises as fs } from 'node:fs'

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Find the absolute path of the directory
    const jsonDirectory = path.join(process.cwd(), 'json')
    const fileContents = await fs.readFile(`${jsonDirectory}/lobby.json`, 'utf8')

    res.status(200).json(JSON.parse(fileContents))
}
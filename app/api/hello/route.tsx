import { NextResponse } from "next/server";
import clientPromise from '../../../lib/mongodb'
import { NextApiRequest,NextApiResponse } from 'next'

export async function handler(req: NextApiRequest, res: NextApiResponse) {
        try {
      const client = await clientPromise;
      const db = client.db('GetCeramics');
      const itemsCollection = db.collection('is');
      const items = await itemsCollection.find({}).toArray();
          return NextResponse.json({ text: items });
    } catch (e) {
      console.error("Error:", e);
      return NextResponse.json({ error: 'Internal server error' });
    } 
  }
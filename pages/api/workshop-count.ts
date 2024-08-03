// pages/api/workshop-count.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { workshop } = req.query;

    if (!workshop) {
      return res.status(400).json({ error: 'Workshop is required' });
    }

    const { count, error } = await supabase
      .from('workshop')
      .select('id', { count: 'exact', head: true })
      .eq('workshop', workshop);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ count: count ?? 0 });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

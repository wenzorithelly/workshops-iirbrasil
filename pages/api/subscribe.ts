// pages/api/subscribe.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

type Data = {
  data?: { name: string; workshop: string }[] | null;
  error?: string;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const { name, workshop } = req.body;

    if (!name || !workshop) {
      return res.status(400).json({ error: 'Name and workshop are required' });
    }

    const { data, error } = await supabase
      .from('workshop')
      .insert([{ name, workshop }]);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    // Provide a fallback for data to be an empty array if null
    res.status(200).json({ data: data || [] });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
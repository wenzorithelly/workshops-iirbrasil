// pages/api/subscribe.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

type Data = {
  data?: { name: string; phone: string; workshop: string }[] | null;
  error?: string;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const { name, phone, workshop } = req.body;

    if (!name || !phone || !workshop) {
      return res.status(400).json({ error: 'Name, phone, and workshop are required' });
    }

    // Check if the phone number is already registered for any workshop
    const { data: existingSubscription, error: checkError } = await supabase
      .from('workshop')
      .select('phone')
      .eq('phone', phone);

    if (checkError) {
      return res.status(500).json({ error: checkError.message });
    }

    if (existingSubscription && existingSubscription.length > 0) {
      return res.status(400).json({ error: 'Você já está inscrito em um curso.' });
    }

    // Check the number of subscriptions for the workshop
    const { count: workshopCount, error: countError } = await supabase
      .from('workshop')
      .select('id', { count: 'exact', head: true })
      .eq('workshop', workshop);

    if (countError) {
      return res.status(500).json({ error: countError.message });
    }

    // Determine the limit for each workshop
    const workshopLimit = workshop === 'Sobrenatural Através da Adoração' ? 100 : 40;
    const actualWorkshopCount = workshopCount === null ? 0 : workshopCount;

    if (actualWorkshopCount >= workshopLimit) {
      return res.status(400).json({ error: 'As vagas para esse workshop foram encerradas.' });
    }

    const { data, error } = await supabase
      .from('workshop')
      .insert([{ name, phone, workshop }]);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ data: data || [] });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
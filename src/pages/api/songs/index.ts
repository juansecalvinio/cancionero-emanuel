import { supabase } from "../../../utils/supabase";

export default async function handler(_req: any, res: any) {
  try {
    const { data: songs, error } = await supabase.from("songs").select();
    return res.status(200).send({ error, data: songs });
  } catch (e: any) {
    return res
      .status(400)
      .send(JSON.stringify({ error: true, message: e.message }));
  }
}

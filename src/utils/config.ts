export const config = {
  sheet: {
    sheetID: process.env.SHEET_ID || "",
  },
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    key: process.env.NEXT_PUBLIC_SUPABASE_KEY || "",
  },
};

// zodiakku-api/src/models/horoscopeModel.js

import { supabase } from "../config/supabaseClient.js";

export const HoroscopeModel = {
  // LIST semua ramalan, ambil yang tanggalnya paling baru
  async getTodayAll() {
    const { data, error } = await supabase
      .from("horoscopes")
      .select(`
        id,
        date,
        mood,
        lucky_number,
        lucky_color,
        zodiacs!inner (
          slug,
          name,
          date_range,
          element,
          planet,
          icon_url
        )
      `)
      .order("date", { ascending: false });

    if (error) throw error;
    return data;
  },

  // DETAIL ramalan per zodiak, ambil 1 paling baru (tanpa ribet date)
  async getByZodiacSlug(slug) {
    const { data, error } = await supabase
      .from("horoscopes")
      .select(`
        id,
        date,
        love,
        career,
        finance,
        mood,
        lucky_number,
        lucky_color,
        zodiacs!inner (
          slug,
          name,
          date_range,
          element,
          planet,
          icon_url
        )
      `)
      .eq("zodiacs.slug", slug)
      .order("date", { ascending: false })
      .limit(1)
      .single(); // ambil satu baris paling baru

    if (error) throw error;
    return data;
  }
};

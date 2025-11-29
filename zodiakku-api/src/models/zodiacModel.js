// zodiakku-api/src/models/zodiacModel.js

import { supabase } from "../config/supabaseClient.js";

export const ZodiacModel = {
  async getAll() {
    const { data, error } = await supabase
      .from("zodiacs")
      .select("*")
      .order("name", { ascending: true });

    if (error) throw error;
    return data;
  },

  async getBySlug(slug) {
    const { data, error } = await supabase
      .from("zodiacs")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) throw error;
    return data;
  }
};

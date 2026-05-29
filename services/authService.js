import { supabase } from "./supabaseClient.js";

export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}

export async function loginWithEmail(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getProfile(userId) {
  const { data, error } = await supabase
    .from("users")
    .select("*, roles(code, name), stores(name)")
    .eq("auth_user_id", userId)
    .single();
  if (error) throw error;
  return data;
}

export function canAccess(role, allowedRoles) {
  return allowedRoles.includes(role);
}

import { supabase } from "./supabase";

export async function signup({ email, password, fullName, username, phone }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        username,
        phone,
        avatar_url: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  const { error: profileError } = await supabase.from("users").insert([
    {
      id: data.user.id,
      full_name: fullName,
      username,

      avatar_url: "",
    },
  ]);

  if (profileError) throw new Error(profileError.message);

  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function getCurrentUser() {
  // First check if there's an active session
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return user;
}

export async function updateUser({ email, password, fullName, avatarUrl }) {
  const updates = {};

  if (email) updates.email = email;
  if (password) updates.password = password;

  const { data: user, error } = await supabase.auth.updateUser(updates);

  if (error) throw new Error(error.message);

  if (fullName || avatarUrl) {
    const profileUpdates = {};
    if (fullName) profileUpdates.full_name = fullName;
    if (avatarUrl) profileUpdates.avatar_url = avatarUrl;

    const { error: profileError } = await supabase
      .from("users")
      .update(profileUpdates)
      .eq("id", user.user.id);

    if (profileError) throw new Error(profileError.message);
  }

  return user;
}

export async function resetPassword(email) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });

  if (error) throw new Error(error.message);

  return data;
}

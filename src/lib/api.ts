import { supabase } from "./supabaseClient";
import { User } from "@/types/typeScript";
type PostUser =  Omit<User, "id">

const getUsers = async () => {
  const { data, error } = await supabase.from("users").select("*");
  if(error) {
    console.error("データの取得に失敗しました", error);
    return [];
  }
  return data;
}

const getUser = async (id: string): Promise<User | null> => {
  const { data, error } = await supabase.from("users").select("*").eq("id", id).single();
  if(error) {
    console.error("データの取得に失敗しました");
    return null;
  }
  return data;
}

const signUpUser = async (userProfile: PostUser) => {
  const { data, error } = await supabase.auth.signUp({
    email: userProfile.email,
    password: userProfile.password
  });

  if(error) {
    console.error("サインアップできませんでした", error.message);
    return false;
  }

  if(data.user) {
    const { error: insertError } = await supabase.from("users").insert([
      {
        name: userProfile.name,
        email: userProfile.email,
        phone: userProfile.phone,
      },
    ]);

    if(insertError) {
      console.error("データの登録に失敗しました");
      return false;
    }
    return true 
  }
};

const loginCheck = async (email: string, password: string) => {
  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  });
  
  if(error) {
    console.error("ログインに失敗しました", error);
    return false;
  }

  return true;
}

const deleteUser = async (id: string) => {
  const { error } = await supabase.from("users").delete().eq("id", id);
  if(error) {
    console.error("データを削除できませんでした");
    return false;
  }
  return true;
}

const updateUser = async (id: string, editProfile: User) => {
  const { error } = await supabase.from("users").update(editProfile).eq("id", id);
  if(error) {
    console.error("データを更新できませんでした。");
    return false;
  }
  return true;
}

export { getUsers, getUser, signUpUser, loginCheck, deleteUser, updateUser };
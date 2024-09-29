// deleteしたときのエラー文が使用できていない。supabaseのdeleteのポリシーをauthenticationに合わせる実装を追加した後にsetErrorMessageを設定すること

"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { User, UserDetailPageProps } from "@/types/typeScript";
import { deleteUser, getUser } from "@/lib/api";

type UserProfileState = User;

const UserDetailPage: React.FC<UserDetailPageProps> = ({ params }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userProfile, setUserProfile] = useState<UserProfileState>({
    id: 0,
    name: "",
    email: "",
    phone: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const fetchUser = async () => {
      const getProfile = await getUser(params.id);
      if (getProfile) {
        setUserProfile(getProfile);
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [params.id]);

  const handleEdit = () => {
    router.push(`/users/${params.id}/edit`);
  };

  const handleDelete = async (id: number) => {
    const result = await deleteUser(String(id));
    if(!result) {
      setErrorMessage("データを削除できませんでした");
      return;
    }
    router.push("/users");
  };

  const handleBackPage = () => {
    router.push("/users");
  }

  if (isLoading) {
    return (
      <div className="h-screen p-4">
        <h1 className="text-4xl font-semibold text-gray-700 text-center mb-4">
          UsersData
        </h1>
        <div className="text-xl text-blue-900 text-center">データを取得中</div>
      </div>
    );
  }

  return (
    <div className="h-screen p-4">
      <h1 className="text-4xl font-semibold text-gray-700 text-center mb-8">
        {`${userProfile.name}'s`} Profile
      </h1>
      <div className="border-double border-4 border-black p-4 flex gap-12">
        <div>
          <Image
            src="/images/photo-1539571696357-5a69c17a67c6.jpg"
            alt="プロフィール画像"
            width={200}
            height={200}
          />
        </div>
        <div className="flex flex-col gap-12 w-3/5">
          <div className="flex items-center">
            <div className="w-24 text-2xl font-semibold">Name:</div>
            <div className="text-lg">{userProfile.name}</div>
          </div>
          <div className="flex  items-center">
            <div className="w-24 text-2xl font-semibold">Email:</div>
            <div className="text-lg">{userProfile.email}</div>
          </div>
          <div className="flex  items-center">
            <div className="w-24 text-2xl font-semibold">Phone:</div>
            <div className="text-lg">{userProfile.phone}</div>
          </div>
          <div className="text-red-700">{errorMessage}</div>
          <div className="ml-auto mt-auto flex gap-4 justify-end">
            <button
              onClick={handleEdit}
              className="bg-gray-700 w-16 py-1 hover:bg-gray-600 text-white"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(userProfile.id)}
              className="bg-gray-700 w-16 hover:bg-gray-600 text-white"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <div className="text-center mt-8">
        <button onClick={handleBackPage} className="bg-gray-700 hover:bg-gray-600 px-4 py-1 text-white">
          Back to User List
        </button>
      </div>
    </div>
  );
};

export default UserDetailPage;

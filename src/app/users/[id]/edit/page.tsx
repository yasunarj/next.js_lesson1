"use client"

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { styled } from "styled-components";
import { User } from "@/types/typeScript";
import { getUser, updateUser } from "@/lib/api";

const SendButton = styled.button`
  background-color: #3d3939;
  padding: 4px 24px;
  color: white;
  border-radius: 4px;
  box-shadow: 0 4px black;
  transition: transform .1s, box-shadow .1s;
  &:hover {
    background-color: #615c5c;
  }

  &:active {
    transform: translateY(3px);
    box-shadow: 0 1px black;
  }
`;

interface UserEditPageProps {
  params: {
    id: string;
  }
}

const UserEditPage: React.FC<UserEditPageProps> = ({ params }) => {
  const router = useRouter();
  const [ userProfile, setUserProfile ] = useState<User>({id: 0, name: "", email: "", phone: ""});
  const [ errorMessage, setErrorMessage ] = useState<string>("");

  useEffect(() => {
    const fetchUser = async () => {
      const getProfile = await getUser(params.id);
      if(getProfile) {
        setUserProfile(getProfile);
      }
    }
    fetchUser();
  }, [params.id]);

  const updateProfile = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await updateUser(params.id, userProfile);
    if(!data) {
      setErrorMessage("データの更新に失敗しました");
      return;
    }
    router.push(`/users/${params.id}`);
  }

  const editProfile = (e: React.ChangeEvent<HTMLInputElement>, key: keyof User) => {
    setUserProfile({...userProfile, [key]: e.target.value})
  }

  const handleBackPage = () => {
    router.push(`/users/${params.id}`);
  }

  return(
    <div className="h-screen p-4">
      <h1 className="text-4xl font-semibold text-gray-700 text-center mb-4">Profile Edit Page</h1>
      <form onSubmit={updateProfile} className="border-4 border-double border-black py-8 px-4 w-3/4 mx-auto bg-gray-400 select-none">
        <div className="flex flex-col items-center gap-8">
          <div className="flex items-center">
            <label htmlFor="name" className="underline w-20">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={userProfile.name}
              placeholder="UserName"
              className="w-full border border-1 border-gray-400 px-2 py-1 text-black"
              onChange={(e) => editProfile(e, "name")}
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="email" className="w-20 underline">
              Email
            </label>
            <input
              type="text"
              id="email"
              value={userProfile.email}
              placeholder="Email"
              className="w-full text-md border border-1 border-gray-400 px-2 py-1 text-black"
              onChange={(e) => editProfile(e, "email")}
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="phone" className="w-20 underline">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              value={userProfile.phone}
              placeholder="PhoneNumber"
              className="w-full border border-1 border-gray-400 px-2 py-1 text-black"
              onChange={(e) => editProfile(e, "phone")}
            />
          </div>
          <div className="text-red-700">{errorMessage}</div>
          <div>
            <SendButton>Edit</SendButton>
          </div>
        </div>
      </form>
      <div className="text-center mt-8">
        <button onClick={handleBackPage} className="bg-gray-700 hover:bg-gray-600 px-4 py-1 text-white">
          Back to User Profile
        </button>
      </div>
    </div>
  );
};

export default UserEditPage;
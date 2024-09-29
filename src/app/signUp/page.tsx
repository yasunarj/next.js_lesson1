"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CustomButton from "@/components/atoms/SendButton";
import { signUpUser } from "@/lib/api";
import { useDispatch } from "react-redux";
import { login } from "@/store/autoSlice";

interface InputProfileState {
  name: string,
  email: string,
  phone: string,
  password: string,
}

const CreateUserPage: React.FC = () => {
  const router = useRouter();
  const [ inputProfile, setInputProfile ] = useState<InputProfileState>({ name: "", email: "", phone: "", password: "" });
  const [ validateResult, setValidateResult ] = useState<string>("");
  const dispatch = useDispatch();

  const userInputProfile = (e: React.ChangeEvent<HTMLInputElement>, key: keyof InputProfileState) => {
    setInputProfile({ ...inputProfile, [key]: e.target.value });
    setValidateResult("");
  }

  const sendUserProfile = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!inputProfile.name) {
      setValidateResult("Name filed is required");
      return;
    } else if (!inputProfile.email) {
      setValidateResult("Email filed is required");
      return;
    } else if (!inputProfile.phone) {
      setValidateResult("Phone field is required");
      return
    } else if (!inputProfile.password) {
      setValidateResult("Password filed is required");
    }
    try {
      const result = await signUpUser(inputProfile);
      if(result) {
        router.push("/users");
        dispatch(login());
      } 
    } catch(e) {
      console.error("登録に失敗しました", e);
    }
  }

  return (
    <div className="h-screen p-4">
      <h1 className="text-4xl font-semibold text-gray-700 text-center mb-4">
        Sign up
      </h1>
      <h2 className="text-2xl font-semibold text-gray-700 text-center mb-2">
        Welcome to PracticeCode!
      </h2>
      <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">
        Plese enter your profile first.
      </h2>
      <form onSubmit={sendUserProfile} className="border-4 border-double border-black py-8 px-4 w-3/4 mx-auto bg-gray-400 select-none">
        <div className="flex flex-col items-center gap-8">
          <div className="flex items-center">
            <label htmlFor="name" className="w-32 underline">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={inputProfile.name}
              placeholder="UserName"
              className="w-full border border-1 border-gray-400 px-2 py-1 text-black"
              onChange={(e) => userInputProfile(e, "name")}
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="email" className="w-32 underline">
              Email
            </label>
            <input
              type="text"
              id="email"
              value={inputProfile.email}
              placeholder="Email"
              className="w-full text-md border border-1 border-gray-400 px-2 py-1 text-black"
              onChange={(e) => userInputProfile(e, "email")}
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="phone" className="w-32 underline">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              value={inputProfile.phone}
              placeholder="PhoneNumber"
              className="w-full border border-1 border-gray-400 px-2 py-1 text-black"
              onChange={(e) => userInputProfile(e, "phone")}
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="password" className="w-32 underline">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={inputProfile.password}
              placeholder="Password"
              className="w-full border border-1 border-gray-400 px-2 py-1 text-black"
              onChange={(e) => userInputProfile(e, "password")}
            />
          </div>
          <div className="text-red-700">{validateResult}</div>
          <div>
            <CustomButton>Send</CustomButton>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateUserPage;

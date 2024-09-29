"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "@/store/autoSlice";
import { useRouter } from "next/navigation";
import CustomButton from "@/components/atoms/SendButton";
import { loginCheck } from "@/lib/api";

interface EnteredState {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [enteredData, setEnteredData] = useState<EnteredState>({
    email: "",
    password: "",
  });
  const [discrepancyMessage, setDiscrepancyMessage] = useState<string>("");
  const dispatch = useDispatch();

  const inputLoginData = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof EnteredState
  ) => {
    setEnteredData({ ...enteredData, [key]: e.target.value });
  };

  const checkUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDiscrepancyMessage("");
    const result = await loginCheck(enteredData.email, enteredData.password);
    if (result) {
      dispatch(login());
      router.push("/users");
    } else {
      setEnteredData({ email: "", password: "" });
      setDiscrepancyMessage("ID or password is incorrect");
    }
  };

  return (
    <div className="h-screen p-4">
      <h1 className="text-4xl font-semibold text-gray-700 text-center mb-4">
        Login Page
      </h1>
      <form
        onSubmit={checkUser}
        className="border-4 border-double border-black py-8 px-4 w-3/4 mx-auto bg-gray-400 select-none"
      >
        <div className="flex flex-col items-center gap-8">
          <div className="flex items-center">
            <label htmlFor="email" className="underline w-32">
              Email:
            </label>
            <input
              type="text"
              id="email"
              value={enteredData.email}
              className="w-full border border-1 border-gray-400 px-2 py-1 text-black"
              onChange={(e) => inputLoginData(e, "email")}
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="password" className="w-32 underline">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={enteredData.password}
              className="w-full border border-1 border-gray-400 px-2 py-1 text-black"
              onChange={(e) => inputLoginData(e, "password")}
            />
          </div>
          <div className="text-red-700">{discrepancyMessage}</div>
          <div>
            <CustomButton>login</CustomButton>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;

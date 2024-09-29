"use client";

import { useSelector } from "react-redux";
import Link from "next/link";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "@/store/autoSlice";
interface HeaderProps {
  onOpen: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpen }) => {
  const isAuth = useSelector((state: RootState) => state.userAuth.isAuth);
  const router = useRouter();
  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <div>
      <div className="flex justify-between bg-gray-600 text-white px-4 py-2 select-none">
        <h3 className="font-semibold text-2xl">-PracticeCode-</h3>
        <div
          className="flex items-center sm:hidden"
          onClick={() => onOpen()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
        <ul className="sm:flex sm:gap-4 text-xl sm:block items-center  hidden">
          <li className="cursor-pointer hover:text-gray-300">
            <Link href="/" className="flex items-center gap-1">
              <div>Home</div>
            </Link>
          </li>
          {isAuth ? (
            <>
              <li className="cursor-pointer hover:text-gray-300">
                <Link href="/users" className="flex items-center gap-1">
                  <div>UserData</div>
                </Link>
              </li>
              <li
                className="cursor-pointer hover:text-gray-300 flex items-center gap-1"
                onClick={logoutUser}
              >
                <div>Logout</div>
              </li>
            </>
          ) : (
            <>
              <li className="cursor-pointer hover:text-gray-300">
                <Link href="/login" className="flex items-center gap-1">
                  <div>Login</div>
                </Link>
              </li>
              <li className="cursor-pointer hover:text-gray-300">
                <Link href="/signUp" className="flex items-center gap-1">
                  <div>SignUp</div>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;

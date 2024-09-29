"use client";
import { User } from "@/types/typeScript";
import Link from "next/link";

interface CardProps {
  user: User;
}

const Card: React.FC<CardProps> = ({ user }) => {
  return (
    <Link href={`/users/${user.id}`}>
      <div className="flex flex-col gap-2 p-2 border-4 border-double border-black w-64 select-none">
        <div className="flex">
          <div className="min-w-16 underline">Name:</div>
          <div className="break-words truncate">{user.name}</div>
        </div>
        <div className="flex">
          <div className="min-w-16 underline">Email:</div>
          <div className="break-all">{user.email}</div>
        </div>
        <div className="flex">
          <div className="min-w-16 underline">Phone:</div>
          <div className="break-words truncate">{user.phone}</div>
        </div>
      </div>
    </Link>
  );
};

export default Card;

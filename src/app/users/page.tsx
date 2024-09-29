"use client";
import { useState, useEffect } from "react";
import { getUsers } from "@/lib/api";
import Card from "@/components/Card";
import { User } from "@/types/typeScript";

const UsersData: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data);
      setIsLoading(false);
    };
    fetchUsers();
  }, []);

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

  if (users.length === 0) {
    <div className="h-screen p-4">
      <h1 className="text-4xl font-semibold text-gray-700 text-center mb-4">
        UsersData
      </h1>
      <div className="text-xl text-gray-900 text-center">
        データが登録されていません
      </div>
    </div>;
  }

  return (
    <div className="h-screen p-4">
      <h1 className="text-4xl font-semibold text-gray-700 text-center mb-4">
        UsersData
      </h1>
      <div className="flex flex-wrap gap-4">
        {users &&
          users.map((user: User) => {
            return <Card key={user.id} user={user} />;
          })}
      </div>
    </div>
  );
};

export default UsersData;

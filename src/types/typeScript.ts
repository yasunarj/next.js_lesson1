interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
}

interface UserDetailPageProps {
  params: {
    id: string
  }
}

export type { User, UserDetailPageProps };
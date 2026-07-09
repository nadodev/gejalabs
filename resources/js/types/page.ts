export interface SharedPageProps {
  auth: {
    user: {
      id: number;
      name: string;
      email: string;
    } | null;
  };
  flash: {
    success?: string | null;
    error?: string | null;
  };
}

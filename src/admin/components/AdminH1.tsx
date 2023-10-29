import { ReactNode } from 'react';

interface AdminH1Props {
  children: ReactNode;
}

export default function AdminH1({ children }: AdminH1Props) {
  return <h1 className="text-2xl font-semibold text-gray-900">{children}</h1>;
}

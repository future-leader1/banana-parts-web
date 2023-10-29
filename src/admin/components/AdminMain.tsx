import { ReactNode } from 'react';

export default function AdminH1({ children }: { children: ReactNode }) {
  return (
    <main className="relative flex flex-1 flex-col space-y-4 overflow-y-auto">
      {children}
    </main>
  );
}

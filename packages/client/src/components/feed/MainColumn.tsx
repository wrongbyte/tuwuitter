import { ReactNode } from 'react';

export default function MainColumn({ children }: { children: ReactNode }) {
  return (
    <main className="twitter-feed-wrapper">
      <div className="main-column-app xl:w-6/12 lg:w-4/5 w-11/12 mx-auto mb-auto">{children}</div>
    </main>
  );
}

import './globals.css';

export const metadata = {
  title: 'NTA CBT – Computer Based Test Platform',
  description: 'NTA-style Computer Based Test platform'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}

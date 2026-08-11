import './globals.css';

export const metadata = {
  title: 'GEC Banka Tech Quiz',
  description: 'Government Engineering College Banka online technical quiz platform'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}

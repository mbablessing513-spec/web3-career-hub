import './globals.css';

export const metadata = {
  title: 'Web3 Career Hub - Learn & Earn',
  description: 'Master Web3 skills and land high-income remote blockchain jobs',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-dark-950">
        {children}
      </body>
    </html>
  );
}
import NavBar from '@/components/NavBar';
import strings from '../strings';
import './globals.css'

export const metadata = {
    title: {
      default: strings.appName,
      template: `%s | ${strings.appName}`
    },
    description: strings.appTitle,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/fonts/orbitron-variable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/exo2-variable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-orange-50 flex flex-col px-4 py-2 min-h-screen">
        <NavBar />
        <main className="grow py-3">
          {children}
        </main>
        <footer className="border-t py-3 text-center text-slate-500 text-xs">
          Game data and images courtesy of{' '}
          <a href="https://rawg.io/" target="_blank"
            rel="noopener noreferrer"
            className="text-orange-800 hover:underline"
          >
            RAWG
          </a>
        </footer>
      </body>
    </html>
  );
}
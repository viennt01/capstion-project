import DashboardPage from '@/components/dashboard/dashboard';
import withAuthentication from '@/hook/useAuthentication';
import { Inter } from '@next/font/google';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

function Home() {
  return (
    <>
      <Head>
        <title>GLS | Dashboard</title>
      </Head>
      <main className={inter.className}>
        <DashboardPage />
      </main>
    </>
  );
}

export default withAuthentication(Home);

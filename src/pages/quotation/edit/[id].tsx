import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditQuotation from '@/components/quotation-page/quotation-edit';

function CustomerEditPage() {
  return (
    <>
      <Head>
        <title>GLS | QUOTATION Edit</title>
      </Head>
      <EditQuotation />
    </>
  );
}

export default withAuthentication(CustomerEditPage);
// import { getStatic } from '@/lib/getStaticProps';
// export const getStaticProps = getStatic(['common', 'quotation']);
// export async function getStaticPaths() {
//   return {
//     paths: [`/quotation/edit/[id]`, { params: { id: '0' } }],
//     fallback: false,
//   };
// }
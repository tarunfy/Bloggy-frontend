import Head from "next/head";

const Layout = ({ title, description }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/images/B.svg" />
      </Head>
    </>
  );
};

export default Layout;

import Head from "next/head";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Widgets from "../components/Widgets";
import CommentModal from "../components/CommentModal";

export default function Home({ newsArticle, randomUsersResults }) {
  return (
    <>
      <Head>
        <title>Twitter Clone</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen mx-auto">
        <Sidebar />

        <Feed />

        <Widgets
          newsArticle={newsArticle.articles}
          randomUsersResults={randomUsersResults.results}
        />

        <CommentModal />
      </main>
    </>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch(
    "https://saurav.tech/NewsAPI/top-headlines/category/business/us.json"
  );
  const newsArticle = await res.json();

  const followRes = await fetch(
    "https://randomuser.me/api/?results=30&inc=name,login,picture"
  );

  const randomUsersResults = await followRes.json();

  return {
    props: {
      newsArticle,
      randomUsersResults,
    },
  };
};

// https://saurav.tech/NewsAPI/top-headlines/category/business/us.json

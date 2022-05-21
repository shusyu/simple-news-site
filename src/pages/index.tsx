import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import MainLayout from '../layouts';
import Article from '../components/article';

export default function Home(props) {
  return (
    <MainLayout>
      <Head>
        <title>Simple News</title>
      </Head>
      <div className={styles.main}>
        <Article title="headLines" articles={props.topArticles} />
      </div>
    </MainLayout>
  )
}

export const getStaticProps = async () => {
  // NewsAPIのトップ記事の情報を取得
  const pageSize = 10;
  const apiKey = '42a8b39dc06a4ecf8e10a5908de4e2b5';
  const topReq = await fetch(
    `https://newsapi.org/v2/top-headlines?country=jp&pageSize=${pageSize}&apiKey=${apiKey}`
  )
  const topJson = await topReq.json();
  const topArticles = topJson?.articles;

  return {
    props: {
      topArticles,
    },
    revalidate: 60 * 10,
  }
};

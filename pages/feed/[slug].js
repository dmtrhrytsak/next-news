import { useRouter } from 'next/router';

import styles from '../../styles/Feed.module.css';

const Feed = ({ pageNumber, articles }) => {
  const router = useRouter();

  return (
    <div className="page-container">
      <div className={styles.main}>
        {articles.map((article, index) => (
          <div key={index} className={styles.post}>
            <h1>
              <a href={article.url}>{article.title}</a>
            </h1>
            <p>{article.description}</p>
            {article.urlToImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={article.urlToImage} alt={article.title} />
            )}
          </div>
        ))}
      </div>

      <div className={styles.paginator}>
        <div
          onClick={() => {
            if (pageNumber > 1) {
              router.push(`/feed/${pageNumber - 1}`);
            }
          }}
          className={pageNumber === 1 ? styles.disabled : styles.active}
        >
          Previous Page
        </div>
        <span>#{pageNumber}</span>
        <div
          onClick={() => {
            if (pageNumber < 5) {
              router.push(`/feed/${pageNumber + 1}`);
            }
          }}
          className={pageNumber === 5 ? styles.disabled : styles.active}
        >
          Next Page
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (pageContext) => {
  const pageNumber = pageContext.query.slug;

  if (!pageNumber || pageNumber < 1 || pageNumber > 5) {
    return {
      props: {
        articles: [],
        pageNumber: 1,
      },
    };
  }

  const apiResponse = await fetch(
    `https://newsapi.org/v2/top-headlines?country=ua&pageSize=5&page=${pageNumber}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWS_KEY}`,
      },
    }
  );

  const { articles } = await apiResponse.json();

  return {
    props: {
      pageNumber: Number(pageNumber),
      articles,
    },
  };
};

export default Feed;

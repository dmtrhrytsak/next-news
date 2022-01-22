import Link from 'next/link';

import styles from '../styles/Toolbar.module.css';

export const Toolbar = () => {
  return (
    <div className={styles.main}>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/feed/1">
        <a>Feed</a>
      </Link>
      <a
        href="https://github.com/dmtrhrytsak?tab=repositories"
        target="_blank"
        rel="noreferrer"
      >
        GitHub
      </a>
    </div>
  );
};

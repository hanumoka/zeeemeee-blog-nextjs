import React, { useEffect, useState } from 'react';
import 'react-notion/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css'; // only needed for code highlighting
import { NotionRenderer } from 'react-notion';

import { withAuthServer } from '../hoc/withAuthServer';

const About = () => {
  const [response, setResponse] = useState({});

  useEffect(() => {
    // 두번째 방법
    const NOTION_PAGE_ID = 'Sebure-v0-1-1-0553ca0692f14e79bb0c24c36b5cb05d';
    fetch(`https://notion-api.splitbee.io/v1/page/${NOTION_PAGE_ID}`)
      .then((res) => res.json())
      .then((resJson) => {
        setResponse(resJson);
      });
  }, []);

  return (
    <div style={{ maxWidth: 768 }}>
      <NotionRenderer
        // blockMap={staticResponse}
        blockMap={response}
        fullPage={true}
      />
    </div>
  );
};

export const getServerSideProps = withAuthServer((context) => {
  // Your normal `getServerSideProps` code here
  console.log('about getServerSideProps ...');
  return { props: { test: 'about 서버 응답' } };
});

export default About;

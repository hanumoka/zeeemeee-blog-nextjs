import React, { useState } from 'react';
import { Box, Link } from '@chakra-ui/react';
interface Props {
  content: string;
}
const Toc = ({ content }: Props) => {
  // activeId는 화면 상단에 위치한 제목 element 다룰 state
  const [activeId, setActiveId] = useState('');

  // 게시물 본문을 줄바꿈 기준으로 나누고, 제목 요소인 것만 저장
  const titles = content.split(`\n`).filter((t) => t.includes('# '));

  // 예외처리 - 제목은 문자열 시작부터 #을 써야함
  const result = titles
    .filter((str) => str[0] === '#')
    .map((item) => {
      // #의 갯수에 따라 제목의 크기가 달라지므로 갯수를 센다.
      let count = item.match(/#/g)?.length;
      if (count) {
        // 갯수에 따라 목차에 그릴때 들여쓰기 하기위해 *10을 함.
        count = count * 10;
      }

      // 제목의 내용물만 꺼내기 위해 '# '을 기준으로 나누고, 백틱과 공백을 없애주고 count와 묶어서 리턴
      return { title: item.split('# ')[1].replace(/`/g, '').trim(), count };
    });

  return (
    <Box>
      목차
      <Box>
        {result.map((item, idx) => {
          // count는 샾개수에 따른 들여쓰기용 변수
          if (item?.count && item.count <= 30 && item?.title) {
            return (
              <div>
                <Link color="teal.500" href={`#${item.title}`}>
                  {item.title}
                </Link>
              </div>
              // <ListItemLink
              //   // href에 #title을 주어서 클릭시 해당 위치로 스크롤 이동하도록 구현
              //   href={`#${item.title}`}
              //   key={item.title + idx}
              //   style={{ padding: '0px' }}
              //   className={clsx(
              //     classes.btnStyle,
              //     // activeId와 같은 list item만 스타일을 다르게 주어서 사용자에게 표시해준다.
              //     activeId === item.title && classes.currentHeading
              //   )}
              // >
              //   <ListItemText
              //     // 목차에 해당 하는 title을 넣는다.
              //     primary={`${item.title}`}
              //     style={{
              //       marginLeft: `${item.count}px`,
              //       overflow: 'hidden',
              //       color: '#909090',
              //     }}
              //     className={classes.tocFont}
              //   />
              // </ListItemLink>
            );
          }
        })}
      </Box>
    </Box>
  );
};

export default Toc;

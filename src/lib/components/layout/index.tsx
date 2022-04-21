import { Box } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import Header from './Header';
import layoutStore from '../../../stores/layoutStore';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const { layoutActive } = layoutStore((state) => state);
  return (
    <Box margin="0 auto" maxWidth={1200} transition="0.5s ease-out">
      <Box margin="8">
        {layoutActive && <Header />}
        <Box as="main" marginY={22}>
          {children}
        </Box>
        {/* 스크롤 화면시 푸터가 거슬려서 제거 */}
        {/*{layoutActive && <Footer />}*/}
      </Box>
    </Box>
  );
};

export default Layout;

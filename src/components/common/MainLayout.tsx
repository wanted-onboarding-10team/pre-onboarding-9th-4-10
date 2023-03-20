import React from 'react';
import { Flex } from '@chakra-ui/react';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex
      width='100vw'
      height='100%'
      minHeight='100vh'
      justifyContent='center'
      alignItems='center'
      flexDirection='column'
      gap='32px'
      padding='50px'
    >
      {children}
    </Flex>
  );
};

export default MainLayout;

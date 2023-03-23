import { Flex } from '@chakra-ui/react';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex
      width='1200px'
      margin='0 auto'
      padding='50px 0'
      flexDirection='column'
      alignItems='center'
    >
      {children}
    </Flex>
  );
};

export default MainLayout;

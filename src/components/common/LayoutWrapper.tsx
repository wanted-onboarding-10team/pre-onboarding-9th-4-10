import { Box, Center, Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';

const LayoutWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Flex justifyContent={'center'} overflow='hidden' marginBottom='200px'>
      <Center>
        <Box
          marginTop={200}
          minW='70vw'
          borderWidth='1px'
          borderRadius='lg'
          shadow='1px 1px 8px  #8686868f'
        >
          {children}
        </Box>
      </Center>
    </Flex>
  );
};

export default LayoutWrapper;

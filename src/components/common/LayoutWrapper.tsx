import { Box, BoxProps, Center, Flex } from '@chakra-ui/react';

const LayoutWrapper = (props: BoxProps) => {
  return (
    <Flex justifyContent={'center'} overflow='hidden' marginBottom='50px'>
      <Center>
        <Box
          marginTop={100}
          width='70vw'
          height='80vh'
          borderWidth='1px'
          borderRadius='2xl'
          shadow='1px 1px 8px  #8686868f'
          backgroundColor='whiteAlpha.900'
          {...props}
        >
          {props.children}
        </Box>
      </Center>
    </Flex>
  );
};

export default LayoutWrapper;

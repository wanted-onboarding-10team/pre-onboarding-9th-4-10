import { Text, TextProps, Box, BoxProps } from '@chakra-ui/react';

export const CustomTextBtn = (props: BoxProps) => {
  return (
    <Box fontSize={'xl'} cursor={'pointer'} _selection={{ background: 'none' }} {...props}>
      {props.children}
    </Box>
  );
};

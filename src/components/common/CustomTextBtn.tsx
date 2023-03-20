import { Text, TextProps } from '@chakra-ui/react';

export const CustomTextBtn = (props: TextProps) => {
  return (
    <Text fontSize={'xl'} cursor={'pointer'} _selection={{ background: 'none' }} {...props}>
      {props.children}
    </Text>
  );
};

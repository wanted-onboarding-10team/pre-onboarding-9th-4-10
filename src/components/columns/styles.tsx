import { MenuItemOption, Button, MenuItemOptionProps, ButtonProps } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const StyleAlineTd = styled.div`
  thead {
    position: sticky;
    top: 0;
    background-color: white;
    box-shadow: 1px 1px 8px #8686868f;
  }

  td {
    text-align: center;
  }

  th {
    text-align: center;
    position: sticky;
  }
`;

export const CustomMenuItem = (props: MenuItemOptionProps) => (
  <MenuItemOption minH='35px' fontSize='md' fontWeight='bold' {...props}>
    {props.children}
  </MenuItemOption>
);

export const CustomBtn = (props: ButtonProps) => (
  <Button variant='outline' {...props}>
    {props.children}
  </Button>
);

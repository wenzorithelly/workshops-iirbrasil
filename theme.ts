// theme.ts
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      100: '#fefefe', // white
      200: '#b58d3d', // darker gold
      250: '#d4af37',
      300: '#013220', // dark green
      400: '#002e12', // darker green
    },
  },
  styles: {
    global: {
      body: {
        bgGradient: 'linear(to-b, brand.400 95%, brand.300)',
        color: 'white',
      },
    },
  },
});

export default theme;

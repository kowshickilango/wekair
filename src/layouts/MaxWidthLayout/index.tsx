import { Box } from '@mui/material';
import { ReactNode } from 'react';

export const MaxWidthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Box maxWidth={430} mx='auto' px={2}>
      {children}
    </Box>
  );
};

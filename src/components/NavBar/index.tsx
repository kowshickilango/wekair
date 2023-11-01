import { ShoppingBagOutlined } from '@mui/icons-material';
import { Box, IconButton, Stack } from '@mui/material';
import Logo from '../Logo';
import CustomDrawer from '../Drawer';

const NavBar = () => {
  return (
    <Box
      width={1}
      bgcolor='primary.main'
      position='sticky'
      top={0}
      zIndex={100}
      px={6}
    >
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        width='100%'
        mx='auto'
      >
        <Logo />

        <Stack direction='row' justifyContent='flex-end' alignItems='center'>
          <CustomDrawer />
        </Stack>
      </Stack>
    </Box>
  );
};

export default NavBar;

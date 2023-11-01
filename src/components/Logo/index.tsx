import { Box } from "@mui/material";
import Image from "next/image";

const Logo = () => {
  return (
    <Box position="relative" width="80px" height="80px">
      <Image src="/logo.png" fill={true} alt="logo" />
    </Box>
  );
};

export default Logo;

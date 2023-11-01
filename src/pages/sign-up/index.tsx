import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';

type FormFied = {
  fullName: string;
  email: string;
  password: string;
};

export default function Index() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormFied>();

  const onSubmit = async (data: FormFied) => {};
  return (
    <Box mt={4} textAlign='center' p={4} border={2} borderRadius={6}>
      <Typography variant='h4' fontWeight='600' color='primary.main' mb={4}>
        WEKAIR
      </Typography>
      <form>
        <Typography variant='h4' mb={4} textAlign='left'>
          Welcome
        </Typography>
        <Stack direction='column' spacing={2} mb={6}>
          <Controller
            control={control}
            name='fullName'
            render={({ field }) => (
              <TextField {...field} variant='outlined' label='Full Name' />
            )}
          />
          <Controller
            control={control}
            name='email'
            render={({ field }) => (
              <TextField {...field} variant='outlined' label='E-mail' />
            )}
          />
          <Controller
            control={control}
            name='password'
            render={({ field }) => (
              <TextField {...field} variant='outlined' label='Password' />
            )}
          />
        </Stack>
        <Button variant='contained' color='primary'>
          Sign Up
        </Button>
      </form>
    </Box>
  );
}

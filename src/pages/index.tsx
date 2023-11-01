import { Box, Typography } from '@mui/material';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { EmissionTest } from '@/models/EmissionTest.interface';
import VehicleStatusCard from '@/components/VehicleStatusCard';
import axiosInstance from '@/utils/axios';
import { AxiosRequestConfig } from 'axios';
import { bearerToken } from '@/utils/constants';
import { getSession } from 'next-auth/react';

export default function Home({
  tests,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Box mt={4}>
      {tests.map((test, i) => (
        <VehicleStatusCard key={i} test={test} />
      ))}
    </Box>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // const session = await getSession(context);
  // console.log('session from index', session);
  
  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: '/signin',
  //       permanent: false,
  //     },
  //   };
  // }

  try {
    const config: AxiosRequestConfig = {
      headers: { Authorization: `Bearer ${bearerToken}` },
    };
    const { data } = await axiosInstance.get<EmissionTest[]>(
      'emission-tests/my',
      config
    );
    return {
      props: { tests: data }, // will be passed to the page component as props
    };
  } catch (err) {
    return { notFound: true };
  }
}

import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { Box, Grid, Typography } from '@mui/material';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import axiosInstance from '@/utils/axios';
import { AxiosRequestConfig } from 'axios';
import { bearerToken } from '@/utils/constants';
import { Vehicle } from '@/models/Vehicle';
import VehicleCard from '@/components/VehicleCard/VehicleCard';

export default function Home({
  vehicles,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Grid container mt={4} spacing={2}>
      {vehicles.map((vehicle, i) => (
        <Grid key={vehicle.regNumber} item xs={12}> 
          <VehicleCard vehicle={vehicle} />
        </Grid>
      ))}
    </Grid>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const config: AxiosRequestConfig = {
      headers: { Authorization: `Bearer ${bearerToken}` },
    };
    const { data } = await axiosInstance.get<Vehicle[]>('vehicle/my', config);
    return {
      props: { vehicles: data }, // will be passed to the page component as props
    };
  } catch (err) {
    return { notFound: true };
  }
}

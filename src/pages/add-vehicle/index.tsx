import VehicleStatusCard from '@/components/VehicleStatusCard';
import { vehicleTypes } from '@/config/selectOptions';
import { CustomError } from '@/utils/CustomError';
import { ToastType, appToast } from '@/utils/appToast';
import axiosInstance from '@/utils/axios';
import { bearerToken } from '@/utils/constants';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { AxiosRequestConfig } from 'axios';
import { Controller, useForm } from 'react-hook-form';

type FormFied = {
  regNumber: string;
  type: string;
  yearOfManufacture: number;
};

export default function Home() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormFied>();

  const onSubmit = async (data: FormFied) => {
    const config: AxiosRequestConfig = {
      headers: { Authorization: `Bearer ${bearerToken}` },
    };
    axiosInstance
      .post('vehicle', data, config)
      .then((res) => {
        appToast('Vehicle added successfully', ToastType.success);
      })
      .catch((err) => {
        console.log('vehcile add error', err);
        appToast(new CustomError(err).message, ToastType.error);
      });
  };
  return (
    <Box mt={4}>
      <Typography variant='h4' mb={2}>
        Add Vehicle
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={2}>
          <Controller
            control={control}
            rules={{ required: 'Please enter vehicle registration number' }}
            name='regNumber'
            render={({ field }) => (
              <TextField
                {...field}
                size='small'
                variant='outlined'
                label='Vehicle No.'
                error={!!errors.regNumber}
                helperText={
                  errors.regNumber && String(errors.regNumber.message)
                }
              />
            )}
          />
        </Box>
        <Box mb={2}>
          <Controller
            control={control}
            rules={{ required: 'Please select type' }}
            name='type'
            render={({ field }) => (
              <FormControl sx={{ width: '100%' }} error={!!errors.type}>
                <InputLabel shrink color='secondary' required>
                  Vehicle type
                </InputLabel>
                <Select
                  {...field}
                  notched
                  placeholder='Select vehicle number'
                  fullWidth
                  displayEmpty
                  color='secondary'
                  size='small'
                  label='Vehicle type'
                >
                  <MenuItem value={undefined}>
                    <Typography variant='body1' color='text.secondary'>
                      Select vehicle number
                    </Typography>
                  </MenuItem>
                  {vehicleTypes.map((type, i) => (
                    <MenuItem key={i} value={type}>
                      {type.replace('-', ' ').charAt(0).toUpperCase() +
                        type.replace('-', ' ').slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        </Box>
        <Box mb={2}>
          <Controller
            control={control}
            rules={{
              required: 'Please enter year of manufacture',
              pattern: {
                value: /^[0-9]{4}$/,
                message: 'Please enter valid year',
              },
            }}
            name='yearOfManufacture'
            render={({ field }) => (
              <TextField
                {...field}
                size='small'
                variant='outlined'
                label='Year of manufacture'
                error={!!errors.yearOfManufacture}
                helperText={
                  errors.yearOfManufacture &&
                  String(errors.yearOfManufacture.message)
                }
              />
            )}
          />
        </Box>
        <Button variant='contained' type='submit'>
          SUBMIT
        </Button>
      </form>
    </Box>
  );
}

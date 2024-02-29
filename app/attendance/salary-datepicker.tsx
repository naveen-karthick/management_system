'use client';

import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function SalaryDatePicker({ date }: { date: Date }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const minDate = dayjs(date).subtract(6, 'month');

  const handleDateChange = (e: any) => {
    const date = new Date(e);

    const params = new URLSearchParams(searchParams);

    params.set('date', date.toISOString().slice(0, 7));

    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={'Select Attendance Month'}
          views={['year', 'month']}
          openTo="month"
          minDate={minDate}
          maxDate={dayjs(Date.now())}
          defaultValue={dayjs(date)}
          onChange={handleDateChange}
        />
      </LocalizationProvider>
    </div>
  );
}

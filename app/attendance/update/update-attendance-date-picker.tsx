'use client';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function EmployeeAttendanceDatePicker({ date }: any) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const updateDate = (e: any) => {
    const newDate = new Date(e);
    const newModifiedDate = new Date(
      newDate.getTime() - newDate.getTimezoneOffset() * 60000,
    )
      .toISOString()
      .slice(0, 10);
    const params = new URLSearchParams(searchParams);

    params.set('date', newModifiedDate);

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="space-y-3">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          onChange={updateDate}
          label={'Select Attendance Date'}
          defaultValue={dayjs(date)}
        />
      </LocalizationProvider>
    </div>
  );
}

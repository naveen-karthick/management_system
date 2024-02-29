'use client';

import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const EmployeeSelector = ({ employees, employeeId }: any) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleEmployeeChange = (e: any) => {
    const params = new URLSearchParams(searchParams);

    params.set('employeeId', e.target.value);

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <FormControl className="w-44">
      <InputLabel id="demo-simple-select-label">Select Employee</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Select Employee"
        value={employeeId || ''}
        onChange={handleEmployeeChange}
      >
        {employees.map((employee: any) => (
          <MenuItem key={employee.id} value={employee.id}>
            {employee.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

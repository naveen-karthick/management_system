'use client';
import { Checkbox, TextField } from '@mui/material';
import { TableCell, TableRow } from '@tremor/react';

import { TextInput } from '@tremor/react';

export const TextInputHero = () => <TextInput className="mx-auto max-w-xs" />;

export default function AttendanceRow({
  employeeAttendance,
  updateAttendance,
}: any) {
  const workDuration =
    employeeAttendance.work_duration !== null
      ? Number(employeeAttendance.work_duration)
      : null;

  const overTime =
    employeeAttendance.over_time !== null
      ? Number(employeeAttendance.over_time)
      : '';

  const advancePay =
    employeeAttendance.advance_pay !== null
      ? Number(employeeAttendance.advance_pay)
      : '';

  const updateAttendanceDetails = (employeeAttendance: any) => {
    updateAttendance(employeeAttendance);
  };

  return (
    <TableRow key={employeeAttendance.id}>
      <TableCell>{employeeAttendance.name}</TableCell>

      <TableCell>
        <Checkbox
          checked={1 === workDuration}
          onChange={() =>
            updateAttendanceDetails({ ...employeeAttendance, work_duration: 1 })
          }
        />
      </TableCell>
      <TableCell>
        <Checkbox
          checked={0.5 === workDuration}
          onChange={() =>
            updateAttendanceDetails({
              ...employeeAttendance,
              work_duration: 0.5,
            })
          }
        />
      </TableCell>
      <TableCell>
        <Checkbox
          checked={0 === workDuration}
          onChange={() =>
            updateAttendanceDetails({ ...employeeAttendance, work_duration: 0 })
          }
        />
      </TableCell>

      <TableCell>
        <TextField
          className="w-24"
          id="outlined-number"
          label="Hours"
          type="number"
          value={overTime}
          onChange={(e) => {
            updateAttendanceDetails({
              ...employeeAttendance,
              over_time: e.target.value,
            });
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </TableCell>

      <TableCell className="flex items-center">
        <TextField
          id="outlined-number"
          label="Amount"
          type="number"
          value={advancePay}
          onChange={(e) => {
            updateAttendanceDetails({
              ...employeeAttendance,
              advance_pay: e.target.value,
            });
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </TableCell>
    </TableRow>
  );
}

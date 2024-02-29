import { Checkbox, Chip } from '@mui/material';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@tremor/react';

interface Attendance {
  employee_id: string;
  employee_name: string;
  work_date: string;
  work_duration: number;
  over_time: number;
}

export default function AttendanceTable({
  attendance,
}: {
  attendance: Attendance[];
}) {
  const sortedAttendance = attendance.sort((a: any, b: any) =>
    new Date(a.work_date) > new Date(b.work_date) ? 1 : -1,
  );
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Date</TableHeaderCell>
          <TableHeaderCell>Full Day</TableHeaderCell>
          <TableHeaderCell>Half Day</TableHeaderCell>
          <TableHeaderCell>Absent</TableHeaderCell>
          <TableHeaderCell>OverTime</TableHeaderCell>
          <TableHeaderCell>Advance Amount</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {sortedAttendance.map((employee: any) => {
          const date = new Date(employee.work_date).toLocaleDateString();
          const workDuration = Number(employee.work_duration);

          return (
            <TableRow key={employee.work_date}>
              <TableCell>{date}</TableCell>

              <TableCell>
                <Checkbox
                  className="cursor-not-allowed opacity-50"
                  checked={1 === workDuration}
                />
              </TableCell>
              <TableCell>
                <Checkbox
                  className="cursor-not-allowed opacity-50"
                  checked={0.5 === workDuration}
                />
              </TableCell>
              <TableCell>
                <Checkbox
                  className="cursor-not-allowed opacity-50"
                  checked={0 === workDuration}
                />
              </TableCell>

              <TableCell>
                <span className="text-lg font-bold">{employee.over_time}</span>
              </TableCell>

              <TableCell>
                <span className="text-md font-bold">
                  {employee.advance_pay}
                </span>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

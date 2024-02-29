'use client';

import {
  Button,
  Table,
  TableBody,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@tremor/react';
import AttendanceRow from './attendance-row';
import { useEffect, useState } from 'react';
import { updateAttendanceTable } from '@/app/lib/actions';

interface Attendance {
  employee_id: number;
  employee_name: string;
  work_date: string;
  work_duration: number;
  over_time: number;
  advance_pay: number;
}

export default function AttendanceTable({
  attendance,
}: {
  attendance: Attendance[];
}) {
  const [employeeTotalAttendance, setEmployeeTotalAttendance] =
    useState(attendance);

  const [updating, setUpdating] = useState(false);

  const updateAttendance = (newAttendance: any) => {
    const newTotalAttendance = employeeTotalAttendance.filter(
      (employeeAttendance) =>
        employeeAttendance.employee_id !== newAttendance.id,
    );

    newTotalAttendance.push(newAttendance);

    newTotalAttendance.sort((a, b) => a.employee_id - b.employee_id);

    setEmployeeTotalAttendance(newTotalAttendance);
  };

  const updateEmployeeAttendance = async () => {
    setUpdating(true);
    try {
      await updateAttendanceTable(employeeTotalAttendance);
    } catch (err) {
      console.log('Error occured while updating');
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    setEmployeeTotalAttendance(attendance);
  }, [attendance]);

  console.log(employeeTotalAttendance);

  return (
    <div className={`${updating && 'cursor-not-allowed opacity-50'}`}>
      <div className="mb-8 flex justify-end">
        <Button
          variant="primary"
          onClick={updateEmployeeAttendance}
          loading={updating}
          disabled={updating}
        >
          Update Attendance
        </Button>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Employee Name</TableHeaderCell>
            <TableHeaderCell>Full Day</TableHeaderCell>
            <TableHeaderCell>Half Day</TableHeaderCell>
            <TableHeaderCell>Absent</TableHeaderCell>
            <TableHeaderCell>OverTime</TableHeaderCell>
            <TableHeaderCell>Advance Amount</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employeeTotalAttendance.map((employeeAttendance: any) => {
            return (
              <AttendanceRow
                employeeAttendance={employeeAttendance}
                key={employeeAttendance.id}
                updateAttendance={updateAttendance}
              />
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

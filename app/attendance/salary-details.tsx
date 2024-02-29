import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Card,
  List,
  ListItem,
} from '@tremor/react';
import { getEmployeeAttendance } from '../lib/data';
import AttendanceTable from './table';
import { Alert, CardHeader } from '@mui/material';

export default async function SalaryDetails({
  employeeId,
  date,
}: {
  employeeId: string;
  date: Date;
}) {
  const year = date.getFullYear(),
    month = date.getMonth() + 1;
  const attendance: Array<any> = await getEmployeeAttendance(
    year,
    month,
    employeeId,
  );

  if (attendance.length === 0)
    return (
      <Card className="mt-6 flex justify-center">
        <Alert severity="info">No Attendance record found for the month.</Alert>
      </Card>
    );

  const employee = attendance[0];

  const totalFullWorkingDays = attendance.filter(
    (employeeAttendance) => Number(employeeAttendance.work_duration) === 1,
  ).length;

  const totalHalfWorkingDays = attendance.filter(
    (employeeAttendance) => Number(employeeAttendance.work_duration) === 0.5,
  ).length;

  const totalOverTimeHours = attendance.reduce(
    (prev, employeeAttendance) => prev + Number(employeeAttendance.over_time),
    0,
  );

  const totalWorkingDays = totalFullWorkingDays + 0.5 * totalHalfWorkingDays;

  const totalAdvance = attendance.reduce(
    (prev, employeeAttendance) => prev + Number(employeeAttendance.advance_pay),
    0,
  );

  const totalWorkingHoursPay = totalWorkingDays * employee.daily_wage,
    totalOverTimePay = (totalOverTimeHours / 8) * employee.daily_wage,
    totalPay = totalWorkingHoursPay + totalOverTimePay - totalAdvance;

  return (
    <Card className="mt-6">
      <Accordion className="mt-8" defaultOpen>
        <AccordionHeader className="dark:text-dark-tremor-content-strong text-sm font-medium text-tremor-content-strong">
          Salary Details
        </AccordionHeader>
        <AccordionBody>
          <div className="mt-6 flex justify-between gap-4">
            <Card className="mb-6 flex w-1/2 flex-col gap-4">
              <div>
                <span className="font-medium">Employee Name : </span>
                <span className="font-bold"> {employee.name}</span>
              </div>
              <div>
                <span className="font-medium">Daily Wage : </span>{' '}
                <span className="font-bold"> {employee.daily_wage}</span>
              </div>
              <div>
                <span className="font-medium">
                  Total Advance for the month :{' '}
                </span>{' '}
                <span className="font-bold"> {totalAdvance}</span>
              </div>
            </Card>
            <Card className="mb-6 flex w-1/2 flex-col gap-4">
              <div>
                <span className="font-medium">Total Full Working days : </span>
                <span className="font-bold"> {totalFullWorkingDays}</span>
              </div>
              <div>
                <span className="font-medium">Total Half Working days : </span>
                <span className="font-bold"> {totalHalfWorkingDays}</span>
              </div>
              <div>
                <span className="font-medium">
                  Total Working days ( {totalFullWorkingDays} +{' '}
                  {totalHalfWorkingDays / 2} ) :
                </span>
                <span className="font-bold"> {totalWorkingDays}</span>
              </div>
              <div>
                <span className="font-medium">Total overTime Hours: </span>
                <span className="font-bold"> {totalOverTimeHours}</span>
              </div>
            </Card>
          </div>
          <div className="mt-6 flex justify-center gap-4">
            <Card className="mb-6 flex w-1/2 flex-col gap-4">
              <h2 className="flex justify-center font-bold">Salary Details</h2>
              <List>
                <ListItem>
                  <span>
                    Salary ({totalWorkingDays}*{employee.daily_wage})
                  </span>
                  <span className="text-green-600 font-bold">{totalWorkingHoursPay}</span>
                </ListItem>
                <ListItem>
                  <span>
                    Overtime ({totalOverTimeHours} / 8 * {employee.daily_wage})
                  </span>
                  <span className="font-bold text-green-600">
                    {totalOverTimePay}
                  </span>
                </ListItem>
                <ListItem>
                  <span>Advance</span>
                  <span className="font-bold text-red-600">
                    - {totalAdvance}
                  </span>
                </ListItem>
                <ListItem>
                  <span className="font-semibold">Total</span>
                  <span className="font-bold ">{totalPay}</span>
                </ListItem>
              </List>
            </Card>
          </div>
        </AccordionBody>
      </Accordion>
      <Accordion className="mt-8">
        <AccordionHeader className="dark:text-dark-tremor-content-strong text-sm font-medium text-tremor-content-strong">
          Attendance Details
        </AccordionHeader>
        <AccordionBody className="leading-6">
          <AttendanceTable attendance={attendance} />
        </AccordionBody>
      </Accordion>
    </Card>
  );
}

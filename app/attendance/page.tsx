import { lusitana } from '@/app/ui/fonts';
import { fetchAllEmployees } from '../lib/data';
import AttendanceDatePicker from './salary-datepicker';
import { EmployeeSelector } from './employee-selector';
import SalaryDetails from './salary-details';
import { Suspense } from 'react';
import { InvoicesTableSkeleton } from '../ui/skeletons';
import { Alert } from '@mui/material';
import { Card } from '@tremor/react';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    date?: string;
    employeeId?: string;
  };
}) {
  const employeeId = searchParams?.employeeId;

  const date = searchParams?.date ? new Date(searchParams?.date) : new Date();

  const employees = await fetchAllEmployees();

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Attendance and Salary
      </h1>
      <div className="mt-10 flex justify-between">
        <EmployeeSelector employees={employees} employeeId={employeeId} />
        <AttendanceDatePicker date={date} />
      </div>
      {employeeId ? (
        <Suspense fallback={<InvoicesTableSkeleton />}>
          <SalaryDetails employeeId={employeeId} date={date} />
        </Suspense>
      ) : (
        <Card className="mt-6 flex justify-center">
          <Alert severity="info">
            Please Select an Employee to view their salary Details for the given
            Month.
          </Alert>
        </Card>
      )}
    </main>
  );
}

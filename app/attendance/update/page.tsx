import { getAllEmployeeAttendance } from '@/app/lib/data';
import { lusitana } from '@/app/ui/fonts';
import { Card } from '@tremor/react';
import AttendanceTable from './attendace-table';
import EmployeeAttendanceDatePicker from './update-attendance-date-picker';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    date?: string;
  };
}) {
  const date = searchParams?.date ? new Date(searchParams?.date) : new Date();

  console.log(date);

  const attendance: any = await getAllEmployeeAttendance(date);

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Mark Attendance
      </h1>
      <div className="flex ">
        <EmployeeAttendanceDatePicker date={date} />
      </div>
      <Card className="mt-6">
        <AttendanceTable attendance={attendance} />
      </Card>
    </main>
  );
}

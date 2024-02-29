const { db } = require('@vercel/postgres');
const { employees } = require('./data');

async function seedEmployees(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      employees.map(async (employee) => {
        return client.sql`
        INSERT INTO employees (id, name, daily_wage)
        VALUES (${employee.id}, ${employee.name}, ${employee.daily_wage})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} employees`);

    return {
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding employees:', error);
    throw error;
  }
}

// Function to generate list of dates for a particular month
function generateDateList(startDate, endDate) {
  const dateList = [];
  let currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    dateList.push(currentDate.toISOString().slice(0, 10)); // Format: 'YYYY-MM-DD'
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dateList;
}

async function seedEmployeeAttendance(employee, dateList, client) {
  const rows = dateList.map((date) => ({
    employee_id: employee.id,
    work_date: date,
    work_duration: null,
    over_time: null,
  }));

  await Promise.all(
    rows.map(async (attendance) => {
      return client.sql`
      INSERT INTO Attendance (Employee_Id, work_date, Work_Duration, Over_Time)
      VALUES (${attendance.employee_id}, ${attendance.work_date}, ${attendance.work_duration}, ${attendance.over_time})
      ON CONFLICT DO NOTHING
    `;
    }),
  );

  console.log('Attendance inserted for Employee', employee.name);
}

// Function to perform bulk insert into the Attendance table
async function bulkInsertAttendance(client, startDate, endDate) {
  try {
    // Generate date list
    const dateList = generateDateList(startDate, endDate);

    await Promise.all(
      employees.map((employee) =>
        seedEmployeeAttendance(employee, dateList, client),
      ),
    );

    console.log('Bulk insert completed successfully');
  } catch (error) {
    console.error('Error during bulk insert:', error);
  }
}

const START_DATE = '2024-03-01',
  END_DATE = '2024-03-31';

async function main() {
  const client = await db.connect();

  // await seedEmployees(client);

  await bulkInsertAttendance(client, new Date(START_DATE), new Date(END_DATE));

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});

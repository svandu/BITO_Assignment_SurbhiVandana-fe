import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useSubscriptionDetails,
  useSubscriptionStats,
} from "@/lib/reactQuery/queries";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

const subscriptionDetailsTableHeader = [
  {
    accessorKey: "subscriberId",
    header: "Subscriber Id",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("subscriberId")}</div>
    ),
  },
  {
    accessorKey: "subscriberName",
    header: "Subscriber Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("subscriberName")}</div>
    ),
  },
  {
    accessorKey: "subscriberCountry",
    header: "Subscriber Country",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("subscriberCountry")}</div>
    ),
  },
  {
    accessorKey: "subscriptionDate",
    header: "Subscription Date",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("subscriptionDate")}</div>
    ),
  },
];

const DataTable = ({ data = [] }) => {
  const table = useReactTable({
    data,
    columns: subscriptionDetailsTableHeader,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // useEffect(() => {
  //   table.setPageSize(15);
  // }, []);

  return (
    <Table stickyClass="max-h-[500px] overflow-y-auto w-full">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => {
          return (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className={`sticky top-0 left-0 border-b border-gray-300 bg-gray-100 py-3 text-gray-600 capitalize px-3 font-semibold text-center`}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          );
        })}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length &&
          table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="text-center py-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

const SubscriptionDetails = () => {
  const subscriptionDetailsData = useSubscriptionDetails();

  const subscriptionStatsData = useSubscriptionStats();

  const subscriptionDetails = subscriptionDetailsData?.data?.data
    ? subscriptionDetailsData?.data?.data?.data
    : [];

  const subscriptionStats = subscriptionStatsData?.data?.data
    ? subscriptionStatsData?.data?.data?.data
    : [];

  return (
    <div className="mt-10 w-full">
      <h1 className="text-lg font-semibold text-gray-700">
        Bito Subscription Details
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 my-5 space-y-3 md:space-y-0">
        <div className="border max-w-[300px] w-full">
          <p className="text-lg font-semibold border-b p-3">
            Total Subscriber Count
          </p>
          <p className="text-right py-5 px-5 text-2xl font-medium">
            {subscriptionStats ? subscriptionStats.totalSubscriberCount : 0}
          </p>
        </div>

        <div className="border max-w-[300px] w-full">
          <p className="text-lg font-semibold border-b p-3">
            Subscriber Longest Duration
          </p>
          <p className="text-right py-5 px-5 text-2xl font-medium">
            {subscriptionStats ? subscriptionStats.longestDurationInDays : 0}
          </p>
        </div>

        <div className="border max-w-[300px] w-full">
          <p className="text-lg font-semibold border-b p-3">
            Country with Most Subscribers
          </p>
          <p className="text-right py-5 px-5 text-2xl font-medium">
            {subscriptionStats
              ? subscriptionStats.countryWithMostSubscribers
              : 0}
          </p>
        </div>
      </div>
      <div className="rounded-sm shadow-sm border border-gray-200 bg-gray-50 overflow-x-auto mt-2">
        {subscriptionDetails.length > 0 && (
          <DataTable data={subscriptionDetails} />
        )}

        {subscriptionDetails.length <= 0 && (
          <p className="py-10 text-center">No data available...</p>
        )}
      </div>
    </div>
  );
};

export default SubscriptionDetails;

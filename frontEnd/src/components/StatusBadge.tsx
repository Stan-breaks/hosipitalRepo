type StatusType = "scheduled" | "completed" | "cancelled";

export const StatusBadge = ({ status }: { status: StatusType }) => {
  const variants = {
    scheduled: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  return (
    <span className={`px-2 py-1 rounded-full text-sm ${variants[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

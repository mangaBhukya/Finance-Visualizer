import DashboardSummary from "@/components/Dashboard";
import MonthlyChart from "@/components/MonthlyChart";
import CategoryPieChart from "@/components/CategoryPieChart";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
        Dashboard
      </h1>
      <DashboardSummary />
      <MonthlyChart />
      <CategoryPieChart />
    </div>
  );
}

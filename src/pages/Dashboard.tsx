import { LabLayout } from "@/components/lab/LabLayout";

const Dashboard = () => {
  return (
    <LabLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-card border rounded-lg p-6">
            <h3 className="text-lg font-medium mb-2">Active Batches</h3>
            <p className="text-3xl font-bold text-primary">24</p>
          </div>
          <div className="bg-card border rounded-lg p-6">
            <h3 className="text-lg font-medium mb-2">Pending Tests</h3>
            <p className="text-3xl font-bold text-lab-status-pending">12</p>
          </div>
          <div className="bg-card border rounded-lg p-6">
            <h3 className="text-lg font-medium mb-2">Completed Today</h3>
            <p className="text-3xl font-bold text-lab-status-complete">8</p>
          </div>
          <div className="bg-card border rounded-lg p-6">
            <h3 className="text-lg font-medium mb-2">Alerts</h3>
            <p className="text-3xl font-bold text-destructive">3</p>
          </div>
        </div>
      </div>
    </LabLayout>
  );
};

export default Dashboard;
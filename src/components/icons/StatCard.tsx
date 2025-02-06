import React from "react";

interface StatCardProps {
  icon: React.ComponentType<{ className: string }>;
  value: string | number;
  label: string;
  change?: string | number;
  isPositive?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, value, label, change, isPositive = true }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        {change && (
          <span className={`text-sm font-medium ${isPositive ? "text-green-500" : "text-red-500"}`}>
            {isPositive ? "+" : ""}
            {change}%
          </span>
        )}
      </div>
      <h3 className="text-3xl font-bold mb-1">{value}</h3>
      <p className="text-gray-600">{label}</p>
    </div>
  );
};

export default StatCard;

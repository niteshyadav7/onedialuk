import React from "react";
import { motion } from "framer-motion";
import { User, Building2 } from "lucide-react";

export const RoleSelector = ({ selectedRole, onRoleSelect, error }) => {
  const roles = [
    {
      key: "user",
      label: "Register as User",
      icon: <User size={20} />,
      description: "Join as a customer",
    },
    {
      key: "business",
      label: "Register as Vendor",
      icon: <Building2 size={20} />,
      description: "Join as a business",
    },
  ];

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        {roles.map((role) => (
          <motion.button
            key={role.key}
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onRoleSelect(role.key)}
            className={`
              p-4 rounded-lg border-2 transition-all duration-200
              flex flex-col items-center gap-2 text-center
              ${
                selectedRole === role.key
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-300 hover:border-gray-400 text-gray-700"
              }
            `}
          >
            {role.icon}
            <div>
              <div className="font-medium text-sm">{role.label}</div>
              <div className="text-xs opacity-75">{role.description}</div>
            </div>
          </motion.button>
        ))}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-600 text-center"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

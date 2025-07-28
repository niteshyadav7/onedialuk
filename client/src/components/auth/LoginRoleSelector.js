import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

export const LoginRoleSelector = ({ selectedRole, onRoleSelect, error }) => {
  const roles = [
    { key: "user", label: "Login as User" },
    { key: "business", label: "Login as Vendor" },
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
              py-3 px-4 rounded-lg border-2 transition-all duration-200
              font-medium text-sm
              ${
                selectedRole === role.key
                  ? "border-blue-500 bg-blue-500 text-white"
                  : "border-gray-300 text-gray-700 hover:border-gray-400"
              }
            `}
          >
            {role.label}
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

LoginRoleSelector.propTypes = {
  selectedRole: PropTypes.oneOf(["user", "business", ""]).isRequired,
  onRoleSelect: PropTypes.func.isRequired,
  error: PropTypes.string,
};

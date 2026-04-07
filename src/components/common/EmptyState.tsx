import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  title: string;
  description?: string;
  icon?: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
};

const EmptyState = ({
  title,
  description,
  icon,
  actionLabel,
  onAction,
}: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      {/* ICON */}
      {icon && (
        <div className="w-20 h-20 mb-6 rounded-full bg-primary/10 flex items-center justify-center">
          {icon}
        </div>
      )}

      {/* TITLE */}
      <h3 className="text-xl font-semibold text-primary mb-2">{title}</h3>

      {/* DESCRIPTION */}
      {description && (
        <p className="text-black/50 max-w-sm mb-6">{description}</p>
      )}

      {/* ACTION */}
      {actionLabel && onAction && (
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={onAction}
          className="px-5 py-2 rounded-lg bg-primary text-white hover:opacity-90 transition"
        >
          {actionLabel}
        </motion.button>
      )}
    </motion.div>
  );
};

export default EmptyState;

import { motion } from "framer-motion";

const FooterMenu = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Footer */}
      <div className="text-center py-5 text-sm text-black/50">
        Dibuat oleh{" "}
        <span className="text-primary/80 font-bold">
          Rafi Ardinata Riskiansyah
        </span>
        <p className="text-xs text-gray">
          &copy; 2026 Rafi Ardinata Riskiansyah. All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
};

export default FooterMenu;

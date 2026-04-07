import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";

const NavigationMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Foods", path: "#how-it-works" },
    { label: "Ingredients", path: "#gallery" },
    { label: "Local Culinary", path: "#pricing" },
  ];

  // Detect scroll position untuk efek resize
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle scroll ke anchor
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Handle click menu
  const handleNavClick = (path: string) => {
    setIsMenuOpen(false);

    if (path.startsWith("#")) {
      if (location.pathname !== "/") {
        navigate("/" + path);
        return;
      }
      handleScrollTo(path.replace("#", ""));
    } else {
      navigate(path);
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (location.pathname !== "/") {
      navigate("/");
      return;
    }

    // smooth scroll ke paling atas
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const isActive = (path: string) => {
    if (path.startsWith("#")) return location.hash === path;
    return location.pathname === path;
  };

  return (
    // Wrapper: full-width fixed, tapi konten di dalamnya yang "menyempit"
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4">
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          width: scrolled ? "fit-content" : "100%",
          maxWidth: scrolled ? "860px" : "1280px",
        }}
        transition={{
          y: { duration: 0.5, ease: "easeOut" },
          opacity: { duration: 0.5 },
          width: { duration: 0.4, ease: "easeInOut" },
          maxWidth: { duration: 0.4, ease: "easeInOut" },
        }}
        className={`
            w-full rounded-2xl overflow-visible transition-all duration-300
            ${
              scrolled
                ? "bg-primary/80 backdrop-blur-md border border-white/10 shadow-lg"
                : "bg-primary"
            }
        `}
      >
        <div
          className="flex items-center justify-between px-6 transition-all duration-300"
          style={{ height: scrolled ? "52px" : "72px" }}
        >
          {/* LOGO */}
          <Link
            onClick={handleLogoClick}
            to="/"
            className="flex items-center gap-2 shrink-0"
          >
            <motion.span
              animate={{ fontSize: scrolled ? "1.1rem" : "1.25rem" }}
              transition={{ duration: 0.3 }}
              className="font-extrabold px-6 text-white leading-none hover:text-white/80 transition-all duration-300"
            >
              MealApp
            </motion.span>
          </Link>

          {/* DESKTOP MENU */}
          <ul className="hidden md:flex gap-1 items-center">
            {menuItems.map((item) => (
              <li key={item.label}>
                <Button
                  variant="ghost"
                  onClick={() => handleNavClick(item.path)}
                  className={`px-5 py-2 rounded-lg text-sm transition-colors duration-200 ${
                    isActive(item.path)
                      ? "text-primary font-semibold bg-white"
                      : "text-white/80 hover:text-white hover:bg-white/20"
                  }`}
                >
                  {item.label}
                </Button>
              </li>
            ))}
          </ul>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-1 text-white/80 hover:text-white transition-colors"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isMenuOpen ? (
                <motion.div
                  className="cursor-pointer"
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  className="cursor-pointer"
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden border-t border-white/10"
            >
              <ul className="flex flex-col px-4 py-4 gap-1">
                {menuItems.map((item) => (
                  <li key={item.label}>
                    <button
                      onClick={() => handleNavClick(item.path)}
                      className={`w-full cursor-pointer text-left px-4 py-2.5 rounded-lg text-sm transition-colors ${
                        isActive(item.path)
                          ? "text-white font-semibold bg-white/10"
                          : "text-white/70 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};

export default NavigationMenu;

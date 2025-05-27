import { Button } from './Button';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export function LanguangeToggle() {
  const { i18n } = useTranslation();

  const handleChangeLaguange = () => {
    const newLang = i18n.language === 'en' ? 'id' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="relative flex items-center justify-center gap-2"
      onClick={handleChangeLaguange}
    >
      <AnimatePresence mode="wait">
        {i18n.language === 'en' ? (
          <motion.div
            key="moon"
            className="flex items-center gap-2 dark:text-primary"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <p className="text-xs font-medium">EN</p>
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            className="flex items-center gap-2 dark:text-primary"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            ID
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
}

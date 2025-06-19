import { useTranslation } from 'react-i18next';
import { Card } from '../../components/atoms/Card';
import { Separator } from '../../components/ui/separator';
import { ThemeSwitcher } from '../../components/molecules/ThemeSwitcherButton';
import ThemeSelector from '../../components/molecules/ThemeSelector';

export default function AppearancePage() {
  const { t } = useTranslation();
  return (
    <div className="mx-auto w-full h-full sm:px-4 lg:px-6">
      <Card className="overflow-hidden shadow-sm sm:rounded-lg px-6">
        <div className="py-4 gap-1">
          <div className="gap-2 pb-2">
            <h1 className="text-foreground text-2xl font-semibold">
              {t('appearance.title', 'Appearance')}
            </h1>
            <p className="text-muted-foreground">
              {t(
                'appearance.subtitle',
                'Customize the look and feel your account'
              )}
            </p>
          </div>
          <Separator />
          <div className="pt-8 gap-4">
            <p className="text-foreground font-semibold">
              Pick default your color
            </p>
            <p className="text-muted-foreground text-sm">
              Select or customize your theme
            </p>
            <div className="py-4">
              <ThemeSwitcher />
            </div>
          </div>
          <div className="py-2 gap-4">
            <p className="text-foreground font-semibold">Interface Theme</p>
            <p className="text-muted-foreground text-sm">
              Select or customize your UI theme
            </p>
            <div className="py-4">
              <ThemeSelector />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

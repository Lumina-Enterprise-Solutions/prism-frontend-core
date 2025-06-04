import { UserPen } from 'lucide-react';
import { Button } from '../components/atoms/Button';
import { Card } from '../components/atoms/Card';
import { useTitle } from '../hooks/services/use-title';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Separator } from '../components/ui/separator';
import { Label } from '../components/atoms/Label';
import { Input } from '../components/atoms/Input';
import { useTranslation } from 'react-i18next';
import { ProfileDetail } from '../types/ProfileDetail';
import { TextArea } from '@radix-ui/themes';

export default function ProfilePage() {
  useTitle('Profile - Prism');
  const { t } = useTranslation();

  return (
    <div className="mx-auto w-full h-full sm:px-4 lg:px-6">
      <Card className="overflow-hidden shadow-sm sm:rounded-lg px-6">
        <div className="flex justify-between">
          <div className="py-4 gap-1">
            <h1 className="text-foreground text-2xl font-semibold tour-welcome">
              Profile Information
            </h1>
          </div>
          <div className="py-4 gap-1">
            <Button
              variant="default"
              size="sm"
              className="font-semibold items-center text-sm"
            >
              <UserPen size={16} />
              Edit
            </Button>
          </div>
        </div>
        <div className="py-4 flex items-center gap-4">
          <Avatar className="w-20 h-20">
            <AvatarImage
              src="https://github.com/evilrabbit.png"
              alt="@evilrabbit"
            />
            <AvatarFallback>LR</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start">
            <h1 className="text-foreground text-3xl font-semibold">John Doe</h1>
            <p className="text-muted-foreground">john.doe@example.com</p>
          </div>
        </div>
        <Separator className="px-2" />
        <div className="py-4">
          <h1 className="text-foreground text-xl font-semibold tour-welcome">
            Profile Detail
          </h1>
        </div>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="cols-1 gap-4">
            <Label htmlFor="first_name" className="text-sm font-semibold">
              {t('profile.first_name', 'First Name')}
            </Label>
            <Input
              //   {...register('email')}
              id="first_name"
              type="text"
              value={ProfileDetail.first_name}
              placeholder={t('profile.firstNamePlaceholder', 'First Name')}
              className="pt-2"
              disabled
            />
          </div>
          <div className="cols-1 gap-4">
            <Label htmlFor="last_name" className="text-sm font-semibold">
              {t('profile.last_name', 'Last Name')}
            </Label>
            <Input
              //   {...register('email')}
              id="last_name"
              type="text"
              value={ProfileDetail.last_name}
              placeholder={t('profile.lastNamePlaceholder', 'Last Name')}
              className="pt-2"
              disabled
            />
          </div>
          <div className="cols-1 gap-4">
            <Label htmlFor="email" className="text-sm font-semibold">
              {t('profile.email', 'Email Address')}
            </Label>
            <Input
              //   {...register('email')}
              id="email"
              type="email"
              value={ProfileDetail.email}
              placeholder={t('profile.emailPlaceholder', 'm@example.com')}
              disabled
            />
          </div>
          <div className="cols-1 gap-4">
            <Label htmlFor="phone" className="text-sm font-semibold">
              {t('profile.phone', 'Phone Number')}
            </Label>
            <Input
              //   {...register('phone')}
              id="phone"
              type="text"
              value={ProfileDetail.phone}
              placeholder={t('profile.phoneNumberPlaceholder', '+62')}
              disabled
            />
          </div>
          <div className="cols-1 gap-4">
            <Label htmlFor="date" className="text-sm font-semibold">
              {t('profile.date', 'Date of Birth')}
            </Label>
            <Input
              //   {...register('date')}
              id="date"
              type="text"
              value={ProfileDetail.date}
              placeholder={t('profile.datePlaceholder', '01-01-2000')}
              disabled
            />
          </div>
          <div className="cols-1 gap-4">
            <Label htmlFor="country" className="text-sm font-semibold">
              {t('profile.country', 'Country')}
            </Label>
            <Input
              //   {...register('country')}
              id="country"
              type="text"
              value={ProfileDetail.country}
              placeholder={t('profile.countryPlaceholder', '-')}
              disabled
            />
          </div>
          <div className="col-span-2 gap-4">
            <Label htmlFor="country" className="text-sm font-semibold">
              {t('profile.country', 'Country')}
            </Label>
            <TextArea
              //   {...register('country')}
              id="country"
              value={ProfileDetail.country}
              placeholder={t('profile.countryPlaceholder', '-')}
              disabled
            />
          </div>
        </div>
      </Card>
    </div>
  );
}

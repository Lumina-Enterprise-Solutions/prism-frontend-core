import { UserPen } from 'lucide-react';
import { Card } from '../components/atoms/Card';
import { useTitle } from '../hooks/services/use-title';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Separator } from '../components/ui/separator';
import { Label } from '../components/atoms/Label';
import { Input } from '../components/atoms/Input';
import { Textarea } from '../components/ui/textarea';
import { useTranslation } from 'react-i18next';
import { ProfileDetail } from '../helper/mock/profile-details-dummy';
import { DynamicDialogForm } from '../components/molecules/advanced-dialog/DialogZoom';
import { profileSchema } from '../helper/schema/profileSchema';

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
            <DynamicDialogForm
              schema={profileSchema}
              title="Edit Profile"
              description="Update your name and username."
              triggerText="Edit Profile"
              icon={UserPen}
              fields={[
                {
                  name: 'profile_image',
                  label: 'Profile Image',
                  type: 'file',
                  colSpan: 2,
                },
                {
                  name: 'first_name',
                  label: 'First Name',
                  placeholder: 'Enter your first name',
                },
                {
                  name: 'last_name',
                  label: 'Last Name',
                  placeholder: 'Enter your last name',
                },
                {
                  name: 'email',
                  label: 'Email',
                  placeholder: 'Enter your email',
                },
                {
                  name: 'phone',
                  label: 'Phone',
                  placeholder: 'Enter your phone',
                },
                {
                  name: 'date',
                  label: 'Date',
                  placeholder: 'Enter your date',
                },
                {
                  name: 'description',
                  label: 'Description',
                  placeholder: 'Enter your description',
                  colSpan: 2,
                },
                {
                  name: 'country',
                  label: 'Country',
                  placeholder: 'Enter your country',
                },
                {
                  name: 'city',
                  label: 'City',
                  placeholder: 'Enter your city',
                },
                {
                  name: 'pos_code',
                  label: 'Pos Code',
                  placeholder: 'Enter your pos code',
                },
              ]}
              onSubmit={(data) => {
                console.log('Form submitted:', data);
              }}
            />
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
          <div className="col-span-2 w-full gap-4">
            <Label htmlFor="description" className="text-sm font-semibold">
              {t('profile.description', 'Description')}
            </Label>
            <Textarea
              className="w-full"
              placeholder="Type your message here."
              disabled
            />
          </div>
          <span className="ppt-4"></span>
          <Separator className="col-span-2 px-2" />
        </div>

        <div className="py-4">
          <h1 className="text-foreground text-xl font-semibold tour-welcome">
            Address
          </h1>
        </div>
        <div className="grid grid-cols-2 gap-4 py-4">
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
          <div className="cols-1 gap-4">
            <Label htmlFor="city" className="text-sm font-semibold">
              {t('profile.city', 'City/State')}
            </Label>
            <Input
              //   {...register('city')}
              id="city"
              type="text"
              value={ProfileDetail.city}
              placeholder={t('profile.countryPlaceholder', '-')}
              disabled
            />
          </div>
          <div className="cols-1 gap-4">
            <Label htmlFor="pos_code" className="text-sm font-semibold">
              {t('profile.pos_code', 'Pos Code')}
            </Label>
            <Input
              //   {...register('pos_code')}
              id="pos_code"
              type="text"
              value={ProfileDetail.pos_code}
              placeholder={t('profile.countryPlaceholder', '-')}
              disabled
            />
          </div>
        </div>
      </Card>
    </div>
  );
}

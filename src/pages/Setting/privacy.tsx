import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '../../components/atoms/Card';
import { Separator } from '../../components/ui/separator';
import { ScrollArea } from '../../components/ui/scroll-area';

export default function PrivacyPage() {
  const { t } = useTranslation();
  return (
    <div className="mx-auto w-full h-full sm:px-4 lg:px-6">
      <Card className="overflow-hidden shadow-sm sm:rounded-lg px-6">
        <div className="py-4 gap-1">
          <div className="gap-2 pb-2">
            <h1 className="text-foreground text-2xl font-semibold">
              {t('privacy.header', 'Privacy Policy')}
            </h1>
            <p className="text-xs text-muted-foreground italic">
              {t('privacy.date', 'Last Updated: 2025-06-15')}
            </p>
            <p className="text-xs">
              <span className="font-bold">Prism</span>
              {t(
                'privacy.intro',
                'we respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our SaaS service through our website or application'
              )}
            </p>
          </div>
          <Separator />
          <div className="py-4">
            <ScrollArea className="h-[75vh]">
              <CardContent className="prose dark:prose-invert max-w-none">
                <h2 className="font-semibold">
                  {t('privacy.section1', '1. Information We Collect')}
                </h2>
                <div className="ml-4">
                  <h3>
                    {t('privacy.personalInfo', 'a. Personal Information')}
                  </h3>
                  <ul className="list-disc list-inside ml-4">
                    <li>{t('privacy.name', 'Full name')}</li>
                    <li>{t('privacy.email', 'Email address')}</li>
                    <li>{t('privacy.phone', 'Phone number')}</li>
                    <li>
                      {t(
                        'privacy.billing',
                        'Billing information (e.g., credit card, billing address)'
                      )}
                    </li>
                  </ul>
                </div>
                <div className="ml-4">
                  <h3>{t('privacy.usageInfo', 'b. Usage Information')}</h3>
                  <ul className="list-disc list-inside ml-4">
                    <li>{t('privacy.ip', 'IP address')}</li>
                    <li>{t('privacy.browser', 'Browser and device type')}</li>
                    <li>
                      {t('privacy.pages', 'Pages accessed and access times')}
                    </li>
                    <li>
                      {t(
                        'privacy.user',
                        'User activity within the application'
                      )}
                    </li>
                  </ul>
                </div>

                <div className="ml-4">
                  <h3>
                    {t('privacy.thirdParty', 'c. Third-Party Information')}
                  </h3>
                  <p className="ml-4">
                    {t(
                      'privacy.thirdPartyDetail',
                      'If you sign in using a third-party service (e.g., Google or Microsoft), we may access certain profile information as permitted by your authorization.'
                    )}
                  </p>
                </div>

                <h2 className="font-semibold">
                  {t('privacy.usage', '2. How We Use Your Information')}
                </h2>
                <ul className="list-disc list-inside ml-4">
                  <li>{t('privacy.provide', 'Provide and manage services')}</li>
                  <li>
                    {t('privacy.process', 'Process payments and subscriptions')}
                  </li>
                  <li>{t('privacy.delivery', 'Deliver customer support')}</li>
                  <li>
                    {t('privacy.send', 'Send important notices and updates')}
                  </li>
                  <li>
                    {t('privacy.develop', 'Develop and improve features')}
                  </li>
                  <li>
                    {t('privacy.analyze', 'Analyze usage and performance')}
                  </li>
                  <li>
                    {t('privacy.comply', 'Comply with legal obligations')}
                  </li>
                </ul>

                <h2 className="font-semibold">
                  {t('privacy.sharing', '3. Information Sharing')}
                </h2>
                <ul className="list-disc list-inside ml-4">
                  <li>
                    {t(
                      'privacy.service',
                      'Service providers and vendors (e.g., hosting providers, payment processors)'
                    )}
                  </li>
                  <li>
                    {t('privacy.legal', 'Legal authorities if required by law')}
                  </li>
                  <li>
                    {t(
                      'privacy.other',
                      'Other entities in the event of a merger'
                    )}
                  </li>
                </ul>

                <h2 className="font-semibold">
                  {t('privacy.security', '4. Data Storage and Security')}
                </h2>
                <p className="ml-4">
                  {t(
                    'privacy.securityDesc',
                    'We implement appropriate technical and organizational measures to protect your data.'
                  )}
                </p>

                <h2 className="font-semibold">
                  {t('privacy.rights', '5. Your Data Rights')}
                </h2>
                <ul className="list-disc list-inside ml-4">
                  <li>
                    {t(
                      'privacy.access',
                      'Access and update your personal information'
                    )}
                  </li>
                  <li>
                    {t(
                      'privacy.request',
                      'Request deletion of your account and data'
                    )}
                  </li>
                  <li>
                    {t('privacy.opt', 'Opt out of marketing communications')}
                  </li>
                  <li>
                    {t(
                      'privacy.file',
                      'File a complaint or object to processing'
                    )}
                  </li>
                </ul>
                <p className="ml-4">
                  {t(
                    'privacy.contact',
                    'To exercise your rights, contact us at'
                  )}
                  : <strong>support@lumina.com</strong>.
                </p>

                <h2 className="font-semibold">
                  {t('privacy.cookies', '6. Cookies and Tracking Technologies')}
                </h2>
                <ul className="list-disc list-inside ml-4">
                  <li>{t('privacy.store', 'Store user preferences')}</li>
                  <li>{t('privacy.track', 'Track usage activity')}</li>
                  <li>{t('privacy.analyze', 'Analyze service performance')}</li>
                </ul>
                <p className="ml-4">
                  {t(
                    'privacy.manage',
                    'You can manage your cookie preferences through your browser settings.'
                  )}
                </p>

                <h2 className="font-semibold">
                  {t('privacy.children', "7. Children's Privacy")}
                </h2>
                <p className="ml-4">
                  {t(
                    'privacy.childrenDesc',
                    'Our services are not intended for children under the age of 13. We do not knowingly collect personal information from children.'
                  )}
                </p>

                <h2 className="font-semibold">
                  {t('privacy.update', '8. Policy Updates')}
                </h2>
                <p className="ml-4">
                  {t(
                    'privacy.updateDesc',
                    'We may update this policy from time to time. Changes will be communicated via email or directly within the application.'
                  )}
                </p>

                <h2 className="font-semiboold">
                  {t('privacy.contactUs', '9. Contact Us')}
                </h2>
                <p className="ml-4">
                  {t(
                    'privacy.contactUsDesc',
                    '                  If you have any questions about this Privacy Policy, please contact us at:'
                  )}
                </p>
                <ul className="list-disc list-inside ml-4">
                  <li>
                    <strong>lumina@lumina.com</strong>
                  </li>
                </ul>
              </CardContent>
            </ScrollArea>
          </div>
        </div>
      </Card>
    </div>
  );
}

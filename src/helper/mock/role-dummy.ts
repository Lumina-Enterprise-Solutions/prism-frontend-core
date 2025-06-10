export const roleDummy = [
    {
      title: 'Business & Staff Management',
      content: `You can track your order by logging into your account and visiting the "Orders" section. You'll receive tracking information via email once your order ships. For real-time updates, you can also use the tracking number provided in your shipping confirmation email.`,
      roles: [
        {
          name: 'Owner',
          description: 'Full control over the system, including settings, billing, and staff management.',
          defaultPlan: 'enterprise',
        },
        {
          name: 'Admin',
          description: 'Manage most features except billing and advanced configurations.',
          defaultPlan: 'pro',
        },
        {
          name: 'Staff',
          description: 'Limited access to features assigned by Admin or Owner.',
          defaultPlan: 'basic',
        },
      ],
    },
    {
      title: 'Financials & Reports',
      content:
        'We offer a 30-day return policy for most items. Products must be unused and in their original packaging. To initiate a return, please contact our customer service team or use the return portal in your account dashboard.',
      roles: [
        {
          name: 'Finance Manager',
          description: 'Can view and generate financial reports, manage invoices, and track expenses.',
          defaultPlan: 'pro',
        },
        {
          name: 'Accountant',
          description: 'Access to financial records, reconciliation tools, and expense tracking.',
          defaultPlan: 'pro',
        },
        {
          name: 'Auditor',
          description: 'Read-only access to all financial reports and logs for auditing purposes.',
          defaultPlan: 'basic',
        },
      ],
    },
    {
      title: 'Dashboard & System Access',
      content:
        'Our customer support team is available 24/7. You can reach us via live chat, email at support@example.com, or by phone at 1-800-123-4567. For faster service, please have your order number ready when contacting us.',
      roles: [
        {
          name: 'System Administrator',
          description: 'Full access to system configurations, user roles, and technical logs.',
          defaultPlan: 'enterprise',
        },
        {
          name: 'Data Analyst',
          description: 'Can access and visualize dashboard data, but cannot modify settings.',
          defaultPlan: 'pro',
        },
        {
          name: 'Viewer',
          description: 'Read-only access to dashboard analytics and reports.',
          defaultPlan: 'basic',
        },
      ],
    },
  ];
  
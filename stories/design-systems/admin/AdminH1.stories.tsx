import AdminH1 from '../../../src/admin/components/AdminH1';

export default {
  title: 'Design Systems/Admin/AdminH1',
  component: AdminH1,
  args: {
    children: 'Text Example',
  },
};

export const Default = (args: { children: string }) => (
  <AdminH1>{args.children}</AdminH1>
);

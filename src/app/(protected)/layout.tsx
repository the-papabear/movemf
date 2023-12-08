import Header from '@/components/Header';

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <main className="m-auto max-w-[764px] p-2">
      <Header />
      {children}
    </main>
  );
};

export default Layout;

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      
        <div className="w-full flex justify-center py-8 items-center    ">
                {children}
        </div>
          

    );
  }
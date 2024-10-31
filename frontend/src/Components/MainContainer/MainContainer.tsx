type Props = {
  children: React.ReactNode;
};

export const MainContainer = ({ children }: Props) => {
  return <div className="container py-5 mx-auto sm:p-6 lg:p-8 h-[92%] ">{children}</div>;
};

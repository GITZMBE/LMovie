import { twJoin } from "tailwind-merge"

interface Props {
  className?: string
  children: React.ReactNode
};

export const PageContainer = ({ className, children }: Props) => {
  return (
    <div className={twJoin("flex flex-col items-center w-full min-h-screen pb-4 bg-primary text-white py-24", className || '')}>
      <div className={twJoin("container", className)}>
        {children}
      </div>
    </div>
  )
};

export default PageContainer;
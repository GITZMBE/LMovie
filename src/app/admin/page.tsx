import ProtectedAuthorization from "@/src/components/ui/auth/ProtectedAuthorization";
import PageContainer from "@/src/components/ui/PageContainer";
import UserSection from "@/src/components/connectors/User/UserSection";

export default async function AdminPage() {
  return (
    <ProtectedAuthorization>
      <PageContainer className="flex flex-col gap-6 pt-12">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        <UserSection />
      </PageContainer>      
    </ProtectedAuthorization>
  );
};
import VideosContainer from "@/src/components/ui/VideosContainer";
import ProviderContainer from "@/src/components/ui/ProviderContainer";
import ContinueWatchingContainer from "@/src/components/connectors/Lists/ContinueWatchingContainer";
import DashboardBanner from "@/src/components/connectors/DashboardBanner";
import ProtectedAuthentication from "@/src/components/ui/auth/ProtectedAuthentication";
import PageContainer from "@/src/components/ui/PageContainer";

export const Dashboard = () => {
  return (
    <ProtectedAuthentication>
      <div
        id='dashboard'
        className='flex flex-col pb-headerHeight bg-primary min-h-screen'
      >
        <DashboardBanner />

        <main className='w-full text-white py-6 lg:py-8 px-4 lg:px-12'>
          <ContinueWatchingContainer />
          {/* <Favorites /> */}
          <ProviderContainer title='Watch Providers' fetchPath='/api/providers' />
          <VideosContainer title='Top Rated' fetchPath='/api/movie/top-rated' posterSize="backdrop" />
          <VideosContainer title='Popular' fetchPath='/api/movie/popular' posterSize="backdrop" />
          <VideosContainer title='Upcoming' fetchPath='/api/movie/upcoming' posterSize="backdrop" />
          <VideosContainer title='Top Series' fetchPath='/api/series/top-rated' posterSize="backdrop" />
        </main>
      </div>      
    </ProtectedAuthentication>
  );
};

export default Dashboard;

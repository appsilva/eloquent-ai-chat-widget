import "./MaintenanceBanner.css";

interface MaintenanceBannerProps {
  maintenanceMessage: string;
}

const MaintenanceBanner = ({ maintenanceMessage }: MaintenanceBannerProps) => (
  <div className="maintenance-banner">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    <span>{maintenanceMessage}</span>
  </div>
);

export default MaintenanceBanner;

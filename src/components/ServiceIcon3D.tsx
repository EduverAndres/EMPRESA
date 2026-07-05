import DatabaseIcon3D from "./icons3d/DatabaseIcon3D";
import AICoreIcon3D from "./icons3d/AICoreIcon3D";
import BarChartIcon3D from "./icons3d/BarChartIcon3D";
import BrowserIcon3D from "./icons3d/BrowserIcon3D";
import PhoneIcon3D from "./icons3d/PhoneIcon3D";
import BlocksIcon3D from "./icons3d/BlocksIcon3D";
import CompassIcon3D from "./icons3d/CompassIcon3D";
import type { ServiceIcon } from "@/lib/services";

export default function ServiceIcon3D({
  icon,
  size = 120,
  className = "",
}: {
  icon: ServiceIcon;
  size?: number;
  className?: string;
}) {
  switch (icon) {
    case "database":
      return <DatabaseIcon3D size={size * 0.9} className={className} />;
    case "ai":
      return <AICoreIcon3D size={size * 0.82} className={className} />;
    case "data":
      return <BarChartIcon3D size={size} className={className} />;
    case "web":
      return <BrowserIcon3D size={size} className={className} />;
    case "mobile":
      return <PhoneIcon3D size={size * 0.86} className={className} />;
    case "custom":
      return <BlocksIcon3D size={size} className={className} />;
    case "consulting":
      return <CompassIcon3D size={size * 0.86} className={className} />;
    default:
      return null;
  }
}

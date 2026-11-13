import { MAP_REGIONS } from './_define/mapRegions';

import MapsPageClient from './MapsPageClient';

export default function MapsPage() {
  const regions = MAP_REGIONS.map(({ id, name }) => ({ id, name }));

  return <MapsPageClient regions={regions} />;
}

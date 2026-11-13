import { notFound } from 'next/navigation';

import { MAP_REGIONS } from '@/app/maps/_define/mapRegions';
import { getMapMarkerSamples } from './mapMarkerSamples';

import RegionMapPageClient from './RegionMapPageClient';

export default async function RegionMapPage({ params }: { params: Promise<{ regionId: string }> }) {
  const { regionId } = await params;
  const region = MAP_REGIONS.find(({ id }) => id === regionId);

  if (!region) notFound();

  return (
    <RegionMapPageClient
      key={regionId}
      image={region.image}
      name={region.name}
      markers={process.env.NODE_ENV === 'development' ? getMapMarkerSamples(regionId) : []}
    />
  );
}

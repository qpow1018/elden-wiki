// Local interaction samples. Positions are approximate matches to the Limgrave image.
// Reference: https://edring.lsdl.kr/map (base game, patch version unspecified).
const SAMPLE_ITEMS = {
  twinblade: '트윈 블레이드',
  stoneswordKey: '석검 열쇠',
  gravitas: '전회: 그라비타스',
};

const SAMPLE_MARKERS = [
  { id: '1', regionId: '1', itemId: 'twinblade', x: 0.459, y: 0.714 },
  { id: '2', regionId: '1', itemId: 'stoneswordKey', x: 0.454, y: 0.694 },
  { id: '3', regionId: '1', itemId: 'gravitas', x: 0.414, y: 0.795 },
] as const;

export function getMapMarkerSamples(regionId: string) {
  return SAMPLE_MARKERS.filter((marker) => marker.regionId === regionId).map((marker) => ({
    ...marker,
    name: SAMPLE_ITEMS[marker.itemId],
  }));
}

/* Tour rules with no Cesium and no buttons, so they can be tested on their own. */
(function (root) {
  // Validation bounds only: these do not verify any stop's location.
  const AREAS = [
    { west: 122, east: 154, south: 20, north: 46 }, // Japan region
    { west: -73.85, east: -73.70, south: 40.60, north: 40.70 } // JFK region
  ];
  const AREA = AREAS; // Preserve the original export name.

  const hasText = v => typeof v === 'string' && v.trim().length > 0;
  const isNum = v => typeof v === 'number' && Number.isFinite(v);

  // Returns a list of problems. An empty list means the record is usable.
  function validatePlace(p, area = AREAS) {
    const problems = [];
    if (!p || typeof p !== 'object') return ['record is not an object'];
    for (const k of ['name', 'description', 'source', 'checked'])
      if (!hasText(p[k])) problems.push('missing ' + k);
    if (!isNum(p.lon) || p.lon < -180 || p.lon > 180) problems.push('longitude must be a number from -180 to 180');
    if (!isNum(p.lat) || p.lat < -90 || p.lat > 90) problems.push('latitude must be a number from -90 to 90');
    if (isNum(p.lon) && isNum(p.lat) && !inArea(p, area)) {
      if (inArea({ lon: p.lat, lat: p.lon }, area))
        problems.push('outside the project area: are longitude and latitude swapped?');
      else problems.push('outside the project area');
    }
    if (hasText(p.photo) && !hasText(p.photoAlt)) problems.push('photo needs alt text');
    return problems;
  }

  function inArea(p, areas = AREAS) {
    // Accept a single box too, preserving the old optional argument form.
    const boxes = Array.isArray(areas) ? areas : [areas];
    return !!p && isNum(p.lon) && isNum(p.lat) && boxes.some(a =>
      p.lon >= a.west && p.lon <= a.east && p.lat >= a.south && p.lat <= a.north);
  }
  const usable = (places, area = AREAS) => places.filter(p => validatePlace(p, area).length === 0);
  const nextIndex = (i, n) => (n > 0 ? (i + 1) % n : 0);
  const prevIndex = (i, n) => (n > 0 ? (i - 1 + n) % n : 0);

  const firstIndexForCity = (stops, city) => stops.findIndex(p =>
    p && p.city === city && validatePlace(p).length === 0);

  const api = { AREA, AREAS, validatePlace, inArea, usable, nextIndex, prevIndex, firstIndexForCity };
  if (typeof module !== 'undefined') module.exports = api;
  root.Tour = api;
})(globalThis);

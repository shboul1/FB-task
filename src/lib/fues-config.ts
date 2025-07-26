export const fuseConfig = {
  keys: [
    { name: "symbol", weight: 0.7 },
    { name: "name", weight: 0.3 },
  ],
  threshold: 0.3,
  includeScore: true,
  includeMatches: false,
  minMatchCharLength: 2,
  findAllMatches: true,
  location: 0,
  distance: 100,
  useExtendedSearch: false,
  ignoreLocation: false,
  ignoreFieldNorm: false,
};

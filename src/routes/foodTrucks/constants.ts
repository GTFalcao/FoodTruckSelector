export default {
  DATA_ENDPOINT: "https://data.sfgov.org/api/views/rqzj-sfat/rows.csv",
  // CACHE_TIME_MS: 1000 * 60 * 60 * 24, // 24 hours
  CACHE_TIME_MS: 60000,
  COMMA_REGEXP: /(?<="\([^"]*),(?=[^"]*\)")/g,
  COMMA_REPLACEMENT: "-%%%-",
};

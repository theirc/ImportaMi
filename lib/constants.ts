import { AlgoliaSearchIndex } from '@ircsignpost/signpost-base/dist/src/search-common';
import { LatLngExpression } from 'leaflet';

export const SITE_TITLE = 'ImportaMi';

export const COUNTRY_ID = 31;

export const MAP_DEFAULT_COORDS: LatLngExpression = [37.0902, -95.7129];

// Cache statically generated pages for 1 hour. The timeout was chosen
// arbitrarily. Our website has static, non-urgent resources, so we probably do
// not need to serve content faster.
export const REVALIDATION_TIMEOUT_SECONDS: number = 1 * 60 * 60;

// The "about us" article ID.
export const ABOUT_US_ARTICLE_ID: number = 4410571645847;

// The information hierary of the website.
// Set to true for the category -> section -> article hierarchy, similar to that of United for Ukraine.
// Set to false for the "information" -> category -> article hierarchy, similar to that of Beporsed.
//
export const USE_CAT_SEC_ART_CONTENT_STRUCTURE = true;

//Set to true to enable the Recent Articles component
export const USE_RECENT_ARTICLES = true;

// A mapping from category ID to a Material icon for that category.
export const CATEGORY_ICON_NAMES: { [key: string]: string } = {
  '123': 'home_work', // Placeholder
};

// A mapping from section ID to a Material icon for that section.
export const SECTION_ICON_NAMES: { [key: string]: string } = {
  '5285233593879': 'gavel', // Legal icon
  '5285270707223': 'school', // Education icon
  '4411262291991': 'medical_information', // Healthcare icon
  '5285327388055': 'security', // Safety in the US icon
  '9617846339357': 'diversity_1', // LGBTQ support icon
  '9238220386205': 'record_voice_over', // Life in the US icon
  '5285344407831': 'perm_device_information', // Basic needs icon
};

// A list of category IDs that the site should not display.
export const CATEGORIES_TO_HIDE: number[] = [
  4409778008599, 4410571554839, 4410629239959,
];

// A map from a locale code to Zendesk locale id used for dynamic content translations.
// https://developer.zendesk.com/api-reference/ticketing/account-configuration/locales/
// Keep in sync with locales configured in /next.config.js.
export const DYNAMIC_CONTENT_LOCALES: { [key: string]: number } = {
  'en-us': 1, // English locale id
  es: 2, // Spanish locale id
};

export const ZENDESK_AUTH_HEADER = {
  Authorization: 'Bearer ' + process.env.ZENDESK_OAUTH_TOKEN,
};

export const GOOGLE_ANALYTICS_IDS = [
  process.env.NEXT_PUBLIC_GA_ID ?? '',
  process.env.NEXT_PUBLIC_GA4_ID ?? '',
];

// Algolia search app ID, Search API key and search index name:
// https://www.algolia.com/account/api-keys/
export const ALGOLIA_SEARCH_APP_ID = 'BWATZIXLX6';
export const ALGOLIA_SEARCH_API_KEY = '0d9093280e7b2bc2b6ca12ed4180fd0a';

// See README for more info on how to create indexes.
export const ALGOLIA_ARTICLE_INDEX_NAME =
  'zendesk_signpost-us-importami_articles';
export const ALGOLIA_QUERY_INDEX_NAME =
  'zendesk_signpost-importami_articles_query_suggestions';

export const SEARCH_BAR_INDEX: AlgoliaSearchIndex = {
  appId: ALGOLIA_SEARCH_APP_ID,
  publicApiKey: ALGOLIA_SEARCH_API_KEY,
  indexName: ALGOLIA_QUERY_INDEX_NAME,
};

export const SEARCH_RESULTS_PAGE_INDEX: AlgoliaSearchIndex = {
  appId: ALGOLIA_SEARCH_APP_ID,
  publicApiKey: ALGOLIA_SEARCH_API_KEY,
  indexName: ALGOLIA_ARTICLE_INDEX_NAME,
};

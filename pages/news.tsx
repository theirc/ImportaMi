import CookieBanner from '@ircsignpost/signpost-base/dist/src/cookie-banner';
import { MenuOverlayItem } from '@ircsignpost/signpost-base/dist/src/menu-overlay';
import NewsPage, {
  NewsStrings,
} from '@ircsignpost/signpost-base/dist/src/news-page';
import { Article } from '@ircsignpost/signpost-base/dist/src/topic-with-articles';
import {
  getArticle,
  getArticles,
  getCategoriesWithSections,
  getTranslationsFromDynamicContent,
} from '@ircsignpost/signpost-base/dist/src/zendesk';
import { GetStaticProps } from 'next';
import getConfig from 'next/config';

import {
  ABOUT_US_ARTICLE_ID,
  CATEGORIES_TO_HIDE,
  GOOGLE_ANALYTICS_IDS,
  REVALIDATION_TIMEOUT_SECONDS,
  SECTION_ICON_NAMES,
  SITE_TITLE,
  ZENDESK_AUTH_HEADER,
} from '../lib/constants';
import {
  LOCALES,
  Locale,
  getLocaleFromCode,
  getZendeskLocaleId,
} from '../lib/locale';
import { getHeaderLogoProps } from '../lib/logo';
import { getFooterItems, getMenuItems } from '../lib/menu';
import {
  COMMON_DYNAMIC_CONTENT_PLACEHOLDERS,
  NEWS_PLACEHOLDERS,
  getLastUpdatedLabel,
  populateMenuOverlayStrings,
  populateNewsStrings,
} from '../lib/translations';
import { getZendeskMappedUrl, getZendeskUrl } from '../lib/url';

interface CategoryProps {
  pageTitle: string;
  strings: NewsStrings;
  articles: Article[];
  footerLinks?: MenuOverlayItem[];
  currentLocale: Locale;
  menuOverlayItems: MenuOverlayItem[];
}

export default function Category({
  pageTitle,
  strings,
  articles,
  currentLocale,
  menuOverlayItems,
}: CategoryProps) {
  const { publicRuntimeConfig } = getConfig();

  return (
    <NewsPage
      pageTitle={pageTitle}
      menuOverlayItems={menuOverlayItems}
      strings={strings}
      articles={articles}
      currentLocale={currentLocale}
      locales={LOCALES}
      headerLogoProps={getHeaderLogoProps(currentLocale)}
      signpostVersion={publicRuntimeConfig?.version}
      cookieBanner={
        <CookieBanner
          strings={strings.cookieBannerStrings}
          googleAnalyticsIds={GOOGLE_ANALYTICS_IDS}
        />
      }
    />
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const currentLocale = getLocaleFromCode(locale ?? 'en-us');

  const dynamicContent = await getTranslationsFromDynamicContent(
    getZendeskLocaleId(currentLocale),
    COMMON_DYNAMIC_CONTENT_PLACEHOLDERS.concat(NEWS_PLACEHOLDERS),
    getZendeskUrl(),
    ZENDESK_AUTH_HEADER
  );
  const strings: NewsStrings = populateNewsStrings(dynamicContent);

  const articles: Article[] = (
    await getArticles(currentLocale, getZendeskUrl())
  ).map((article) => {
    return {
      id: article.id,
      title: article.title,
      lastEdit: {
        label: getLastUpdatedLabel(dynamicContent),
        value: article.edited_at,
        locale: currentLocale,
      },
    };
  });

  const categories = await getCategoriesWithSections(
    currentLocale,
    getZendeskUrl(),
    (c) => !CATEGORIES_TO_HIDE.includes(c.id)
  );
  categories.forEach(({ sections }) => {
    sections.forEach(
      (s) => (s.icon = SECTION_ICON_NAMES[s.id] || 'help_outline')
    );
  });

  const aboutUsArticle = await getArticle(
    currentLocale,
    ABOUT_US_ARTICLE_ID,
    getZendeskUrl(),
    getZendeskMappedUrl(),
    ZENDESK_AUTH_HEADER
  );

  const footerLinks = getFooterItems(
    populateMenuOverlayStrings(dynamicContent),
    categories
  );

  const menuOverlayItems = getMenuItems(
    populateMenuOverlayStrings(dynamicContent),
    categories,
    !!aboutUsArticle
  );

  return {
    props: {
      pageTitle: SITE_TITLE,
      strings,
      articles,
      currentLocale,
      footerLinks,
      menuOverlayItems,
    },
    revalidate: REVALIDATION_TIMEOUT_SECONDS,
  };
};

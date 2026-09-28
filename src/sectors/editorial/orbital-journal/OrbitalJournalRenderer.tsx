import React from 'react';
import { SiteShell } from '@/core/layout/SiteShell';
import { articles, forumThreads } from '@/content/journal';
import { getSitePageRoute } from '../shared/routes';
import { JournalHome } from './pages/JournalHome';
import { JournalArticles } from './pages/JournalArticles';
import { JournalAuthors } from './pages/JournalAuthors';
import { JournalForum } from './pages/JournalForum';
import { JournalArchive } from './pages/JournalArchive';
import { ArticleDetail } from './pages/ArticleDetail';
import { ForumThreadDetail } from './pages/ForumThreadDetail';
import { EditorialEmptyState } from '../shared/components/EditorialEmptyState';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';

interface OrbitalJournalRendererProps {
  pageSlug: string;
  itemSlug?: string;
}

export function OrbitalJournalRenderer({
  pageSlug,
  itemSlug,
}: OrbitalJournalRendererProps) {
  const normalizedPage = (pageSlug || 'home').toLowerCase();

  // Navigation setup for Orbital Journal
  const navItems = [
    {
      label: 'Genel Bakış',
      href: getSitePageRoute('orbital-journal', 'home'),
      current: normalizedPage === 'home' || normalizedPage === 'index',
    },
    {
      label: 'Makaleler',
      href: getSitePageRoute('orbital-journal', 'articles'),
      current: normalizedPage === 'articles' || normalizedPage === 'makaleler',
    },
    {
      label: 'Yazarlar',
      href: getSitePageRoute('orbital-journal', 'authors'),
      current: normalizedPage === 'authors' || normalizedPage === 'yazarlar',
    },
    {
      label: 'Forum',
      href: getSitePageRoute('orbital-journal', 'forum'),
      current: normalizedPage === 'forum',
    },
    {
      label: 'Cilt Arşivi',
      href: getSitePageRoute('orbital-journal', 'archive'),
      current: normalizedPage === 'archive' || normalizedPage === 'arsiv',
    },
  ];

  const footerLinks = [
    {
      label: 'Hakem İlkeleri',
      href: getSitePageRoute('orbital-journal', 'articles'),
    },
    {
      label: 'Açık Bilim ve FAIR',
      href: getSitePageRoute('orbital-journal', 'forum'),
    },
    {
      label: 'Danışma Kurulu',
      href: getSitePageRoute('orbital-journal', 'authors'),
    },
    {
      label: 'Cilt & DOI Dizini',
      href: getSitePageRoute('orbital-journal', 'archive'),
    },
  ];

  // Route Content Resolver
  const renderContent = () => {
    // 1. Detail View Handling
    if (itemSlug) {
      // Check if itemSlug is an article
      const article = articles.find((a) => a.slug === itemSlug);
      if (article) {
        return <ArticleDetail article={article} />;
      }

      // Check if itemSlug is a forum thread
      const thread = forumThreads.find((t) => t.slug === itemSlug);
      if (thread) {
        return <ForumThreadDetail thread={thread} />;
      }

      // Not found
      return (
        <div className="container" style={{ paddingBlock: 'var(--sp-12)' }}>
          <Breadcrumbs
            items={[
              { label: 'Genel Bakış', href: getSitePageRoute('orbital-journal', 'home') },
              { label: 'Kayıt Bulunamadı' },
            ]}
          />
          <EditorialEmptyState
            title="Aradığınız yayın veya tartışma konusu bulunamadı"
            description={`"${itemSlug}" kalıcı bağlantısına (slug) ait bir makale veya forum başlığı arşivimizde yer almıyor.`}
            actionLabel="Dergimizin Ana Sayfasına Dön"
            onAction={() => {
              window.location.href = getSitePageRoute('orbital-journal', 'home');
            }}
          />
        </div>
      );
    }

    // 2. Standard Pages
    switch (normalizedPage) {
      case 'home':
      case 'index':
      case '':
        return <JournalHome />;

      case 'articles':
      case 'makaleler':
        return <JournalArticles />;

      case 'authors':
      case 'yazarlar':
        return <JournalAuthors />;

      case 'forum':
        return <JournalForum />;

      case 'archive':
      case 'arsiv':
        return <JournalArchive />;

      default:
        return (
          <div className="container" style={{ paddingBlock: 'var(--sp-12)' }}>
            <Breadcrumbs
              items={[
                { label: 'Genel Bakış', href: getSitePageRoute('orbital-journal', 'home') },
                { label: 'Sayfa Bulunamadı' },
              ]}
            />
            <EditorialEmptyState
              title="Talep ettiğiniz dergi sayfası bulunamadı"
              description={`"${pageSlug}" rotası dergimizin yayın dizininde bulunmuyor.`}
              actionLabel="Dergimizin Ana Sayfasına Dön"
              onAction={() => {
                window.location.href = getSitePageRoute('orbital-journal', 'home');
              }}
            />
          </div>
        );
    }
  };

  return (
    <SiteShell
      brand="Yörünge Araştırma Dergisi"
      tagline="Disiplinlerarası Bilim, Derin Teknoloji ve Eleştirel Teori"
      nav={navItems}
      footerLinks={footerLinks}
    >
      {renderContent()}
    </SiteShell>
  );
}

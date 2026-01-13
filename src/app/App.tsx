import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary } from '../components/common/ErrorBoundary';
import { ROUTES } from '../constants/routes';
import {
  OverviewPage,
  LifeProtectionPage,
  SavingsPlanPage,
  HealthPlanPage,
  AccidentPlanPage,
  ArticlesPage,
  ArticleDetailPage,
  CaseStudyDetailPage,
  NeedsAnalysisPage,
  ContactPage
} from '../pages';

export default function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <BrowserRouter>
          <Routes>
            {/* Redirect root to overview */}
            <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.OVERVIEW} replace />} />
            
            {/* Main Routes */}
            <Route path={ROUTES.OVERVIEW} element={<OverviewPage />} />
            <Route path={ROUTES.LIFE} element={<LifeProtectionPage />} />
            <Route path={ROUTES.SAVINGS} element={<SavingsPlanPage />} />
            <Route path={ROUTES.HEALTH} element={<HealthPlanPage />} />
            <Route path={ROUTES.ACCIDENT} element={<AccidentPlanPage />} />
            <Route path={ROUTES.ARTICLES} element={<ArticlesPage />} />
            <Route path={ROUTES.ARTICLE_DETAIL} element={<ArticleDetailPage />} />
            <Route path="/articles/case/:id" element={<CaseStudyDetailPage />} />
            <Route path={ROUTES.NEEDS_ANALYSIS} element={<NeedsAnalysisPage />} />
            <Route path={ROUTES.CONTACT} element={<ContactPage />} />
            
            {/* 404 - Redirect to overview */}
            <Route path="*" element={<Navigate to={ROUTES.OVERVIEW} replace />} />
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
    </ErrorBoundary>
  );
}
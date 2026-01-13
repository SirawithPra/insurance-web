# Changelog

All notable changes to SmartWealth will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- User authentication system
- Save calculation results
- Side-by-side comparison tool
- Email notifications
- AI chatbot assistant

## [1.0.0] - 2026-01-08

### Added
- 🎉 Initial release of SmartWealth
- 📊 Interactive insurance calculators
  - Life insurance calculator with x10 rule
  - Savings plan calculator with tax benefits
  - Health insurance plan comparison
  - Accident insurance comparison
- 💡 Knowledge base system
  - Article listing and detail pages
  - Comment system with ratings
  - SEO-optimized content
- 🎨 Modern, responsive UI
  - Mobile-first design
  - Tailwind CSS v4
  - Smooth animations
- 🔧 Tax optimization tool
  - Tax suitability screening
  - Benefit calculations
  - Strategy recommendations
- 📈 Data visualization
  - Interactive charts with Recharts
  - Comparison graphs
  - Break-even analysis
- 🌐 SEO features
  - Unique meta tags per page
  - JSON-LD structured data
  - Sitemap generation
  - robots.txt
- 🏗️ Scalable architecture
  - React Router v7 for routing
  - Custom hooks for business logic
  - Service layer for API calls
  - TypeScript for type safety
- 📱 Responsive components
  - InsuranceCard with pros/cons
  - ComparisonChart
  - MetricCard
  - CommentSection
  - PlanSelector
- 🛠️ Developer experience
  - Vite for fast builds
  - Hot Module Replacement
  - TypeScript strict mode
  - Environment configuration
- 📚 Documentation
  - README with quick start
  - ARCHITECTURE documentation
  - API documentation
  - CONTRIBUTING guide

### Component Library
- `ErrorBoundary` - Error handling
- `Loading` - Loading states
- `SEOHead` - SEO metadata management
- `Navbar` - Navigation with mobile menu
- `Footer` - Footer with disclaimers
- `MainLayout` - Page layout wrapper
- `InsuranceCard` - Insurance type display
- `ComparisonChart` - Financial comparison
- `MetricCard` - Key metrics display
- `PlanSelector` - Plan selection UI
- `CommentSection` - User comments
- `SliderControl` - Input slider
- `SelectControl` - Select dropdown

### Custom Hooks
- `useInsuranceCalculations` - Insurance math
- `useTaxOptimizer` - Tax optimization
- `useArticles` - Article management
- `useComments` - Comment management
- `useSEO` - SEO metadata

### Services
- `articleService` - Article CRUD
- `commentService` - Comment CRUD
- `api` - HTTP client wrapper

### Utilities
- `formatters` - Number/currency formatting
- `seo` - SEO helpers
- `sitemap` - Sitemap generation

### Pages
- Overview - Insurance types overview
- Life Protection - Life insurance calculator
- Savings Plan - Savings insurance calculator
- Health Plan - Health insurance comparison
- Accident Plan - Accident insurance comparison
- Articles - Knowledge base listing
- Article Detail - Individual articles
- Contact - Contact form

## [0.1.0] - 2026-01-01

### Added
- Initial project setup
- Basic React + TypeScript configuration
- Tailwind CSS integration
- Project structure planning

---

## Version History

### Version Naming

- **Major** (1.x.x): Breaking changes
- **Minor** (x.1.x): New features (backward compatible)
- **Patch** (x.x.1): Bug fixes

### Release Schedule

- **Major releases**: Every 6-12 months
- **Minor releases**: Every 1-2 months
- **Patch releases**: As needed

### Support Policy

- **Latest version**: Full support
- **Previous major**: Security fixes only
- **Older versions**: No support

---

[Unreleased]: https://github.com/smartwealth/smartwealth/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/smartwealth/smartwealth/releases/tag/v1.0.0
[0.1.0]: https://github.com/smartwealth/smartwealth/releases/tag/v0.1.0

# Digital Goods Marketplace

![Digital Goods Marketplace](https://imgix.cosmicjs.com/7d563fa0-f0fa-11f0-95ed-edd347b9d13a-photo-1561070791-2526d30994b5-1768361907648.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A beautiful e-commerce storefront for digital products built with Next.js 16 and Cosmic CMS. Browse curated collections, explore premium digital goods, and read authentic customer reviews.

## Features

- 🛍️ **Product Catalog** - Browse all digital products with beautiful card layouts
- 📁 **Collections** - Products organized by category for easy discovery
- ⭐ **Customer Reviews** - Star ratings and verified purchase badges
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- ⚡ **Server-Side Rendering** - Fast initial page loads
- 🎨 **Modern UI** - Clean design with smooth animations

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=69670f4eb23381313076a7aa&clone_repository=696710b3e079d4bb18459293)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Design a content model for an e-commerce store that sells digital products, includes collections, and customer reviews"

### Code Generation Prompt

> "Based on the content model I created for 'Design a content model for an e-commerce store that sells digital products, includes collections, and customer reviews', now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) - React framework with App Router
- [Cosmic](https://www.cosmicjs.com/docs) - Headless CMS for content management
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Inter Font](https://fonts.google.com/specimen/Inter) - Modern sans-serif typeface

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- A Cosmic account with the digital goods content model

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   ```
3. Set up environment variables (see below)
4. Run the development server:
   ```bash
   bun dev
   ```
5. Open [http://localhost:3000](http://localhost:3000)

### Environment Variables

Create a `.env.local` file with:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

## Cosmic SDK Examples

### Fetching Products
```typescript
const { objects: products } = await cosmic.objects
  .find({ type: 'products' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Reviews for a Product
```typescript
const { objects: reviews } = await cosmic.objects
  .find({ 
    type: 'reviews',
    'metadata.product': productId 
  })
  .props(['id', 'title', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This application uses three object types:
- **Products** - Digital items with name, description, price, and images
- **Collections** - Categories to organize products
- **Reviews** - Customer feedback with ratings and comments

## Deployment Options

### Vercel (Recommended)
1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Netlify
1. Push to GitHub
2. Import in Netlify
3. Set build command: `bun run build`
4. Add environment variables
5. Deploy

<!-- README_END -->
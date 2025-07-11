# Unity Innovate - Frontend

A modern, responsive website for Unity Innovate - a cutting-edge global insights and innovation partner.

## 🚀 Live Demo

- **Frontend**: [Coming Soon - Deploy to Vercel]
- **Strapi CMS**: [https://calm-flowers-c5253b83e1.strapiapp.com/admin](https://calm-flowers-c5253b83e1.strapiapp.com/admin)

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Animations**: Framer Motion
- **CMS**: Strapi Cloud
- **Deployment**: Vercel

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── careers/           # Careers page
│   ├── contact/           # Contact page
│   ├── industries/        # Industry pages
│   ├── insights/          # Blog, articles, case studies
│   └── services/          # Service pages
├── components/            # Reusable React components
│   ├── home/             # Homepage components
│   ├── about/            # About page components
│   ├── careers/          # Career page components
│   ├── contact/          # Contact page components
│   ├── industries/       # Industry page components
│   ├── insights/         # Insights page components
│   └── services/         # Service page components
└── lib/                  # Utilities and data loaders
    ├── data-loaders.ts   # Strapi API functions
    ├── types.ts          # TypeScript types
    └── utils.ts          # Utility functions
```

## 🔧 Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_STRAPI_API_URL=https://calm-flowers-c5253b83e1.strapiapp.com/api
```

## 📦 Installation & Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/heyadrsh/unityinnovate.git
   cd unityinnovate
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Strapi URL
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**
   - Import your GitHub repository to Vercel
   - Vercel will automatically detect Next.js

2. **Environment Variables**
   Add the following environment variable in Vercel:
   ```
   NEXT_PUBLIC_STRAPI_API_URL=https://calm-flowers-c5253b83e1.strapiapp.com/api
   ```

3. **Deploy**
   - Vercel will automatically deploy on every push to main branch

### Manual Deployment

```bash
# Build the project
npm run build

# Start production server
npm start
```

## 📊 Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI**: Clean, professional design with smooth animations
- **SEO Optimized**: Meta tags, structured data, and sitemap
- **Performance**: Optimized images, lazy loading, and code splitting
- **Accessibility**: WCAG compliant with proper ARIA labels
- **Content Management**: Dynamic content from Strapi CMS

## 📄 Pages

- **Homepage**: Hero section, services overview, company stats, testimonials
- **About**: Company overview, team members, awards and recognition
- **Services**: Detailed service pages for each offering
- **Industries**: Industry-specific content and case studies
- **Insights**: Blog posts, articles, and case studies
- **Careers**: Job opportunities and company culture
- **Contact**: Contact form and global office locations

## 🔗 CMS Integration

The website is integrated with Strapi Cloud for content management:

- **Content Types**: Homepage sections, team members, services, blog posts, case studies
- **Media**: Images and documents are served from Strapi
- **Dynamic Routing**: Pages are generated based on CMS content

## 🎨 Design System

- **Colors**: Professional blue-green palette (#2D5A5A, #4A9B9B)
- **Typography**: Inter font family
- **Components**: Consistent UI components using Shadcn/ui
- **Animations**: Subtle transitions and hover effects

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Contact

- **Email**: heyadrsh@gmail.com
- **Website**: [Coming Soon]
- **LinkedIn**: [Unity Innovate](https://linkedin.com/company/unityinnovate)

## 📄 License

This project is proprietary and confidential.

---

Built with ❤️ using Next.js and Strapi

# SSC Navigator

<div align="center">

A beautifully designed, modern web application to search and filter SSC Phase 14 post vacancies with an Apple-inspired UI.

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge&logo=vercel)](https://sscnavigator.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

</div>

---

## Features

- **Smart Search & Filtering** - Search posts by name, filter by qualification and region
- **Vacancy Breakdown** - View detailed vacancy counts (UR, OBC, SC, ST, EWS) for each post
- **Apple-Inspired UI** - Beautiful glassmorphism effects, smooth animations, and modern design
- **Dark/Light Mode** - Toggle between themes with persistent preference
- **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- **Fast Performance** - Built with Next.js 16 and optimized for speed
- **API Rate Limiting** - Protected against data scraping
- **SEO Optimized** - Complete with sitemap, robots.txt, and structured data
- **Views Counter** - Real-time view tracking with PostgreSQL database

## Live Demo

Check out the live application: **[sscnavigator.vercel.app](https://sscnavigator.vercel.app)**

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: PostgreSQL (for views counter)
- **Deployment**: Vercel
- **Fonts**: Geist Sans & Geist Mono

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/sscpostfinder.git
cd sscpostfinder
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
DATABASE_URL=your_postgresql_connection_string
```

4. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Setup

The app uses PostgreSQL for the views counter. Set up your database and add the connection string to your `.env` file.

The views table is automatically created on first run.

## Project Structure

```
sscpostfinder/
├── app/
│   ├── api/
│   │   ├── posts/      # Posts API with search/filter
│   │   ├── totals/     # Vacancy totals API
│   │   └── views/      # Views counter API
│   ├── layout.tsx      # Root layout with metadata
│   ├── page.tsx        # Main page component
│   ├── robots.ts       # SEO robots.txt
│   ├── sitemap.ts      # SEO sitemap.xml
│   └── globals.css     # Global styles
├── data/
│   ├── ssc_posts_full.json
│   └── ssc_totals.json
└── public/
    └── favicon.svg
```

## Building for Production

```bash
npm run build
npm start
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com/new)
3. Add your environment variables
4. Deploy!

The app is optimized for Vercel with automatic SEO and performance optimizations.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Made by [jashgro](https://www.instagram.com/jash_gro/)

## Acknowledgments

- SSC for the vacancy data
- [Next.js](https://nextjs.org/) team for the amazing framework
- [Vercel](https://vercel.com/) for hosting
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

---

<div align="center">

**If you find this project helpful, please consider giving it a star on GitHub!**

</div>

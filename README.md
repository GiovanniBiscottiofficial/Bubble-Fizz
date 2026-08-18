# Bubble & Fizz — Luxury Mobile Bartending

A premium, SEO-optimized single-page website for Bubble & Fizz, a licensed and insured mobile bartending company in North Carolina. Built to showcase luxury champagne bars, craft cocktails, and professional event service for weddings, corporate events, and private celebrations.

## Tech Stack

- **React 19** + TypeScript
- **Vite** build tool
- **Tailwind CSS** v3 with a custom luxury theme
- **GSAP** + ScrollTrigger for scroll-linked animations
- **Lucide React** for icons
- **Firebase Hosting** for deployment

## Development

```bash
npm install      # install dependencies
npm run dev      # start dev server
npm run build    # build for production
npm run preview  # preview production build
```

## Project Structure

```
src/
├── main.tsx                    # React entry point
├── App.tsx                     # Root component with lazy-loaded sections
├── index.css                   # Global styles + luxury theme tokens
├── components/
│   ├── CertificationBadges.tsx
│   ├── ChampagneBubbles.tsx
│   ├── CustomCursor.tsx
│   ├── HeaderLogo.tsx
│   ├── HeroSparkle.tsx
│   ├── LazySection.tsx
│   ├── Logo.tsx
│   ├── OptimizedImage.tsx
│   ├── ReviewsMap.tsx
│   └── ui/                     # shadcn/ui-style components
├── sections/
│   ├── Navigation.tsx
│   ├── Hero.tsx
│   ├── Experience.tsx
│   ├── SignatureCocktails.tsx
│   ├── DrinkMenu.tsx
│   ├── Process.tsx
│   ├── Gallery.tsx
│   ├── Testimonials.tsx
│   ├── ThumbtackMoments.tsx
│   ├── Packages.tsx
│   ├── Credentials.tsx
│   ├── FAQ.tsx
│   ├── FinalCTA.tsx
│   └── Contact.tsx
├── lib/
│   └── utils.ts
└── hooks/
    └── use-mobile.ts
```

## Deployment

Production builds are deployed to Firebase Hosting:

```bash
npm run build
npx firebase deploy --only hosting --project <project-id>
```

The live production URL is managed in `firebase.json` and `.firebaserc`.

## Booking

Contact Mercedes Pettiford directly:

- **Phone**: [984-385-4736](tel:+19843854736)
- **Email**: bubble_fizzbar@yahoo.com
- **Website**: https://bubble-fizz-app-42.web.app

## Credits

Site designed and developed by **Vaultborne Group LLC**.

## License

All rights reserved.

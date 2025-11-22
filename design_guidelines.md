# MaraSondu WRUAS Forum - Design Guidelines

## Design Approach
**Reference-Based**: Drawing inspiration from environmental non-profit and water conservation organizations (charity: water, The Nature Conservancy) combined with modern content platforms (Medium for blog, Airbnb for project cards). Focus on clean, trustworthy design that emphasizes impact and community.

## Brand Identity

**Logo**
SVG logo featuring:
- Water droplet as central element
- Two flowing rivers forming the letter "M"
- Leaf elements integrated to represent conservation
- Clean, modern aesthetic suitable for both digital and print

**Color System**
```
Primary Colors:
- Primary Blue: #0D5C7D (trust, water, professionalism)
- Primary Aqua: #1E8BA6 (vitality, freshness)

Secondary Colors:
- Deep Green: #2D5F3F (conservation, growth)
- Light Green: #5A9367 (sustainability, nature)

Accent:
- Orange: #E67E22 (energy, calls-to-action)

Neutrals:
- White: #FFFFFF
- Light Gray: #F8F9FA (backgrounds)
- Dark Text: #2C3E50
```

## Typography

**Headings**: Inter (Google Fonts)
- H1: 3.5rem (56px), font-weight: 700, line-height: 1.1
- H2: 2.5rem (40px), font-weight: 600, line-height: 1.2
- H3: 1.875rem (30px), font-weight: 600, line-height: 1.3
- H4: 1.5rem (24px), font-weight: 500, line-height: 1.4

**Body**: System font stack for performance
- Base: 1rem (16px), line-height: 1.6
- Large: 1.125rem (18px) for emphasis
- Small: 0.875rem (14px) for meta info

## Layout System

**Spacing Units**: Tailwind scale of 4, 6, 8, 12, 16, 20, 24, 32
- Component padding: p-6 to p-8
- Section spacing: py-16 to py-24
- Card gaps: gap-6 to gap-8

**Container Widths**:
- Full-width sections: max-w-7xl (1280px)
- Content sections: max-w-6xl (1152px)
- Text content: max-w-4xl (896px)
- Forms: max-w-2xl (672px)

## Page Structures

**Homepage**
- Hero: Full-width with background image (Lake Victoria basin), overlay with primary blue gradient, centered headline + subheadline + dual CTAs
- Impact Stats Bar: 4-column grid showing key metrics (WRUAs, Projects, Hectares, Communities)
- Featured Projects: 3-column card grid
- Mission Statement: Two-column layout (image + text)
- Latest News: 3-column blog card preview
- Newsletter CTA: Centered with background treatment

**About Page**
- Hero: Image + mission statement overlay
- Story Timeline: Vertical timeline with alternating content
- Team Section: Card grid with photos
- Partner Logos: Centered logo grid

**Vision/Portfolio (Projects)**
- Filter Bar: Sticky top bar with category, location, SDG filters
- Project Grid: Masonry-style cards with images, titles, locations, impact metrics
- Project Detail: Full-width hero image, sidebar with quick facts, rich content area with gallery

**Network (WRUA Directory)**
- Interactive Map: Leaflet map showing all 30 WRUAs with custom markers (top half of viewport)
- Directory List: Filterable cards below map (location, focus areas)
- WRUA Profile: Modal or dedicated page with contact info, projects, impact data

**Impact Dashboard**
- Stats Overview: Large number displays with trend indicators
- Visual Data: Charts showing water saved, land restored, communities served
- SDG Alignment: Icon grid showing how projects map to UN SDGs
- Success Stories: Featured case studies

**Funding Opportunities**
- Opportunity Cards: Grid layout with deadline badges, funding amounts, focus areas
- Filters: By deadline, amount, focus area
- Application CTA: Prominent contact button

**News/Blog**
- Blog Grid: 2-column layout (featured post full-width, then 3-column grid)
- Category Pills: Horizontal scroll on mobile
- Individual Post: Hero image, author info, rich text content, related posts

**Contact**
- Two-column: Form (left), contact info + map (right)
- Form fields: Name, email, organization, subject, message
- Contact details: Office location, email, phone with icons

## Component Library

**Navigation**
- Desktop: Horizontal with logo left, links center, "Get Involved" CTA right
- Mobile: Hamburger menu, full-screen overlay
- Sticky on scroll with subtle shadow

**Cards - Project Cards**
- Image top (16:9 ratio), gradient overlay on hover
- Title, location pin icon + text
- Tags for category/SDGs
- Impact metric badges
- "Learn More" link bottom-right

**Cards - WRUA Cards**
- Smaller format, logo/icon top
- Name, location, member count
- Focus areas as pills
- Contact button

**Cards - Blog Cards**
- Featured image (3:2 ratio)
- Category badge, publish date
- Title, excerpt (2 lines)
- Author avatar + name

**Forms**
- Input fields: Rounded-lg, border-gray-300, focus:border-primary-blue
- Labels: Above inputs, font-medium
- Buttons: Full-width on mobile, auto width on desktop
- Error states: Red border + message below

**Buttons**
- Primary: bg-primary-blue, text-white, rounded-lg, px-6 py-3
- Secondary: bg-accent-orange for CTAs
- Outline: border-primary-blue, text-primary-blue
- Hover: Slight darkening, no transform
- Blurred background when over images

**Admin Panel**
- Sidebar navigation (dark primary-blue background)
- Main content area with white cards
- Rich text editor: TinyMCE or similar with image upload
- Tables: Sortable, filterable, with action buttons
- Dashboard: Stat cards + recent activity feed

## Images

**Hero Images**
- Homepage: Aerial view of river basin/waterways with communities
- About: Team working in the field with local communities
- Portfolio: Water conservation project in action
- Network: Map-based interface, supplemented with landscape shots
- Impact: Data visualization overlaid on nature imagery

**Content Images**
- Project photos: Before/after comparisons, community engagement, conservation results
- WRUA profiles: Local landscapes, team photos
- Blog: Featured images relevant to post topics, team/event photos

**Image Treatment**
- Aspect ratios: 16:9 for heroes, 3:2 for cards, 1:1 for avatars
- Overlays: Primary blue gradient (opacity 0.6-0.8) for text readability
- Borders: Rounded-lg (8px) for cards, rounded-xl (12px) for features

## Interactions

**Minimal Animations**
- Hover states: Subtle scale (1.02) on cards
- Page transitions: Smooth scroll, no route animations
- Loading: Simple spinner in brand colors
- Form submission: Success checkmark animation only

**Accessibility**
- ARIA labels on all interactive elements
- Focus indicators: 2px primary-blue outline
- Keyboard navigation throughout
- Alt text for all images
- Color contrast meets WCAG AA standards

This design creates a trustworthy, professional presence that honors the environmental mission while being practical for non-technical admin updates.
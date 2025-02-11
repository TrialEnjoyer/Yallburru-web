# Yallburru Community Services Website

A modern, responsive website for Yallburru Community Services, an Elder Care & Disability Services Provider serving the Gold Coast, South East Queensland & Nationwide.

## 🌟 Features

Current Features:
- Responsive design that works on all devices
- Single-page application with smooth scroll navigation
- Accessible and SEO-friendly
- Modern UI with Tailwind CSS
- Interactive mobile menu
- Contact form with email notifications
- Admin panel with authentication
- Form submissions management
- Newsletter subscription system


## Pages Requiring additional info & approval

- Team page (more info)
- FAQ page (both)
- Services (both)
- About (both)
- Careers (both)


## 📋 TODO List

### Frontend Pages & Features
- [ ] Add testimonials section to homepage (requires more information)
- [O] Create services detail pages (requires more information)
- [x] Add Articles section
- [x] Add Articles page
- [x] Add contact us page
- [x] Add Team page
- [O] Add about us page (requires more information)
- [ ] Implement image gallery (requires images)
- [O] Add staff/team member profiles
- [ ] Create FAQ page
- [x] Add privacy policy and terms of service pages
- [x] Implement breadcrumb navigation
- [x] Add loading states and animations
- [ ] add lines to timeline on about for mobile
- [ ] Founders pages, need extended names.

### Admin Features
- [x] Rich text editor for content management
- [x] Image upload and management system
- [x] Blog post creation and management
- [ ] User profile management
- [-] Analytics dashboard
- [ ] Email template customization
- [ ] Service management interface
- [ ] Backup and restore functionality
- [x] Assisted shiftcare notification system.

### Technical Improvements
- [-] Implement server-side rendering for better SEO
- [ ] Add automated testing
- [ ] Implement error boundary and fallback UI
- [ ] Add rate limiting for form submissions
- [ ] Implement caching strategy
- [ ] Add automated backups
- [ ] Improve accessibility (WCAG compliance)
- [ ] Add performance monitoring

### Security Enhancements
- [O] Implement CSRF protection (NOTE: Comes implemented out of the box with next.js getServerSideProps)
- [ ] Add two-factor authentication
- [ ] Implement session management
- [-] Add security headers
- [ ] Regular security audits
- [ ] Implement API rate limiting

## 🚀 Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Lucide React](https://lucide.dev/) - Icons
- [tRPC](https://trpc.io/) - API Layer
- [Supabase](https://supabase.com/) - Backend & Authentication
- [Node Mailer](https://nodemailer.com/) - Email

## 🎨 Design

The website uses a clean, professional design with:
- Blue and white color scheme
- Modern iconography
- Responsive layout
- Accessible navigation
- Mobile-first approach


## Research

### Kalwun

- Kalwun has an 'Upcoming Events' section in their homepage. - Ask if we require an events calendar.
- Kalwun has a minimal small tile based links section - rather then individual sections to highlight services and info, they just link to their pages.
- Kalwun has a revolving gallery hero section with 3 CTA's.
- Kalwun site structure is alike what i had aimed to achieve, several sections with subsection tabs leading to different pages in the site.
Home
 - Health + Wellbeing Services
    Allied Health Services
    Dental Services
    Medical Services
    Our Clinics
    Social Programs
    Targeted Health Programs
    Covid 19 info
    Health FAQ
    Feedback and Complaints (why here???? also this is present in every other tab too WHY NOT JUST RESOURCES/CONTACT)
 - Seniors Services
    Commonwealth Home Support Program
    Home Care Packages
    Wellness Center
 - Child + Youth + Family
    Jarjums Playgroup
    Youth Wellbeing Program
    Domestic and Family Violence Support Program
    Early Learning Program
    Kinship and Foster Care
    Family Wellbeing Service
    Family Participation Program
    Our Centers (Child youth and family centers - assume some kind of social care offices??? litterally no other info given.)
    Child, Youth and Family Services FAQ (Apparently multiple FAQ pages rather then 1 - bad practice.)
 - Housing + Cultural Support
    Affordable Housing
    Confirmation of Aboriginality
    Emergency Relief
    Feedback and Complaints (At this point im just assuming feedback and complaints are going to different groupds within the org - still bad practice to separate them)
    Finding Cultural Connections
 - Culture
    Community Events (No Calander provided - Application of interest in getting involved is provided though; Music, Dance, Theatre, storytelling, visual Arts and other.)
    Cultural Tours (Brief info and then just a link to go to a different website.)
    Early Learning Cultural Program
    Elders Group
    Jellurgal Aboriginal Cultural Centre
    Welcome to Country Ceremonies
 - News + Resources
    Corporate Documents
    Events Calendar (Actual Calendar this time)
    News and Announcements

### Atsichs

- on first glance, Atsich's looks like how i plan to have the site laid out
 - Category / Subcategory (optional) / Slug
- main site pages are in an enhanced blog like form which makes it look hard coded
 - tables, and downloadable resources as extra, CTA, multiple columns, lots of customisation. Thats not to say however that there ar no issues - There are broken components all over the place if you look hard enough. (EDIT - On code review, it is hard coded - Alot of mistakes and code left in.)
- Mobile menu is difficult to navigate, theres no distinction between parent and child navigation made on expanding tabs.
- Site Structure is as follows:
Home
 - Services & support
  - Covid-19 support
  - NDIS
  - Health & wellbeing
   - Medical Clinics
   - Dental Clinics
   - Allied Health
   - Community Groups
   - Deadly Choices
   - Jajumbora BiOC Hub
   - Safe & Deadly Places for LGBTIQ+ mob
   - Social Health
   - Transport
  - Children & Families
   - Deadly Kindy
   - Family Participation program
   - housing services
   - jajumbora Children & family center
   - Nyanya Minjindei Delegated Authority
   - Youth Justice Service
   - Youth Service
   - Brighter Futures (Extended Post Care Support)
  - Elders Support
   - Jumbelunga Nursing Centre
 - News & Events
  - Young, Black and Proud Scholarship
  - Gala Dinner
 - Contact Us
  - Locations
  - Feedback
  - Raise a Concern
 - About Us
  - Our Peaple
  - Our Story
  - Our Work
  - Our Research
  - Join our Team
   - Traineeships
  - Become a Member
  - Donate
 - Shop (2 items total, buttons are gross and missaligned, Would have been easier to do without a cart system (Again, why?))

 ### Yallburru (us)
Home 
 - [...slug]
 - about
 - articles (points to all posible [...slug] locations)
 - about
 - cpanel (admin emails & some backend)
 - Contact
 - Careers
 - faq
 - login
 - services
 - team
  - admin

  Actual - something kind of like: 

Extra's that Rachel want done - Who We Are

## 📄 License

Copyright © 2024 Yallburru Community Services. All rights reserved.

## 📞 Contact

For any inquiries, please contact:
### Yallburru
- Phone: (OLD) - (07) 5632 5727 (NEW) - 1300 071 157
- Dev Email: Adrian@yallburru.org.au
- Address: 55 Highland way, Upper Coomera, QLD, 4209
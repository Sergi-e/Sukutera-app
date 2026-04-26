# Sukutera 🌊

> **Track. Sort. Sustain.**  
> Plastic waste tracking and incentive platform for Lake Kivu, Rwanda.

Funded by [National Geographic Society](https://www.nationalgeographic.org/) and [The Nature Conservancy](https://www.nature.org/).

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 + Vite 6 |
| Styling | Tailwind CSS v4 |
| Backend | Supabase (PostgreSQL + Realtime) |
| Maps | Mapbox GL JS |
| Charts | Recharts |
| Routing | React Router v6 |

---

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment variables
```bash
cp .env.example .env
```
Fill in your Supabase URL, anon key, and Mapbox token in `.env`.

### 3. Set up Supabase database
- Open your [Supabase project](https://supabase.com)
- Go to **SQL Editor**
- Paste and run the full contents of `supabase/schema.sql`

### 4. Run locally
```bash
npm run dev
```
App runs at **http://localhost:5173**

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Hero landing page with live impact counters |
| `/map` | Mapbox live collection map — color-coded by plastic type |
| `/log` | GPS-tagged collection logging form |
| `/leaderboard` | Collector rankings with podium + district filter |
| `/impact` | Full conservation dashboard — charts, progress bars |

---

## Points System

| Plastic Type | Points per kg |
|-------------|--------------|
| PET (bottles) | 10 pts |
| HDPE (containers) | 8 pts |
| Mixed | 5 pts |
| Other | 3 pts |

---

## Districts

| District | Shoreline | Annual Target |
|---------|-----------|---------------|
| Rubavu | 28.4 km | 500 kg |
| Karongi | 42.1 km | 750 kg |
| Rusizi | 35.7 km | 620 kg |

---

## Project Structure

```
src/
├── components/
│   ├── layout/       Navbar, Footer
│   ├── map/          LiveMap, CollectionPin
│   ├── dashboard/    ImpactStats, PlasticBreakdown, TimelineChart
│   ├── collectors/   Leaderboard, CollectorCard
│   └── forms/        LogCollectionForm
├── pages/            Home, MapView, LogCollection, LeaderboardPage, ImpactDashboard
├── lib/              supabase.js, constants.js
├── hooks/            useCollections.js, useCollectors.js
└── utils/            points.js, formatters.js
supabase/
└── schema.sql        Full PostgreSQL schema with RLS + Realtime
```

---

## Deploy to Vercel

```bash
npm run build
# Then connect the sukutera/ folder to a Vercel project
# Add environment variables in Vercel dashboard
```

---

## Supabase Setup Notes

The `supabase/schema.sql` file creates:
- **3 tables**: `collectors`, `collections`, `districts`
- **Indexes** for fast map + leaderboard queries
- **Row Level Security** policies (public read, authenticated write)
- **Realtime** enabled on `collections` and `collectors`
- **`increment_collector_stats()`** stored procedure for atomic point updates

---

*Built for conservation. Lake Kivu, Rwanda 🇷🇼*

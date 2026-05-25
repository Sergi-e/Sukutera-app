import { useState } from 'react'
import { Link } from 'react-router-dom'
import StakeholderCard from '../components/stakeholders/StakeholderCard'
import { STAKEHOLDER_CATEGORIES, STAKEHOLDERS, getCollectionPartner } from '../lib/stakeholders'

const VALUE_CHAIN = [
  { label: 'Collect', sub: 'Baj Ltd · Lake Kivu', color: STAKEHOLDER_CATEGORIES.collection.color },
  { label: 'Log & Sort', sub: 'Sukutera Platform', color: '#0A7C6E' },
  { label: 'Recycle', sub: 'Ecoplastic · Polytank · CIPLA', color: STAKEHOLDER_CATEGORIES.recycling.color },
  { label: 'Compost', sub: 'RAB · Green Future · Kigali Farms', color: STAKEHOLDER_CATEGORIES.compost.color },
  { label: 'Prove Impact', sub: 'Dashboard & funders', color: '#F5E6C8' },
]

const FILTERS = [
  { id: 'all', label: 'All Partners' },
  { id: 'collection', label: 'Collection' },
  { id: 'recycling', label: 'Recycling' },
  { id: 'compost', label: 'Compost' },
]

export default function EcosystemPage() {
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const categories = Object.values(STAKEHOLDER_CATEGORIES)

  const matchesSearch = (stakeholder) => {
    if (!search.trim()) return true
    const q = search.toLowerCase()
    return (
      stakeholder.name.toLowerCase().includes(q) ||
      stakeholder.district.toLowerCase().includes(q) ||
      stakeholder.location.toLowerCase().includes(q) ||
      stakeholder.role.toLowerCase().includes(q)
    )
  }

  const visibleCategories =
    filter === 'all'
      ? categories
      : categories.filter((c) => c.id === filter)

  const filteredStakeholders = STAKEHOLDERS.filter(matchesSearch)
  const hasResults = visibleCategories.some((cat) =>
    filteredStakeholders.some((s) => s.category === cat.id)
  )
  const featured = getCollectionPartner()

  return (
    <div
      style={{
        minHeight: '100vh',
        paddingTop: 88,
        paddingBottom: 64,
        paddingLeft: 24,
        paddingRight: 24,
        boxSizing: 'border-box',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 16px',
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 600,
              marginBottom: 16,
              background: 'rgba(10,124,110,0.12)',
              border: '1px solid rgba(10,124,110,0.25)',
              color: '#0A7C6E',
            }}
          >
            🔗 Partner Directory
          </div>
          <h1 style={{ fontSize: 40, fontWeight: 900, color: '#fff', marginBottom: 10 }}>
            Ecosystem
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15, maxWidth: 560, margin: '0 auto', lineHeight: 1.65 }}>
            The full value chain connecting Lake Kivu collectors to verified recyclers and organic processors across Rwanda.
          </p>
        </div>

        {/* Featured pilot partner */}
        {featured && (
          <div style={{ marginBottom: 28 }}>
            <StakeholderCard stakeholder={featured} categoryColor={STAKEHOLDER_CATEGORIES.collection.color} />
          </div>
        )}

        {/* Summary stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: 12,
            marginBottom: 24,
          }}
        >
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '14px 16px', textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 900, color: '#52B788' }}>{STAKEHOLDERS.length}</div>
            <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'rgba(255,255,255,0.38)', marginTop: 4 }}>Total Partners</div>
          </div>
          {categories.map((cat) => (
            <div
              key={cat.id}
              style={{
                background: `${cat.color}08`,
                border: `1px solid ${cat.color}25`,
                borderRadius: 12,
                padding: '14px 16px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 24, fontWeight: 900, color: cat.color }}>
                {STAKEHOLDERS.filter((s) => s.category === cat.id).length}
              </div>
              <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'rgba(255,255,255,0.38)', marginTop: 4 }}>
                {cat.label.split(' ')[0]}
              </div>
            </div>
          ))}
        </div>

        {/* Filter tabs + search */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 28, justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
            {FILTERS.map((f) => {
              const active = filter === f.id
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 999,
                    border: active ? '1px solid rgba(10,124,110,0.5)' : '1px solid rgba(255,255,255,0.1)',
                    background: active ? 'rgba(10,124,110,0.18)' : 'rgba(255,255,255,0.04)',
                    color: active ? '#0A7C6E' : 'rgba(255,255,255,0.55)',
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {f.label}
                </button>
              )
            })}
          </div>
          <input
            type="search"
            placeholder="Search partners…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: '9px 16px',
              borderRadius: 999,
              border: '1px solid rgba(255,255,255,0.12)',
              background: 'rgba(255,255,255,0.05)',
              color: '#fff',
              fontSize: 13,
              minWidth: 200,
              outline: 'none',
            }}
          />
        </div>

        {/* Value chain banner */}
        <div
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 16,
            padding: '20px 24px',
            marginBottom: 40,
            overflowX: 'auto',
          }}
        >
          <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.35)', marginBottom: 14 }}>
            Sukutera value chain
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 640, flexWrap: 'nowrap' }}>
            {VALUE_CHAIN.map((step, i) => (
              <div key={step.label} style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                <div
                  style={{
                    padding: '10px 14px',
                    borderRadius: 10,
                    background: `${step.color}12`,
                    border: `1px solid ${step.color}30`,
                    minWidth: 110,
                  }}
                >
                  <div style={{ fontSize: 13, fontWeight: 700, color: step.color }}>{step.label}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 3 }}>{step.sub}</div>
                </div>
                {i < VALUE_CHAIN.length - 1 && (
                  <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 18 }}>→</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Category sections */}
        {!hasResults && (
          <div
            style={{
              textAlign: 'center',
              padding: '48px 24px',
              color: 'rgba(255,255,255,0.4)',
              fontSize: 14,
            }}
          >
            No partners match &ldquo;{search}&rdquo;. Try a different search or filter.
          </div>
        )}

        {visibleCategories.map((category) => {
          const items = filteredStakeholders.filter((s) => s.category === category.id && !s.featured)
          if (!items.length) return null
          return (
            <section key={category.id} id={`category-${category.id}`} style={{ marginBottom: 44 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  marginBottom: 18,
                  paddingBottom: 12,
                  borderBottom: `1px solid ${category.color}25`,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 18,
                    background: `${category.color}15`,
                    border: `1px solid ${category.color}30`,
                  }}
                >
                  {category.icon}
                </div>
                <div>
                  <h2 style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 2 }}>
                    {category.label}
                  </h2>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', margin: 0 }}>
                    {category.roleLabel}
                  </p>
                </div>
                <div
                  style={{
                    marginLeft: 'auto',
                    fontSize: 11,
                    fontWeight: 700,
                    padding: '4px 10px',
                    borderRadius: 999,
                    background: `${category.color}15`,
                    color: category.color,
                    border: `1px solid ${category.color}30`,
                  }}
                >
                  {items.length} partner{items.length !== 1 ? 's' : ''}
                </div>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                  gap: 16,
                }}
              >
                {items.map((stakeholder) => (
                  <StakeholderCard
                    key={stakeholder.id}
                    stakeholder={stakeholder}
                    categoryColor={category.color}
                  />
                ))}
              </div>
            </section>
          )
        })}

        {/* Cross-links */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 12,
            justifyContent: 'center',
            marginBottom: 20,
          }}
        >
          <Link
            to="/log"
            style={{
              padding: '10px 20px',
              borderRadius: 10,
              background: 'linear-gradient(135deg, #0A7C6E, #0d9e8e)',
              color: '#fff',
              fontSize: 13,
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            + Log a Collection
          </Link>
          <Link
            to="/impact"
            style={{
              padding: '10px 20px',
              borderRadius: 10,
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: 'rgba(255,255,255,0.75)',
              fontSize: 13,
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            View Impact Dashboard →
          </Link>
        </div>

        {/* Footer note */}
        <div
          style={{
            padding: '16px 20px',
            borderRadius: 12,
            background: 'rgba(10,124,110,0.08)',
            border: '1px solid rgba(10,124,110,0.2)',
            fontSize: 13,
            color: 'rgba(255,255,255,0.6)',
            lineHeight: 1.65,
            textAlign: 'center',
          }}
        >
          Sukutera connects community collectors at Lake Kivu to verified off-takers — making every kilogram traceable, incentivised, and fundable.
        </div>
      </div>
    </div>
  )
}

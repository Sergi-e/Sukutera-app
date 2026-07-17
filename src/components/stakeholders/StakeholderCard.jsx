import { useState } from 'react'
import { FIELD_IMAGE_FALLBACKS } from '../../lib/images'

export default function StakeholderCard({ stakeholder, categoryColor, coverImage, coverImageKey }) {
  const { name, initials, location, district, description, role, contact, featured, accepts } = stakeholder
  const [contactNote, setContactNote] = useState(false)
  const [coverUrl, setCoverUrl] = useState(coverImage)
  const [coverLoaded, setCoverLoaded] = useState(false)

  function handleContact() {
    setContactNote(true)
    setTimeout(() => setContactNote(false), 2800)
  }

  return (
    <article
      style={{
        background: featured ? 'rgba(10,124,110,0.06)' : 'rgba(255,255,255,0.04)',
        border: `1px solid ${featured ? `${categoryColor}35` : 'rgba(255,255,255,0.08)'}`,
        borderLeft: `4px solid ${categoryColor}`,
        borderRadius: 14,
        padding: coverImage ? '0' : '18px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: coverImage ? 0 : 14,
        transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
        boxShadow: featured ? `0 0 24px ${categoryColor}12` : `0 0 0 0 ${categoryColor}00`,
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px)'
        e.currentTarget.style.boxShadow = `0 12px 32px rgba(0,0,0,0.25), 0 0 0 1px ${categoryColor}30`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = featured ? `0 0 24px ${categoryColor}12` : `0 0 0 0 ${categoryColor}00`
      }}
    >
      {coverImage && (
        <div className="stakeholder-card-cover">
          {/* TODO: Replace with actual field photo from /public/images/waste-house.jpg */}
          <img
            src={coverUrl}
            alt={`${name} field site`}
            loading="lazy"
            className={`stakeholder-card-cover__img ${coverLoaded ? 'field-photo--loaded' : ''}`}
            onLoad={() => setCoverLoaded(true)}
            onError={() => {
              if (coverImageKey && FIELD_IMAGE_FALLBACKS[coverImageKey]) {
                setCoverUrl(FIELD_IMAGE_FALLBACKS[coverImageKey])
              }
            }}
          />
          <div className="stakeholder-card-cover__overlay" />
        </div>
      )}

      <div style={{ padding: coverImage ? '18px 20px' : 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
      {featured && (
        <div
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            fontSize: 10,
            fontWeight: 700,
            padding: '3px 9px',
            borderRadius: 999,
            background: `${categoryColor}20`,
            color: categoryColor,
            border: `1px solid ${categoryColor}40`,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}
        >
          Pilot Partner
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 14,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
            fontWeight: 800,
            color: '#fff',
            background: `linear-gradient(135deg, ${categoryColor}55, ${categoryColor}22)`,
            border: `2px solid ${categoryColor}55`,
          }}
        >
          {initials}
        </div>
        <div style={{ flex: 1, minWidth: 0, paddingRight: featured ? 72 : 0 }}>
          <h3 style={{ fontSize: 16, fontWeight: 800, color: '#fff', marginBottom: 4, lineHeight: 1.2 }}>
            {name}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>📍 {location}</span>
            <span
              style={{
                fontSize: 10,
                fontWeight: 600,
                padding: '2px 8px',
                borderRadius: 999,
                background: `${categoryColor}18`,
                color: categoryColor,
                border: `1px solid ${categoryColor}30`,
              }}
            >
              {district}
            </span>
          </div>
        </div>
      </div>

      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, margin: 0 }}>
        {description}
      </p>

      {accepts?.length > 0 && accepts[0] !== 'organic' && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {accepts.map((type) => (
            <span
              key={type}
              style={{
                fontSize: 10,
                fontWeight: 700,
                padding: '3px 9px',
                borderRadius: 999,
                background: 'rgba(59,130,246,0.12)',
                color: '#60A5FA',
                border: '1px solid rgba(59,130,246,0.25)',
              }}
            >
              Accepts {type}
            </span>
          ))}
        </div>
      )}

      {accepts?.includes('organic') && (
        <span
          style={{
            alignSelf: 'flex-start',
            fontSize: 10,
            fontWeight: 700,
            padding: '3px 9px',
            borderRadius: 999,
            background: 'rgba(16,185,129,0.12)',
            color: '#10B981',
            border: '1px solid rgba(16,185,129,0.25)',
          }}
        >
          Organic waste
        </span>
      )}

      <div
        style={{
          padding: '10px 12px',
          borderRadius: 10,
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.35)', marginBottom: 4 }}>
          Role in value chain
        </div>
        <div style={{ fontSize: 13, fontWeight: 600, color: categoryColor }}>{role}</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
        <button
          type="button"
          onClick={handleContact}
          style={{
            padding: '8px 18px',
            borderRadius: 10,
            border: `1px solid ${categoryColor}50`,
            background: `${categoryColor}15`,
            color: '#fff',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'background 0.15s ease, border-color 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = `${categoryColor}28`
            e.currentTarget.style.borderColor = `${categoryColor}70`
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = `${categoryColor}15`
            e.currentTarget.style.borderColor = `${categoryColor}50`
          }}
        >
          Contact
        </button>
        {contactNote && (
          <div
            style={{
              fontSize: 12,
              color: 'rgba(255,255,255,0.65)',
              padding: '8px 12px',
              borderRadius: 8,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              lineHeight: 1.5,
            }}
          >
            📞 {contact}
          </div>
        )}
      </div>
      </div>
    </article>
  )
}

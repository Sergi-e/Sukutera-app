import AnimateInView from '../ui/AnimateInView'
import FieldPhoto from '../ui/FieldPhoto'
import { FIELD_IMAGES, FIELD_CAPTION } from '../../lib/images'

const GRID = [
  { key: 'researcher', src: FIELD_IMAGES.researcher, alt: 'Researcher documenting conditions at Lake Kivu' },
  { key: 'collector', src: FIELD_IMAGES.collector, alt: 'Waste collector working at the Lake Kivu shoreline' },
  { key: 'plasticBag', src: FIELD_IMAGES.plasticBag, alt: 'Bag of collected plastic bottles from the shore' },
]

export default function FieldResearchGallery() {
  return (
    <section className="field-research-section">
      <div className="field-research-section__inner">
        <AnimateInView variant="fade-left">
          <div className="field-research-section__header">
            <div className="eyebrow-label field-research-section__eyebrow" style={{ justifyContent: 'center', borderLeft: 'none', borderBottom: '1px solid var(--color-kivu)', paddingLeft: 0, paddingBottom: 8, marginBottom: 16, display: 'inline-flex' }}>Field Research</div>
            <h2 className="heading-section field-research-section__title">On the Ground at Lake Kivu</h2>
            <p className="field-research-section__sub">
              Real documentation from Rubavu — where community collectors, researchers, and conservation partners meet the shoreline every day.
            </p>
          </div>
        </AnimateInView>

        <div className="field-research-grid">
          {GRID.map(({ key, src, alt }, i) => (
            <AnimateInView key={key} variant="fade-up" delay={i * 100}>
              <FieldPhoto
                src={src}
                fallbackKey={key}
                alt={alt}
                lazy
                hoverZoom
                caption={FIELD_CAPTION}
                className="field-research-grid__item"
              />
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  )
}

import { PROBLEM } from '@/lib/content'
import { IconEye, IconHeart, IconWifi, IconDoc } from './Icons'
import { JSX } from 'react'

const iconMap: Record<string, JSX.Element> = {
  '01': <IconEye />,
  '02': <IconHeart />,
  '03': <IconWifi />,
  '04': <IconDoc />,
}

export default function ProblemSection() {
  return (
    <section className="section-pad" id="problema">
      <div className="container">
        <div className="reveal">
          <div className="section-tag">{PROBLEM.tag}</div>
          <h2>{PROBLEM.title}</h2>
        </div>

        <div className="problem-grid reveal">
          {PROBLEM.items.map((item) => (
            <div key={item.n} className="problem-card" data-n={item.n}>
              <div className="problem-icon">{iconMap[item.n]}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

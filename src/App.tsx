import { useMemo, useRef, useState, useCallback, type KeyboardEvent } from 'react'
import './App.css'

type NotableProject = {
  name: string
  client: string
  summary: string
  impact: string
}

type TeamMember = {
  name: string
  title: string
  funFact: string
  mission: string
  responsibilities: string[]
  skills: string[]
  yearsExperience: number
  industries: string[]
  certifications?: string[]
  notableProjects: NotableProject[]
}

const members: TeamMember[] = [
    {
        name: 'Đào Hữu Toàn',
        title: 'Senior Backend Engineer',
        funFact: 'Enjoys brewing cold brew coffee and optimizing code like fine-tuning flavor.',
        mission:
            'Design and build cloud-native backend systems on AWS that are scalable, reliable, and secure.',
        responsibilities: [
            'Design microservices and event-driven architectures',
            'Develop high-performance APIs with OAuth/JWT security',
            'Build Infrastructure as Code with Terraform/CloudFormation',
            'Optimize database performance and real-time processing pipelines',
        ],
        skills: [
            'Java',
            'Kotlin',
            'Go',
            'Python',
            'Spring Boot',
            'Micronaut',
            'AWS (EC2/S3/RDS/DynamoDB/Lambda/EKS/API Gateway)',
            'Kafka',
            'PostgreSQL/MySQL/MongoDB/Redis',
            'Docker/Kubernetes',
            'Terraform/CloudFormation',
            'Jenkins/GitLab CI',
        ],
        yearsExperience: 8,
        industries: ['Banking', 'FinTech', 'Cloud'],
        certifications: ['AWS Solutions Architect Associate ', 'CKA '],
        notableProjects: [
            {
                name: 'Real-time Fraud Detection System',
                client: 'Digital Bank',
                summary: 'Kafka Streams + AWS Lambda for real-time transaction processing with DynamoDB and Redis cache.',
                impact: 'Processed millions of transactions/day; reduced latency by 40%; instant fraud blocking.',
            },
            {
                name: 'Core Banking Microservices',
                client: 'Techcombank',
                summary: 'Deployed Spring Boot on AWS EKS; standardized CI/CD with GitLab CI and Terraform IaC.',
                impact: 'Release frequency +60%; 99.95% uptime.',
            },
        ],
    },
    {
        name: 'Nguyễn Minh Thành',
        title: 'Senior Backend Engineer',
        funFact: 'Runs 10km every morning; loves tuning latency like pacing a run.',
        mission:
            'Build high-performance distributed services on GCP with elastic scalability.',
        responsibilities: [
            'Design and develop microservices with Go/Python',
            'Build real-time data pipelines with Pub/Sub & BigQuery',
            'Operate containerized workloads on GKE with automated CI/CD',
        ],
        skills: [
            'Golang',
            'Python',
            'Node.js',
            'Gin/Echo',
            'Django/Express',
            'GCP (GKE/Cloud Run/Cloud Functions/PubSub/BigQuery/Cloud SQL/Firestore)',
            'PostgreSQL/MySQL/Redis',
            'Docker/Kubernetes',
            'Jenkins/Git/gcloud CLI',
        ],
        yearsExperience: 7,
        industries: ['Payments', 'eCommerce', 'Cloud'],
        certifications: ['GCP Professional Cloud Developer '],
        notableProjects: [
            {
                name: 'Scalable Notification Service',
                client: 'ZaloPay',
                summary: 'Go API with Pub/Sub and Cloud Functions sending millions of push notifications daily.',
                impact: 'p95 latency < 300ms; elastic autoscaling.',
            },
            {
                name: 'Order Management System',
                client: 'Tiki',
                summary: 'Split monolith into microservices; PostgreSQL + Redis caching.',
                impact: '2x throughput; improved stability during flash sales.',
            },
        ],
    },
    {
        name: 'Mai Anh Dũng',
        title: 'Senior Frontend Engineer',
        funFact: 'Enjoys street photography and keeping CLS under 0.05.',
        mission:
            'Build fast, beautiful, accessible, and SEO-friendly UIs with React/Vue.',
        responsibilities: [
            'Translate UI/UX into responsive components',
            'Optimize performance (code-splitting, lazy loading, images)',
            'Ensure Accessibility (WCAG) and SEO (SSR, JSON-LD)',
            'Build a shared component library (Storybook)',
        ],
        skills: [
            'JavaScript/TypeScript',
            'React/Next.js',
            'Vue.js/Nuxt.js',
            'Redux/Vuex',
            'HTML5/CSS3/SASS',
            'Webpack/Babel/ESLint',
            'Storybook',
            'Figma',
            'SEO (SSR/Structured Data/Core Web Vitals)',
            'Jest/RTL/Cypress',
        ],
        yearsExperience: 7,
        industries: ['eCommerce', 'Media'],
        certifications: ['Google Mobile Web Specialist '],
        notableProjects: [
            {
                name: 'E-commerce PWA',
                client: 'Fashion Retailer',
                summary: 'Vue + Nuxt PWA with offline, push notifications, mobile-first & SEO.',
                impact: 'Increased organic traffic by 35%; improved mobile conversion.',
            },
            {
                name: 'Next.js Product Page',
                client: 'Shopee',
                summary: 'SSR + JSON-LD + lazy images; optimized LCP and TTFB.',
                impact: 'Reduced p75 LCP from 3.2s to ~1.8s; significant conversion lift.',
            },
        ],
    },
    {
        name: 'Nguyễn Văn Thắng',
        title: 'Senior Frontend Engineer',
        funFact: 'Enjoys trekking and designing scalable UI systems.',
        mission:
            'Develop enterprise-grade SPAs with Angular/React, focusing on performance and SEO.',
        responsibilities: [
            'Architect frontend with Angular + NgRx',
            'Set up Jest/Cypress test strategy and CI',
            'Implement advanced SEO (dynamic rendering, sitemap, schema)',
        ],
        skills: [
            'TypeScript/JavaScript',
            'Angular',
            'React',
            'NgRx/RxJS/Redux',
            'SCSS',
            'Jest/Cypress/Jasmine/Karma',
            'Angular CLI/Webpack',
        ],
        yearsExperience: 6,
        industries: ['Loyalty', 'Real Estate', 'eCommerce'],
        certifications: ['AWS Cloud Practitioner '],
        notableProjects: [
            {
                name: 'Real Estate Portal',
                client: 'Portal Listing',
                summary: 'Angular with advanced filters, interactive map, SEO focused.',
                impact: 'Ranked top 3 for main keywords, increased organic traffic by 50%.',
            },
            {
                name: 'VinID Loyalty Frontend',
                client: 'VinID',
                summary: 'Angular + NgRx, optimized Core Web Vitals and CI testing.',
                impact: '+50% test coverage, improved UX and performance.',
            },
        ],
    },
    {
        name: 'Vũ Văn Long',
        title: 'Senior DevOps Engineer',
        funFact: 'Collects airplane models and automates everything possible.',
        mission:
            'Build CI/CD pipelines, IaC infrastructure, and proactive monitoring for fast, safe, and reliable releases.',
        responsibilities: [
            'Design & operate CI/CD with Jenkins/GitLab CI',
            'Manage AWS infrastructure with Terraform/Ansible',
            'Set up monitoring & alerting with Prometheus/Grafana',
            'Cloud security: IAM, vulnerability scanning, guardrails',
        ],
        skills: [
            'AWS (EC2/S3/RDS/EKS/VPC/IAM/CloudWatch)',
            'Azure (VMs/AKS)',
            'Jenkins/GitLab CI/CircleCI',
            'Docker/Kubernetes/Helm',
            'Terraform/Ansible/CloudFormation',
            'Prometheus/Grafana/ELK/Datadog',
            'Linux (Ubuntu/CentOS)',
            'PostgreSQL/MySQL/Redis',
            'Bash/Python',
        ],
        yearsExperience: 7,
        industries: ['FinTech', 'SaaS', 'Cloud'],
        certifications: ['HashiCorp Terraform Associate ', 'AWS SysOps '],
        notableProjects: [
            {
                name: 'Kubernetes Platform Migration',
                client: 'Momo',
                summary: 'Migrated >50 services from EC2 to multi-tenant EKS, standardized deployments with Helm.',
                impact: 'Optimized resources, scalable expansion, stable releases.',
            },
            {
                name: 'Centralized Monitoring & Alerting',
                client: 'FinTech',
                summary: 'Prometheus + Grafana + Alertmanager with SLO/SLA and burn-rate alerting.',
                impact: 'Reduced downtime by 25%, significantly improved MTTR.',
            },
        ],
    },
]

function App() {
  const outcomes = [
    { label: 'Release Velocity', value: '35% faster', note: 'cycle time reduced via CI/CD & trunk-based dev' },
    { label: 'Uptime', value: '99.95%', note: 'SLO-backed with proactive alerts' },
    { label: 'Performance', value: 'p75 LCP 1.9s', note: 'optimized FE + API caching' },
    { label: 'Quality', value: '-38% defects', note: 'tests + reviews + monitoring' },
  ]

  const tabs = [
    'Overview',
    'Team',
    'Process',
    'Case Studies',
    'Governance',
    'FAQs',
    'Contact',
  ] as const

  type Tab = typeof tabs[number]

  const [active, setActive] = useState<Tab>('Overview')
  const tablistRef = useRef<HTMLDivElement | null>(null)

  const allCaseStudies = useMemo(() => {
    return members.flatMap((m) =>
      m.notableProjects.map((p) => ({
        member: m.name,
        title: p.name,
        client: p.client,
        summary: p.summary,
        impact: p.impact,
      }))
    )
  }, [])

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      const idx = tabs.indexOf(active)
      if (e.key === 'ArrowRight') {
        const next = tabs[(idx + 1) % tabs.length]
        setActive(next)
        e.preventDefault()
      } else if (e.key === 'ArrowLeft') {
        const prev = tabs[(idx - 1 + tabs.length) % tabs.length]
        setActive(prev)
        e.preventDefault()
      } else if (e.key === 'Home') {
        setActive(tabs[0])
        e.preventDefault()
      } else if (e.key === 'End') {
        setActive(tabs[tabs.length - 1])
        e.preventDefault()
      }
    },
    [active]
  )

  return (
    <div className="tp-container">
      <header className="tp-header">
        <h1>Project Innovate — Expert Delivery Team</h1>
        <p className="tp-tagline">
          From vendor to partner: a proactive model focused on your outcomes
        </p>
      </header>

      <div
        className="tp-tabs"
        role="tablist"
        aria-label="Team profile sections"
        ref={tablistRef}
        onKeyDown={onKeyDown}
      >
        {tabs.map((t) => {
          const id = `tab-${t.replace(/\s+/g, '-').toLowerCase()}`
          const selected = active === t
          return (
            <button
              key={t}
              id={id}
              role="tab"
              aria-selected={selected}
              aria-controls={`${id}-panel`}
              tabIndex={selected ? 0 : -1}
              className={`tp-tab ${selected ? 'tp-tab--active' : ''}`}
              onClick={() => setActive(t)}
              type="button"
            >
              {t}
            </button>
          )
        })}
      </div>

      {active === 'Overview' && (
        <section className="tp-section" id="tab-overview-panel" role="tabpanel" aria-labelledby="tab-overview">
          <h2>Introduction</h2>
          <p>
            Welcome to your dedicated expert delivery team. Our mission is to architect, build,
            and deliver a scalable, secure, and user-centric platform that drives engagement and
            unlocks new revenue streams. This page introduces your team and how we will work
            together for predictable, transparent, and value-focused delivery.
          </p>
          <div className="tp-sub">
            <h3>Guiding Principles</h3>
            <ul className="tp-list">
              <li>
                Shared Vision & Objectives — We align with your success metrics so every feature
                serves measurable business value.
              </li>
              <li>
                Transparent Process & Communication — Agile, iterative delivery with full
                visibility and clear decision points.
              </li>
              <li>
                Continuous Feedback & Adaptation — Short feedback loops, demos, and data-driven
                adjustments to stay aligned.
              </li>
              <li>
                Quality, Security, Performance — Built-in via reviews, automated tests, secure
                coding, and performance-by-design.
              </li>
            </ul>
          </div>
          <div className="tp-sub">
            <h3>Outcomes & Proof</h3>
            <div className="tp-metrics-grid">
              {outcomes.map((o) => (
                <div key={o.label} className="tp-metric">
                  <div className="tp-metric-value">{o.value}</div>
                  <div className="tp-metric-label">{o.label}</div>
                  <div className="tp-metric-note">{o.note}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {active === 'Team' && (
        <section className="tp-section" id="tab-team-panel" role="tabpanel" aria-labelledby="tab-team">
          <h2>Meet Your Team</h2>
          <div className="tp-grid">
            {members.map((m) => (
              <article key={m.name} className="tp-card">
                <div className="tp-card-header">
                  <div className="tp-avatar" aria-hidden>
                    {m.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <h3 className="tp-name">{m.name}</h3>
                    <p className="tp-title">{m.title}</p>
                  </div>
                </div>

                <div className="tp-badges" aria-label="experience and domains">
                  <span className="tp-badge tp-badge--exp">{m.yearsExperience}+ yrs</span>
                  {m.industries.map((ind) => (
                    <span key={ind} className="tp-badge">{ind}</span>
                  ))}
                  {m.certifications?.map((c) => (
                    <span key={c} className="tp-badge tp-badge--cert">{c}</span>
                  ))}
                </div>

                <p className="tp-mission">{m.mission}</p>

                <div className="tp-sub">
                  <h4>Key Responsibilities</h4>
                  <ul>
                    {m.responsibilities.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>

                <div className="tp-sub">
                  <h4>Skills</h4>
                  <ul className="tp-skill-list">
                    {m.skills.map((s) => (
                      <li key={s} className="tp-skill">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="tp-sub">
                  <h4>Notable Projects</h4>
                  <ul className="tp-projects">
                    {m.notableProjects.map((p) => (
                      <li key={p.name} className="tp-project">
                        <strong>{p.name}</strong> — <em>{p.client}</em>
                        <div className="tp-project-summary">{p.summary}</div>
                        <div className="tp-project-impact">Impact: {p.impact}</div>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="tp-fun">Fun fact: {m.funFact}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {active === 'Process' && (
        <section className="tp-section" id="tab-process-panel" role="tabpanel" aria-labelledby="tab-process">
          <h2>Process & Communication</h2>
          <div className="tp-sub">
            <h3>Communication Cadence</h3>
            <ul className="tp-list">
              <li>Daily: Internal stand-up (sync progress, surface blockers)</li>
              <li>Weekly: Progress report (accomplishments, next steps, decisions)</li>
              <li>Bi-Weekly: Sprint review & live demo for feedback</li>
              <li>Real-time: Dedicated chat channel for rapid collaboration</li>
            </ul>
          </div>
          <div className="tp-sub">
            <h3>Our Agile Flow</h3>
            <ul className="tp-list">
              <li>Discovery & Definition — shared outcomes, risks, and constraints</li>
              <li>Plan — prioritized backlog, sprint goals, DOR/DOD</li>
              <li>Build — iterative development with trunk-based CI</li>
              <li>Demo & Learn — sprint review with actionable feedback</li>
              <li>Release & Measure — telemetry, SLOs, and continuous improvement</li>
            </ul>
          </div>
        </section>
      )}

      {active === 'Case Studies' && (
        <section className="tp-section" id="tab-case-studies-panel" role="tabpanel" aria-labelledby="tab-case-studies">
          <h2>Case Studies</h2>
          <div className="tp-grid">
            {allCaseStudies.map((c, i) => (
              <article key={`${c.title}-${i}`} className="tp-card">
                <h3 className="tp-name">{c.title}</h3>
                <p className="tp-title">{c.client} • by {c.member}</p>
                <p className="tp-project-summary">{c.summary}</p>
                <p className="tp-project-impact"><strong>Impact:</strong> {c.impact}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {active === 'Governance' && (
        <section className="tp-section" id="tab-governance-panel" role="tabpanel" aria-labelledby="tab-governance">
          <h2>Project Governance</h2>
          <p>
            We operate with clearly defined ownership and decision paths to avoid ambiguity. Sample
            RACI: API endpoints — Backend (R/A), Frontend (C/I), BA (C), DevOps (I); UI components —
            Frontend (R/A), Backend (C), BA (C), DevOps (I); Deployments — DevOps (R/A), Backend (C),
            Frontend (I), BA (I).
          </p>
        </section>
      )}

      {active === 'FAQs' && (
        <section className="tp-section" id="tab-faqs-panel" role="tabpanel" aria-labelledby="tab-faqs">
          <h2>FAQs</h2>
          <div className="tp-sub">
            <h4>How do you ensure predictable delivery?</h4>
            <p>Two-week sprints, trunk-based development, and automated CI checks provide a reliable cadence and early feedback.</p>
          </div>
          <div className="tp-sub">
            <h4>What about security?</h4>
            <p>DevSecOps from day one: secret scanning, dependency audits, SAST, and infrastructure guardrails in CI/CD.</p>
          </div>
          <div className="tp-sub">
            <h4>How do we start?</h4>
            <p>We run a short discovery to align on KPIs and risks, then begin Sprint 0 to establish environments and baselines.</p>
          </div>
        </section>
      )}

      {active === 'Contact' && (
        <section className="tp-section tp-cta" id="tab-contact-panel" role="tabpanel" aria-labelledby="tab-contact">
          <h2>Ready to tailor this to your goals?</h2>
          <p>We’ll align to your KPIs and deliver fast feedback. Let’s discuss your roadmap.</p>
          <button type="button" className="tp-button" aria-label="Schedule a discovery call">
            Schedule a discovery call
          </button>
        </section>
      )}

      <footer className="tp-footer">
        <small> TDMT• Team Profile</small>
      </footer>
    </div>
  )
}

export default App

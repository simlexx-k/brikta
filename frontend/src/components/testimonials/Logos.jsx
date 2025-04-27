import { motion } from 'framer-motion'

const LOGOS = [
  'CompanyA', 'CompanyB', 'CompanyC', 'CompanyD', 'CompanyE',
  'CompanyF', 'CompanyG', 'CompanyH', 'CompanyI', 'CompanyJ'
]

export function InfiniteMovingLogos() {
  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex"
        animate={{ x: ['0%', '-100%'] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        {[...LOGOS, ...LOGOS].map((logo, i) => (
          <div key={i} className="flex-shrink-0 px-8 opacity-50 hover:opacity-100 transition-opacity">
            <div className="h-12 w-32 bg-muted/10 rounded-lg flex items-center justify-center">
              {logo}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
} 
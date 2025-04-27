import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { 
  FiCloud, FiDatabase, FiCpu, FiShield, FiCode,
  FiUploadCloud, FiActivity, FiLock, FiServer
} from 'react-icons/fi'
import { Globe } from '@/components/hero/Globe'
import { InfiniteMovingLogos } from '@/components/testimonials/Logos'
import { cn } from "@/lib/utils"

const GRADIENT_OVERLAY = `linear-gradient(
  to bottom right,
  hsl(var(--primary)/0.2) 0%,
  hsl(var(--background)/0) 50%,
  hsl(var(--primary)/0.1) 100%
)`

export function WelcomePage() {
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2])

  const features = [
    {
      title: "Unified Data Platform",
      icon: <FiDatabase className="h-8 w-8 text-primary" />,
      description: "Seamlessly manage structured, semi-structured, and unstructured data across clouds"
    },
    {
      title: "AI-Powered Insights",
      icon: <FiCpu className="h-8 w-8 text-primary" />,
      description: "Built-in machine learning and natural language processing capabilities"
    },
    {
      title: "Enterprise Security",
      icon: <FiShield className="h-8 w-8 text-primary" />,
      description: "End-to-end encryption, RBAC, and compliance certifications"
    }
  ]

  const techStack = [
    { name: "Apache Kafka", role: "Stream Ingestion" },
    { name: "TensorFlow", role: "ML Models" },
    { name: "Kubernetes", role: "Orchestration" },
    { name: "Snowflake", role: "Data Warehousing" }
  ]

  return (
    <div className="min-h-screen [perspective:1000px] overflow-x-hidden">
      {/* Parallax Background */}
      <motion.div 
        style={{ scale }}
        className="fixed inset-0 bg-grid-primary/[0.05]"
      >
        <div 
          className="absolute inset-0"
          style={{ background: GRADIENT_OVERLAY }}
        />
      </motion.div>

      {/* Hero Section */}
      <section className="relative h-[100vh] flex items-center justify-center">
        <div className="container px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8">
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                BRIKTA
              </span>{' '}
              <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Data Cloud
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-4xl mx-auto mb-12">
              The Data Cloud that powers the world's most critical 
              <span className="text-primary px-2">AI</span> and 
              <span className="text-primary px-2">Analytics</span> workloads
            </p>

            <div className="flex justify-center gap-4">
              <Button size="xl" className="text-lg h-14 px-8">
                Start Free Trial
              </Button>
              <Button 
                variant="outline" 
                size="xl" 
                className="text-lg h-14 px-8 border-2"
              >
                Watch Demo
              </Button>
            </div>
          </motion.div>

          {/* Interactive Globe */}
          <div className="mt-32 w-full max-w-6xl mx-auto h-[400px]">
            <Globe />
          </div>
        </div>
      </section>

      {/* Enterprise Logos */}
      <section className="py-20 bg-background/80 backdrop-blur-lg">
        <div className="container px-4">
          <h3 className="text-muted-foreground text-center mb-12 text-lg">
            Trusted by industry leaders
          </h3>
          <InfiniteMovingLogos />
        </div>
      </section>

      {/* Core Features */}
      <section className="py-32">
        <div className="container px-4">
          <h2 className="text-4xl font-bold text-center mb-20">
            Enterprise Data Cloud Platform
          </h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className={cn(
                  "group relative bg-background border rounded-3xl p-8",
                  "hover:shadow-xl transition-shadow duration-300"
                )}
              >
                <div className="absolute inset-0 rounded-3xl bg-primary/5" />
                <div className="relative">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl mb-6 flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-b from-background to-primary/5">
        <div className="container px-4 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="bg-background border rounded-3xl p-12 shadow-2xl"
          >
            <h2 className="text-4xl font-bold mb-8">
              Ready to Transform Your Data Strategy?
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Join thousands of enterprises already leveraging the BRIKTA Data Cloud
            </p>
            <div className="flex justify-center gap-4">
              <Button size="xl" className="text-lg h-14 px-8">
                Get Started
              </Button>
              <Button 
                variant="outline" 
                size="xl" 
                className="text-lg h-14 px-8 border-2"
              >
                Contact Sales
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export const DashboardPage = () => {
  const { data: files, isLoading, isError } = useQuery({
    queryKey: ['files'],
    queryFn: fetchFiles,
    refetchInterval: 5000
  })

  return (
    <div className="App max-w-4xl mx-auto p-6">
      {/* ... existing file management content ... */}
    </div>
  )
}

const fetchFiles = async () => {
  const { data } = await axios.get('/api/files')
  return data
} 
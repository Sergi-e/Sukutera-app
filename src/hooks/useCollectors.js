import { useState, useEffect } from 'react'
import { supabase, TABLES } from '../lib/supabase'
import { SEED_COLLECTORS } from '../lib/constants'

export function useCollectors() {
  const [collectors, setCollectors] = useState(SEED_COLLECTORS)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    async function fetchCollectors() {
      setLoading(true)
      try {
        const { data, error: err } = await supabase
          .from(TABLES.COLLECTORS)
          .select('*')
          .order('total_points', { ascending: false })

        if (err) throw err
        if (isMounted && data?.length > 0) setCollectors(data)
      } catch (err) {
        if (isMounted) setError(err.message)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchCollectors()

    const channel = supabase
      .channel('collectors-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: TABLES.COLLECTORS }, () => {
        fetchCollectors()
      })
      .subscribe()

    return () => {
      isMounted = false
      supabase.removeChannel(channel)
    }
  }, [])

  return { collectors, loading, error }
}

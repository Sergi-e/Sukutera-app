import { useState, useEffect } from 'react'
import { supabase, TABLES } from '../lib/supabase'
import { SEED_COLLECTIONS } from '../lib/constants'

export function useCollections() {
  const [collections, setCollections] = useState(SEED_COLLECTIONS)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    async function fetchCollections() {
      if (!supabase) return

      setLoading(true)
      try {
        const { data, error: err } = await supabase
          .from(TABLES.COLLECTIONS)
          .select('*')
          .order('created_at', { ascending: false })

        if (err) throw err
        if (isMounted && data?.length > 0) setCollections(data)
      } catch (err) {
        if (isMounted) setError(err.message)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    if (!supabase) return

    fetchCollections()

    const channel = supabase
      .channel('collections-changes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: TABLES.COLLECTIONS }, (payload) => {
        if (isMounted) setCollections((prev) => [payload.new, ...prev])
      })
      .subscribe()

    return () => {
      isMounted = false
      supabase.removeChannel(channel)
    }
  }, [])

  return { collections, loading, error }
}

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import URLTable from '../components/URLTable'

interface URLItem {
  id: number
  address: string
  title: string
  html_version: string
  internal_links: number
  external_links: number
  broken_links: number
  status: string
}

function Dashboard() {
  const [urls, setUrls] = useState<URLItem[]>([])
  const [newUrl, setNewUrl] = useState('')

  const fetchUrls = async () => {
    try {
      const res = await axios.get<URLItem[]>('/api/urls', { headers: { Authorization: 'secret-token' } })
      setUrls(res.data)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    fetchUrls()
  }, [])

  const addUrl = async () => {
    if (!newUrl) return
    await axios.post('/api/urls', { address: newUrl }, { headers: { Authorization: 'secret-token' } })
    setNewUrl('')
    fetchUrls()
  }

  return (
    <div>
      <div>
        <input value={newUrl} onChange={e => setNewUrl(e.target.value)} placeholder="Enter URL" />
        <button onClick={addUrl}>Add</button>
        <button onClick={fetchUrls}>Refresh</button>
      </div>
      <URLTable items={urls} />
    </div>
  )
}

export default Dashboard

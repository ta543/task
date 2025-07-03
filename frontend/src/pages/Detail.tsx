import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

interface URLItem {
  id: number
  address: string
  title: string
  html_version: string
  internal_links: number
  external_links: number
  broken_links: number
  status: string
  h1_count: number
  h2_count: number
  h3_count: number
  has_login_form: boolean
}

function Detail() {
  const { id } = useParams()
  const [data, setData] = useState<URLItem | null>(null)

  useEffect(() => {
    axios
      .get<URLItem>(`/api/urls/${id}`, { headers: { Authorization: 'secret-token' } })
      .then(res => setData(res.data))
      .catch(err => console.error(err))
  }, [id])

  if (!data) return <div>Loading...</div>
  return (
    <div>
      <h2>{data.title}</h2>
      <p>URL: {data.address}</p>
      <p>HTML Version: {data.html_version}</p>
      <p>H1: {data.h1_count}, H2: {data.h2_count}, H3: {data.h3_count}</p>
      <p>Internal Links: {data.internal_links}</p>
      <p>External Links: {data.external_links}</p>
      <p>Broken Links: {data.broken_links}</p>
      <p>Login Form: {data.has_login_form ? 'Yes' : 'No'}</p>
      <p>Status: {data.status}</p>
    </div>
  )
}

export default Detail

import React from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
  items: Array<{
    id: number
    address: string
    title: string
    html_version: string
    internal_links: number
    external_links: number
    broken_links: number
    status: string
  }>
}

function URLTable({ items }: Props) {
  const navigate = useNavigate()
  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>HTML</th>
          <th>Internal</th>
          <th>External</th>
          <th>Broken</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {items.map(it => (
          <tr key={it.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/detail/${it.id}`)}>
            <td>{it.title}</td>
            <td>{it.html_version}</td>
            <td>{it.internal_links}</td>
            <td>{it.external_links}</td>
            <td>{it.broken_links}</td>
            <td>{it.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default URLTable

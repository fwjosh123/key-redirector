import { useEffect, useState } from 'react'

export default function Home() {
  const [key, setKey] = useState(null)

  useEffect(() => {
    async function fetchKey() {
      const res = await fetch('/api/key')
      const data = await res.json()
      setKey(data.key)
    }
    fetchKey()

    const timeout = setTimeout(() => {
      window.location.href = 'https://discord.gg/RZ8qmCUZ'
    }, 60000)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1>Your Key</h1>
      <h2>{key || 'Loading...'}</h2>
      <button onClick={() => navigator.clipboard.writeText(key)}>
        Copy Key
      </button>
      <p>(do not refresh)</p>
    </div>
  )
}

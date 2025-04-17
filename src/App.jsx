import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [erpId, setErpId] = useState('')
  const [ean, setEan] = useState('')
  const [product, setProduct] = useState(null)
  const [tracked, setTracked] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchProduct = async () => {
    try {
      setLoading(true)
      const res = await axios.post('https://dealavo-backend.onrender.com/product', {
        erp_id: erpId,
        ean
      })
      setProduct(res.data)
    } catch (err) {
      alert('Nie znaleziono produktu')
    } finally {
      setLoading(false)
    }
  }

  const addToTracked = async () => {
    await axios.post('https://dealavo-backend.onrender.com/track', { ean })
    fetchTracked()
  }

  const fetchTracked = async () => {
    const res = await axios.get('https://dealavo-backend.onrender.com/tracked')
    setTracked(res.data)
  }

  useEffect(() => {
    fetchTracked()
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Monitor cen Dealavo</h1>

      <div className="flex gap-2 mb-4">
        <input value={erpId} onChange={e => setErpId(e.target.value)} placeholder="ERP ID" className="border p-2 flex-1" />
        <input value={ean} onChange={e => setEan(e.target.value)} placeholder="EAN" className="border p-2 flex-1" />
        <button onClick={fetchProduct} className="bg-blue-600 text-white px-4 py-2 rounded">Szukaj</button>
      </div>

      {loading && <p>Ładowanie...</p>}

      {product && (
        <div className="border p-4 rounded shadow mb-4">
          <h2 className="font-semibold">Produkt: {product.ean}</h2>
          <p>ERP ID: {product.erp_id}</p>
          <p>Twoja cena: {product.your_feed.price} zł (stan: {product.your_feed.stock})</p>
          <p>Najniższa cena (Dealavo): {product.dealavo.lowest_price} zł u {product.dealavo.seller}</p>
          <p>Różnica: {product.price_difference_percent}%</p>
          <button onClick={addToTracked} className="mt-2 bg-green-600 text-white px-3 py-1 rounded">Obserwuj</button>
        </div>
      )}

      <h2 className="text-xl font-bold mt-6 mb-2">Obserwowane produkty</h2>
      {tracked.map(p => (
        <div key={p.ean} className="border p-3 rounded mb-2">
          <strong>{p.ean}</strong> - Twoja cena: {p.your_feed.price} zł / Najniższa: {p.dealavo.lowest_price} zł / Różnica: {p.price_difference_percent}%
        </div>
      ))}
    </div>
  )
}

export default App

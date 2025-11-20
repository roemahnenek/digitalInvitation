import dbConnect from '../lib/dbConnect';
import Invitation from '../models/Invitation';
import { useState } from "react";

export async function getServerSideProps() {
  await dbConnect();

  const result = await Invitation.find({}, 'slug brideFullName groomFullName bride groom').sort({ createdAt: -1 }).lean();
  const items = JSON.parse(JSON.stringify(result));

  return { props: { items } };
}

export default function Admin({ items }) {
  const [selectedSlug, setSelectedSlug] = useState(null);
  const [guestList, setGuestList] = useState('');
  const [generatedLinks, setGeneratedLinks] = useState('');

  const generateLinks = () => {
    if (!selectedSlug || !guestList) return;
    const names = guestList.split('\n').filter(name => name.trim() !== '');
    const links = names.map(name => 
      `${window.location.origin}/${selectedSlug}?to=${encodeURIComponent(name.trim())}`
    ).join('\n');
    setGeneratedLinks(links);
  };

  const selectInvitation = (slug) => {
    setSelectedSlug(slug);
    setGuestList('');
    setGeneratedLinks('');
  }

  return (
    <div style={{ minHeight: '100vh', padding: '24px', backgroundColor: '#f9fafb' }}>
      <div style={{ maxWidth: '1024px', margin: '0 auto', backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px', color: '#111827' }}>
          Admin - Semua Undangan
        </h2>
        
        {items.length === 0 ? (
          <div style={{ padding: '32px', textAlign: 'center', color: '#6b7280' }}>
            <p style={{ fontSize: '16px', marginBottom: '8px' }}>Belum ada undangan</p>
            <p style={{ fontSize: '14px' }}>Jalankan: <code style={{ background: '#f3f4f6', padding: '2px 6px', borderRadius: '4px' }}>node scripts/seedWedding.js</code></p>
          </div>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {items.map((it) => {
              const brideName = it.brideFullName || it.bride || 'Bride';
              const groomName = it.groomFullName || it.groom || 'Groom';
              
              return (
                <li
                  key={it.slug}
                  style={{ 
                    border: '1px solid #e5e7eb', 
                    padding: '16px', 
                    borderRadius: '6px', 
                    marginBottom: '12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <span style={{ fontWeight: '700', fontSize: '16px', color: '#1f2937' }}>
                      {it.slug}
                    </span>
                    <span style={{ margin: '0 8px', color: '#6b7280' }}>—</span>
                    <span style={{ fontSize: '15px', color: '#374151' }}>
                      {brideName} & {groomName}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <a 
                      style={{ 
                        fontSize: '14px', 
                        color: '#2563eb', 
                        textDecoration: 'none',
                        padding: '6px 12px',
                        border: '1px solid #2563eb',
                        borderRadius: '4px'
                      }} 
                      href={`/${it.slug}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Open
                    </a>
                    <button 
                      onClick={() => selectInvitation(it.slug)}
                      style={{ 
                        fontSize: '14px', 
                        padding: '6px 12px', 
                        borderRadius: '4px',
                        border: 'none',
                        cursor: 'pointer',
                        backgroundColor: selectedSlug === it.slug ? '#16a34a' : '#e5e7eb',
                        color: selectedSlug === it.slug ? 'white' : '#374151',
                        fontWeight: '500'
                      }}
                    >
                      Generate Links
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {selectedSlug && (
          <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #e5e7eb' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
              Guest Link Generator for: <span style={{ color: '#16a34a' }}>{selectedSlug}</span>
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginTop: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                  Daftar Nama Tamu (satu nama per baris)
                </label>
                <textarea 
                  value={guestList} 
                  onChange={(e) => setGuestList(e.target.value)}
                  rows="10"
                  style={{ 
                    width: '100%', 
                    border: '2px solid #d1d5db', 
                    padding: '12px', 
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    lineHeight: '1.6',
                    color: '#111827',
                    backgroundColor: '#ffffff',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  placeholder="Nama Tamu 1&#10;Nama Tamu 2&#10;Nama Tamu 3"
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                  Generated Links (siap copy-paste)
                </label>
                <textarea 
                  value={generatedLinks} 
                  readOnly
                  rows="10"
                  style={{ 
                    width: '100%', 
                    border: '2px solid #d1d5db', 
                    padding: '12px', 
                    borderRadius: '6px',
                    backgroundColor: '#f9fafb',
                    fontSize: '13px',
                    fontFamily: 'ui-monospace, monospace',
                    lineHeight: '1.6',
                    color: '#1f2937',
                    outline: 'none'
                  }}
                  placeholder="Link akan muncul di sini..."
                />
              </div>
            </div>
            <button 
              onClick={generateLinks} 
              disabled={!guestList}
              style={{ 
                marginTop: '16px', 
                padding: '10px 20px', 
                backgroundColor: guestList ? '#16a34a' : '#9ca3af',
                color: 'white', 
                borderRadius: '6px',
                border: 'none',
                fontSize: '15px',
                fontWeight: '600',
                cursor: guestList ? 'pointer' : 'not-allowed'
              }}
            >
              Generate Links
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Create() {
  const [templates, setTemplates] = useState([]);
  const [form, setForm] = useState({
    // Basic Info
    brideFullName: "",
    groomFullName: "",
    brideNickname: "",
    groomNickname: "",
    
    // Event Info
    weddingDate: "",
    weddingDateDisplay: "",
    venueLocation: "",
    
    // Hero Section
    heroTitle: "Together with their families",
    heroSubtitle: "request the honour of your presence at the celebration of their marriage",
    
    // Couple Info
    brideBio: "",
    groomBio: "",
    coupleStory: "",
    
    // Location
    locationAddress: "",
    locationMapUrl: "",
    locationMapEmbed: "",
    
    // Other
    reminderMessage: "We can't wait to celebrate with you!",
    template_code: "",
  });
  
  const [heroBackgroundFile, setHeroBackgroundFile] = useState(null);
  const [groomPhotoFile, setGroomPhotoFile] = useState(null);
  const [bridePhotoFile, setBridePhotoFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  
  // Love Story & Events (dynamic arrays)
  const [loveStory, setLoveStory] = useState([]);
  const [loveStoryFiles, setLoveStoryFiles] = useState({}); // Stores files for each love story item
  const [events, setEvents] = useState([]);
  const [additionalInfo, setAdditionalInfo] = useState([]);
  
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch templates from database
  useEffect(() => {
    fetch('/api/templates')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setTemplates(data.templates);
        }
      })
      .catch(err => console.error('Error fetching templates:', err));
  }, []);

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddLoveStory = () => {
    setLoveStory([...loveStory, { title: "", date: "", description: "", imageUrl: "" }]);
  };

  const handleRemoveLoveStory = (index) => {
    const newLoveStory = loveStory.filter((_, i) => i !== index);
    setLoveStory(newLoveStory);
    const newLoveStoryFiles = { ...loveStoryFiles };
    delete newLoveStoryFiles[index]; // Remove corresponding file
    setLoveStoryFiles(newLoveStoryFiles);
  };

  const handleLoveStoryChange = (index, e) => {
    const { name, value } = e.target;
    const newLoveStory = loveStory.map((story, i) =>
      i === index ? { ...story, [name]: value } : story
    );
    setLoveStory(newLoveStory);
  };

  const handleLoveStoryFileChange = (index, e) => {
    const file = e.target.files[0];
    setLoveStoryFiles({ ...loveStoryFiles, [index]: file });
  };

  const handleAddEvent = () => {
    setEvents([...events, { type: "ceremony", mainTitle: "", subTitle: "", details: "", date: "", time: "" }]);
  };

  const handleRemoveEvent = (index) => {
    const newEvents = events.filter((_, i) => i !== index);
    setEvents(newEvents);
  };

  const handleEventChange = (index, e) => {
    const { name, value } = e.target;
    const newEvents = events.map((event, i) =>
      i === index ? { ...event, [name]: value } : event
    );
    setEvents(newEvents);
  };

  const handleGalleryFileChange = (e) => {
    setGalleryFiles([...galleryFiles, ...Array.from(e.target.files)]);
  };

  const handleRemoveGalleryFile = (index) => {
    const newGalleryFiles = galleryFiles.filter((_, i) => i !== index);
    setGalleryFiles(newGalleryFiles);
  };


  const uploadFile = async (file, fieldName) => {
    if (!file) return null;
    
    const formData = new FormData();
    formData.append(fieldName, file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`Failed to upload ${fieldName}`);
    }

    const data = await res.json();
    return data.url;
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Upload photos to Cloudinary first if provided
      let heroBackgroundUrl = '';
      let groomPhotoUrl = '';
      let bridePhotoUrl = '';

      // Upload hero background
      if (heroBackgroundFile) {
        setError("Uploading hero background...");
        heroBackgroundUrl = await uploadFile(heroBackgroundFile, 'hero_background');
      }

      // Upload groom photo
      if (groomPhotoFile) {
        setError("Uploading groom photo...");
        groomPhotoUrl = await uploadFile(groomPhotoFile, 'groom_photo');
      }

      // Upload bride photo
      if (bridePhotoFile) {
        setError("Uploading bride photo...");
        bridePhotoUrl = await uploadFile(bridePhotoFile, 'bride_photo');
      }

      setError("Creating invitation...");

      // Upload love story images
      const loveStoryWithUrls = await Promise.all(
        loveStory.map(async (story, index) => {
          let image = story.imageUrl;
          if (loveStoryFiles[index]) {
            setError(`Uploading love story image ${index + 1}...`);
            image = await uploadFile(loveStoryFiles[index], `love_story_${index}`);
          }
          return {
            year: story.date ? new Date(story.date).getFullYear().toString() : '',
            title: story.title,
            description: story.description,
            image: image,
          };
        })
      );
      
      // Upload gallery images
      const galleryUrls = await Promise.all(
        galleryFiles.map(async (file, index) => {
          setError(`Uploading gallery image ${index + 1}...`);
          const url = await uploadFile(file, `gallery_image_${index}`);
          return url ? { url, caption: `Gallery Image ${index + 1}` } : null; // Return object with url and caption
        })
      );

      // Prepare data to send as JSON
      const invitationData = {
        ...form,
        heroBackground: heroBackgroundUrl || undefined,
        bridePhoto: bridePhotoUrl || undefined,
        groomPhoto: groomPhotoUrl || undefined,
        loveStory: loveStoryWithUrls,
        events: events.map(event => {
          let icon = 'Clock'; // Default
          if (event.type === 'location') {
            icon = 'MapPin';
          }
          
          let formattedTime = event.subTitle;
          if (event.type !== 'location' && event.time && event.date) {
            const dateObj = new Date(event.date);
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            formattedTime = `${event.time}, ${dateObj.toLocaleDateString('en-US', options)}`;
          } else if (event.type !== 'location' && event.time) {
            formattedTime = event.time;
          } else if (event.type !== 'location' && event.date) {
            const dateObj = new Date(event.date);
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            formattedTime = dateObj.toLocaleDateString('en-US', options);
          }

          return {
            icon: icon,
            title: event.mainTitle,
            time: formattedTime,
            description: event.details,
          };
        }),
        additionalInfo,
        gallery: galleryUrls.filter(Boolean),
      };


      const res = await fetch("/api/invitations", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invitationData),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Something went wrong');
      }

      const data = await res.json();
      console.log('Server response after create:', data);
      setSlug(data.slug);
      setError(""); // Clear error on success
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: '100vh', padding: '24px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: 'white', padding: '32px', borderRadius: '12px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px', color: '#111827' }}>
            ✨ Buat Undangan Baru
          </h2>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>
            Isi form di bawah untuk membuat undangan pernikahan yang indah.<br/>
            Field dengan <span style={{ color: '#dc2626', fontWeight: '600' }}>*</span> wajib diisi.
          </p>
        </div>
        
        {error && (
          <div style={{ padding: '12px', backgroundColor: error.includes('Uploading') || error.includes('Creating') ? '#dbeafe' : '#fee2e2', color: error.includes('Uploading') || error.includes('Creating') ? '#1e40af' : '#991b1b', borderRadius: '6px', marginBottom: '16px' }}>
            {error}
          </div>
        )}
        
        {loading && (
          <div style={{ padding: '12px', backgroundColor: '#dbeafe', color: '#1e40af', borderRadius: '6px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '16px', height: '16px', border: '2px solid #1e40af', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            <span>Processing...</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Basic Info Section */}
          <div style={{ borderBottom: '2px solid #e5e7eb', paddingBottom: '16px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#374151' }}>
              Informasi Dasar
            </h3>
            <div style={{ display: 'grid', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '4px', color: '#374151' }}>
                    Nama Lengkap Pengantin Wanita *
                  </label>
                  <Input
                    name="brideFullName"
                    value={form.brideFullName}
                    onChange={handleFormChange}
                    required
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '4px', color: '#374151' }}>
                    Nama Panggilan (opsional)
                  </label>
                  <Input
                    name="brideNickname"
                    value={form.brideNickname}
                    onChange={handleFormChange}
                    placeholder="Jane"
                  />
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '4px', color: '#374151' }}>
                    Nama Lengkap Pengantin Pria *
                  </label>
                  <Input
                    name="groomFullName"
                    value={form.groomFullName}
                    onChange={handleFormChange}
                    required
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '4px', color: '#374151' }}>
                    Nama Panggilan (opsional)
                  </label>
                  <input
                    name="groomNickname"
                    value={form.groomNickname}
                    onChange={handleFormChange}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', color: '#111827' }}
                    placeholder="John"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '4px', color: '#374151' }}>
                    Tanggal Pernikahan *
                  </label>
                  <input
                    type="date"
                    name="weddingDate"
                    value={form.weddingDate}
                    onChange={handleFormChange}
                    required
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', color: '#111827', colorScheme: 'light' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '4px', color: '#374151' }}>
                    Tampilan Tanggal (readable)
                  </label>
                  <input
                    name="weddingDateDisplay"
                    value={form.weddingDateDisplay}
                    onChange={handleFormChange}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', color: '#111827' }}
                    placeholder="Saturday, August 15th, 2025"
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '4px', color: '#374151' }}>
                  Lokasi Venue *
                </label>
                <input
                  name="venueLocation"
                  value={form.venueLocation}
                  onChange={handleFormChange}
                  required
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', color: '#111827' }}
                  placeholder="Grand Ballroom, Riverside Hotel"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '4px', color: '#374151' }}>
                  Alamat Lengkap
                </label>
                <input
                  name="locationAddress"
                  value={form.locationAddress}
                  onChange={handleFormChange}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', color: '#111827' }}
                  placeholder="123 River Road, Jakarta"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '4px', color: '#374151' }}>
                  Link Google Maps (untuk tombol "Dapatkan Petunjuk Arah")
                </label>
                <input
                  name="locationMapUrl"
                  value={form.locationMapUrl}
                  onChange={handleFormChange}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', color: '#111827' }}
                  placeholder="https://maps.app.goo.gl/..."
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '4px', color: '#374151' }}>
                  Embed Code Google Maps (dari opsi "Sematkan Peta")
                </label>
                <textarea
                  name="locationMapEmbed"
                  value={form.locationMapEmbed}
                  onChange={handleFormChange}
                  rows="4"
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', fontFamily: 'system-ui', color: '#111827', backgroundColor: 'white' }}
                  placeholder="<iframe src='https://www.google.com/maps/embed?pb=...' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>"
                />
                <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                  Cari lokasi di Google Maps, klik "Bagikan", lalu "Sematkan Peta", copy iframe code-nya.
                </p>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '4px', color: '#374151' }}>
                  Pilih Template
                </label>
                <select
                  name="template_code"
                  value={form.template_code}
                  onChange={handleFormChange}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', color: '#111827', backgroundColor: 'white' }}
                >
                  <option value="">Pilih Template</option>
                  {templates.map((template) => (
                    <option key={template.slug} value={template.slug}>
                      {template.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Couple Story Section */}
          <div style={{ borderBottom: '2px solid #e5e7eb', paddingBottom: '16px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#374151' }}>
              Cerita Pasangan
            </h3>
            <div style={{ display: 'grid', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '4px', color: '#374151' }}>
                  Bio Pengantin Wanita
                </label>
                <textarea
                  name="brideBio"
                  value={form.brideBio}
                  onChange={handleFormChange}
                  rows="3"
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', fontFamily: 'system-ui', color: '#111827', backgroundColor: 'white' }}
                  placeholder="A passionate photographer and nature lover..."
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '4px', color: '#374151' }}>
                  Bio Pengantin Pria
                </label>
                <textarea
                  name="groomBio"
                  value={form.groomBio}
                  onChange={handleFormChange}
                  rows="3"
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', fontFamily: 'system-ui', color: '#111827', backgroundColor: 'white' }}
                  placeholder="An architect with a passion for design..."
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '4px', color: '#374151' }}>
                  Cerita Pertemuan
                </label>
                <textarea
                  name="coupleStory"
                  value={form.coupleStory}
                  onChange={handleFormChange}
                  rows="4"
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', fontFamily: 'system-ui', color: '#111827', backgroundColor: 'white' }}
                  placeholder="Jane and John met at a coffee shop..."
                />
              </div>
            </div>
          </div>

          {/* Love Story Timeline Section */}
          <div style={{ borderBottom: '2px solid #e5e7eb', paddingBottom: '16px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#374151' }}>
              Timeline Kisah Cinta (opsional)
            </h3>
            <button 
              type="button" 
              onClick={handleAddLoveStory}
              style={{
                backgroundColor: '#22c55e', color: 'white', padding: '8px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer', marginBottom: '16px'
              }}
            >
              + Tambah Love Story
            </button>
            {loveStory.map((story, index) => (
              <div key={index} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px', marginBottom: '16px', backgroundColor: '#f9fafb' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#374151' }}>Love Story #{index + 1}</h4>
                  <button 
                    type="button" 
                    onClick={() => handleRemoveLoveStory(index)}
                    style={{
                      backgroundColor: '#ef4444', color: 'white', padding: '6px 12px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontSize: '12px'
                    }}
                  >
                    Hapus
                  </button>
                </div>
                <div style={{ display: 'grid', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '4px', color: '#374151' }}>
                      Judul
                    </label>
                    <input
                      name="title"
                      value={story.title}
                      onChange={(e) => handleLoveStoryChange(index, e)}
                      style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', color: '#111827' }}
                      placeholder="Pertama Bertemu"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '4px', color: '#374151' }}>
                      Tanggal
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={story.date}
                      onChange={(e) => handleLoveStoryChange(index, e)}
                      style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', color: '#111827', colorScheme: 'light' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '4px', color: '#374151' }}>
                      Deskripsi
                    </label>
                    <textarea
                      name="description"
                      value={story.description}
                      onChange={(e) => handleLoveStoryChange(index, e)}
                      rows="3"
                      style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', fontFamily: 'system-ui', color: '#111827', backgroundColor: 'white' }}
                      placeholder="Kami pertama kali bertemu di sebuah kafe kecil..."
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '4px', color: '#374151' }}>
                      Gambar (opsional)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleLoveStoryFileChange(index, e)}
                      style={{ 
                        width: '100%', 
                        padding: '8px 12px', 
                        border: '1px solid #d1d5db', 
                        borderRadius: '6px', 
                        fontSize: '14px',
                        color: '#111827',
                        backgroundColor: 'white',
                        cursor: 'pointer'
                      }}
                    />
                    {story.imageUrl && (
                      <p style={{ fontSize: '12px', color: '#4b5563', marginTop: '8px' }}>
                        Gambar saat ini: <a href={story.imageUrl} target="_blank" rel="noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>Lihat</a>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Event Details Section */}
          <div style={{ borderBottom: '2px solid #e5e7eb', paddingBottom: '16px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#374151' }}>
              Detail Acara (opsional)
            </h3>
            <button 
              type="button" 
              onClick={handleAddEvent}
              style={{
                backgroundColor: '#22c55e', color: 'white', padding: '8px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer', marginBottom: '16px'
              }}
            >
              + Tambah Acara
            </button>
            {events.map((event, index) => (
              <div key={index} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px', marginBottom: '16px', backgroundColor: '#f9fafb' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#374151' }}>Acara #{index + 1}</h4>
                  <button 
                    type="button" 
                    onClick={() => handleRemoveEvent(index)}
                    style={{
                      backgroundColor: '#ef4444', color: 'white', padding: '6px 12px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontSize: '12px'
                    }}
                  >
                    Hapus
                  </button>
                </div>
                <div style={{ display: 'grid', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '4px', color: '#374151' }}>
                      Tipe Acara
                    </label>
                    <select
                      name="type"
                      value={event.type}
                      onChange={(e) => handleEventChange(index, e)}
                      style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', color: '#111827', backgroundColor: 'white' }}
                    >
                      <option value="ceremony">Ceremony</option>
                      <option value="reception">Reception</option>
                      <option value="location">Location</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '4px', color: '#374151' }}>
                      Judul Utama (misal: Akad Nikah, Resepsi)
                    </label>
                    <input
                      name="mainTitle"
                      value={event.mainTitle}
                      onChange={(e) => handleEventChange(index, e)}
                      style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', color: '#111827' }}
                      placeholder="Akad Nikah"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '4px', color: '#374151' }}>
                      Sub-Judul (misal: 10:00 AM, Grand Ballroom)
                    </label>
                    <input
                      name="subTitle"
                      value={event.subTitle}
                      onChange={(e) => handleEventChange(index, e)}
                      style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', color: '#111827' }}
                      placeholder="Pukul 10:00 WIB"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '4px', color: '#374151' }}>
                      Detail/Deskripsi (misal: The vows and celebration begins, Jl. Contoh No. 1)
                    </label>
                    <textarea
                      name="details"
                      value={event.details}
                      onChange={(e) => handleEventChange(index, e)}
                      rows="3"
                      style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', fontFamily: 'system-ui', color: '#111827', backgroundColor: 'white' }}
                      placeholder="The vows and celebration begins..."
                    />
                  </div>
                  {event.type !== 'location' && (
                    <>
                      <div>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '4px', color: '#374151' }}>
                          Tanggal Acara
                        </label>
                        <input
                          type="date"
                          name="date"
                          value={event.date}
                          onChange={(e) => handleEventChange(index, e)}
                          style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', color: '#111827', colorScheme: 'light' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '4px', color: '#374151' }}>
                          Waktu Acara
                        </label>
                        <input
                          type="time"
                          name="time"
                          value={event.time}
                          onChange={(e) => handleEventChange(index, e)}
                          style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', color: '#111827', colorScheme: 'light' }}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div style={{ borderBottom: '2px solid #e5e7eb', paddingBottom: '16px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#374151' }}>
              Hero Section (opsional)
            </h3>
            <div style={{ display: 'grid', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '4px', color: '#374151' }}>
                  Hero Title
                </label>
                <input
                  name="heroTitle"
                  value={form.heroTitle}
                  onChange={handleFormChange}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', color: '#111827' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '4px', color: '#374151' }}>
                  Hero Subtitle
                </label>
                <input
                  name="heroSubtitle"
                  value={form.heroSubtitle}
                  onChange={handleFormChange}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', color: '#111827' }}
                />
              </div>
            </div>
          </div>

          {/* Photo Upload Section */}
          <div style={{ borderBottom: '2px solid #e5e7eb', paddingBottom: '16px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#374151' }}>
              📸 Upload Foto (opsional)
            </h3>
            <div style={{ display: 'grid', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '4px', color: '#374151' }}>
                  Background Hero (foto latar belakang header)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setHeroBackgroundFile(e.target.files[0])}
                  style={{ 
                    width: '100%', 
                    padding: '8px 12px', 
                    border: '1px solid #d1d5db', 
                    borderRadius: '6px', 
                    fontSize: '14px',
                    color: '#111827',
                    backgroundColor: 'white',
                    cursor: 'pointer'
                  }}
                />
                <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                  Rekomendasi: 1920x1080px, landscape, format JPG/PNG
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '4px', color: '#374151' }}>
                    Foto Pengantin Wanita
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setBridePhotoFile(e.target.files[0])}
                    style={{ 
                      width: '100%', 
                      padding: '8px 12px', 
                      border: '1px solid #d1d5db', 
                      borderRadius: '6px', 
                      fontSize: '14px',
                      color: '#111827',
                      backgroundColor: 'white',
                      cursor: 'pointer'
                    }}
                  />
                  <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                    Square/portrait, 800x800px
                  </p>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '4px', color: '#374151' }}>
                    Foto Pengantin Pria
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setGroomPhotoFile(e.target.files[0])}
                    style={{ 
                      width: '100%', 
                      padding: '8px 12px', 
                      border: '1px solid #d1d5db', 
                      borderRadius: '6px', 
                      fontSize: '14px',
                      color: '#111827',
                      backgroundColor: 'white',
                      cursor: 'pointer'
                    }}
                  />
                  <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                    Square/portrait, 800x800px
                  </p>
                </div>
              </div>

              <div style={{ padding: '12px', backgroundColor: '#d1fae5', border: '1px solid #10b981', borderRadius: '6px' }}>
                <p style={{ fontSize: '13px', color: '#065f46', lineHeight: '1.6' }}>
                  ✅ <strong>Upload Foto:</strong> Foto yang Anda pilih akan otomatis di-upload ke Cloudinary saat form di-submit. 
                  Pastikan ukuran file max 5MB per foto. Format: JPG, PNG, WebP.
                </p>
              </div>
            </div>
          </div>

          {/* Gallery Upload Section */}
          <div style={{ borderBottom: '2px solid #e5e7eb', paddingBottom: '16px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#374151' }}>
              📸 Galeri Foto (opsional)
            </h3>
            <div style={{ display: 'grid', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '4px', color: '#374151' }}>
                  Pilih Foto untuk Galeri
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleGalleryFileChange}
                  style={{ 
                    width: '100%', 
                    padding: '8px 12px', 
                    border: '1px solid #d1d5db', 
                    borderRadius: '6px', 
                    fontSize: '14px',
                    color: '#111827',
                    backgroundColor: 'white',
                    cursor: 'pointer'
                  }}
                />
                <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                  Anda bisa memilih beberapa foto sekaligus. Rekomendasi: square/landscape.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
                  {galleryFiles.map((file, index) => (
                    <div key={index} style={{ position: 'relative', width: '80px', height: '80px', border: '1px solid #d1d5db', borderRadius: '4px', overflow: 'hidden' }}>
                      <img 
                        src={URL.createObjectURL(file)} 
                        alt={`gallery-preview-${index}`} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveGalleryFile(index)}
                        style={{
                          position: 'absolute', top: '2px', right: '2px', backgroundColor: 'rgba(239, 68, 68, 0.8)', color: 'white', border: 'none', borderRadius: '50%', width: '20px', height: '20px', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                        }}
                      >
                        x
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ padding: '12px', backgroundColor: '#d1fae5', border: '1px solid #10b981', borderRadius: '6px' }}>
                <p style={{ fontSize: '13px', color: '#065f46', lineHeight: '1.6' }}>
                  ✅ <strong>Upload Galeri:</strong> Foto galeri akan di-upload ke Cloudinary saat form di-submit.
                </p>
              </div>
            </div>
          </div>
          <div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '4px', color: '#374151' }}>
                Pesan Reminder (untuk kalender)
              </label>
              <input
                name="reminderMessage"
                value={form.reminderMessage}
                onChange={handleFormChange}
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', color: '#111827' }}
              />
            </div>
          </div>

          {/* Note about advanced features */}
          <div style={{ padding: '16px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '6px' }}>
            <p style={{ fontSize: '14px', color: '#166534', marginBottom: '8px', fontWeight: '500' }}>
              💡 Fitur Lanjutan
            </p>
            <p style={{ fontSize: '13px', color: '#15803d', lineHeight: '1.6' }}>
              Untuk menambahkan Love Story Timeline, Event Details, Gallery, dan lainnya, gunakan seed script atau edit langsung di database. 
              Lihat panduan di <code style={{ background: 'white', padding: '2px 6px', borderRadius: '4px' }}>DATABASE_GUIDE.md</code>
            </p>
          </div>

          {/* Submit Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingTop: '8px' }}>
            <button
              type="submit"
              disabled={loading}
              style={{ 
                padding: '12px 24px', 
                backgroundColor: loading ? '#9ca3af' : '#16a34a',
                color: 'white', 
                borderRadius: '6px',
                border: 'none',
                fontSize: '15px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? "Membuat..." : "Buat Undangan"}
            </button>
            {slug && (
              <a
                style={{ fontSize: '14px', color: '#2563eb', textDecoration: 'none', fontWeight: '500' }}
                href={`/${slug}`}
                target="_blank"
                rel="noreferrer"
              >
                → Lihat undangan: /{slug}
              </a>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

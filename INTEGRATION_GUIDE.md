# Integrasi Backend Python dengan Frontend React - SciFind

## Arsitektur Sistem

```
Frontend (React + Vite)          Backend (Python Flask)           Data
┌──────────────────────┐         ┌─────────────────────┐         ┌──────────────┐
│   search.tsx         │  HTTP   │   app.py             │  Load   │ indexed_data │
│   - Input query      │-------->│   - TF-IDF           │-------->│   .json      │
│   - Select method    │  POST   │   - Jaccard          │         └──────────────┘
│   - Display results  │  /api/  │   - Hybrid Search    │
│                      │  search │   - Cosine Similarity│
│   result.tsx         │<--------│                      │
│   - Map results      │  JSON   │                      │
│   - GlareHover cards │Response │                      │
└──────────────────────┘         └─────────────────────┘
```

## Setup Lengkap

### 1. Persiapan Backend Python

#### a. Buat struktur folder
```bash
cd d:\sem5\pi\SciFind
mkdir backend
cd backend
```

#### b. Install dependencies
```bash
pip install flask flask-cors numpy scikit-learn
```

#### c. Siapkan file `indexed_data.json`
Format data harus seperti ini:
```json
[
  {
    "id": "1",
    "judul": "The Meg",
    "poster": "https://image.idntimes.com/...",
    "isi": "Film monster tentang hiu...",
    "content": "Full text dari hasil crawling dan scraping. Teks lengkap untuk diindeks dengan TF-IDF dan Jaccard..."
  },
  {
    "id": "2",
    "judul": "Venom: The Last Dance",
    "poster": "https://...",
    "isi": "Preview text...",
    "content": "Full text content..."
  }
]
```

**Penting**: 
- Field `content` harus berisi teks lengkap untuk indexing
- Field `isi` untuk preview/ringkasan
- Field `poster` untuk URL gambar
- Field `judul` untuk judul film

#### d. Jalankan backend
```bash
python app.py
```

Server akan berjalan di `http://localhost:5000`

### 2. Konfigurasi Frontend React

Frontend sudah dikonfigurasi dengan:
- State management untuk query, results, loading
- 3 method search: TF-IDF, Jaccard, Hybrid
- Fetch API ke backend
- Loading states dan error handling

### 3. Testing

#### Test Backend (tanpa frontend):
```bash
# Test dengan curl atau Postman
curl -X POST http://localhost:5000/api/search \
  -H "Content-Type: application/json" \
  -d '{"query": "alien", "method": "hybrid", "top_k": 5}'
```

#### Test Full Stack:
1. Jalankan backend: `python backend/app.py`
2. Jalankan frontend: `npm run dev`
3. Buka browser: `http://localhost:5173`
4. Ketik query di search box
5. Pilih method (TF-IDF/Jaccard/Hybrid)
6. Klik "Cari"

## Penjelasan Algoritma

### 1. TF-IDF (Term Frequency-Inverse Document Frequency)
- Mengukur pentingnya kata dalam dokumen
- TF: Seberapa sering kata muncul dalam dokumen
- IDF: Seberapa langka kata di seluruh dokumen
- Menggunakan Cosine Similarity untuk mencocokkan query dengan dokumen
- **Kelebihan**: Bagus untuk pencarian dengan banyak kata kunci
- **Kelemahan**: Tidak mempertimbangkan semantik

### 2. Jaccard Similarity
- Mengukur kesamaan antara dua set
- Formula: |A ∩ B| / |A ∪ B|
- Intersection dibagi Union
- **Kelebihan**: Sederhana dan cepat
- **Kelemahan**: Tidak mempertimbangkan frekuensi kata

### 3. Hybrid (Kombinasi)
- 70% TF-IDF score + 30% Jaccard score
- Menggabungkan kelebihan kedua metode
- **Recommended untuk hasil terbaik**

## Format Data dari Python ke React

### Request (Frontend → Backend):
```json
{
  "query": "alien invasion movie",
  "method": "hybrid",
  "top_k": 10
}
```

### Response (Backend → Frontend):
```json
{
  "query": "alien invasion movie",
  "method": "hybrid",
  "total_results": 5,
  "results": [
    {
      "id": "1",
      "judul": "The Meg",
      "poster": "https://...",
      "isi": "Preview text...",
      "content": "Full content...",
      "score": 0.8542,
      "method": "Hybrid",
      "tfidf_score": 0.89,
      "jaccard_score": 0.75
    }
  ]
}
```

## Modifikasi untuk Data Python Anda

Jika format data Python Anda berbeda, sesuaikan di `backend/app.py`:

```python
# Sesuaikan dengan format JSON Anda
with open('path/ke/hasil_crawling.json', 'r', encoding='utf-8') as f:
    indexed_data = json.load(f)

# Sesuaikan field yang digunakan untuk indexing
documents = [doc['field_text_lengkap'] for doc in indexed_data]

# Sesuaikan field yang dikembalikan
result = {
    'id': doc['id_field'],
    'judul': doc['title_field'],
    'poster': doc['image_url_field'],
    'isi': doc['summary_field'],
    'content': doc['full_text_field'],
    'score': float(score)
}
```

## Troubleshooting

### Error: CORS Policy
**Solusi**: Pastikan `flask-cors` terinstall dan diaktifkan di `app.py`

### Error: Connection Refused
**Solusi**: 
1. Pastikan backend running di port 5000
2. Check URL di `search.tsx`: `http://localhost:5000/api/search`

### Error: Empty Results
**Solusi**:
1. Check format `indexed_data.json`
2. Pastikan field `content` ada dan terisi
3. Test backend dengan curl dulu

### Error: Module not found
**Solusi**: Install semua dependencies
```bash
pip install -r backend/requirements.txt
```

## File Structure
```
d:\sem5\pi\SciFind\
├── backend/
│   ├── app.py                    # Flask API server
│   ├── requirements.txt          # Python dependencies
│   ├── indexed_data.json         # Data hasil crawling
│   └── README.md                 # Dokumentasi backend
├── src/
│   ├── section/
│   │   ├── search.tsx            # Search UI + API calls
│   │   └── result.tsx            # Display results
│   └── data.json                 # Default data (fallback)
└── INTEGRATION_GUIDE.md          # File ini
```

## Next Steps

1. ✅ Copy file `indexed_data.json` hasil Python ke `backend/`
2. ✅ Install dependencies Python
3. ✅ Jalankan backend server
4. ✅ Test dengan frontend
5. ⏭️ Fine-tune weights di hybrid search jika perlu
6. ⏭️ Add pagination untuk banyak hasil
7. ⏭️ Add filters (genre, tahun, rating)
8. ⏭️ Deploy ke production

## Tips Optimization

1. **Caching**: Simpan TF-IDF matrix di memory/Redis
2. **Batch Processing**: Process multiple queries sekaligus
3. **Indexing**: Precompute TF-IDF saat startup
4. **Debouncing**: Add delay di frontend sebelum search
5. **Pagination**: Jangan load semua results sekaligus

## Contact & Support

Jika ada masalah, check:
1. Console browser (F12) untuk error frontend
2. Terminal backend untuk error Python
3. Network tab untuk melihat request/response

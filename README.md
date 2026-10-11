# ClauseGuard AI 🛡️
> **Intelligent Legal Assistant & Multilingual Contract Risk Analysis Platform**

ClauseGuard AI is an AI-powered legal document intelligence application designed to analyze commercial contracts, leases, vendor agreements, and government tenders. It features instant OCR photo scanning for physical stamp papers, risk scoring, clause extraction, deadline obligation tracking, multilingual translation across 10 Indian regional languages, and interactive Copilot Q&A.

---

## 🌟 Key Features

- ⚡ **Instant Document & Photo Scanning**: Upload PDFs, DOCX, or take phone camera photos of physical contracts and legal stamp papers with auto-downscaling and Gemini Vision OCR.
- 🛡️ **Risk Detection & Severity Scoring**: Identifies high, medium, and low liability risks, financial exposures, missing indemnity clauses, and termination traps.
- 📋 **Clause Categorization & Extraction**: Automatically classifies payment terms, indemnification, limitation of liability, governing law, confidentiality, and IP rights.
- ⏳ **Obligations & Deadline Tracking**: Extracts party deliverables, payment milestones, compliance deadlines, and notice periods.
- 🌐 **10 Indian Regional Languages**: Real-time translation of executive summaries, risk reports, clauses, and obligations into **Telugu, Hindi, Tamil, Kannada, Marathi, Bengali, Gujarati, Malayalam, Punjabi, and English**.
- 💬 **Interactive Legal Copilot**: Context-grounded Q&A assistant for instant answers with section citations from the contract text.
- 📱 **Mobile & Desktop Responsive**: Mobile-first responsive web app optimized for smartphones, tablets, and desktop workstations.

---

## 🛠️ Tech Stack

### Frontend & Mobile Web
- **React 18** with **TypeScript**
- **Vite** build tooling
- **Tailwind CSS** with rich modern aesthetics & dark/light UI tokens
- **Lucide Icons**
- **React Router v6**
- **TanStack React Query**

### Backend API
- **FastAPI** (Python 3.10+)
- **Uvicorn** ASGI server
- **PyMuPDF (fitz)** & **python-docx** for document parsing
- **Pillow (PIL)** for mobile photo pre-processing and downscaling
- **Google Gemini API** (`gemini-3.5-flash-lite`, `gemini-flash-lite-latest`, multimodal vision)
- **SQLite / SQLAlchemy** with fallback to stateless serverless storage

---

## 📂 Project Structure

```bash
clauseguard-ai/
├── backend/
│   ├── app/
│   │   ├── api/v1/endpoints/   # API routes (documents, analysis, auth, health)
│   │   ├── core/               # Configuration, security, CORS settings
│   │   ├── models/             # Database models
│   │   ├── schemas/            # Pydantic schemas
│   │   └── services/           # AI Engine, Doc Parser, Gemini integrations
│   ├── scripts/                # Verification, testing & audit scripts
│   ├── requirements.txt        # Python backend dependencies
│   └── vercel.json             # Serverless deployment configuration
├── frontend/
│   ├── src/
│   │   ├── components/         # UploadModal, layout, cards, navigation
│   │   ├── lib/                # API client, legal dictionary, translations
│   │   ├── pages/              # Dashboard, Analysis, RiskCenter, Obligations, etc.
│   │   └── types/              # TypeScript interfaces
│   ├── package.json            # Frontend dependencies
│   ├── vite.config.ts          # Vite configuration
│   └── vercel.json             # Vercel deployment routes & rewrites
├── mobile/                     # React Native / Expo mobile app structure
├── storage/                    # Document storage and demo contracts
└── README.md                   # Project documentation
```

---

## 🚀 Quick Start & Installation

### 1. Clone the Repository
```bash
git clone https://github.com/Gauravsujikumar/clauseguard-ai.git
cd clauseguard-ai
```

### 2. Backend Setup
```bash
cd backend
python -m venv venv

# Windows
.\venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
```

Create a `.env` file in `backend/`:
```env
GEMINI_API_KEY=your_gemini_api_key_here
SECRET_KEY=your_secret_key_here
ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

Run the backend server:
```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📱 Mobile Access on Local Wi-Fi
To test the web app directly from your smartphone connected to the same Wi-Fi network:
1. Ensure your backend and frontend are listening on `0.0.0.0`
2. Open `http://<your-computer-local-ip>:5173` on your mobile browser (e.g. `http://10.0.7.166:5173`)

---

## 🔒 Security & Privacy
- Zero persistent storage leaks: document parsing can operate statelessly.
- Sensitive environment keys (`.env`) are excluded from version control via `.gitignore`.
- OCR images are compressed client-side before transmission to reduce network overhead and ensure privacy.

---

## 👥 Contributors & Collaboration
Contributions, pull requests, and suggestions are welcome!

To contribute:
1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License
This project is licensed under the MIT License.

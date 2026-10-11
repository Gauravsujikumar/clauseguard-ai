import React, { useState, useEffect, useRef } from 'react';
import { Upload, X, FileText, CheckCircle2, AlertCircle, Loader2, ArrowRight, Camera, Plus, Image as ImageIcon } from 'lucide-react';
import { api } from '@/lib/api';
import { useNavigate } from 'react-router-dom';

export interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess?: () => void;
  targetMode?: 'summary' | 'risks' | 'clauses' | 'obligations' | 'all';
}

/**
 * Client-side downscaler & compressor for mobile photo captures.
 * Prevents OS Low Memory Killer (LMK) from crashing the browser tab / going back.
 * Drops memory from ~100MB bitmap to ~200KB crisp JPEG while maintaining 100% legal OCR legibility.
 */
const compressImageFile = async (file: File): Promise<File> => {
  if (!file.type.startsWith('image/')) return file;

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const MAX_DIM = 1400;
        let { width, height } = img;
        if (width > MAX_DIM || height > MAX_DIM) {
          if (width > height) {
            height = Math.round((height * MAX_DIM) / width);
            width = MAX_DIM;
          } else {
            width = Math.round((width * MAX_DIM) / height);
            height = MAX_DIM;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(file);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              resolve(file);
              return;
            }
            const cleanName = (file.name || 'scanned_contract.jpg').replace(/\.[^/.]+$/, '') + '.jpg';
            const optimizedFile = new File([blob], cleanName, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });
            resolve(optimizedFile);
          },
          'image/jpeg',
          0.85
        );
      };
      img.onerror = () => resolve(file);
      img.src = e.target?.result as string;
    };
    reader.onerror = () => resolve(file);
    reader.readAsDataURL(file);
  });
};

export const UploadModal: React.FC<UploadModalProps> = ({ 
  isOpen, 
  onClose, 
  onUploadSuccess,
  targetMode = 'all' 
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [optimizing, setOptimizing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [existingDocs, setExistingDocs] = useState<any[]>([]);
  const [selectedExistingId, setSelectedExistingId] = useState<string>('');

  const cameraInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const addPageCameraRef = useRef<HTMLInputElement>(null);
  const addPageFileRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      api.listDocuments()
        .then((docs) => {
          if (docs && docs.length > 0) {
            setExistingDocs(docs);
          }
        })
        .catch(() => {});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const addFiles = async (incoming: FileList | File[] | File) => {
    const rawList = incoming instanceof File ? [incoming] : Array.from(incoming);
    if (rawList.length === 0) return;

    setOptimizing(true);
    try {
      const optimized = await Promise.all(rawList.map(compressImageFile));
      setFiles((prev) => [...prev, ...optimized]);
      setSelectedExistingId('');
    } catch (err) {
      setFiles((prev) => [...prev, ...rawList]);
    } finally {
      setOptimizing(false);
    }
  };

  const removeFile = (idxToRemove: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idxToRemove));
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFiles(e.dataTransfer.files);
    }
  };

  const handleUseExisting = () => {
    if (!selectedExistingId) return;
    onClose();
    navigate(`/app/analysis?doc=${selectedExistingId}&mode=${targetMode}`);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedExistingId) {
      handleUseExisting();
      return;
    }
    if (files.length === 0) return;
    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      if (files.length === 1) {
        formData.append('file', files[0]);
      } else {
        files.forEach((f) => formData.append('files', f));
      }
      formData.append('document_type', 'Commercial Contract');
      formData.append('folder', 'Root');
      formData.append('tags', '');

      const doc = await api.uploadDocument(formData);
      setUploading(false);
      setFiles([]);
      if (onUploadSuccess) onUploadSuccess();
      onClose();
      navigate(`/app/analysis?doc=${doc.id}&mode=${targetMode}`);
    } catch (err: any) {
      setUploading(false);
      setError(
        err.response?.data?.detail ||
          'Failed to upload and analyze document. Please verify the backend server is running.'
      );
    }
  };

  // Mode specific titles & subtitles
  const modeHeaders: Record<string, { title: string; subtitle: string; buttonText: string }> = {
    summary: {
      title: 'Summarize Contract',
      subtitle: 'Upload a document to generate a complete summary of the entire file with zero clutter.',
      buttonText: 'Summarize Entire Contract'
    },
    risks: {
      title: 'Identify Risks',
      subtitle: 'Upload a document to detect potential liability exposures and contract red flags.',
      buttonText: 'Identify Risks'
    },
    clauses: {
      title: 'Extract Key Clauses',
      subtitle: 'Upload a document to extract and classify all legal clauses and terms.',
      buttonText: 'Extract Clauses'
    },
    obligations: {
      title: 'Track Obligations',
      subtitle: 'Upload a document to extract party duties, deliverables, and compliance deadlines.',
      buttonText: 'Track Obligations'
    },
    all: {
      title: 'Analyze Deeply',
      subtitle: 'Upload a contract to view complete 360° deep analysis, clauses, risks, and document viewer.',
      buttonText: 'Run Deep Analysis'
    }
  };

  const currentHeader = modeHeaders[targetMode] || modeHeaders.all;

  return (
    <div className="fixed inset-0 z-[100] w-screen h-screen flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4">
      {/* Hidden File Inputs controlled via explicit button refs to avoid label/form double triggers */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        id="camera-input"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            addFiles(e.target.files);
          }
          e.target.value = '';
        }}
        className="hidden"
      />
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.docx,.txt,.png,.jpg,.jpeg,.webp"
        multiple
        id="file-input"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            addFiles(e.target.files);
          }
          e.target.value = '';
        }}
        className="hidden"
      />
      <input
        ref={addPageCameraRef}
        type="file"
        accept="image/*"
        id="add-page-camera"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            addFiles(e.target.files);
          }
          e.target.value = '';
        }}
        className="hidden"
      />
      <input
        ref={addPageFileRef}
        type="file"
        accept=".pdf,.docx,.txt,.png,.jpg,.jpeg,.webp"
        multiple
        id="add-page-file-extra"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            addFiles(e.target.files);
          }
          e.target.value = '';
        }}
        className="hidden"
      />

      <div className="bg-white rounded-3xl max-w-lg w-full p-7 shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in-95">
        {!uploading && (
          <button
            type="button"
            onClick={() => {
              setFiles([]);
              setError(null);
              setSelectedExistingId('');
              onClose();
            }}
            className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
            title="Close"
          >
            <X size={18} />
          </button>
        )}

        {uploading ? (
          /* Centered, Elegant Processing State */
          <div className="py-12 px-4 flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in duration-300">
            <div className="relative flex items-center justify-center">
              <div className="absolute w-24 h-24 rounded-full bg-blue-400/20 animate-ping" />
              <div className="absolute w-20 h-20 rounded-full bg-blue-500/10 animate-pulse" />
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#0066FF] to-[#38BDF8] text-white flex items-center justify-center shadow-lg shadow-blue-500/25 relative">
                <FileText size={26} className="animate-pulse" />
                <Loader2 size={38} className="absolute inset-0 m-auto text-white/50 animate-spin" />
              </div>
            </div>

            <div className="space-y-1.5 max-w-sm">
              <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                {targetMode === 'summary' ? 'Summarizing Contract' : 'Analyzing Document'}
              </h3>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                {targetMode === 'summary' 
                  ? 'Extracting complete contract scope, parties, and commercial summary...' 
                  : 'Processing text, evaluating terms, and structuring results...'}
              </p>
            </div>

            <div className="flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-xs font-semibold text-[#0066FF]">
              <span className="w-2 h-2 rounded-full bg-[#0066FF] animate-pulse" />
              <span>Processing entire document</span>
            </div>
          </div>
        ) : (
          <>
            {/* Clean, Spacious Header */}
            <div className="flex items-center gap-3.5 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
                <Upload size={22} />
              </div>
              <div className="min-w-0 pr-6">
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight leading-snug">
                  {currentHeader.title}
                </h2>
                <p className="text-xs text-slate-400 font-medium mt-0.5 leading-relaxed">
                  {currentHeader.subtitle}
                </p>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-xs font-semibold text-rose-700">
                <AlertCircle size={16} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {optimizing && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-2 text-xs font-semibold text-blue-700 animate-pulse">
                <Loader2 size={16} className="animate-spin" />
                <span>Optimizing photo scan for fastest processing...</span>
              </div>
            )}

            <form onSubmit={handleUpload} className="space-y-4">
              {/* Dual Action Buttons: Camera & File Upload (when no files yet) */}
              {files.length === 0 && (
                <div className="grid grid-cols-2 gap-3 mb-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      cameraInputRef.current?.click();
                    }}
                    className="flex items-center justify-center gap-2 py-3 px-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs cursor-pointer hover:shadow-lg hover:shadow-blue-500/20 active:scale-98 transition-all border-0 shadow-xs"
                  >
                    <Camera size={17} />
                    <span>Take Photo</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    className="flex items-center justify-center gap-2 py-3 px-3 rounded-2xl bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold text-xs cursor-pointer border border-slate-200/80 active:scale-98 transition-all"
                  >
                    <Upload size={17} />
                    <span>Upload File / PDF</span>
                  </button>
                </div>
              )}

              {/* Upload Zone / Multi-Photo Carousel */}
              {files.length === 0 ? (
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleFileDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-colors border-slate-300 hover:border-[#0066FF] bg-slate-50/60 block py-3"
                >
                  <div className="w-11 h-11 rounded-2xl bg-blue-50 text-[#0066FF] flex items-center justify-center mx-auto mb-2.5">
                    <Upload size={20} />
                  </div>
                  <p className="text-sm font-bold text-slate-800">
                    Drop contract photo or document here, or <span className="text-[#0066FF] underline">browse</span>
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Supports multiple photos (JPG, PNG), PDF, DOCX, and TXT
                  </p>
                </div>
              ) : (
                /* Multi-Page Captured Photos Container */
                <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/80">
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-bold text-slate-800">
                        {files.length} {files.length === 1 ? 'Page' : 'Pages'} Ready for Analysis
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFiles([])}
                      className="text-[11px] font-bold text-rose-500 hover:text-rose-600 transition-colors cursor-pointer border-0 bg-transparent"
                    >
                      Clear all
                    </button>
                  </div>

                  {/* Horizontal Scroll of Pages + PLUS (+) Button */}
                  <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1">
                    {files.map((f, idx) => (
                      <div 
                        key={idx} 
                        className="relative w-24 h-28 rounded-2xl border border-blue-200 bg-white shadow-xs p-1.5 flex flex-col items-center justify-between shrink-0 group animate-in fade-in zoom-in-95"
                      >
                        {f.type.startsWith('image/') ? (
                          <img 
                            src={URL.createObjectURL(f)} 
                            alt={`Page ${idx + 1}`} 
                            className="w-full h-16 object-cover rounded-xl border border-slate-100" 
                          />
                        ) : (
                          <div className="w-full h-16 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                            <FileText size={24} />
                          </div>
                        )}
                        <div className="w-full text-center">
                          <span className="inline-block px-2 py-0.5 rounded-full bg-blue-50 text-[10px] font-extrabold text-blue-700">
                            Page {idx + 1}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(idx)}
                          className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow-md cursor-pointer transition-transform hover:scale-110 border-0"
                          title="Remove this page"
                        >
                          <X size={11} />
                        </button>
                      </div>
                    ))}

                    {/* Prominent PLUS (+) Button Card to Add More Photos */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addPageCameraRef.current?.click();
                      }}
                      className="w-24 h-28 rounded-2xl border-2 border-dashed border-blue-400 bg-blue-50/70 hover:bg-blue-100/80 flex flex-col items-center justify-center cursor-pointer transition-all active:scale-95 text-[#0066FF] p-2 group shadow-xs shrink-0"
                      title="Take photo of next page (+)"
                    >
                      <div className="w-10 h-10 rounded-full bg-blue-600 group-hover:bg-blue-700 text-white flex items-center justify-center shadow-md mb-1.5 transition-transform group-hover:scale-110">
                        <Plus size={22} />
                      </div>
                      <span className="text-[11px] font-extrabold text-blue-700">+ Add Page</span>
                      <span className="text-[9px] text-slate-400 font-medium">Camera</span>
                    </button>
                  </div>

                  <div className="mt-2 text-center">
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addPageFileRef.current?.click();
                      }}
                      className="text-[11px] font-bold text-blue-600 hover:underline cursor-pointer bg-transparent border-0"
                    >
                      + Choose from gallery or files instead
                    </button>
                  </div>
                </div>
              )}

              {/* Or Select Existing Contract (if any exists) */}
              {existingDocs.length > 0 && files.length === 0 && (
                <div className="pt-1">
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold mb-2">
                    <span className="h-px bg-slate-200 flex-1" />
                    <span>OR SELECT EXISTING</span>
                    <span className="h-px bg-slate-200 flex-1" />
                  </div>
                  <select
                    value={selectedExistingId}
                    onChange={(e) => setSelectedExistingId(e.target.value)}
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-700 focus:ring-2 focus:ring-[#0066FF] outline-hidden cursor-pointer"
                  >
                    <option value="">-- Choose an already uploaded contract --</option>
                    {existingDocs.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.original_filename || d.title}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <button
                type="submit"
                disabled={(files.length === 0 && !selectedExistingId) || optimizing}
                className="w-full py-3.5 bg-gradient-to-r from-[#0091FF] via-[#0B63FF] to-[#0D52F7] hover:brightness-105 disabled:opacity-40 text-white rounded-2xl font-bold text-sm shadow-[0_8px_20px_rgba(11,99,255,0.25)] transition-all flex items-center justify-center gap-2 cursor-pointer border-0 mt-3"
              >
                {selectedExistingId ? (
                  <>
                    <span>{currentHeader.buttonText} on Selected</span>
                    <ArrowRight size={16} />
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={18} />
                    <span>
                      {currentHeader.buttonText} {files.length > 0 ? `(${files.length} ${files.length === 1 ? 'Page' : 'Pages'})` : ''}
                    </span>
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

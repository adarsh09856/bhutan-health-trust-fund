import React, { useState, useRef, useEffect } from "react";
import {
  Upload,
  FileText,
  Image as ImageIcon,
  CheckCircle2,
  X,
  Loader2,
  ExternalLink,
  FolderOpen,
  Sparkles,
  Link as LinkIcon,
} from "lucide-react";
import { toast } from "sonner";
import { uploadAsset, getAdminAssets } from "@/lib/api/admin.functions";
import type { UploadedAsset } from "@/lib/db/schema";

export interface FileUploadMeta {
  fileName: string;
  fileSize: string;
  fileType: string;
}

interface FileUploadDropzoneProps {
  value?: string;
  onChange: (url: string, meta?: FileUploadMeta) => void;
  accept?: string;
  category?: string;
  label?: string;
  description?: string;
  className?: string;
  compact?: boolean;
  aspectRatio?: "square" | "video" | "banner" | "auto";
}

export function FileUploadDropzone({
  value = "",
  onChange,
  accept = "image/*",
  category = "general",
  label,
  description,
  className = "",
  compact = false,
  aspectRatio = "auto",
}: FileUploadDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showRecentModal, setShowRecentModal] = useState(false);
  const [recentAssets, setRecentAssets] = useState<UploadedAsset[]>([]);
  const [loadingRecent, setLoadingRecent] = useState(false);
  const [showUrlFallback, setShowUrlFallback] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isImage =
    accept.includes("image") ||
    value.match(/\.(jpeg|jpg|gif|png|webp|svg|avif)$/i) ||
    value.startsWith("data:image");

  const isPdf =
    accept.includes("pdf") ||
    value.toLowerCase().endsWith(".pdf") ||
    value.includes("pdf");

  const handleFile = async (file: File) => {
    if (!file) return;

    // 50MB max limit
    if (file.size > 50 * 1024 * 1024) {
      toast.error("File is too large. Maximum allowed size is 50MB.");
      return;
    }

    setUploading(true);
    const toastId = toast.loading(`Uploading "${file.name}"...`);

    try {
      // Read file as Base64 data URL
      const base64Data = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (err) => reject(err);
        reader.readAsDataURL(file);
      });

      const sizeStr =
        file.size >= 1024 * 1024
          ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
          : `${Math.round(file.size / 1024)} KB`;

      const result = await uploadAsset({
        data: {
          fileName: file.name,
          fileType: file.type || "application/octet-stream",
          fileBase64: base64Data,
          fileSize: sizeStr,
          category,
        },
      });

      if (result.success && result.url) {
        onChange(result.url, {
          fileName: file.name,
          fileSize: sizeStr,
          fileType: file.type,
        });
        toast.success(`Successfully uploaded "${file.name}"`, { id: toastId });
      } else {
        throw new Error("Upload response did not return a valid URL.");
      }
    } catch (err: any) {
      console.error("[FileUpload Error]:", err);
      toast.error(err?.message || "Failed to upload file. Please try again.", {
        id: toastId,
      });
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const loadRecent = async () => {
    setLoadingRecent(true);
    setShowRecentModal(true);
    try {
      const list = await getAdminAssets({ data: category });
      setRecentAssets(list || []);
    } catch (err) {
      console.warn("Could not load recent assets:", err);
    } finally {
      setLoadingRecent(false);
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Label & Header toolbar */}
      <div className="flex items-center justify-between text-xs">
        {label && (
          <label className="font-bold text-slate-700 flex items-center gap-1.5">
            <span>{label}</span>
            {value && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />}
          </label>
        )}
        <div className="flex items-center gap-2 ml-auto">
          <button
            type="button"
            onClick={loadRecent}
            className="text-[11px] font-semibold text-slate-500 hover:text-emerald-700 flex items-center gap-1 transition cursor-pointer"
          >
            <FolderOpen className="h-3 w-3" />
            <span>Library</span>
          </button>
          <button
            type="button"
            onClick={() => setShowUrlFallback(!showUrlFallback)}
            className="text-[11px] font-semibold text-slate-400 hover:text-slate-700 flex items-center gap-1 transition cursor-pointer"
            title="Toggle URL Input"
          >
            <LinkIcon className="h-3 w-3" />
            <span>{showUrlFallback ? "Hide URL" : "Paste URL"}</span>
          </button>
        </div>
      </div>

      {/* Manual URL input fallback toggle */}
      {showUrlFallback && (
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2 animate-in fade-in duration-150">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://... or /uploads/..."
            className="w-full text-xs font-mono bg-white rounded-lg border border-slate-200 px-2.5 py-1.5 focus:outline-none focus:border-emerald-600"
          />
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="p-1 text-slate-400 hover:text-rose-600 cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      )}

      {/* Hidden native input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
          }
        }}
      />

      {/* Current File Preview OR Dropzone */}
      {value ? (
        <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-3 group hover:border-emerald-400 transition">
          <div className="flex items-center gap-3 min-w-0">
            {isImage ? (
              <div
                className={`relative rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 ${
                  aspectRatio === "square"
                    ? "h-14 w-14"
                    : aspectRatio === "video"
                      ? "h-14 w-24"
                      : "h-12 w-16"
                }`}
              >
                <img
                  src={value}
                  alt="Asset Preview"
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center shrink-0">
                <FileText className="h-6 w-6" />
              </div>
            )}

            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold text-slate-800 truncate">
                {value.split("/").pop() || "Uploaded Asset"}
              </div>
              <div className="text-[11px] font-mono text-slate-400 truncate flex items-center gap-1.5 mt-0.5">
                <span className="text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded text-[10px]">
                  Uploaded & Ready
                </span>
                <span className="truncate">{value}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 transition cursor-pointer"
              title="Open File"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={handleBrowseClick}
              disabled={uploading}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-800 text-xs font-bold transition cursor-pointer"
            >
              {uploading ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                "Replace"
              )}
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
              title="Remove File"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Empty Upload Zone */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleBrowseClick}
          className={`relative border-2 border-dashed rounded-2xl p-4 sm:p-6 text-center cursor-pointer transition-all duration-200 ${
            isDragging
              ? "border-emerald-500 bg-emerald-50/50 scale-[1.01]"
              : "border-slate-200 hover:border-emerald-400 hover:bg-slate-50/60"
          } ${compact ? "p-3 sm:p-4" : ""}`}
        >
          {uploading ? (
            <div className="py-4 flex flex-col items-center justify-center gap-2 text-emerald-700">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="text-xs font-bold">Uploading file...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 text-emerald-700 border border-emerald-200 flex items-center justify-center shadow-xs">
                {isImage ? (
                  <ImageIcon className="h-5 w-5" />
                ) : isPdf ? (
                  <FileText className="h-5 w-5" />
                ) : (
                  <Upload className="h-5 w-5" />
                )}
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-slate-800">
                  <span className="text-emerald-700 hover:underline">
                    Click to browse
                  </span>{" "}
                  or drag and drop file here
                </p>
                <p className="text-[11px] text-slate-400">
                  {description ||
                    (isImage
                      ? "PNG, JPG, WebP, SVG up to 50MB"
                      : "PDF, DOCX, XLSX documents up to 50MB")}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Library Modal */}
      {showRecentModal && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 animate-in fade-in duration-150"
          onClick={() => setShowRecentModal(false)}
        >
          <div
            className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FolderOpen className="h-5 w-5 text-emerald-600" />
                <div>
                  <h3 className="font-bold text-sm text-slate-900">
                    Uploaded Asset Library
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Category: <span className="font-mono">{category}</span>
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowRecentModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-xl"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-3">
              {loadingRecent ? (
                <div className="py-16 text-center text-slate-400 flex flex-col items-center gap-2">
                  <Loader2 className="h-6 w-6 animate-spin text-emerald-600" />
                  <span className="text-xs">Loading assets...</span>
                </div>
              ) : recentAssets.length === 0 ? (
                <div className="py-16 text-center text-slate-400 border border-dashed border-slate-200 rounded-2xl p-6">
                  <p className="text-xs font-semibold">No assets found in this category.</p>
                  <p className="text-[11px] mt-1 text-slate-400">
                    Upload a file using the dropzone to see it here.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {recentAssets.map((asset) => {
                    const isAssetImg = asset.fileType?.startsWith("image");
                    return (
                      <div
                        key={asset.id}
                        onClick={() => {
                          onChange(asset.publicUrl, {
                            fileName: asset.fileName,
                            fileSize: asset.fileSize,
                            fileType: asset.fileType,
                          });
                          setShowRecentModal(false);
                          toast.success(`Selected "${asset.fileName}"`);
                        }}
                        className="p-3 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/30 transition cursor-pointer flex items-center gap-3 text-left group"
                      >
                        {isAssetImg ? (
                          <div className="h-12 w-12 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                            <img
                              src={asset.publicUrl}
                              alt={asset.fileName}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="h-12 w-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0 border border-purple-200">
                            <FileText className="h-6 w-6" />
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-bold text-slate-800 truncate group-hover:text-emerald-800">
                            {asset.fileName}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">
                            {asset.fileSize} • {asset.category}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

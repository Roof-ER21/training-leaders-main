import React, { useMemo } from 'react';
import { Download, Image as ImageIcon, FileText, Folder } from 'lucide-react';
import photoManifest from '../data/media/photoManifest.json';
import slideImages from '../data/media/slideImages.json';

const DocsLibrary: React.FC = () => {
  const photos = (photoManifest as any)?.photos || [];
  const slidesMap = (slideImages as any)?.slides || {} as Record<string, string[]>;
  const slides = useMemo(() => {
    const out: Array<{ slide: string; url: string }> = [];
    const entries = Object.entries(slidesMap || {}) as Array<[string, any]>;
    for (const [k, arr] of entries) {
      const list = Array.isArray(arr) ? arr : [];
      for (const u of list) {
        out.push({ slide: k, url: String(u) });
      }
    }
    return out;
  }, [slidesMap]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <Folder className="w-7 h-7 text-red-600" /> Training Materials
        </h1>
        <p className="text-gray-600">Download photo report images and slide deck images used throughout the training.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Photo Report Images */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-purple-600" />
              <h2 className="text-xl font-semibold text-gray-900">Photo Report Images</h2>
            </div>
            <span className="text-sm text-gray-500">{photos.length} items</span>
          </div>
          <div className="p-4 max-h-[420px] overflow-auto">
            <ul className="space-y-3">
              {photos.map((p: any, idx: number) => (
                <li key={idx} className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-gray-900 text-sm truncate">{p.imageUrl}</div>
                    <div className="text-xs text-gray-500 truncate">{p.tag || 'unlabeled'} {p.notes ? '• ' + p.notes : ''}</div>
                  </div>
                  <a href={p.imageUrl} download className="inline-flex items-center gap-1 text-purple-700 hover:text-purple-900 text-sm">
                    <Download className="w-4 h-4" /> Download
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Slide Deck Images */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Slide Deck Images</h2>
            </div>
            <span className="text-sm text-gray-500">{slides.length} images</span>
          </div>
          <div className="p-4 max-h-[420px] overflow-auto">
            <ul className="space-y-3">
              {slides.map((s, idx) => (
                <li key={idx} className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-gray-900 text-sm truncate">Slide {s.slide}</div>
                    <div className="text-xs text-gray-500 truncate">{s.url}</div>
                  </div>
                  <a href={s.url} download className="inline-flex items-center gap-1 text-blue-700 hover:text-blue-900 text-sm">
                    <Download className="w-4 h-4" /> Download
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsLibrary;

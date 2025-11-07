import React from 'react';

const Swatch = ({ name, className }: { name: string; className: string }) => (
  <div className="flex items-center gap-3">
    <div className={`w-10 h-10 rounded ${className}`} />
    <div className="text-sm text-gray-700">{name}</div>
  </div>
);

const BrandStyleGuide: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-black text-gray-900 mb-2">Roof ER — Brand Style Guide</h1>
        <p className="text-gray-600 mb-8">Tokens and usage to keep the app on-brand.</p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Colors</h2>
            <div className="space-y-3">
              <Swatch name="Primary — roofRed" className="bg-[var(--brand-primary)]" />
              <Swatch name="Primary Dark" className="bg-[var(--brand-primary-dark)]" />
              <Swatch name="Black" className="bg-black" />
              <Swatch name="Neutral 900" className="bg-neutral-900" />
              <Swatch name="Neutral 800" className="bg-neutral-800" />
              <Swatch name="Gray 50" className="bg-gray-50 border border-gray-200" />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Headers & Buttons</h2>
            <div className="space-y-4">
              <div className="rounded-lg overflow-hidden">
                <div className="bg-gradient-to-r from-black to-neutral-900 text-white px-4 py-3 font-semibold">Header Bar</div>
                <div className="p-4 border border-gray-200">
                  <button className="px-4 py-2 bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-dark)] text-white rounded-lg font-semibold">Primary CTA</button>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Focus ring and selection use brand red for accessibility.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Usage Guidelines</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Use black gradient for primary headers.</li>
            <li>Use <code>bg-roofRed</code> and <code>hover:bg-roofRed-dark</code> for primary actions.</li>
            <li>Avoid blue/purple/green accents unless communicating status. Prefer neutrals with subtle borders.</li>
            <li>Icons: default gray; use brand red for primary highlights.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BrandStyleGuide;

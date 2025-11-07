import React from 'react';
import teamData from '../data/company/team.json';

const TeamSection: React.FC = () => {
  const members = (teamData as any)?.members || [];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Leadership</h2>
        <p className="text-gray-600 mb-8">Meet our leadership team.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {members.map((m: any, idx: number) => (
            <div key={idx} className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
              {/* Prevent face cropping: contain image without enforced aspect crop */}
              <div className="w-full bg-white rounded-xl mb-4 flex items-center justify-center p-2">
                {m.photoUrl ? (
                  <img
                    src={m.photoUrl}
                    alt={m.name}
                    className="max-h-64 w-auto object-contain"
                    loading="lazy"
                  />
                ) : (
                  <div className="text-gray-400">No Photo</div>
                )}
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{m.name}</h3>
              <div className="text-sm text-red-600 mb-2">{m.role}</div>
              <p className="text-gray-700 text-sm leading-relaxed">{m.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;

import React from 'react';

const CompanyMission: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Our Mission</h2>
        <p className="text-gray-700 mb-6 leading-relaxed">
          At <span className="font-semibold">ROOF<span className="text-red-600">ER</span></span>, our mission is to hold a fiduciary responsibility to our customers, plain and simple. By committing to our core values of integrity, quality, and simplicity, we promise to deliver an experience every homeowner wants when remodeling their home: a simple and straightforward quality installation for a fair and honest price.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 mb-2">Our Values</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-1 mb-6">
          <li>Integrity — do what’s right, every time</li>
          <li>Quality — premium workmanship and clear communication</li>
          <li>Simplicity — make the process straightforward and stress-free</li>
        </ul>

        <h3 className="text-2xl font-semibold text-gray-900 mb-2">Who We Are</h3>
        <p className="text-gray-700 leading-relaxed">
          The Roof Docs began with a simple but powerful idea: homeowners deserve better. What started as a small, tight‑knit team of experts with a shared vision quickly evolved into one of the most trusted names in Northern Virginia. We inspect, educate, and offer the right solution tailored to each homeowner’s unique situation — no scare tactics, no price gouging, just straight talk and sound advice.
        </p>
      </div>
    </section>
  );
};

export default CompanyMission;


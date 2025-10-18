import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { UserCog, LogOut, Download, Upload, Layers, Wrench, Video, Shield } from 'lucide-react';
import authService from '../../services/authService';
import { User } from '../../types/user';

// Import module JSON for read-only preview; edits can be exported as files
import m1 from '../../data/modules/module1_welcome.json';
import m2 from '../../data/modules/module2_commitment.json';
import m3 from '../../data/modules/module3_roofing.json';
import m4 from '../../data/modules/module4_inspection_safety.json';
import m5 from '../../data/modules/module5_initial_pitch.json';
import m6 from '../../data/modules/module6_initial_pitch_objections.json';
import m7 from '../../data/modules/module7_adjuster_meeting.json';
import m8 from '../../data/modules/module8.json';
import m9 from '../../data/modules/module9_post_inspection_objections.json';
import m10 from '../../data/modules/module10_damage_identification_new.json';
import m11 from '../../data/modules/module11_filing_claim_closing.json';
import m12 from '../../data/modules/module12_closing_objections.json';
import m13 from '../../data/modules/module13_discontinued.json';
import m14 from '../../data/modules/module14_sales_cycle_job_flow.json';
import m15 from '../../data/modules/module15_roleplay.json';
import m16 from '../../data/modules/module16_final_exam.json';

const modulesMap: Record<number, any> = {
  1: m1, 2: m2, 3: m3, 4: m4, 5: m5, 6: m6, 7: m7, 8: m8,
  9: m9, 10: m10, 11: m11, 12: m12, 13: m13, 14: m14, 15: m15, 16: m16
};

const AdminHub: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const [user, setUser] = useState<User | null>(null);
  const [selectedModule, setSelectedModule] = useState<number>(1);
  const [editorText, setEditorText] = useState<string>('');
  const [videoApiBase] = useState<string>(process.env.REACT_APP_TRAINING_VIDEO_API || '');

  useEffect(() => {
    authService.initialize();
    const unsub = authService.onAuthStateChange(u => setUser(u));
    return () => unsub();
  }, []);

  useEffect(() => {
    const m = modulesMap[selectedModule];
    setEditorText(JSON.stringify(m, null, 2));
  }, [selectedModule]);

  const canEdit = useMemo(() => user?.role === 'admin', [user]);

  const download = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center"><Shield className="w-5 h-5 text-red-600"/></div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Control Hub</h1>
              <div className="text-xs text-gray-500">The Roof Docs — {user?.email}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onClose?.()}
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >Close</button>
            <button
              onClick={() => authService.signOutUser()}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-black flex items-center gap-2"
            ><LogOut className="w-4 h-4"/> Sign Out</button>
          </div>
        </div>

        {!canEdit ? (
          <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
            <UserCog className="w-10 h-10 text-gray-400 mx-auto mb-2"/>
            <div className="font-semibold">Admin access required</div>
            <div className="text-sm text-gray-600">Sign in with your theroofdocs.com account that has admin privileges.</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Tools */}
            <div className="space-y-6">
              <div className="bg-white p-5 rounded-xl border border-gray-200">
                <div className="flex items-center gap-2 mb-3"><Video className="w-4 h-4"/><div className="font-semibold">Training Video Generator</div></div>
                <div className="text-xs text-gray-500 mb-3">API: {videoApiBase || 'not configured'}</div>
                <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-300" disabled={!videoApiBase}>Open Generator</button>
                <div className="text-xs text-gray-500 mt-2">Hook to ai-api: create jobs, poll status, and copy video URLs to paste into modules.</div>
              </div>
              <div className="bg-white p-5 rounded-xl border border-gray-200">
                <div className="flex items-center gap-2 mb-3"><Wrench className="w-4 h-4"/><div className="font-semibold">Module Editor</div></div>
                <div className="flex items-center gap-2 mb-3">
                  <Layers className="w-4 h-4 text-gray-500"/>
                  <select value={selectedModule} onChange={(e)=> setSelectedModule(parseInt(e.target.value))} className="flex-1 border border-gray-300 rounded-lg px-2 py-1">
                    {Array.from({length:16}).map((_,i)=> <option key={i+1} value={i+1}>Module {i+1}</option>)}
                  </select>
                </div>
                <div className="text-xs text-gray-500">Edit JSON on the right, then export the updated file and commit to the repo to apply.</div>
              </div>
            </div>

            {/* Right: JSON editor */}
            <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <div className="font-semibold">Module {selectedModule} JSON</div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => download(`module${selectedModule}_edited.json`, editorText)}
                    className="px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                  ><Download className="w-4 h-4"/> Export JSON</button>
                </div>
              </div>
              <textarea
                value={editorText}
                onChange={(e)=> setEditorText(e.target.value)}
                rows={24}
                className="w-full font-mono text-sm border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHub;


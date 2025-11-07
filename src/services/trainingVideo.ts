export interface AIJob {
  job_id: string;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  progress?: number;
  result_url?: string; // e.g., /api/ai/result/{job_id}/output.mp4
  estimated_time?: string;
  processing_time_seconds?: number;
  message?: string;
}

export interface TTSRequest {
  text: string;
  language?: string; // e.g., 'en'
}

export interface ImageGenRequest {
  prompt: string;
  model?: string; // 'flux' | 'sdxl-lightning' | 'playground'
  width?: string;
  height?: string;
  steps?: string;
}

const BASE = process.env.REACT_APP_TRAINING_VIDEO_API || '';

async function asJson<T>(res: Response): Promise<T> {
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}

function ensureBase() {
  if (!BASE) throw new Error('Video API not configured (REACT_APP_TRAINING_VIDEO_API)');
}

export const trainingVideoApi = {
  health: async (): Promise<{ status: string }> => {
    ensureBase();
    const res = await fetch(`${BASE}/health`);
    return asJson(res);
  },

  // TTS → returns a Blob (audio)
  ttsGenerate: async (req: TTSRequest): Promise<Blob> => {
    ensureBase();
    const res = await fetch(`${BASE}/api/ai/generate-voice`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ language: 'en', ...req }),
    });
    if (!res.ok) throw new Error(`TTS error ${res.status}`);
    return res.blob();
  },

  // Image generation → returns a Blob (image)
  generateImage: async (req: ImageGenRequest): Promise<Blob> => {
    ensureBase();
    const res = await fetch(`${BASE}/api/ai/generate-image`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req),
    });
    if (!res.ok) throw new Error(`Image gen error ${res.status}`);
    return res.blob();
  },

  // Talking head → returns job info; requires FormData with image + audio
  createTalkingHead: async (image: File | Blob, audio: File | Blob): Promise<AIJob> => {
    ensureBase();
    const fd = new FormData();
    fd.append('image', image);
    fd.append('audio', audio);
    const res = await fetch(`${BASE}/api/ai/talking-head`, { method: 'POST', body: fd });
    return asJson<AIJob>(res);
  },

  // Job status
  getJob: async (jobId: string): Promise<AIJob> => {
    ensureBase();
    const res = await fetch(`${BASE}/api/ai/job/${jobId}`);
    return asJson<AIJob>(res);
  },

  // Construct absolute result URL from job status
  resultUrl: (jobId: string, resultPath?: string): string => {
    ensureBase();
    if (resultPath && /^https?:/i.test(resultPath)) return resultPath;
    const path = resultPath || `/api/ai/result/${jobId}/output.mp4`;
    return `${BASE}${path}`;
  },
  docsUrl: (): string => {
    ensureBase();
    return `${BASE}/docs`;
  },
};

export default trainingVideoApi;

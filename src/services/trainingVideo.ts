export interface CreateJobRequest {
  script: string;
  voice?: string; // e.g., "Rachel"
  model?: string; // e.g., "eleven_multilingual_v2"
  title?: string;
}

export interface Job {
  id: string;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  durationSec?: number;
  videoUrl?: string;
  createdAt?: string;
  error?: string;
}

const BASE = process.env.REACT_APP_TRAINING_VIDEO_API || '';

async function json<T>(res: Response): Promise<T> {
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}

export const trainingVideoApi = {
  async createJob(req: CreateJobRequest): Promise<Job> {
    if (!BASE) throw new Error('Video API not configured');
    const res = await fetch(`${BASE}/jobs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req),
    });
    return json<Job>(res);
  },
  async getJob(id: string): Promise<Job> {
    if (!BASE) throw new Error('Video API not configured');
    const res = await fetch(`${BASE}/jobs/${id}`);
    return json<Job>(res);
  },
  async listJobs(): Promise<Job[]> {
    if (!BASE) throw new Error('Video API not configured');
    const res = await fetch(`${BASE}/jobs`);
    return json<Job[]>(res);
  },
  videoUrl(id: string): string {
    if (!BASE) throw new Error('Video API not configured');
    return `${BASE}/jobs/${id}/video`;
  },
};

export default trainingVideoApi;


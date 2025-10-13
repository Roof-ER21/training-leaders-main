/**
 * Recording Storage Service
 * Manages browser-based storage of audio/video recordings
 * Includes compression and temporary storage before submission
 */

export interface RecordingMetadata {
  id: string;
  userName: string;
  userEmail: string;
  moduleName: string;
  moduleId: string;
  recordingType: 'audio' | 'video';
  duration: number;
  timestamp: string;
  status: 'pending' | 'submitted' | 'reviewed' | 'approved';
  feedback?: string;
  reviewedBy?: string;
  reviewedAt?: string;
}

export interface StoredRecording extends RecordingMetadata {
  dataUrl: string; // Base64 encoded recording data
  size: number; // Size in bytes
}

const STORAGE_PREFIX = 'roofer_recording_';
const METADATA_PREFIX = 'roofer_meta_';
const MAX_STORAGE_SIZE = 50 * 1024 * 1024; // 50MB max storage

class RecordingStorageService {
  /**
   * Save a recording to localStorage
   */
  async saveRecording(
    blob: Blob,
    metadata: RecordingMetadata
  ): Promise<string> {
    try {
      // Check storage availability
      this.checkStorageSpace();

      // Convert blob to base64
      const dataUrl = await this.blobToBase64(blob);

      const recording: StoredRecording = {
        ...metadata,
        dataUrl,
        size: blob.size,
      };

      // Save recording data
      localStorage.setItem(
        `${STORAGE_PREFIX}${metadata.id}`,
        JSON.stringify(recording)
      );

      // Save metadata separately for quick access
      localStorage.setItem(
        `${METADATA_PREFIX}${metadata.id}`,
        JSON.stringify(metadata)
      );

      return metadata.id;
    } catch (error) {
      console.error('Error saving recording:', error);
      throw new Error('Failed to save recording. Storage may be full.');
    }
  }

  /**
   * Get a specific recording by ID
   */
  getRecording(id: string): StoredRecording | null {
    try {
      const data = localStorage.getItem(`${STORAGE_PREFIX}${id}`);
      if (!data) return null;
      return JSON.parse(data);
    } catch (error) {
      console.error('Error retrieving recording:', error);
      return null;
    }
  }

  /**
   * Get all recording metadata (for listing)
   */
  getAllRecordingMetadata(): RecordingMetadata[] {
    const recordings: RecordingMetadata[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(METADATA_PREFIX)) {
        try {
          const data = localStorage.getItem(key);
          if (data) {
            recordings.push(JSON.parse(data));
          }
        } catch (error) {
          console.error('Error parsing metadata:', error);
        }
      }
    }

    // Sort by timestamp (newest first)
    return recordings.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }

  /**
   * Get recordings by status
   */
  getRecordingsByStatus(status: RecordingMetadata['status']): RecordingMetadata[] {
    return this.getAllRecordingMetadata().filter(r => r.status === status);
  }

  /**
   * Get recordings by user
   */
  getRecordingsByUser(userName: string): RecordingMetadata[] {
    return this.getAllRecordingMetadata().filter(
      r => r.userName === userName
    );
  }

  /**
   * Update recording metadata
   */
  updateRecordingMetadata(
    id: string,
    updates: Partial<RecordingMetadata>
  ): boolean {
    try {
      const metadata = this.getRecordingMetadata(id);
      if (!metadata) return false;

      const updatedMetadata = { ...metadata, ...updates };

      localStorage.setItem(
        `${METADATA_PREFIX}${id}`,
        JSON.stringify(updatedMetadata)
      );

      // Also update the full recording if it exists
      const recording = this.getRecording(id);
      if (recording) {
        const updatedRecording = { ...recording, ...updates };
        localStorage.setItem(
          `${STORAGE_PREFIX}${id}`,
          JSON.stringify(updatedRecording)
        );
      }

      return true;
    } catch (error) {
      console.error('Error updating metadata:', error);
      return false;
    }
  }

  /**
   * Get only metadata for a recording
   */
  getRecordingMetadata(id: string): RecordingMetadata | null {
    try {
      const data = localStorage.getItem(`${METADATA_PREFIX}${id}`);
      if (!data) return null;
      return JSON.parse(data);
    } catch (error) {
      console.error('Error retrieving metadata:', error);
      return null;
    }
  }

  /**
   * Delete a recording
   */
  deleteRecording(id: string): boolean {
    try {
      localStorage.removeItem(`${STORAGE_PREFIX}${id}`);
      localStorage.removeItem(`${METADATA_PREFIX}${id}`);
      return true;
    } catch (error) {
      console.error('Error deleting recording:', error);
      return false;
    }
  }

  /**
   * Delete old recordings (older than specified days)
   */
  deleteOldRecordings(daysOld: number = 30): number {
    const recordings = this.getAllRecordingMetadata();
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);

    let deletedCount = 0;

    recordings.forEach(recording => {
      const recordingDate = new Date(recording.timestamp);
      if (recordingDate < cutoffDate) {
        if (this.deleteRecording(recording.id)) {
          deletedCount++;
        }
      }
    });

    return deletedCount;
  }

  /**
   * Get total storage used by recordings
   */
  getTotalStorageUsed(): number {
    let totalSize = 0;

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(STORAGE_PREFIX)) {
        const data = localStorage.getItem(key);
        if (data) {
          totalSize += data.length;
        }
      }
    }

    return totalSize;
  }

  /**
   * Check if storage has enough space
   */
  checkStorageSpace(): void {
    const used = this.getTotalStorageUsed();
    if (used >= MAX_STORAGE_SIZE) {
      throw new Error(
        'Storage limit reached. Please submit or delete old recordings.'
      );
    }
  }

  /**
   * Convert Blob to Base64 string
   */
  private blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to convert blob to base64'));
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  /**
   * Convert Base64 string back to Blob
   */
  base64ToBlob(base64: string): Blob {
    const parts = base64.split(';base64,');
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
  }

  /**
   * Clear all recordings (use with caution!)
   */
  clearAllRecordings(): void {
    const keys: string[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (
        key?.startsWith(STORAGE_PREFIX) ||
        key?.startsWith(METADATA_PREFIX)
      ) {
        keys.push(key);
      }
    }

    keys.forEach(key => localStorage.removeItem(key));
  }

  /**
   * Export recordings data (for backup)
   */
  exportRecordings(): string {
    const recordings = this.getAllRecordingMetadata().map(meta => ({
      ...meta,
      // Don't include actual recording data in export, just metadata
      hasRecording: !!this.getRecording(meta.id),
    }));

    return JSON.stringify(recordings, null, 2);
  }

  /**
   * Format bytes to human-readable size
   */
  formatSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  }

  /**
   * Get storage statistics
   */
  getStorageStats() {
    const recordings = this.getAllRecordingMetadata();
    const totalSize = this.getTotalStorageUsed();

    return {
      totalRecordings: recordings.length,
      pendingRecordings: recordings.filter(r => r.status === 'pending').length,
      submittedRecordings: recordings.filter(r => r.status === 'submitted')
        .length,
      reviewedRecordings: recordings.filter(r => r.status === 'reviewed')
        .length,
      approvedRecordings: recordings.filter(r => r.status === 'approved')
        .length,
      totalSize,
      totalSizeFormatted: this.formatSize(totalSize),
      percentUsed: (totalSize / MAX_STORAGE_SIZE) * 100,
    };
  }
}

// Export singleton instance
export const recordingStorage = new RecordingStorageService();

// Export types
export type { RecordingStorageService };

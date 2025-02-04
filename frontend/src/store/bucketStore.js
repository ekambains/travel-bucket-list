import { create } from 'zustand';

const useBucketStore = create((set) => ({
  buckets: [],
  loading: false,
  error: null,

  fetchBuckets: async (userId) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`/api/bucket?userId=${userId}`);
      const data = await response.json();
      set({ buckets: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  addBucket: async (bucket) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('/api/bucket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bucket),
      });
      const newBucket = await response.json();
      set((state) => ({ buckets: [...state.buckets, newBucket], loading: false }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  updateBucket: async (id, updatedBucket) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`/api/bucket/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedBucket),
      });
      const data = await response.json();
      set((state) => ({
        buckets: state.buckets.map((bucket) =>
          bucket.id === id ? data : bucket
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  deleteBucket: async (id) => {
    set({ loading: true, error: null });
    try {
      await fetch(`/api/bucket/${id}`, { method: 'DELETE' });
      set((state) => ({
        buckets: state.buckets.filter((bucket) => bucket.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useBucketStore;
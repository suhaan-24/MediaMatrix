import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../config';
export default function UploadModal({ onClose }) {
    const { token } = useAuth();
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setError('Please select a file to upload');
            return;
        }

        setError('');
        setLoading(true);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('tags', tags); // backend parses comma separated

        try {
            const res = await axios.post(`${API_URL}/assets`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });
            if (res.data.success) {
                setSuccess('Asset uploaded successfully!');
                setTimeout(() => {
                    onClose();
                }, 1500);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to upload asset');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 text-left">
            <div className="bg-background-light dark:bg-background-dark w-full max-w-lg h-auto rounded-xl shadow-2xl overflow-hidden relative">
                <button onClick={onClose} disabled={loading} className="absolute top-4 right-4 z-20 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                    <span className="material-icons">close</span>
                </button>
                <div className="p-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Upload Asset</h2>
                    
                    {error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm text-center">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm text-center font-medium">
                            {success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Select File</label>
                            <input 
                                type="file" 
                                accept="image/*,video/*,audio/*,.pdf,.zip"
                                onChange={(e) => setFile(e.target.files[0])}
                                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-hover dark:text-gray-300"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Title <span className="text-red-500">*</span></label>
                            <input value={title} onChange={(e) => setTitle(e.target.value)} required type="text" className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:bg-gray-800 dark:text-white placeholder-gray-400" placeholder="A descriptive title" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Description</label>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="3" className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:bg-gray-800 dark:text-white placeholder-gray-400" placeholder="What is this asset about?"></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Tags (comma separated)</label>
                            <input value={tags} onChange={(e) => setTags(e.target.value)} type="text" className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:bg-gray-800 dark:text-white placeholder-gray-400" placeholder="nature, video, 4k" />
                        </div>

                        <button disabled={loading} type="submit" className="w-full bg-primary hover:bg-black text-white font-bold py-3.5 rounded-lg transition-colors duration-200 mt-6 disabled:opacity-50 flex items-center justify-center gap-2">
                            {loading ? (
                                <>
                                    <span className="material-icons animate-spin text-sm">hourglass_empty</span>
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    <span className="material-icons text-sm">cloud_upload</span>
                                    Upload Asset
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

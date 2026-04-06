import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

import { motion } from 'framer-motion'

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });

            if (res.data.success) {
                setIsApplied(true); // Update the local state
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
                dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
                toast.success(res.data.message);

            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id)) // Ensure the state is in sync with fetched data
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    if (!singleJob) return <div className='flex items-center justify-center min-h-[400px]'><p className='text-gray-500 font-medium'>Loading job details...</p></div>

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className='max-w-7xl mx-auto my-10 px-4'
        >
            <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className='flex items-center justify-between border-b pb-8'
            >
                <div className='space-y-4'>
                    <h1 className='text-4xl font-extrabold text-gray-900'>{singleJob?.title}</h1>
                    <div className='flex flex-wrap items-center gap-3'>
                        <Badge className='bg-blue-50 text-blue-600 hover:bg-blue-100 border-none px-4 py-1' variant="outline">{singleJob?.position} Positions</Badge>
                        <Badge className='bg-red-50 text-red-600 hover:bg-red-100 border-none px-4 py-1' variant="outline">{singleJob?.type}</Badge>
                        <Badge className='bg-primary/10 text-primary hover:bg-primary/20 border-none px-4 py-1 font-bold' variant="outline">{singleJob?.salary} LPA</Badge>
                    </div>
                </div>
                <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`h-12 px-10 rounded-xl font-bold transition-all ${isApplied ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-none' : 'bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 hover:scale-[1.02]'}`}>
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </motion.div>
            
            <div className='mt-10 space-y-8'>
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <h2 className='text-xl font-bold text-gray-900 border-l-4 border-primary pl-4 mb-6 uppercase tracking-wider'>Job Overview</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-y-4 max-w-4xl'>
                        {[
                            { label: 'Role', value: singleJob?.title },
                            { label: 'Location', value: singleJob?.location },
                            { label: 'Experience', value: `${singleJob?.experienceLevel} years` },
                            { label: 'Salary', value: `${singleJob?.salary} LPA` },
                            { label: 'Applicants', value: singleJob?.applications?.length || 0 },
                            { label: 'Posted', value: singleJob?.createdAt?.split("T")[0] }
                        ].map((item, index) => (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + (index * 0.1) }}
                                className='flex items-center gap-2'
                            >
                                <span className='font-bold text-gray-700 min-w-[120px]'>{item.label}:</span>
                                <span className='text-gray-600'>{item.value}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.2 }}
                >
                    <h2 className='text-xl font-bold text-gray-900 border-l-4 border-primary pl-4 mb-4 uppercase tracking-wider'>Description</h2>
                    <p className='text-gray-600 leading-relaxed max-w-5xl whitespace-pre-line'>
                        {singleJob?.description}
                    </p>
                </motion.div>
            </div>
        </motion.div>
    )
}



export default JobDescription
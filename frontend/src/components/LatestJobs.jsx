import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux'; 

// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

import { motion } from 'framer-motion'

const LatestJobs = () => {
    const {allJobs} = useSelector(store=>store.job);
   
    return (
        <div className='max-w-7xl mx-auto my-20 px-4'>
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className='flex flex-col gap-2 mb-8'
            >
                <h1 className='text-4xl font-extrabold tracking-tight'>
                    <span className='text-primary'>Latest & Top </span> 
                    Job Openings
                </h1>
                <p className='text-gray-500 font-medium'>Discover recently posted jobs from top-tier companies.</p>
            </motion.div>
            
            {allJobs.length <= 0 ? (
                <div className='flex flex-col items-center justify-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200'>
                    <p className='text-gray-400 font-medium'>No Job Available at the moment</p>
                </div>
            ) : (
                <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={{
                        visible: {
                            transition: {
                                staggerChildren: 0.1
                            }
                        }
                    }}
                    className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-5'
                >
                    {allJobs?.slice(0, 6).map((job) => (
                        <motion.div
                            key={job._id}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 }
                            }}
                        >
                            <LatestJobCards job={job}/>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    )
}



export default LatestJobs
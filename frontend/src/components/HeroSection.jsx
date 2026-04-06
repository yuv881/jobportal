import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='relative pt-40 pb-20 overflow-hidden hero-gradient'>
            {/* Background Decorative Elements */}
            <motion.div 
                animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className='absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl -z-10' 
            />
            <motion.div 
                animate={{ 
                    scale: [1, 1.3, 1],
                    rotate: [0, -90, 0],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className='absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-3xl -z-10' 
            />

            <div className='max-w-7xl mx-auto px-4 text-center'>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='flex flex-col gap-6'
                >
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                        className='inline-flex items-center gap-2 mx-auto px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 bg-white/50 backdrop-blur-sm'
                    >
                        <span className='w-2 h-2 rounded-full bg-primary animate-pulse' />
                        <span className='text-sm font-semibold text-primary uppercase tracking-wider'>No. 1 Job Hunt Website</span>
                    </motion.div>

                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className='text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight text-gray-900'
                    >
                        Search, Apply & <br /> Get Your <span className='text-primary decoration-primary/30 underline-offset-8 decoration-4 underline'>Dream Jobs</span>
                    </motion.h1>

                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className='text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed'
                    >
                        Connecting top talent with industry leaders. Discover your next career move with our personalized job matching and career resources.
                    </motion.p>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8, type: "spring", stiffness: 50 }}
                        className='mt-8 flex w-full max-w-2xl mx-auto p-2 glassmorphism rounded-2xl shadow-2xl shadow-primary/10 border-gray-200 focus-within:ring-4 focus-within:ring-primary/10 transition-all duration-300'
                    >
                        <input
                            type="text"
                            placeholder='Find your dream jobs by title, skill or company'
                            onChange={(e) => setQuery(e.target.value)}
                            className='flex-1 h-14 bg-transparent outline-none border-none px-4 text-lg text-gray-800 placeholder:text-gray-400'
                        />
                        <Button 
                            onClick={searchJobHandler} 
                            className="h-14 px-8 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary/20"
                        >
                            <Search className='h-6 w-6 mr-2' />
                            Search
                        </Button>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className='mt-10 flex items-center justify-center gap-8 text-sm text-gray-400 font-medium grayscale opacity-40'
                    >
                        <span>Trusted by 500+ companies</span>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}



export default HeroSection
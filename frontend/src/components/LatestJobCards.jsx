import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();
    return (
        <div 
            onClick={() => navigate(`/description/${job._id}`)} 
            className='group p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 cursor-pointer flex flex-col gap-4 relative overflow-hidden'
        >
            {/* Hover Indicator Line */}
            <div className='absolute top-0 left-0 w-full h-1 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-gray-900 group-hover:text-primary transition-colors duration-300'>{job?.company?.name}</h1>
                    <p className='text-xs font-medium text-gray-400 uppercase tracking-wider'>India</p>
                </div>
                <div className='bg-gray-50 p-2 rounded-lg group-hover:bg-primary/5 transition-colors duration-300'>
                    {/* Placeholder for Company Logo - can use an icon if logo missing */}
                    <div className='w-8 h-8 rounded bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-400'>LOGO</div>
                </div>
            </div>

            <div className='flex-1'>
                <h2 className='font-extrabold text-xl mb-2 text-gray-900 leading-tight'>{job?.title}</h2>
                <p className='text-sm text-gray-500 line-clamp-2 leading-relaxed'>{job?.description}</p>
            </div>

            <div className='flex flex-wrap items-center gap-2 pt-2'>
                <Badge className='bg-blue-50 text-blue-600 hover:bg-blue-100 border-none px-3' variant="outline">{job?.position} Positions</Badge>
                <Badge className='bg-red-50 text-red-600 hover:bg-red-100 border-none px-3' variant="outline">{job?.type}</Badge>
                <Badge className='bg-primary/10 text-primary hover:bg-primary/20 border-none px-3 font-semibold' variant="outline">{job?.salary}LPA</Badge>
            </div>
        </div>
    )
}


export default LatestJobCards
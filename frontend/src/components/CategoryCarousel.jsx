import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
]

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='my-16'>
            <Carousel className="w-full max-w-2xl mx-auto">
                <CarouselContent className='-ml-2 md:-ml-4'>
                    {
                        category.map((cat, index) => (
                            <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                                <Button 
                                    onClick={()=>searchJobHandler(cat)} 
                                    variant="outline" 
                                    className="rounded-full w-full h-12 font-semibold hover:bg-primary hover:text-white transition-all duration-300 border-gray-200 shadow-sm"
                                >
                                    {cat}
                                </Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious className='hover:bg-primary hover:text-white border-2' />
                <CarouselNext className='hover:bg-primary hover:text-white border-2' />
            </Carousel>
        </div>
    )
}


export default CategoryCarousel
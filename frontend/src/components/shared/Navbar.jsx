import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className='fixed top-0 left-0 right-0 z-50 glassmorphism border-b border-gray-200/50'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4 md:px-8'>
                <div>
                    <h1 className='text-2xl font-extrabold tracking-tight cursor-pointer' onClick={() => navigate("/")}>
                        Job<span className='text-primary'>Portal</span>
                    </h1>
                </div>
                <div className='flex items-center gap-10'>
                    <ul className='hidden md:flex font-medium items-center gap-7 text-gray-600'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li className='hover:text-primary transition-colors'><Link to="/admin/companies">Companies</Link></li>
                                    <li className='hover:text-primary transition-colors'><Link to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li className='hover:text-primary transition-colors'><Link to="/">Home</Link></li>
                                    <li className='hover:text-primary transition-colors'><Link to="/jobs">Jobs</Link></li>
                                    <li className='hover:text-primary transition-colors'><Link to="/browse">Browse</Link></li>
                                </>
                            )
                        }
                    </ul>
                    <div className='flex items-center gap-4'>
                        {
                            !user ? (
                                <div className='flex items-center gap-3'>
                                    <Link to="/login">
                                        <Button variant="ghost" className="hover:bg-primary/10 hover:text-primary">Login</Button>
                                    </Link>
                                    <Link to="/signup">
                                        <Button className="bg-primary hover:bg-primary/90 shadow-sm px-6">Signup</Button>
                                    </Link>
                                </div>
                            ) : (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Avatar className="cursor-pointer border-2 border-primary/20 hover:border-primary/50 transition-all">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="@user" />
                                        </Avatar>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80 mt-2 p-4 shadow-xl border-gray-100" align="end">
                                        <div className='space-y-4'>
                                            <div className='flex items-center gap-4 pb-2 border-b border-gray-100'>
                                                <Avatar className="h-12 w-12 border-2 border-primary/10">
                                                    <AvatarImage src={user?.profile?.profilePhoto} alt="@user" />
                                                </Avatar>
                                                <div className='flex-1 min-w-0'>
                                                    <h4 className='font-semibold text-gray-900 truncate'>{user?.fullname}</h4>
                                                    <p className='text-xs text-gray-500 truncate'>{user?.profile?.bio || 'No bio added'}</p>
                                                </div>
                                            </div>
                                            <div className='flex flex-col gap-1'>
                                                {
                                                    user && user.role === 'student' && (
                                                        <Link to="/profile" className='flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-600 hover:text-primary'>
                                                            <User2 className='h-4 w-4' />
                                                            <span className='text-sm font-medium'>View Profile</span>
                                                        </Link>
                                                    )
                                                }
                                                <button 
                                                    onClick={logoutHandler}
                                                    className='flex items-center gap-3 p-2 rounded-lg hover:bg-red-50 transition-colors text-gray-600 hover:text-red-600 w-full text-left'
                                                >
                                                    <LogOut className='h-4 w-4' />
                                                    <span className='text-sm font-medium'>Logout</span>
                                                </button>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Navbar
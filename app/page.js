import ApiCard from '@/componenets/ApiCard'
import {data} from '../data/data'
import Link from 'next/link'


const Home = () => {
  return (
    <div className='flex flex-col items-center justify-center '>
      <h1 className='mt-10'>
        Welcome To API Hub
      </h1>
      <p className='mt-5 text-sm font-inter text-gray-600'>
        Explore different APIs and their real-time data.
        Each Project is integrated with a unique API to bring you useful information
      </p>

      <div className='flex w-[50%] font-sora items-center justify-center '>
        <div className=' flex items-center w-full flex-wrap justify-center gap-5 py-15 text-white  '>
  {data.map((item) => (
    <Link href={item.path} key={item.id} className='bg-blue-400 px-6 py-2 rounded-lg hover:bg-blue-500'>
      {item.title}
    </Link>
  ))}
</div>
</div>
    </div>

  
    

    
  )
}

export default Home
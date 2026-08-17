import Link from 'next/link'
import React from 'react'
import Image from 'next/image'


const Nav = () => {
  return (
    <nav className='flex justify-between items-center nav-comp px-8 pt-4'>
        <Link href="/" className='flex items-center'>
        <Image 
        src='/images/logo1.png'
        alt='logo'
        width={80}
        height= {80}
        className='object-contain font-sora'
        />
        API Hub
        </Link>

      
    </nav>
  )
}

export default Nav
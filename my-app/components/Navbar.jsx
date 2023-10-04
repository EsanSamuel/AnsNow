"use client"
import React, { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { BsSun } from 'react-icons/bs'

const Navbar = () => {
    const { data: session } = useSession()
    const [providers, setProviders] = useState()

    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders()
            setProviders(response)
        }
        setUpProviders()
    }, [])

    return (
        <nav className='flex justify-between w-full  mb-16 pt-3'>
            <Link href='/' className='flex gap-2 flex-center'>
                AnsNow
            </Link>

            {session?.user ? (
                <div className='flex gap-2'>
                    {/*<BsSun className='mt-2 text-[20px]' />*/}
                    <Link href='/create-post' className=' border border-black py-1 px-4 rounded-full hover:border-none  hover:bg-blue-500 hover:text-white'>Create Post</Link>
                    <button className='bg-black hover:bg-white border border-black rounded-full py-1 p-4
                text-white hover:text-black transition sm:flex hidden' onClick={signOut}>Sign out</button>
                    <div>
                        <Image src={session?.user.image} width={35} height={35} className='rounded-full' />
                    </div>
                </div>
            ) : (
                <>
                    {providers &&
                        Object.values(providers).map((provider) => (
                            <button
                                type='button'
                                key={provider.name}
                                onClick={() => {
                                    signIn(provider.id);
                                }}
                                className='bg-black hover:bg-white border border-black rounded-full py-1 p-4
                text-white hover:text-black transition '
                            >
                                Sign in
                            </button>
                        ))}
                </>
            )}
        </nav>
    )
}

export default Navbar
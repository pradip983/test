"use client"
import dynamic from 'next/dynamic';

const HotelBook = dynamic(() => import('@/components/HotelBook'), { ssr: false });

export default function Page(){

    return (
        <HotelBook />
    )
}
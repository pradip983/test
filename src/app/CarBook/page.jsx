"use client"
import dynamic from 'next/dynamic';

const CarBook = dynamic(() => import('@/components/CarBook'), { ssr: false });

export default function Page(){

    return (
        <CarBook />
    )
}
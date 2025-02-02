"use client"
import dynamic from 'next/dynamic';

const FlightBook = dynamic(() => import('@/components/FlightBook'), { ssr: false });

export default function Page(){

    return (
        <FlightBook />
    )
}
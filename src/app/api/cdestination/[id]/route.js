import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbconnect';
import CDestination from '@/models/CDestination';
import TDestination from '@/models/TDestination';
import Destination from '@/models/Destination';

export async function GET(request, { params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  try {
    await dbConnect();
    

    // Fetch data from multiple collections
    const cdestination = await CDestination.findById(id);
    

    const tdestination = await TDestination.findById(id); // Fetch from `tdestination`
   

    const cardDestination = await Destination.findById(id); // Fetch from `carddestination`
   
    // Check if at least one of the destinations exists and return it
    if (!cdestination && !tdestination && !cardDestination) {
      return NextResponse.json({ message: 'Destination not found' }, { status: 404 });
    }

    // If a valid destination is found, return the corresponding response
    if (cdestination) {
      return NextResponse.json(cdestination);
    }
    if (tdestination) {
      return NextResponse.json(tdestination);
    }
    if (cardDestination) {
      return NextResponse.json(cardDestination);
    }

  } catch (error) {
    
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

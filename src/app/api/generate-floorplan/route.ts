// app/api/generate-floorplan/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt } = body;

    const res = await axios.post('http://127.0.0.1:8000/generate-floorplan', {
      prompt,
    });

    // The FastAPI returns: { image: "data:image/png;base64,..." }
    return NextResponse.json({ image: res.data.image });
  } catch (err) {
    console.error('Error in API route:', err);
    return NextResponse.json({ error: 'Failed to generate floorplan' }, { status: 500 });
  }
}


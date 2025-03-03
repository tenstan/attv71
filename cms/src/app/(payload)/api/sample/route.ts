import { NextResponse } from 'next/server'

export async function GET() {
  throw new Error('error')
  return NextResponse.json({ message: 'test' }, { status: 200 })
}

//ticket price in coreum 

// example: { time: "2023-01-02", value: 25 },

import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';

// Initialize Redis
const redis = Redis.fromEnv();

interface PriceEntry {
  time: number;
  value: number;
}

// GET request handler: get ticket price history
export const GET = async () => {
  try {
    let priceHistory = (await redis.get('ticket_price_history') || []) as PriceEntry[];
    if (Array.isArray(priceHistory)) {
      // Remove duplicates: keep only the last occurrence for each timestamp
      const map = new Map<number, PriceEntry>();
      for (const entry of priceHistory) {
        map.set(entry.time, entry);
      }
      priceHistory = Array.from(map.values());
      // Sort strictly ascending by time
      priceHistory = priceHistory.sort((a, b) => a.time - b.time);
    }
    return Response.json({ priceHistory });
  } catch (error) {
    console.error("Error fetching ticket price history:", error);
    return new NextResponse(
      JSON.stringify({ 
        error: "Failed to fetch ticket price history",
        details: error instanceof Error ? error.message : String(error),
        success: false 
      }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};

// POST request handler: add new ticket price
export const POST = async (request: Request) => {
  try {
    const { price } = await request.json();
    console.log("Price received:", price);
    
    if (!price || typeof price !== 'number') {
      return new NextResponse(
        JSON.stringify({ error: "Valid price is required", success: false }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Get existing price history
    let priceHistory = await redis.get('ticket_price_history');
    if (!Array.isArray(priceHistory)) priceHistory = [];

    const typedHistory = priceHistory as Array<{ time: number; value: number }>;
    typedHistory.sort((a, b) => a.time - b.time);

    let now = Math.floor(Date.now() / 1000);
    // Ensure strictly increasing timestamp
    if (typedHistory.length > 0) {
      const lastTime = typedHistory[typedHistory.length - 1].time;
      if (now <= lastTime) {
        now = lastTime + 1;
      }
    }

    const newEntry = {
      time: now,
      value: price,
    };
    
    const updatedHistory = [...typedHistory, newEntry];
    
    await redis.set('ticket_price_history', updatedHistory);
    
    return Response.json({ 
      success: true,
      priceHistory: updatedHistory
    });
  } catch (error) {
    console.error("Error updating ticket price:", error);
    return new NextResponse(
      JSON.stringify({ 
        error: "Failed to update ticket price",
        details: error instanceof Error ? error.message : String(error),
        success: false 
      }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};


'use client';

import { SignedIn } from "@clerk/nextjs";
import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';

export default function GeneratePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100">
      <h1 className="text-4xl font-bold text-indigo-600">Generate Image Page (Coming Soon)</h1>
    </div>
  );
}

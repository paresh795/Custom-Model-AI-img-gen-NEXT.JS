'use client';

import { useState, useEffect } from 'react';
import { SignIn, SignOutButton, SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Loader2, Info } from 'lucide-react';
import AccentShape from '@/components/ui/AccentShape';
import ExamplePrompts from '@/components/ui/ExamplePrompts';
import GeneratedImagesGrid from '@/components/ui/GeneratedImagesGrid';
import ImageCarousel from '@/components/ui/ImageCarousel';

export default function Home() {
  const { user, isLoaded } = useUser();
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [numOutputs, setNumOutputs] = useState<number>(1);
  const [outputQuality, setOutputQuality] = useState(90);
  const [numInferenceSteps, setNumInferenceSteps] = useState(28);
  const [disableSafetyChecker, setDisableSafetyChecker] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);

  useEffect(() => {
    console.log('generatedImages state updated:', generatedImages);
  }, [generatedImages]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt, 
          aspectRatio, 
          numOutputs, 
          outputQuality, 
          numInferenceSteps, 
          disableSafetyChecker,
          userId: user?.id 
        }),
      });
      if (!response.ok) throw new Error('Failed to generate image');
      const data = await response.json();
      console.log('API Response:', data);
      if (data.imageUrls && data.imageUrls.length > 0) {
        console.log('Setting generated images:', data.imageUrls);
        setGeneratedImages(data.imageUrls);
      } else {
        throw new Error('No valid images generated');
      }
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Failed to generate image. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectPrompt = (selectedPrompt: string) => {
    setPrompt(selectedPrompt);
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <SignedIn>
          <div className="relative z-10 max-w-4xl mx-auto">
            <header className="flex flex-col items-center mb-12 relative">
              <h1 className="text-6xl font-thin text-center mb-8 tracking-wide">
                Mukul Image 
                <span className="font-bold text-purple-500">Gen</span>
              </h1>
              <div className="absolute top-0 right-0">
                <SignedIn>
                  <SignOutButton>
                    <Button variant="outline" className="text-white border-white hover:bg-white hover:text-gray-900">Sign Out</Button>
                  </SignOutButton>
                </SignedIn>
              </div>
            </header>

            <Card className="mb-8 bg-gray-800/50 backdrop-blur-sm border-gray-700/50 text-gray-100 p-1">
              <CardContent className="p-6">
                <div className="relative text-center mb-12">
                  <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <div className="w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse-slow"></div>
                    <div className="w-32 h-32 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse-slow animation-delay-2000"></div>
                  </div>
                  <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400 animate-gradient-x relative z-10">
                    AI Image Generation Engine
                  </h2>
                  <p className="text-sm text-gray-400 mt-2 font-mono relative z-10">
                    &lt; Powered by Flux-Dev Model &gt;
                  </p>
                  <div className="mt-4 flex justify-center space-x-2">
                    <span className="inline-block w-2 h-2 bg-blue-400 rounded-full animate-ping"></span>
                    <span className="inline-block w-2 h-2 bg-purple-400 rounded-full animate-ping animation-delay-150"></span>
                    <span className="inline-block w-2 h-2 bg-pink-400 rounded-full animate-ping animation-delay-300"></span>
                  </div>
                </div>
                <div className="space-y-4 max-w-2xl mx-auto">
                  <div className="relative">
                    <div className="absolute -top-6 left-0 flex items-center text-xs text-gray-400">
                      <Info size={12} className="mr-1" />
                      <span>Include "mukulsharma" in your prompt for a personalized face</span>
                    </div>
                    <Input
                      placeholder="Enter your prompt"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white w-full"
                    />
                  </div>
                  <ExamplePrompts onSelectPrompt={handleSelectPrompt} />
                  <div className="flex space-x-4">
                    <div className="w-1/2">
                      <label className="block text-sm font-medium text-gray-300 mb-1">Aspect Ratio</label>
                      <Select value={aspectRatio} onValueChange={setAspectRatio}>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue placeholder="Select aspect ratio" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-700 border-gray-600 text-white">
                          <SelectItem value="1:1">1:1</SelectItem>
                          <SelectItem value="16:9">16:9</SelectItem>
                          <SelectItem value="4:3">4:3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="w-1/2">
                      <label className="block text-sm font-medium text-gray-300 mb-1">Number of Images</label>
                      <Select value={numOutputs.toString()} onValueChange={(value) => setNumOutputs(parseInt(value))}>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue placeholder="Select number of images" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-700 border-gray-600 text-white">
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4">4</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Output Quality (1-100)</label>
                    <Slider
                      min={1}
                      max={100}
                      step={1}
                      value={[outputQuality]}
                      onValueChange={(value) => setOutputQuality(value[0])}
                      className="my-4"
                    />
                    <span className="text-sm text-gray-400">{outputQuality}</span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Inference Steps (1-40)</label>
                    <Slider
                      min={1}
                      max={40}
                      step={1}
                      value={[numInferenceSteps]}
                      onValueChange={(value) => setNumInferenceSteps(value[0])}
                      className="my-4"
                    />
                    <span className="text-sm text-gray-400">{numInferenceSteps}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={disableSafetyChecker}
                      onCheckedChange={setDisableSafetyChecker}
                      id="disable-safety"
                    />
                    <label htmlFor="disable-safety" className="text-sm text-gray-300">
                      Disable Safety Checker
                    </label>
                  </div>
                  <Button 
                    onClick={handleGenerate} 
                    disabled={isGenerating} 
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300 transform hover:scale-105"
                  >
                    {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    {isGenerating ? 'Generating...' : 'Generate Image'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {generatedImages.length > 0 && (
            <>
              <div className="mt-12">
                <GeneratedImagesGrid 
                  images={generatedImages} 
                  aspectRatio={aspectRatio}
                />
              </div>
              <div className="mt-12">
                <ImageCarousel images={generatedImages} />
              </div>
            </>
          )}
        </SignedIn>
      </div>
    </div>
  );
}

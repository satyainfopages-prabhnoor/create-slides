import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { SlidePreview } from "./SlidePreview";
import { 
  Wand2, 
  FileText, 
  Download,
  Sparkles,
  Layout,
  Presentation,
  Hash
} from "lucide-react";

const templates = [
  { 
    value: "simple", 
    label: "Simple", 
    description: "Clean and minimal",
    preview: (
      <div className="h-20 bg-white border border-gray-200 p-3 flex flex-col justify-between text-gray-800 rounded-md">
        <div className="text-[11px] font-semibold text-center">Your Presentation Title</div>
        <div className="text-[8px] text-center text-gray-600">Subtitle goes here</div>
        <div className="border-t border-gray-200 pt-1">
          <div className="w-full h-1 bg-gray-100 rounded"></div>
        </div>
      </div>
    )
  },
  { 
    value: "modern", 
    label: "Modern", 
    description: "Contemporary design",
    preview: (
      <div className="h-20 bg-gradient-to-br from-blue-500 to-purple-600 text-white p-3 flex flex-col rounded-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-8 h-8 bg-white/20 rounded-full -mr-4 -mt-4"></div>
        <div className="text-[11px] font-bold">MODERN DESIGN</div>
        <div className="text-[8px] opacity-90 mt-auto">Clean • Contemporary • Professional</div>
      </div>
    )
  },
  { 
    value: "dark", 
    label: "Dark", 
    description: "Professional dark theme",
    preview: (
      <div className="h-20 bg-gray-900 text-white border border-gray-700 p-3 flex flex-col justify-center rounded-md relative">
        <div className="absolute top-2 left-2 w-2 h-2 bg-green-500 rounded-full"></div>
        <div className="text-[11px] font-mono font-semibold text-center">$ presentation --theme=dark</div>
        <div className="text-[8px] text-center text-gray-400 mt-1">Professional & Technical</div>
      </div>
    )
  },
  { 
    value: "minimalistic", 
    label: "Minimalistic", 
    description: "Less is more",
    preview: (
      <div className="h-20 bg-gray-50 text-gray-900 border border-gray-100 p-3 flex items-center justify-center rounded-md">
        <div className="text-center">
          <div className="text-[10px] font-light tracking-wide">PRESENTATION</div>
          <div className="w-6 h-[1px] bg-gray-400 mx-auto my-1"></div>
          <div className="text-[8px] text-gray-600">minimalist approach</div>
        </div>
      </div>
    )
  },
  { 
    value: "business", 
    label: "Business", 
    description: "Corporate style",
    preview: (
      <div className="h-20 bg-gradient-to-r from-slate-700 to-slate-800 text-white p-3 flex flex-col rounded-md">
        <div className="flex items-center justify-between">
          <div className="text-[10px] font-semibold">COMPANY NAME</div>
          <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
        </div>
        <div className="text-[11px] font-bold mt-auto">Business Presentation</div>
        <div className="text-[8px] opacity-75">Q4 2024 Results</div>
      </div>
    )
  },
  { 
    value: "creative", 
    label: "Creative", 
    description: "Bold and artistic",
    preview: (
      <div className="h-20 bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 text-white p-3 flex flex-col rounded-md relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="text-[12px] font-black transform -rotate-2">CREATIVE</div>
          <div className="text-[8px] font-light mt-auto">Think Outside the Box</div>
        </div>
        <div className="absolute bottom-0 right-0 w-6 h-6 bg-white/30 rounded-full -mr-2 -mb-2"></div>
      </div>
    )
  },
];

// Mock slide data for demo
const mockSlides = [
  {
    id: "1",
    title: "Introduction to AI",
    content: "Artificial Intelligence is transforming how we work, learn, and interact with technology. This presentation explores the fundamental concepts and real-world applications.",
    image: "/api/placeholder/400/300",
    code: `<div class="bg-gradient-to-br from-blue-600 to-purple-700 text-white p-8 rounded-lg h-64">
  <h1 class="text-3xl font-bold mb-4">Introduction to AI</h1>
  <p class="text-lg opacity-90">Artificial Intelligence is transforming how we work, learn, and interact with technology.</p>
</div>`
  },
  {
    id: "2", 
    title: "Key Benefits",
    content: "AI brings automation, insights, and efficiency to businesses across industries. From healthcare to finance, AI is creating new possibilities.",
    image: "/api/placeholder/400/300",
    code: `<div class="bg-white border border-gray-200 p-8 rounded-lg h-64 shadow-lg">
  <h2 class="text-2xl font-semibold text-gray-800 mb-4">Key Benefits</h2>
  <ul class="space-y-2 text-gray-600">
    <li class="flex items-center"><span class="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>Automation</li>
    <li class="flex items-center"><span class="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>Insights</li>
    <li class="flex items-center"><span class="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>Efficiency</li>
  </ul>
</div>`
  },
  {
    id: "3",
    title: "Implementation Strategy", 
    content: "A successful AI implementation requires careful planning, stakeholder buy-in, and iterative development. Start small and scale gradually.",
    image: "/api/placeholder/400/300",
    code: `<div class="bg-gradient-to-r from-green-500 to-teal-600 text-white p-8 rounded-lg h-64">
  <h2 class="text-2xl font-bold mb-4">Implementation Strategy</h2>
  <div class="space-y-3">
    <div class="bg-white/20 p-3 rounded">1. Planning Phase</div>
    <div class="bg-white/20 p-3 rounded">2. Stakeholder Alignment</div>
    <div class="bg-white/20 p-3 rounded">3. Iterative Development</div>
  </div>
</div>`
  }
];

export function PresentationMaker() {
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [prompt, setPrompt] = useState("");
  const [slideCount, setSlideCount] = useState(3);
  const [slides, setSlides] = useState<typeof mockSlides>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim() || !selectedTemplate) return;
    
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setSlides(mockSlides);
      setIsGenerating(false);
    }, 2000);
  };

  const handleExport = (format: "pdf" | "pptx") => {
    // Mock export functionality
    console.log(`Exporting as ${format.toUpperCase()}`);
  };

  return (
    <div className="flex h-screen bg-gradient-subtle">
      {/* Left Panel - Controls */}
      <div className="w-80 bg-card border-r border-border p-6 overflow-y-auto">
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Presentation className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-semibold">AI Presentation Maker</h1>
            </div>
            <p className="text-sm text-muted-foreground">
              Create stunning presentations with AI assistance
            </p>
          </div>

          <Separator />

          {/* Template Selection */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Layout className="h-4 w-4 text-muted-foreground" />
              <Label className="font-medium">Template</Label>
            </div>
            <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a template..." />
              </SelectTrigger>
              <SelectContent>
                {templates.map((template) => (
                  <SelectItem key={template.value} value={template.value}>
                    <div className="space-y-1">
                      <div className="font-medium">{template.label}</div>
                      <div className="text-xs text-muted-foreground">
                        {template.description}
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {/* Template Preview */}
            {selectedTemplate && (
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Preview</Label>
                {templates.find(t => t.value === selectedTemplate)?.preview}
              </div>
            )}
          </div>

          <Separator />

          {/* Slide Count */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Hash className="h-4 w-4 text-muted-foreground" />
              <Label className="font-medium">Number of Slides</Label>
            </div>
            <Input
              type="number"
              min="1"
              max="20"
              value={slideCount}
              onChange={(e) => setSlideCount(parseInt(e.target.value) || 1)}
              className="w-full"
            />
            <div className="text-xs text-muted-foreground">
              Choose between 1-20 slides for your presentation.
            </div>
          </div>

          <Separator />

          {/* Prompt Input */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-muted-foreground" />
              <Label className="font-medium">Your Prompt</Label>
            </div>
            <Textarea
              placeholder="Describe your presentation topic... e.g., 'Create a presentation about artificial intelligence in healthcare with 5 slides covering introduction, benefits, challenges, case studies, and future outlook.'"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[120px] resize-none"
            />
            <div className="text-xs text-muted-foreground">
              Be specific about topics, number of slides, and key points to include.
            </div>
          </div>

          {/* Generate Button */}
          <Button 
            onClick={handleGenerate}
            disabled={!prompt.trim() || !selectedTemplate || isGenerating}
            className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
            size="lg"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent mr-2" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="h-4 w-4 mr-2" />
                Generate Slides
              </>
            )}
          </Button>

          {/* Export Buttons */}
          {slides.length > 0 && (
            <>
              <Separator />
              <div className="space-y-3">
                <Label className="font-medium">Export Options</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleExport("pdf")}
                    className="w-full"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    PDF
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleExport("pptx")}
                    className="w-full"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    PPTX
                  </Button>
                </div>
              </div>
            </>
          )}

          {/* Stats */}
          {slides.length > 0 && (
            <>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Slide Count</span>
                  <Badge variant="secondary">{slides.length}</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Template</span>
                  <Badge variant="outline">
                    {templates.find(t => t.value === selectedTemplate)?.label}
                  </Badge>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Right Panel - Main Content */}
      <div className="flex-1 overflow-y-auto">
        {slides.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center space-y-4 max-w-md mx-auto px-6">
              <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                <Presentation className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold text-muted-foreground">
                Your slides will appear here
              </h2>
              <p className="text-sm text-muted-foreground">
                Select a template and enter your prompt to generate beautiful presentation slides with AI assistance.
              </p>
            </div>
          </div>
        ) : (
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Generated Presentation</h2>
              <p className="text-muted-foreground">
                {slides.length} slides • {templates.find(t => t.value === selectedTemplate)?.label} template
              </p>
            </div>
            <div className="grid gap-6">
              {slides.map((slide, index) => (
                <SlidePreview 
                  key={slide.id} 
                  slide={slide} 
                  index={index + 1}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
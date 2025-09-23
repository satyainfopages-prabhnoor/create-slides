import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
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
  Presentation
} from "lucide-react";

const templates = [
  { value: "simple", label: "Simple", description: "Clean and minimal" },
  { value: "modern", label: "Modern", description: "Contemporary design" },
  { value: "dark", label: "Dark", description: "Professional dark theme" },
  { value: "minimalistic", label: "Minimalistic", description: "Less is more" },
  { value: "business", label: "Business", description: "Corporate style" },
  { value: "creative", label: "Creative", description: "Bold and artistic" },
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
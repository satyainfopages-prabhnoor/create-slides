import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Code2, ChevronDown, ChevronUp, Image as ImageIcon, Copy, Check } from "lucide-react";

interface Slide {
  id: string;
  title: string;
  content: string;
  image: string;
  code: string;
}

interface SlidePreviewProps {
  slide: Slide;
  index: number;
}

export function SlidePreview({ slide, index }: SlidePreviewProps) {
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(slide.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                Slide {index}
              </Badge>
            </div>
            <CardTitle className="text-lg">{slide.title}</CardTitle>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowCode(!showCode)}
            className="shrink-0"
          >
            <Code2 className="h-4 w-4 mr-2" />
            {showCode ? "View Design" : "View Code"}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Toggle between Design and Code View */}
        {!showCode ? (
          /* Design Preview */
          <div className="space-y-4">
            <div className="aspect-video bg-gradient-card border border-border rounded-lg p-6 flex items-center justify-center">
              <div className="text-center space-y-4 max-w-md">
                <h3 className="text-xl font-semibold text-card-foreground">
                  {slide.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {slide.content}
                </p>
                <div className="flex items-center justify-center text-muted-foreground">
                  <ImageIcon className="h-6 w-6" />
                  <span className="ml-2 text-xs">Image placeholder</span>
                </div>
              </div>
            </div>

            {/* Content Preview */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Content</h4>
              <p className="text-sm text-muted-foreground leading-relaxed bg-muted/50 p-3 rounded">
                {slide.content}
              </p>
            </div>
          </div>
        ) : (
          /* Code View */
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-sm flex items-center gap-2">
                <Code2 className="h-4 w-4" />
                HTML/Tailwind Code
              </h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopyCode}
                className="h-8 px-2"
              >
                {copied ? (
                  <Check className="h-3 w-3 text-success" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
                <span className="ml-1 text-xs">
                  {copied ? "Copied" : "Copy"}
                </span>
              </Button>
            </div>
            <div className="relative">
              <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto border min-h-[200px]">
                <code className="text-muted-foreground">
                  {slide.code}
                </code>
              </pre>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
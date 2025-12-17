import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Search, ArrowLeft } from 'lucide-react';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] bg-background flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="text-8xl font-display font-bold text-primary/20 mb-4">
            404
          </div>
          
          <h1 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2">
            Page Not Found
          </h1>
          
          <p className="text-sm text-muted-foreground mb-6">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              className="gap-2 rounded-lg"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </Button>
            <Link to="/">
              <Button className="gap-2 rounded-lg w-full sm:w-auto">
                <Home className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
            <Link to="/all-tools">
              <Button variant="outline" className="gap-2 rounded-lg w-full sm:w-auto">
                <Search className="w-4 h-4" />
                Browse Tools
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

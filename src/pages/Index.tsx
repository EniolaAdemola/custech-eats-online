import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { ChefHat, Clock, ShoppingBag, Utensils, ArrowRight } from 'lucide-react';

const Index = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: Utensils,
      title: 'Browse Menu',
      description: 'Explore our delicious selection of meals, snacks, and beverages.',
    },
    {
      icon: ShoppingBag,
      title: 'Easy Ordering',
      description: 'Add items to your cart and place orders in just a few clicks.',
    },
    {
      icon: Clock,
      title: 'Quick Pickup',
      description: 'Track your order and pick up when ready. No more waiting in line!',
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <ChefHat className="h-5 w-5" />
              <span className="text-sm font-medium">CUSTECH University Restaurant</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Order Food Online,{' '}
              <span className="text-primary">Skip the Queue</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Browse our menu, place your order online, and pick up your food when it's ready. 
              Quick, convenient, and made fresh just for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-lg">
                <Link to="/menu">
                  View Menu
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              {!user && (
                <Button size="lg" variant="outline" asChild className="text-lg">
                  <Link to="/auth?mode=signup">Create Account</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-background border hover:shadow-md transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center bg-primary rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              Ready to Order?
            </h2>
            <p className="text-primary-foreground/80 mb-6">
              Browse our menu and enjoy delicious meals without the wait.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/menu">
                Start Ordering
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;

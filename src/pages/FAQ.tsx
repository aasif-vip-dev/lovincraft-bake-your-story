import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqData } from "@/data/mockData";
import { HelpCircle } from "lucide-react";

const FAQ = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 flex justify-center">
            <HelpCircle className="h-16 w-16 text-primary" />
          </div>
          <h1 className="mb-4 font-serif text-4xl font-bold md:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Find answers to common questions about our products, ordering, shipping, and baking. 
            Can't find what you're looking for? Feel free to contact us!
          </p>
        </div>

        {/* FAQ Sections */}
        <div className="mx-auto max-w-4xl space-y-8">
          {faqData.map((section, sectionIndex) => (
            <Card key={sectionIndex}>
              <CardContent className="p-6">
                <h2 className="mb-6 font-serif text-2xl font-bold text-foreground">
                  {section.category}
                </h2>
                
                <Accordion type="single" collapsible className="w-full">
                  {section.questions.map((faq, faqIndex) => (
                    <AccordionItem 
                      key={faqIndex} 
                      value={`${sectionIndex}-${faqIndex}`}
                    >
                      <AccordionTrigger className="text-left font-semibold">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Still Have Questions Section */}
        <Card className="mx-auto mt-12 max-w-4xl bg-primary/5">
          <CardContent className="p-8 text-center">
            <h3 className="mb-2 font-serif text-2xl font-bold">
              Still Have Questions?
            </h3>
            <p className="mb-6 text-muted-foreground">
              Our team is here to help! Reach out and we'll get back to you as soon as possible.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Contact Support
              </a>
              <a 
                href="mailto:support@lovincraft.com" 
                className="inline-flex items-center justify-center rounded-md border border-border bg-background px-6 py-3 font-semibold transition-colors hover:bg-muted"
              >
                Email Us
              </a>
            </div>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default FAQ;
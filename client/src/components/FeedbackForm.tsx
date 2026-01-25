import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateFeedback } from "@/hooks/use-feedbacks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send, Star } from "lucide-react";
import { motion } from "framer-motion";
import { insertFeedbackSchema } from "@shared/schema";

const formSchema = insertFeedbackSchema.extend({
  rating: z.coerce.number().min(1).max(5),
});

type FormData = z.infer<typeof formSchema>;

export function FeedbackForm() {
  const { mutate, isPending } = useCreateFeedback();
  const { toast } = useToast();
  const [rating, setRating] = useState(5);
  
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rating: 5,
    },
  });

  const onSubmit = (data: FormData) => {
    mutate(data, {
      onSuccess: () => {
        toast({
          title: "Feedback sent!",
          description: "Thank you for sharing your thoughts.",
        });
        reset();
        setRating(5);
        setValue("rating", 5);
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  const handleRatingChange = (value: number) => {
    setRating(value);
    setValue("rating", value);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="glass-card rounded-2xl p-8 max-w-lg mx-auto w-full"
    >
      <h3 className="text-2xl font-bold mb-2">Send Feedback</h3>
      <p className="text-muted-foreground mb-6">Found a bug? Have a suggestion? Let us know.</p>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Your Name</label>
          <Input 
            {...register("name")} 
            placeholder="John Doe"
            className="bg-secondary/50 border-white/5 focus:border-primary/50 transition-colors"
          />
          {errors.name && <p className="text-destructive text-xs mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Rating</label>
          <div className="flex gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingChange(star)}
                className="focus:outline-none transition-transform active:scale-90"
              >
                <Star 
                  className={`w-6 h-6 ${star <= rating ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground"}`} 
                />
              </button>
            ))}
          </div>
          <input type="hidden" {...register("rating")} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Message</label>
          <Textarea 
            {...register("message")} 
            placeholder="Tell us what you think..."
            className="min-h-[120px] bg-secondary/50 border-white/5 focus:border-primary/50 transition-colors"
          />
          {errors.message && <p className="text-destructive text-xs mt-1">{errors.message.message}</p>}
        </div>

        <Button 
          type="submit" 
          disabled={isPending}
          className="w-full bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 h-11"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Submit Feedback
            </>
          )}
        </Button>
      </form>
    </motion.div>
  );
}

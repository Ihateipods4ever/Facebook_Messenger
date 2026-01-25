import { useFeedbacks } from "@/hooks/use-feedbacks";
import { Star, User } from "lucide-react";
import { motion } from "framer-motion";

export function FeedbackGrid() {
  const { data: feedbacks, isLoading } = useFeedbacks();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-40 rounded-2xl bg-white/5 animate-pulse" />
        ))}
      </div>
    );
  }

  if (!feedbacks || feedbacks.length === 0) return null;

  // Show only recent 6 feedbacks
  const displayFeedbacks = feedbacks.slice(0, 6);

  return (
    <div className="mt-16">
      <h3 className="text-xl font-semibold mb-6 text-center text-muted-foreground">Community Feedback</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayFeedbacks.map((feedback, index) => (
          <motion.div
            key={feedback.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="p-5 rounded-xl border border-white/5 bg-secondary/30 hover:bg-secondary/50 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <User className="w-4 h-4 text-muted-foreground" />
                </div>
                <span className="font-medium text-sm">{feedback.name}</span>
              </div>
              <div className="flex gap-0.5">
                {[...Array(feedback.rating)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              "{feedback.message}"
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

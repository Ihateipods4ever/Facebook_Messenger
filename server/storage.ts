import { db } from "./db";
import {
  feedbacks,
  type InsertFeedback,
  type Feedback,
} from "@shared/schema";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  createFeedback(feedback: InsertFeedback): Promise<Feedback>;
  getFeedbacks(): Promise<Feedback[]>;
}

export class DatabaseStorage implements IStorage {
  async createFeedback(insertFeedback: InsertFeedback): Promise<Feedback> {
    const [feedback] = await db
      .insert(feedbacks)
      .values(insertFeedback)
      .returning();
    return feedback;
  }

  async getFeedbacks(): Promise<Feedback[]> {
    return await db
      .select()
      .from(feedbacks)
      .orderBy(desc(feedbacks.createdAt));
  }
}

export const storage = new DatabaseStorage();

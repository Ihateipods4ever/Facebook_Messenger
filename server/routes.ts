import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Feedback Routes
  app.post(api.feedbacks.create.path, async (req, res) => {
    try {
      const input = api.feedbacks.create.input.parse(req.body);
      const feedback = await storage.createFeedback(input);
      res.status(201).json(feedback);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.get(api.feedbacks.list.path, async (req, res) => {
    const list = await storage.getFeedbacks();
    res.json(list);
  });

  // Seed data if empty
  const existing = await storage.getFeedbacks();
  if (existing.length === 0) {
    await storage.createFeedback({
      name: "Early Adopter",
      message: "Finally a native Mac app for Messenger! Dark mode looks great.",
      rating: 5
    });
    await storage.createFeedback({
      name: "Tester",
      message: "Works smoothly. Notifications are snappy.",
      rating: 4
    });
  }

  return httpServer;
}

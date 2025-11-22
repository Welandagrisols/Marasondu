import { eq, desc, like, and, sql } from "drizzle-orm";
import { db } from "./db";
import {
  users,
  projects,
  wruas,
  blogPosts,
  fundingOpportunities,
  contactMessages,
  newsletterSubscribers,
  siteSettings,
  type User,
  type InsertUser,
  type Project,
  type InsertProject,
  type Wrua,
  type InsertWrua,
  type BlogPost,
  type InsertBlogPost,
  type FundingOpportunity,
  type InsertFundingOpportunity,
  type ContactMessage,
  type InsertContactMessage,
  type NewsletterSubscriber,
  type InsertNewsletterSubscriber,
  type SiteSetting,
  type InsertSiteSetting,
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Projects
  getProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  getProjectBySlug(slug: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: string): Promise<void>;

  // WRUAs
  getWruas(): Promise<Wrua[]>;
  getWrua(id: string): Promise<Wrua | undefined>;
  createWrua(wrua: InsertWrua): Promise<Wrua>;
  updateWrua(id: string, wrua: Partial<InsertWrua>): Promise<Wrua | undefined>;
  deleteWrua(id: string): Promise<void>;

  // Blog Posts
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: string): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: string): Promise<void>;

  // Funding Opportunities
  getFundingOpportunities(): Promise<FundingOpportunity[]>;
  getFundingOpportunity(id: string): Promise<FundingOpportunity | undefined>;
  createFundingOpportunity(opportunity: InsertFundingOpportunity): Promise<FundingOpportunity>;
  updateFundingOpportunity(id: string, opportunity: Partial<InsertFundingOpportunity>): Promise<FundingOpportunity | undefined>;
  deleteFundingOpportunity(id: string): Promise<void>;

  // Contact Messages
  getContactMessages(): Promise<ContactMessage[]>;
  getContactMessage(id: string): Promise<ContactMessage | undefined>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  markMessageAsRead(id: string): Promise<void>;

  // Newsletter Subscribers
  getNewsletterSubscribers(): Promise<NewsletterSubscriber[]>;
  createNewsletterSubscriber(subscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber>;
  unsubscribeNewsletter(email: string): Promise<void>;

  // Site Settings
  getSiteSetting(key: string): Promise<SiteSetting | undefined>;
  setSiteSetting(setting: InsertSiteSetting): Promise<SiteSetting>;
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Projects
  async getProjects(): Promise<Project[]> {
    return db.select().from(projects).orderBy(desc(projects.createdAt));
  }

  async getProject(id: string): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project || undefined;
  }

  async getProjectBySlug(slug: string): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.slug, slug));
    return project || undefined;
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const [project] = await db.insert(projects).values(insertProject).returning();
    return project;
  }

  async updateProject(id: string, updateData: Partial<InsertProject>): Promise<Project | undefined> {
    const [project] = await db
      .update(projects)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(projects.id, id))
      .returning();
    return project || undefined;
  }

  async deleteProject(id: string): Promise<void> {
    await db.delete(projects).where(eq(projects.id, id));
  }

  // WRUAs
  async getWruas(): Promise<Wrua[]> {
    return db.select().from(wruas).orderBy(wruas.name);
  }

  async getWrua(id: string): Promise<Wrua | undefined> {
    const [wrua] = await db.select().from(wruas).where(eq(wruas.id, id));
    return wrua || undefined;
  }

  async createWrua(insertWrua: InsertWrua): Promise<Wrua> {
    const [wrua] = await db.insert(wruas).values(insertWrua).returning();
    return wrua;
  }

  async updateWrua(id: string, updateData: Partial<InsertWrua>): Promise<Wrua | undefined> {
    const [wrua] = await db
      .update(wruas)
      .set(updateData)
      .where(eq(wruas.id, id))
      .returning();
    return wrua || undefined;
  }

  async deleteWrua(id: string): Promise<void> {
    await db.delete(wruas).where(eq(wruas.id, id));
  }

  // Blog Posts
  async getBlogPosts(): Promise<BlogPost[]> {
    return db.select().from(blogPosts).orderBy(desc(blogPosts.publishedDate));
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post || undefined;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post || undefined;
  }

  async createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    const [post] = await db.insert(blogPosts).values(insertBlogPost).returning();
    return post;
  }

  async updateBlogPost(id: string, updateData: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const [post] = await db
      .update(blogPosts)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(blogPosts.id, id))
      .returning();
    return post || undefined;
  }

  async deleteBlogPost(id: string): Promise<void> {
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
  }

  // Funding Opportunities
  async getFundingOpportunities(): Promise<FundingOpportunity[]> {
    return db.select().from(fundingOpportunities).orderBy(desc(fundingOpportunities.createdAt));
  }

  async getFundingOpportunity(id: string): Promise<FundingOpportunity | undefined> {
    const [opportunity] = await db.select().from(fundingOpportunities).where(eq(fundingOpportunities.id, id));
    return opportunity || undefined;
  }

  async createFundingOpportunity(insertOpportunity: InsertFundingOpportunity): Promise<FundingOpportunity> {
    const [opportunity] = await db.insert(fundingOpportunities).values(insertOpportunity).returning();
    return opportunity;
  }

  async updateFundingOpportunity(id: string, updateData: Partial<InsertFundingOpportunity>): Promise<FundingOpportunity | undefined> {
    const [opportunity] = await db
      .update(fundingOpportunities)
      .set(updateData)
      .where(eq(fundingOpportunities.id, id))
      .returning();
    return opportunity || undefined;
  }

  async deleteFundingOpportunity(id: string): Promise<void> {
    await db.delete(fundingOpportunities).where(eq(fundingOpportunities.id, id));
  }

  // Contact Messages
  async getContactMessages(): Promise<ContactMessage[]> {
    return db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
  }

  async getContactMessage(id: string): Promise<ContactMessage | undefined> {
    const [message] = await db.select().from(contactMessages).where(eq(contactMessages.id, id));
    return message || undefined;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const [message] = await db.insert(contactMessages).values(insertMessage).returning();
    return message;
  }

  async markMessageAsRead(id: string): Promise<void> {
    await db.update(contactMessages).set({ read: true }).where(eq(contactMessages.id, id));
  }

  // Newsletter Subscribers
  async getNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
    return db.select().from(newsletterSubscribers).orderBy(desc(newsletterSubscribers.subscribedAt));
  }

  async createNewsletterSubscriber(insertSubscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber> {
    const [subscriber] = await db.insert(newsletterSubscribers).values(insertSubscriber).returning();
    return subscriber;
  }

  async unsubscribeNewsletter(email: string): Promise<void> {
    await db.update(newsletterSubscribers).set({ active: false }).where(eq(newsletterSubscribers.email, email));
  }

  // Site Settings
  async getSiteSetting(key: string): Promise<SiteSetting | undefined> {
    const [setting] = await db.select().from(siteSettings).where(eq(siteSettings.key, key));
    return setting || undefined;
  }

  async setSiteSetting(insertSetting: InsertSiteSetting): Promise<SiteSetting> {
    const [setting] = await db
      .insert(siteSettings)
      .values(insertSetting)
      .onConflictDoUpdate({
        target: siteSettings.key,
        set: { value: insertSetting.value, updatedAt: new Date() },
      })
      .returning();
    return setting;
  }
}

export const storage = new DatabaseStorage();

import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import multer from "multer";
import path from "path";
import { storage } from "./storage";
import { insertContactMessageSchema, insertNewsletterSubscriberSchema, insertProjectSchema, insertWruaSchema, insertBlogPostSchema, insertFundingOpportunitySchema } from "@shared/schema";
import { fromError } from "zod-validation-error";
import slugify from "slugify";

const JWT_SECRET = process.env.SESSION_SECRET || "your-secret-key-change-in-production";

// Multer configuration for file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'client/public/uploads/');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  },
});

// JWT middleware for protected routes
interface AuthRequest extends Request {
  user?: any;
}

function authenticateToken(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
}

export async function registerRoutes(app: Express): Promise<Server> {
  // ========== PUBLIC APIS ==========

  // Get all projects
  app.get('/api/projects', async (req, res) => {
    try {
      const projects = await storage.getProjects();
      res.json(projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      res.status(500).json({ error: 'Failed to fetch projects' });
    }
  });

  // Get project by ID or slug
  app.get('/api/projects/:idOrSlug', async (req, res) => {
    try {
      const { idOrSlug } = req.params;
      let project = await storage.getProject(idOrSlug);
      if (!project) {
        project = await storage.getProjectBySlug(idOrSlug);
      }
      if (project) {
        res.json(project);
      } else {
        res.status(404).json({ error: 'Project not found' });
      }
    } catch (error) {
      console.error('Error fetching project:', error);
      res.status(500).json({ error: 'Failed to fetch project' });
    }
  });

  // Get all WRUAs
  app.get('/api/wruas', async (req, res) => {
    try {
      const wruas = await storage.getWruas();
      res.json(wruas);
    } catch (error) {
      console.error('Error fetching WRUAs:', error);
      res.status(500).json({ error: 'Failed to fetch WRUAs' });
    }
  });

  // Get all blog posts
  app.get('/api/blog', async (req, res) => {
    try {
      const posts = await storage.getBlogPosts();
      res.json(posts);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      res.status(500).json({ error: 'Failed to fetch blog posts' });
    }
  });

  // Get blog post by slug
  app.get('/api/blog/:slug', async (req, res) => {
    try {
      const post = await storage.getBlogPostBySlug(req.params.slug);
      if (post) {
        res.json(post);
      } else {
        res.status(404).json({ error: 'Blog post not found' });
      }
    } catch (error) {
      console.error('Error fetching blog post:', error);
      res.status(500).json({ error: 'Failed to fetch blog post' });
    }
  });

  // Get funding opportunities
  app.get('/api/funding', async (req, res) => {
    try {
      const opportunities = await storage.getFundingOpportunities();
      res.json(opportunities);
    } catch (error) {
      console.error('Error fetching funding opportunities:', error);
      res.status(500).json({ error: 'Failed to fetch funding opportunities' });
    }
  });

  // Get site stats
  app.get('/api/stats', async (req, res) => {
    try {
      const statsSetting = await storage.getSiteSetting('stats');
      if (statsSetting) {
        res.json(statsSetting.value);
      } else {
        // Default stats
        res.json({
          wruas: 30,
          projects: 45,
          hectares: '12,500',
          communities: '150',
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
      res.status(500).json({ error: 'Failed to fetch stats' });
    }
  });

  // Submit contact form
  app.post('/api/contact', async (req, res) => {
    try {
      const validation = insertContactMessageSchema.safeParse(req.body);
      if (!validation.success) {
        const errorMessage = fromError(validation.error).toString();
        return res.status(400).json({ error: errorMessage });
      }

      const message = await storage.createContactMessage(validation.data);
      // TODO: Send email notification
      res.status(201).json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
      console.error('Error creating contact message:', error);
      res.status(500).json({ error: 'Failed to send message' });
    }
  });

  // Newsletter signup
  app.post('/api/newsletter', async (req, res) => {
    try {
      const validation = insertNewsletterSubscriberSchema.safeParse(req.body);
      if (!validation.success) {
        const errorMessage = fromError(validation.error).toString();
        return res.status(400).json({ error: errorMessage });
      }

      await storage.createNewsletterSubscriber(validation.data);
      res.status(201).json({ success: true, message: 'Subscribed successfully' });
    } catch (error) {
      console.error('Error creating newsletter subscriber:', error);
      if (error instanceof Error && error.message.includes('unique')) {
        res.status(409).json({ error: 'Email already subscribed' });
      } else {
        res.status(500).json({ error: 'Failed to subscribe' });
      }
    }
  });

  // ========== ADMIN APIS ==========

  // Admin register
  app.post('/api/admin/register', async (req, res) => {
    try {
      const { username, password } = req.body;
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ error: 'Username already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await storage.createUser({ username, password: hashedPassword });
      res.status(201).json({ id: user.id, username: user.username });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ error: 'Registration failed' });
    }
  });

  // Admin login
  app.post('/api/admin/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await storage.getUserByUsername(username);

      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
        expiresIn: '24h',
      });

      res.json({ token, user: { id: user.id, username: user.username } });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Login failed' });
    }
  });

  // Protected admin routes
  app.use('/api/admin/*', authenticateToken);

  // Upload image
  app.post('/api/admin/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
  });

  // Projects CRUD
  app.post('/api/admin/projects', async (req: AuthRequest, res) => {
    try {
      const validation = insertProjectSchema.safeParse(req.body);
      if (!validation.success) {
        const errorMessage = fromError(validation.error).toString();
        return res.status(400).json({ error: errorMessage });
      }

      // Generate slug if not provided
      const data = validation.data;
      if (!data.slug) {
        data.slug = slugify(data.title, { lower: true, strict: true });
      }

      const project = await storage.createProject(data);
      res.status(201).json(project);
    } catch (error) {
      console.error('Error creating project:', error);
      res.status(500).json({ error: 'Failed to create project' });
    }
  });

  app.put('/api/admin/projects/:id', async (req: AuthRequest, res) => {
    try {
      const project = await storage.updateProject(req.params.id, req.body);
      if (project) {
        res.json(project);
      } else {
        res.status(404).json({ error: 'Project not found' });
      }
    } catch (error) {
      console.error('Error updating project:', error);
      res.status(500).json({ error: 'Failed to update project' });
    }
  });

  app.delete('/api/admin/projects/:id', async (req: AuthRequest, res) => {
    try {
      await storage.deleteProject(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting project:', error);
      res.status(500).json({ error: 'Failed to delete project' });
    }
  });

  // WRUAs CRUD
  app.post('/api/admin/wruas', async (req: AuthRequest, res) => {
    try {
      const validation = insertWruaSchema.safeParse(req.body);
      if (!validation.success) {
        const errorMessage = fromError(validation.error).toString();
        return res.status(400).json({ error: errorMessage });
      }

      const wrua = await storage.createWrua(validation.data);
      res.status(201).json(wrua);
    } catch (error) {
      console.error('Error creating WRUA:', error);
      res.status(500).json({ error: 'Failed to create WRUA' });
    }
  });

  app.put('/api/admin/wruas/:id', async (req: AuthRequest, res) => {
    try {
      const wrua = await storage.updateWrua(req.params.id, req.body);
      if (wrua) {
        res.json(wrua);
      } else {
        res.status(404).json({ error: 'WRUA not found' });
      }
    } catch (error) {
      console.error('Error updating WRUA:', error);
      res.status(500).json({ error: 'Failed to update WRUA' });
    }
  });

  app.delete('/api/admin/wruas/:id', async (req: AuthRequest, res) => {
    try {
      await storage.deleteWrua(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting WRUA:', error);
      res.status(500).json({ error: 'Failed to delete WRUA' });
    }
  });

  // Blog Posts CRUD
  app.post('/api/admin/blog', async (req: AuthRequest, res) => {
    try {
      const validation = insertBlogPostSchema.safeParse(req.body);
      if (!validation.success) {
        const errorMessage = fromError(validation.error).toString();
        return res.status(400).json({ error: errorMessage });
      }

      // Generate slug if not provided
      const data = validation.data;
      if (!data.slug) {
        data.slug = slugify(data.title, { lower: true, strict: true });
      }

      const post = await storage.createBlogPost(data);
      res.status(201).json(post);
    } catch (error) {
      console.error('Error creating blog post:', error);
      res.status(500).json({ error: 'Failed to create blog post' });
    }
  });

  app.put('/api/admin/blog/:id', async (req: AuthRequest, res) => {
    try {
      const post = await storage.updateBlogPost(req.params.id, req.body);
      if (post) {
        res.json(post);
      } else {
        res.status(404).json({ error: 'Blog post not found' });
      }
    } catch (error) {
      console.error('Error updating blog post:', error);
      res.status(500).json({ error: 'Failed to update blog post' });
    }
  });

  app.delete('/api/admin/blog/:id', async (req: AuthRequest, res) => {
    try {
      await storage.deleteBlogPost(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting blog post:', error);
      res.status(500).json({ error: 'Failed to delete blog post' });
    }
  });

  // Funding Opportunities CRUD
  app.post('/api/admin/funding', async (req: AuthRequest, res) => {
    try {
      const validation = insertFundingOpportunitySchema.safeParse(req.body);
      if (!validation.success) {
        const errorMessage = fromError(validation.error).toString();
        return res.status(400).json({ error: errorMessage });
      }

      const opportunity = await storage.createFundingOpportunity(validation.data);
      res.status(201).json(opportunity);
    } catch (error) {
      console.error('Error creating funding opportunity:', error);
      res.status(500).json({ error: 'Failed to create funding opportunity' });
    }
  });

  app.put('/api/admin/funding/:id', async (req: AuthRequest, res) => {
    try {
      const opportunity = await storage.updateFundingOpportunity(req.params.id, req.body);
      if (opportunity) {
        res.json(opportunity);
      } else {
        res.status(404).json({ error: 'Funding opportunity not found' });
      }
    } catch (error) {
      console.error('Error updating funding opportunity:', error);
      res.status(500).json({ error: 'Failed to update funding opportunity' });
    }
  });

  app.delete('/api/admin/funding/:id', async (req: AuthRequest, res) => {
    try {
      await storage.deleteFundingOpportunity(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting funding opportunity:', error);
      res.status(500).json({ error: 'Failed to delete funding opportunity' });
    }
  });

  // Get contact messages
  app.get('/api/admin/messages', async (req: AuthRequest, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).json({ error: 'Failed to fetch messages' });
    }
  });

  // Mark message as read
  app.patch('/api/admin/messages/:id/read', async (req: AuthRequest, res) => {
    try {
      await storage.markMessageAsRead(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error('Error marking message as read:', error);
      res.status(500).json({ error: 'Failed to mark message as read' });
    }
  });

  // Get newsletter subscribers
  app.get('/api/admin/subscribers', async (req: AuthRequest, res) => {
    try {
      const subscribers = await storage.getNewsletterSubscribers();
      res.json(subscribers);
    } catch (error) {
      console.error('Error fetching subscribers:', error);
      res.status(500).json({ error: 'Failed to fetch subscribers' });
    }
  });

  // Update site settings
  app.put('/api/admin/settings/:key', async (req: AuthRequest, res) => {
    try {
      const setting = await storage.setSiteSetting({
        key: req.params.key,
        value: req.body.value,
      });
      res.json(setting);
    } catch (error) {
      console.error('Error updating setting:', error);
      res.status(500).json({ error: 'Failed to update setting' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

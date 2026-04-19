import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-8fc8fb29/health", (c) => {
  return c.json({ status: "ok" });
});

// Get all enrollments endpoint
app.get("/make-server-8fc8fb29/enrollments", async (c) => {
  try {
    const enrollments = await kv.getByPrefix('enrollment_');
    return c.json({ 
      success: true, 
      count: enrollments.length,
      data: enrollments 
    });
  } catch (error) {
    console.error("Error fetching enrollments:", error);
    return c.json({ 
      error: error instanceof Error ? error.message : "Failed to fetch enrollments" 
    }, 500);
  }
});

// Get all get-started submissions endpoint
app.get("/make-server-8fc8fb29/get-started-submissions", async (c) => {
  try {
    const submissions = await kv.getByPrefix('getstarted_');
    return c.json({ 
      success: true, 
      count: submissions.length,
      data: submissions 
    });
  } catch (error) {
    console.error("Error fetching get-started submissions:", error);
    return c.json({ 
      error: error instanceof Error ? error.message : "Failed to fetch submissions" 
    }, 500);
  }
});

// Enrollment endpoint
app.post("/make-server-8fc8fb29/enroll", async (c) => {
  try {
    const body = await c.req.json();
    const { name, collegeName, course, phoneNumber, gmail, crNumber, enrollmentDate, coursePrice } = body;

    // Validate required fields
    if (!name || !collegeName || !course || !phoneNumber || !gmail || !crNumber) {
      return c.json({ error: "All fields are required" }, 400);
    }

    // Prepare enrollment data
    const enrollmentData = {
      timestamp: enrollmentDate || new Date().toISOString(),
      name,
      gmail,
      phoneNumber,
      collegeName,
      crNumber,
      course,
      coursePrice: coursePrice || 'N/A',
    };

    // Store in KV store (primary storage)
    const enrollmentId = `enrollment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    await kv.set(enrollmentId, enrollmentData);

    // Try to send to Google Sheets if configured (optional)
    const googleSheetsUrl = Deno.env.get("GOOGLE_SHEETS_WEBHOOK_URL");
    
    if (googleSheetsUrl) {
      try {
        const response = await fetch(googleSheetsUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(enrollmentData),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Google Sheets error:", errorText);
          console.log("Data saved to KV store, but Google Sheets sync failed");
        } else {
          console.log(`Enrollment synced to Google Sheets for ${name}`);
        }
      } catch (sheetsError) {
        console.error("Google Sheets sync error:", sheetsError);
        console.log("Data saved to KV store, but Google Sheets sync failed");
      }
    } else {
      console.log("Google Sheets not configured - data saved to KV store only");
    }

    console.log(`Enrollment successful for ${name} in ${course}`);
    
    return c.json({ 
      success: true, 
      message: "Enrollment submitted successfully",
      enrollmentId 
    });

  } catch (error) {
    console.error("Enrollment error:", error);
    return c.json({ 
      error: error instanceof Error ? error.message : "Failed to process enrollment" 
    }, 500);
  }
});

// Get Started form endpoint
app.post("/make-server-8fc8fb29/get-started", async (c) => {
  try {
    const body = await c.req.json();
    const { name, collegeName, gmail, phoneNumber, timestamp } = body;

    // Validate required fields
    if (!name || !collegeName || !gmail || !phoneNumber) {
      return c.json({ error: "All fields are required" }, 400);
    }

    // Prepare data for storage
    const getStartedData = {
      timestamp: timestamp || new Date().toISOString(),
      name,
      gmail,
      phoneNumber,
      collegeName,
      formType: 'Get Started',
    };

    // Store in KV store (primary storage)
    const submissionId = `getstarted_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    await kv.set(submissionId, getStartedData);

    // Try to send to Google Sheets if configured (optional)
    const googleSheetsUrl = Deno.env.get("GOOGLE_SHEETS_WEBHOOK_URL");
    
    if (googleSheetsUrl) {
      try {
        const response = await fetch(googleSheetsUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(getStartedData),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Google Sheets error:", errorText);
          console.log("Data saved to KV store, but Google Sheets sync failed");
        } else {
          console.log(`Get Started form synced to Google Sheets for ${name}`);
        }
      } catch (sheetsError) {
        console.error("Google Sheets sync error:", sheetsError);
        console.log("Data saved to KV store, but Google Sheets sync failed");
      }
    } else {
      console.log("Google Sheets not configured - data saved to KV store only");
    }

    console.log(`Get Started form submitted successfully by ${name}`);
    
    return c.json({ 
      success: true, 
      message: "Form submitted successfully",
      submissionId 
    });

  } catch (error) {
    console.error("Get Started form error:", error);
    return c.json({ 
      error: error instanceof Error ? error.message : "Failed to process form submission" 
    }, 500);
  }
});

Deno.serve(app.fetch);